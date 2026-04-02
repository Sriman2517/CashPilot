import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set) => ({
      isDark: false,
      toggleDark: () => set((state) => {
        const next = !state.isDark
        if (next) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        return { isDark: next }
      }),
      initTheme: (isDark) => {
        if (isDark) document.documentElement.classList.add('dark')
      }
    }),
    { name: 'cashpilot-theme' }
  )
)

export default useThemeStore