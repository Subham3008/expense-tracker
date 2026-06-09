import { NavLink, Outlet } from 'react-router-dom';

const navigationItems = [
  { label: 'Dashboard', to: '/', marker: 'D' },
  { label: 'Expenses', to: '/expenses', marker: 'E' },
];

const AppLayout = () => {
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
      </aside>

      <main className="content-shell">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
