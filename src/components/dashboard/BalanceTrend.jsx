import {
  ResponsiveContainer, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import useStore from '../../store/useStore'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
      <p className="font-semibold text-gray-700 mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name}: ₹{entry.value.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  )
}

export default function BalanceTrend() {
  const getBalanceTrend = useStore((s) => s.getBalanceTrend)
  const data = getBalanceTrend()

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800">Balance Trend</h3>
        <p className="text-xs text-gray-400 mt-0.5">Income vs Expenses — last 6 months</p>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          />
          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#6366f1' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            name="Expenses"
            stroke="#f43f5e"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#f43f5e' }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            name="Balance"
            stroke="#10b981"
            strokeWidth={2.5}
            strokeDasharray="5 5"
            dot={{ r: 4, fill: '#10b981' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}