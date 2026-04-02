import InsightCard from './InsightCard'
import { categoryColors } from '../../data/mockData'
import { formatCurrency } from '../../utils/calculations'

export default function HighestCategory({ insights, spendingByCategory }) {
  const { highestCategory, currentExpenses } = insights
  const color = categoryColors[highestCategory.name] || '#6366f1'
  const percentage = currentExpenses > 0
    ? ((highestCategory.amount / currentExpenses) * 100).toFixed(1)
    : 0

  return (
    <InsightCard title="Highest Spending Category">
      <div className="flex items-center gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: color + '20' }}
        >
          {getCategoryEmoji(highestCategory.name)}
        </div>
        <div>
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            {highestCategory.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            {formatCurrency(highestCategory.amount)} this month
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {spendingByCategory.slice(0, 4).map((item) => {
          const itemColor = categoryColors[item.category] || '#6366f1'
          const pct = currentExpenses > 0
            ? ((item.amount / currentExpenses) * 100).toFixed(1)
            : 0
          return (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-slate-300">
                  {item.category}
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {pct}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: itemColor }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </InsightCard>
  )
}

function getCategoryEmoji(category) {
  const map = {
    Food: '🍔', Rent: '🏠', Transport: '🚗',
    Subscriptions: '📱', Health: '💊', Shopping: '🛍️',
    Travel: '✈️', Salary: '💰', Freelance: '💻'
  }
  return map[category] || '💸'
}