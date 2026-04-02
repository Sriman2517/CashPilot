import {
  ResponsiveContainer, PieChart, Pie,
  Cell, Tooltip, Legend
} from 'recharts'
import useStore from '../../store/useStore'
import { categoryColors } from '../../data/mockData'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700">{name}</p>
      <p className="text-gray-500">₹{value.toLocaleString('en-IN')}</p>
    </div>
  )
}

export default function SpendingBreakdown() {
  const getSpendingByCategory = useStore((s) => s.getSpendingByCategory)
  const data = getSpendingByCategory(2, 2026) // March 2026

  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100
                      flex items-center justify-center h-64 text-gray-400 text-sm">
        No spending data for this month
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800">Spending Breakdown</h3>
        <p className="text-xs text-gray-400 mt-0.5">By category — March 2026</p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                key={entry.category}
                fill={categoryColors[entry.category] || '#6366f1'}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ fontSize: '12px', color: '#6b7280' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}