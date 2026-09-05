import React, { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

const roleConfig = {
  trainee: {
    name: 'Trainee workspace',
    shortName: 'Trainee',
    initials: 'AM',
    person: 'Aarav Mehta',
    subtitle: 'Digital Marketing · Cohort 2025',
    nav: [
      ['Dashboard', '/trainee/dashboard', '⌂'],
      ['My Training', '/trainee/training', '▣'],
      ['Job Opportunities', '/trainee/jobs', '⌕'],
      ['Applications', '/trainee/applications', '✓'],
      ['Employment Status', '/trainee/employment', '↗'],
      ['Employment History', '/trainee/history', '◷'],
      ['My Profile', '/trainee/profile', '○'],
    ],
  },
  officer: {
    name: 'Programme intelligence',
    shortName: 'Gov Officer',
    initials: 'RK',
    person: 'Riya Kapoor',
    subtitle: 'District Programme Officer',
    nav: [
      ['Dashboard', '/gov-officer/dashboard', '⌂'],
      ['Trainees', '/gov-officer/trainees', '◎'],
      ['Training Centers', '/gov-officer/centers', '▤'],
      ['Employers', '/gov-officer/employers', '▥'],
      ['Placements', '/gov-officer/placements', '↗'],
      ['Reports & Insights', '/gov-officer/reports-insights', '▦'],
    ],
  },
}

function Brand() {
  return <div className="app-brand"><span className="app-mark"><i></i><i></i><i></i></span><span><strong>EOTS</strong><small>Employment outcomes</small></span></div>
}

function RoleLayout({ role }) {
  const config = roleConfig[role]
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const current = config.nav.find((item) => item[1] === location.pathname || location.pathname.startsWith(`${item[1]}/`))?.[0] || 'Dashboard'

  const signOut = () => {
    localStorage.removeItem('eots-session')
    navigate('/login')
  }

  return (
    <div className="app-frame">
      <div className={`mobile-overlay ${open ? 'visible' : ''}`} onClick={() => setOpen(false)}></div>
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <Brand />
        <div className="workspace-switcher"><span className="workspace-dot"></span><span>{config.name}</span><span className="workspace-arrow">⌄</span></div>
        <nav className="side-nav">
          <p className="nav-heading">Workspace</p>
          {config.nav.map(([label, path, icon]) => <NavLink end replace key={path} to={path} onClick={() => setOpen(false)} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}><span className="side-icon">{icon}</span>{label}</NavLink>)}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card"><span className="help-icon">?</span><div><strong>Need help?</strong><small>Visit the support centre</small></div><span>↗</span></div>
          <button className="side-logout" onClick={signOut}><span>⇥</span> Sign out</button>
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Open navigation">☰</button>
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{current}</strong></div>
          <div className="top-actions"><button className="icon-button" aria-label="Notifications">♧<span className="notification-dot"></span></button><div className="profile-menu"><span className="avatar">{config.initials}</span><span className="profile-copy"><strong>{config.person}</strong><small>{config.shortName}</small></span><span className="profile-caret">⌄</span></div></div>
        </header>
        <div className="page-content"><Outlet /></div>
      </main>
    </div>
  )
}

export default RoleLayout
