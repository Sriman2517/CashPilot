import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/mockData'

const useStore = create(
  persist(
    (set, get) => ({

      // ─── AUTH / ROLE ───
      role: 'viewer', // 'viewer' | 'admin'
      setRole: (role) => set({ role }),

      // ─── TRANSACTIONS ───
      transactions: mockTransactions,

      addTransaction: (transaction) => set((state) => ({
        transactions: [
          {
            ...transaction,
            id: Date.now(),
          },
          ...state.transactions,
        ]
      })),

      editTransaction: (id, updatedData) => set((state) => ({
        transactions: state.transactions.map((tx) =>
          tx.id === id ? { ...tx, ...updatedData } : tx
        )
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((tx) => tx.id !== id)
      })),

      // ─── FILTERS ───
      filters: {
        search: '',
        type: 'all',       // 'all' | 'income' | 'expense'
        category: 'all',   // 'all' | any category string
        sortBy: 'date-new' // 'date-new' | 'date-old' | 'amount-high' | 'amount-low'
      },

      setFilter: (key, value) => set((state) => ({
        filters: {
          ...state.filters,
          [key]: value
        }
      })),

      resetFilters: () => set({
        filters: {
          search: '',
          type: 'all',
          category: 'all',
          sortBy: 'date-new'
        }
      }),

      // ─── DERIVED: FILTERED + SORTED TRANSACTIONS ───
      getFilteredTransactions: () => {
        const { transactions, filters } = get()
        let result = [...transactions]

        // search filter
        if (filters.search.trim() !== '') {
          result = result.filter((tx) =>
            tx.merchant.toLowerCase().includes(filters.search.toLowerCase()) ||
            tx.category.toLowerCase().includes(filters.search.toLowerCase())
          )
        }

        // type filter
        if (filters.type !== 'all') {
          result = result.filter((tx) => tx.type === filters.type)
        }

        // category filter
        if (filters.category !== 'all') {
          result = result.filter((tx) => tx.category === filters.category)
        }

        // sorting
        switch (filters.sortBy) {
          case 'date-new':
            result.sort((a, b) => new Date(b.date) - new Date(a.date))
            break
          case 'date-old':
            result.sort((a, b) => new Date(a.date) - new Date(b.date))
            break
          case 'amount-high':
            result.sort((a, b) => b.amount - a.amount)
            break
          case 'amount-low':
            result.sort((a, b) => a.amount - b.amount)
            break
          default:
            break
        }

        return result
      },

      // ─── DERIVED: MONTHLY SUMMARY ───
      getMonthlySummary: (month, year) => {
        const { transactions } = get()
        const filtered = transactions.filter((tx) => {
          const d = new Date(tx.date)
          return d.getMonth() === month && d.getFullYear() === year
        })

        const income = filtered
          .filter((tx) => tx.type === 'income')
          .reduce((sum, tx) => sum + tx.amount, 0)

        const expenses = filtered
          .filter((tx) => tx.type === 'expense')
          .reduce((sum, tx) => sum + tx.amount, 0)

        const balance = income - expenses
        const savingsRate = income > 0
          ? parseFloat(((balance / income) * 100).toFixed(1))
          : 0

        return { income, expenses, balance, savingsRate }
      },

      // ─── DERIVED: SPENDING BY CATEGORY ───
      getSpendingByCategory: (month, year) => {
        const { transactions } = get()
        const filtered = transactions.filter((tx) => {
          const d = new Date(tx.date)
          const matchMonth = month !== undefined
            ? d.getMonth() === month && d.getFullYear() === year
            : true
          return tx.type === 'expense' && matchMonth
        })

        const map = {}
        filtered.forEach((tx) => {
          map[tx.category] = (map[tx.category] || 0) + tx.amount
        })

        return Object.entries(map)
          .map(([category, amount]) => ({ category, amount }))
          .sort((a, b) => b.amount - a.amount)
      },

      // ─── DERIVED: BALANCE TREND (last 6 months) ───
      getBalanceTrend: () => {
        const { transactions } = get()
        const months = []
        const now = new Date(2026, 2, 1) // March 2026

        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
          const month = d.getMonth()
          const year = d.getFullYear()

          const monthTx = transactions.filter((tx) => {
            const txDate = new Date(tx.date)
            return txDate.getMonth() === month && txDate.getFullYear() === year
          })

          const income = monthTx
            .filter((tx) => tx.type === 'income')
            .reduce((sum, tx) => sum + tx.amount, 0)

          const expenses = monthTx
            .filter((tx) => tx.type === 'expense')
            .reduce((sum, tx) => sum + tx.amount, 0)

          months.push({
            month: d.toLocaleString('default', { month: 'short' }),
            income,
            expenses,
            balance: income - expenses
          })
        }

        return months
      },

      // ─── DERIVED: INSIGHTS ───
      getInsights: () => {
        const { transactions } = get()

        // Current month = March 2026
        const currentMonth = 2
        const currentYear = 2026
        const prevMonth = 1
        const prevYear = 2026

        const currentTx = transactions.filter((tx) => {
          const d = new Date(tx.date)
          return d.getMonth() === currentMonth && d.getFullYear() === currentYear
        })

        const prevTx = transactions.filter((tx) => {
          const d = new Date(tx.date)
          return d.getMonth() === prevMonth && d.getFullYear() === prevYear
        })

        // Highest spending category this month
        const expenseMap = {}
        currentTx
          .filter((tx) => tx.type === 'expense')
          .forEach((tx) => {
            expenseMap[tx.category] = (expenseMap[tx.category] || 0) + tx.amount
          })
        const highestCategory = Object.entries(expenseMap)
          .sort((a, b) => b[1] - a[1])[0] || ['None', 0]

        // Biggest single transaction this month
        const biggestTx = currentTx
          .filter((tx) => tx.type === 'expense')
          .sort((a, b) => b.amount - a.amount)[0] || null

        // Total expenses this month vs last month
        const currentExpenses = currentTx
          .filter((tx) => tx.type === 'expense')
          .reduce((sum, tx) => sum + tx.amount, 0)

        const prevExpenses = prevTx
          .filter((tx) => tx.type === 'expense')
          .reduce((sum, tx) => sum + tx.amount, 0)

        const expenseChange = prevExpenses > 0
          ? parseFloat((((currentExpenses - prevExpenses) / prevExpenses) * 100).toFixed(1))
          : 0

        // Daily average spend this month
        const daysInMonth = 31
        const dailyAverage = parseFloat((currentExpenses / daysInMonth).toFixed(0))

        // Current month income
        const currentIncome = currentTx
          .filter((tx) => tx.type === 'income')
          .reduce((sum, tx) => sum + tx.amount, 0)

        const spendingRatio = currentIncome > 0
          ? parseFloat(((currentExpenses / currentIncome) * 100).toFixed(1))
          : 0

        return {
          highestCategory: {
            name: highestCategory[0],
            amount: highestCategory[1]
          },
          biggestTransaction: biggestTx,
          expenseChange,
          dailyAverage,
          spendingRatio,
          currentExpenses,
          currentIncome
        }
      }

    }),
    {
      name: 'cashpilot-storage', // localStorage key
      partialState: (state) => ({ transactions: state.transactions })
    }
  )
)

export default useStore