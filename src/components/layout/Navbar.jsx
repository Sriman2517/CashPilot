import { Menu, Bell, Sun, Moon } from 'lucide-react'
import useStore from '../../store/useStore'
import useThemeStore from '../../store/useThemeStore'

export default function Navbar({ onMenuClick }) {
  const { role, setRole } = useStore()
  const { isDark, toggleDark } = useThemeStore()

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b
                       border-gray-200 dark:border-slate-700
                       flex items-center justify-between px-4 lg:px-6
                       sticky top-0 z-10">

      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500
                   dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700"
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block">
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Welcome back,{' '}
          <span className="font-semibold text-gray-800 dark:text-white">
            Sriman
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3 ml-auto">

        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-slate-400 hidden sm:block">
            Role:
          </span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="text-sm border border-gray-200 dark:border-slate-600
                       rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700
                       text-gray-700 dark:text-slate-200 font-medium
                       cursor-pointer focus:outline-none focus:ring-2
                       focus:ring-indigo-500"
          >
            <option value="viewer">👁 Viewer</option>
            <option value="admin">⚙️ Admin</option>
          </select>
        </div>

        {/* Role badge */}
        <span className={`
          hidden sm:inline-flex items-center px-2.5 py-1
          rounded-full text-xs font-semibold
          ${role === 'admin'
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
            : 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300'
          }
        `}>
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </span>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-lg text-gray-500 dark:text-slate-400
                     hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Bell */}
        <button className="relative p-2 rounded-lg text-gray-500
                           dark:text-slate-400 hover:bg-gray-100
                           dark:hover:bg-slate-700">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2
                           bg-rose-500 rounded-full" />
        </button>

      </div>
    </header>
  )
}