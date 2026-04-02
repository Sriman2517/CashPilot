import InsightCard from './InsightCard'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import useStore from '../../store/useStore'

export default function MonthComparison() {
  const { getMonthlySummary } = useStore()

  const months = [
    { label: 'January',  month: 0, year: 2026 },
    { label: 'February', month: 1, year: 2026 },
    { label: 'March',    month: 2, year: 2026 },
  ]

  const data = months.map(({ label, month, year }) => {
    const summary = getMonthlySummary(month, year)
    return {
      month: label.slice(0, 3),
      Income: summary.income,
      Expenses: summary.expenses,
      Savings: summary.balance
    }
  })

  const formatYAxis = (value) =>
    value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null
    return (
      <div className="bg-white dark:bg-slate-700 border border-gray-100
                      dark:border-slate-600 rounded-xl shadow-lg p-3">
        <p className="text-sm font-semibold text-gray-700 dark:text-white mb-2">
          {label}
        </p>
        {payload.map((entry) => (
          <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    )
  }

  return (
    <InsightCard title="Month vs Month Comparison">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barCategoryGap="30%">
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
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          <Bar dataKey="Income"   fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Savings"  fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </InsightCard>
  )
}