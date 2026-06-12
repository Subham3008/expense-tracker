import { NavLink, Outlet } from 'react-router-dom';
import { useThemeMode } from '../hooks/useThemeMode.js';
import { cx } from '../utils/uiClasses.js';

const navigationItems = [
  { label: 'Dashboard', to: '/', marker: 'D' },
  { label: 'Expenses', to: '/expenses', marker: 'E' },
];

const AppLayout = () => {
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <div className="grid min-h-screen grid-cols-1 bg-gradient-to-b from-slate-100 to-slate-50 text-slate-950 lg:grid-cols-[304px_minmax(0,1fr)] dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-50">
      <aside
        className="flex flex-col gap-4 border-b border-slate-200 bg-white/95 p-4 shadow-sm lg:sticky lg:top-0 lg:h-screen lg:gap-7 lg:border-b-0 lg:border-r lg:p-6 dark:border-slate-500/20 dark:bg-slate-900/95 dark:shadow-none"
        aria-label="Primary navigation"
      >
        <div className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 border-slate-200 pb-0 lg:grid-cols-[54px_minmax(0,1fr)] lg:border-b lg:pb-5 dark:border-slate-500/20">
          <div
            className="grid size-12 place-items-center rounded-lg bg-emerald-800 font-display text-base font-extrabold text-white shadow-sm lg:size-[54px] dark:bg-gradient-to-br dark:from-emerald-400 dark:to-blue-400 dark:text-slate-950"
            aria-hidden="true"
          >
            ET
          </div>
          <div>
            <p className="m-0 text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:text-slate-400">
              Personal Finance
            </p>
            <h1 className="mt-1 font-display text-lg font-extrabold text-slate-950 dark:text-slate-50">
              Expense Tracker
            </h1>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-2.5">
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                cx(
                  'grid min-h-12 grid-cols-[32px_minmax(0,1fr)] items-center gap-2.5 rounded-lg border px-2.5 py-1.5 font-bold text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-emerald-800 dark:text-slate-300 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-200',
                  isActive
                    ? 'border-slate-200 bg-slate-100 text-emerald-800 shadow-sm dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-200 dark:shadow-none'
                    : 'border-transparent',
                )
              }
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              <span className="grid size-8 place-items-center rounded-lg border border-slate-300 bg-white text-xs dark:border-slate-500/20 dark:bg-white/5">
                {item.marker}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          aria-pressed={isDarkMode}
          className="mt-0 flex min-h-11 items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2 font-extrabold text-slate-700 shadow-sm lg:mt-auto dark:border-slate-500/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-emerald-400/40 dark:hover:bg-emerald-400/10"
          onClick={toggleTheme}
          type="button"
        >
          <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-100 p-0.5 dark:bg-emerald-400/15" aria-hidden="true">
            <span
              className={cx(
                'size-5 rounded-full bg-emerald-700 transition-transform dark:bg-emerald-300',
                isDarkMode ? 'translate-x-5' : 'translate-x-0',
              )}
            />
          </span>
          <span>{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
        </button>
      </aside>

      <main className="min-w-0 p-4 sm:p-5 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
