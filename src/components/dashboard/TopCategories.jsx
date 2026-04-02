import useStore from '../../store/useStore'
import { categoryColors } from '../../data/mockData'

export default function TopCategories() {
  const getSpendingByCategory = useStore((s) => s.getSpendingByCategory)
  const data = getSpendingByCategory(2, 2026).slice(0, 5)

  const total = data.reduce((sum, d) => sum + d.amount, 0)
  const fmt = (n) => `₹${n.toLocaleString('en-IN')}`

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800">Top Categories</h3>
        <p className="text-xs text-gray-400 mt-0.5">Highest spending — March 2026</p>
      </div>

      <div className="space-y-4">
        {data.map((item) => {
          const pct = total > 0 ? ((item.amount / total) * 100).toFixed(1) : 0
          const color = categoryColors[item.category] || '#6366f1'

          return (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{pct}%</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {fmt(item.amount)}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}