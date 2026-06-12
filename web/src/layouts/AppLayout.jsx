import { useCallback, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useThemeMode } from '../hooks/useThemeMode.js';
import { cx } from '../utils/uiClasses.js';

const navigationItems = [
  { label: 'Dashboard', to: '/', marker: 'D' },
  { label: 'Expenses', to: '/expenses', marker: 'E' },
];

const sidebarWidthKey = 'expense-tracker-sidebar-width';
const minSidebarWidth = 248;
const maxSidebarWidth = 384;

const getInitialSidebarWidth = () => {
  const storedWidth = Number(window.localStorage.getItem(sidebarWidthKey));

  if (Number.isFinite(storedWidth)) {
    return Math.min(Math.max(storedWidth, minSidebarWidth), maxSidebarWidth);
  }

  return 304;
};

const AppLayout = () => {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const [sidebarWidth, setSidebarWidth] = useState(getInitialSidebarWidth);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(sidebarWidthKey, String(sidebarWidth));
  }, [sidebarWidth]);

  const handleResizeStart = useCallback((event) => {
    event.preventDefault();
    setIsResizing(true);

    const handlePointerMove = (moveEvent) => {
      const nextWidth = Math.min(Math.max(moveEvent.clientX, minSidebarWidth), maxSidebarWidth);
      setSidebarWidth(nextWidth);
    };

    const handlePointerUp = () => {
      setIsResizing(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  }, []);

  return (
    <div
      className={cx(
        'grid min-h-screen grid-cols-1 bg-gradient-to-b from-slate-100 to-slate-50 text-slate-950 lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] dark:bg-[#050505] dark:from-[#050505] dark:to-[#0a0a0a] dark:text-zinc-100',
        isResizing && 'cursor-col-resize select-none',
      )}
      style={{ '--sidebar-width': `${sidebarWidth}px` }}
    >
      <aside
        className="relative flex flex-col gap-4 border-b border-slate-200 bg-white/95 p-4 shadow-sm lg:sticky lg:top-0 lg:h-screen lg:gap-7 lg:border-b-0 lg:border-r lg:p-5 dark:border-zinc-800 dark:bg-[#0b0b0b] dark:shadow-none"
        aria-label="Primary navigation"
      >
        <div className="grid grid-cols-[48px_minmax(0,1fr)] items-center gap-3 border-slate-200 pb-0 lg:grid-cols-[54px_minmax(0,1fr)] lg:border-b lg:pb-5 dark:border-zinc-800">
          <div
            className="grid size-12 place-items-center rounded-lg bg-emerald-800 font-display text-base font-extrabold text-white shadow-sm lg:size-[54px] dark:border dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950"
            aria-hidden="true"
          >
            ET
          </div>
          <div>
            <p className="m-0 text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:text-zinc-500">
              Personal Finance
            </p>
            <h1 className="mt-1 truncate font-display text-lg font-extrabold text-slate-950 dark:text-zinc-100">
              Expense Tracker
            </h1>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-2.5">
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                cx(
                  'grid min-h-12 grid-cols-[32px_minmax(0,1fr)] items-center gap-2.5 rounded-lg border px-2.5 py-1.5 font-bold text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-emerald-800 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-100',
                  isActive
                    ? 'border-slate-200 bg-slate-100 text-emerald-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:shadow-none'
                    : 'border-transparent',
                )
              }
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              <span className="grid size-8 place-items-center rounded-lg border border-slate-300 bg-white text-xs dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {item.marker}
              </span>
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          aria-pressed={isDarkMode}
          className="mt-0 flex min-h-11 items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2 font-extrabold text-slate-700 shadow-sm lg:mt-auto dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
          onClick={toggleTheme}
          type="button"
        >
          <span className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-100 p-0.5 dark:bg-zinc-800" aria-hidden="true">
            <span
              className={cx(
                'size-5 rounded-full bg-emerald-700 transition-transform dark:bg-zinc-100',
                isDarkMode ? 'translate-x-5' : 'translate-x-0',
              )}
            />
          </span>
          <span>{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
        </button>

        <button
          aria-label="Resize sidebar"
          className="absolute right-[-5px] top-0 hidden h-full w-2 cursor-col-resize border-0 bg-transparent p-0 outline-none after:absolute after:right-[3px] after:top-1/2 after:h-12 after:w-px after:-translate-y-1/2 after:rounded-full after:bg-transparent hover:after:bg-slate-400 focus-visible:after:bg-slate-500 lg:block dark:hover:after:bg-zinc-500 dark:focus-visible:after:bg-zinc-400"
          onPointerDown={handleResizeStart}
          type="button"
        />
      </aside>

      <main className="min-w-0 p-4 sm:p-5 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
