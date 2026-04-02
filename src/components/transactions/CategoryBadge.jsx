import { categoryColors } from '../../data/mockData'

export default function CategoryBadge({ category }) {
  const color = categoryColors[category] || '#6b7280'

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{
        backgroundColor: color + '20',
        color: color
      }}
    >
      {category}
    </span>
  )
}