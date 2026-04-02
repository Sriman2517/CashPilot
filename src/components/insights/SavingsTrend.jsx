import InsightCard from './InsightCard'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import useStore from '../../store/useStore'

export default function SavingsTrend() {
  const { getBalanceTrend } = useStore()
  const data = getBalanceTrend()

  const formatYAxis = (value) =>
    value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-white dark:bg-slate-700 border border-gray-100
                      dark:border-slate-600 rounded-xl shadow-lg p-3">
        <p className="text-sm font-semibold text-gray-700 dark:text-white mb-1">
          {label}
        </p>
        <p className="text-xs text-emerald-600 dark:text-emerald-400">
          Savings: ₹{payload[0]?.value?.toLocaleString('en-IN')}
        </p>
      </div>
    )
  }

  return (
    <InsightCard title="Savings Trend — Last 6 Months">
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatYAxis}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={0} stroke="#f43f5e" strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </InsightCard>
  )
}