import useStore from '../store/useStore'
import SummaryCards from '../components/dashboard/SummaryCards'
import BalanceTrend from '../components/dashboard/BalanceTrend'
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import TopCategories from '../components/dashboard/TopCategories'

export default function Dashboard() {
  const { getMonthlySummary, getBalanceTrend, getSpendingByCategory } = useStore()

  // March 2026 = month index 2
  const summary = getMonthlySummary(2, 2026)
  const balanceTrend = getBalanceTrend()
  const spendingByCategory = getSpendingByCategory(2, 2026)

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
          Your financial snapshot — March 2026
        </p>
      </div>

      {/* Row 1 — KPI Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Row 2 — Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BalanceTrend data={balanceTrend} />
        <SpendingBreakdown data={spendingByCategory} />
      </div>

      {/* Row 3 — Recent Transactions + Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RecentTransactions />
        <TopCategories data={spendingByCategory} summary={summary} />
      </div>

    </div>
  )
}