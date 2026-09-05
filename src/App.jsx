import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RoleLayout from './layouts/RoleLayout'
import RolePage from './pages/RolePage'
import './styles/Dashboard.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trainee" element={<RoleLayout role="trainee" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<RolePage role="trainee" page="dashboard" />} />
          <Route path="training" element={<RolePage role="trainee" page="training" />} />
          <Route path="jobs" element={<RolePage role="trainee" page="jobs" />} />
          <Route path="applications" element={<RolePage role="trainee" page="applications" />} />
          <Route path="employment" element={<RolePage role="trainee" page="employment" />} />
          <Route path="profile" element={<RolePage role="trainee" page="profile" />} />
          <Route path="history" element={<RolePage role="trainee" page="history" />} />
        </Route>
        <Route path="/gov-officer" element={<RoleLayout role="officer" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<RolePage role="officer" page="dashboard" />} />
          <Route path="trainees" element={<RolePage role="officer" page="trainees" />} />
          <Route path="centers" element={<RolePage role="officer" page="centers" />} />
          <Route path="employers" element={<RolePage role="officer" page="employers" />} />
          <Route path="placements" element={<RolePage role="officer" page="placements" />} />
          <Route path="reports-insights" element={<RolePage role="officer" page="reports-insights" />} />
          <Route path="trainees/:traineeId" element={<RolePage role="officer" page="trainee-detail" />} />
          <Route path="employers/:employerId" element={<RolePage role="officer" page="employer-detail" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
