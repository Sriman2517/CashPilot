export const formatCurrency = (amount) =>
  `₹${amount.toLocaleString('en-IN')}`

export const formatPercent = (value) =>
  `${value > 0 ? '+' : ''}${value}%`

export const getMonthName = (monthIndex) => {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]
  return months[monthIndex]
}

export const getChangeColor = (value) => {
  if (value > 0) return 'text-rose-500'
  if (value < 0) return 'text-emerald-500'
  return 'text-gray-500'
}

export const getChangeBg = (value) => {
  if (value > 0) return 'bg-rose-50 text-rose-600'
  if (value < 0) return 'bg-emerald-50 text-emerald-600'
  return 'bg-gray-50 text-gray-600'
}