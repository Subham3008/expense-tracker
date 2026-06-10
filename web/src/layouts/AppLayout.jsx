import { NavLink, Outlet } from 'react-router-dom';
import { useThemeMode } from '../hooks/useThemeMode.js';

const navigationItems = [
  { label: 'Dashboard', to: '/', marker: 'D' },
  { label: 'Expenses', to: '/expenses', marker: 'E' },
];

const AppLayout = () => {
  const { isDarkMode, toggleTheme } = useThemeMode();

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            Rs
          </div>
          <div>
            <p className="brand-eyebrow">Personal Finance</p>
            <h1>Expense Tracker</h1>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              <span className="nav-marker" aria-hidden="true">
                {item.marker}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          aria-pressed={isDarkMode}
          className="theme-toggle"
          onClick={toggleTheme}
          type="button"
        >
          <span className="theme-toggle-track" aria-hidden="true">
            <span className="theme-toggle-thumb" />
          </span>
          <span>{isDarkMode ? 'Dark mode' : 'Light mode'}</span>
        </button>
      </aside>

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
