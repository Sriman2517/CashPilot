import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react'
import useStore from '../../store/useStore'

function StatCard({ title, value, subtitle, icon: Icon, iconBg, iconColor, trend, trendLabel }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={18} className={iconColor} />
        </div>
      </div>

      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>

      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-medium
          ${trend >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
          {trend >= 0
            ? <TrendingUp size={13} />
            : <TrendingDown size={13} />
          }
          <span>{Math.abs(trend)}% {trendLabel}</span>
        </div>
      )}
    </div>
  )
}

export default function SummaryCards() {
  const getMonthlySummary = useStore((s) => s.getMonthlySummary)

  const current = getMonthlySummary(2, 2026)  // March 2026
  const previous = getMonthlySummary(1, 2026) // February 2026

  const expenseChange = previous.expenses > 0
    ? parseFloat((((current.expenses - previous.expenses) / previous.expenses) * 100).toFixed(1))
    : 0

  const incomeChange = previous.income > 0
    ? parseFloat((((current.income - previous.income) / previous.income) * 100).toFixed(1))
    : 0

  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Total Balance"
        value={fmt(current.balance)}
        subtitle="Income minus expenses"
        icon={Wallet}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
        trend={incomeChange}
        trendLabel="vs last month"
      />
      <StatCard
        title="Monthly Income"
        value={fmt(current.income)}
        subtitle="Salary + Freelance"
        icon={TrendingUp}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
        trend={incomeChange}
        trendLabel="vs last month"
      />
      <StatCard
        title="Monthly Expenses"
        value={fmt(current.expenses)}
        subtitle="All spending this month"
        icon={TrendingDown}
        iconBg="bg-rose-50"
        iconColor="text-rose-500"
        trend={expenseChange}
        trendLabel="vs last month"
      />
      <StatCard
        title="Savings Rate"
        value={`${current.savingsRate}%`}
        subtitle="Target: 40%"
        icon={PiggyBank}
        iconBg="bg-amber-50"
        iconColor="text-amber-500"
      />
    </div>
  )
}