import InsightCard from './InsightCard'
import { formatCurrency } from '../../utils/calculations'
import { TrendingUp, TrendingDown, Calendar, Zap } from 'lucide-react'

export default function QuickStats({ insights }) {
  const {
    biggestTransaction,
    expenseChange,
    dailyAverage,
  } = insights

  const stats = [
    {
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      label: 'vs Last Month',
      value: `${expenseChange > 0 ? '+' : ''}${expenseChange}%`,
      sub: 'in expenses',
      color: expenseChange > 0
        ? 'bg-rose-50 text-rose-600'
        : 'bg-emerald-50 text-emerald-600',
      iconColor: expenseChange > 0 ? 'text-rose-500' : 'text-emerald-500'
    },
    {
      icon: Calendar,
      label: 'Daily Average',
      value: formatCurrency(dailyAverage),
      sub: 'per day this month',
      color: 'bg-indigo-50 text-indigo-600',
      iconColor: 'text-indigo-500'
    },
    {
      icon: Zap,
      label: 'Biggest Expense',
      value: biggestTransaction
        ? formatCurrency(biggestTransaction.amount)
        : '—',
      sub: biggestTransaction?.merchant || 'No expenses',
      color: 'bg-amber-50 text-amber-600',
      iconColor: 'text-amber-500'
    }
  ]

  return (
    <InsightCard title="Quick Stats — March 2026">
      <div className="space-y-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`flex items-center gap-4 p-3 rounded-xl ${stat.color}`}
            >
              <div className={`${stat.iconColor}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium opacity-70">{stat.label}</p>
                <p className="text-base font-bold">{stat.value}</p>
                <p className="text-xs opacity-60">{stat.sub}</p>
              </div>
            </div>
          )
        })}
      </div>
    </InsightCard>
  )
}