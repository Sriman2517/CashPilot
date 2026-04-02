import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, X } from 'lucide-react'

const navItems = [
  { to: '/',             icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/transactions', icon: ArrowLeftRight,  label: 'Transactions' },
  { to: '/insights',     icon: Lightbulb,       label: 'Insights'     },
  { to: '/settings',     icon: Settings,        label: 'Settings'     },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900 z-30
        flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>

        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              CashPilot
            </span>
          </div>

          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl
                text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom user tag */}
        <div className="px-6 py-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">BS</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Sriman Reddy Bommireddy</p>
              <p className="text-slate-400 text-xs">bsriman3885@gmail.com</p>
            </div>
          </div>
        </div>

      </aside>
    </>
  )
}