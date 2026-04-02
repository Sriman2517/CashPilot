import useStore from '../store/useStore'
import HighestCategory from '../components/insights/HighestCategory'
import SpendingRatio from '../components/insights/SpendingRatio'
import MonthComparison from '../components/insights/MonthComparison'
import QuickStats from '../components/insights/QuickStats'
import SavingsTrend from '../components/insights/SavingsTrend'

export default function Insights() {
  const { getInsights, getSpendingByCategory } = useStore()
  const insights = getInsights()
  const spendingByCategory = getSpendingByCategory(2, 2026)

  return (
    <div className="space-y-5">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Insights
        </h1>
        <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5">
          Smart observations from your financial activity — March 2026
        </p>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <HighestCategory
          insights={insights}
          spendingByCategory={spendingByCategory}
        />
        <QuickStats insights={insights} />
      </div>

      {/* Row 2 */}
      <SpendingRatio insights={insights} />

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <MonthComparison />
        <SavingsTrend />
      </div>

    </div>
  )
}