import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'
import '../styles/LoginPage.css'

const demoCredentials = {
  officer: { email: 'officer@eots.gov', password: 'Officer@123' },
  trainee: { email: 'trainee@example.com', password: 'Trainee@123' },
}

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [role, setRole] = useState('officer')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setLoginError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const credentials = demoCredentials[role]

    if (formData.email.trim().toLowerCase() !== credentials.email || formData.password !== credentials.password) {
      setLoginError('The email/User ID, password, and selected role do not match. Please check your details and try again.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('eots-session', JSON.stringify({ role, user: formData.email || 'demo.user' }))
      navigate(role === 'trainee' ? '/trainee/dashboard' : '/gov-officer/dashboard')
    }, 1500)
  }

  return (
    <div className="login-container">
      <div className="login-shell">
        <aside className="login-intro">
          <div className="brand-lockup">
            <div className="logo-icon" aria-hidden="true">
              <span className="logo-bar logo-bar-one"></span>
              <span className="logo-bar logo-bar-two"></span>
              <span className="logo-bar logo-bar-three"></span>
            </div>
            <span className="brand-name">EOTS</span>
          </div>
          <div className="intro-copy">
            <p className="intro-kicker">National employment intelligence</p>
            <h1>Turning outcomes into opportunity.</h1>
            <p className="intro-description">
              A trusted workspace for government officers to understand, measure and improve employment outcomes.
            </p>
          </div>
          <div className="intro-status"><span></span> Secure government workspace</div>
        </aside>

        <main className="login-card">
          <div className="login-header">
            <p className="portal-label">Secure access</p>
            <h2 className="login-title">Welcome back</h2>
            <p className="login-tagline">Sign in to the Employment Outcome Tracking System</p>
          </div>

          <label className="role-select-wrap" htmlFor="login-role">
            <span className="role-select-label">Sign in as</span>
            <select
              id="login-role"
              name="role"
              className="role-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onFocus={() => setLoginError('')}
              aria-label="Select login role"
              autoComplete="off"
            >
              <option value="officer">Gov Officer</option>
              <option value="trainee">Trainee</option>
            </select>
            <span className="role-chevron" aria-hidden="true">&#9662;</span>
          </label>

          <form onSubmit={handleSubmit} className="login-form">
            <TextInput
              label="Email / User ID"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email or user ID"
              icon="@"
              required
            />

            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="forgot-password">Forgot Password?</a>
            </div>

            {loginError && <p className="login-error" role="alert">{loginError}</p>}

            <Button type="submit" variant="primary" fullWidth loading={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
              {!loading && <span className="button-arrow" aria-hidden="true">&#8594;</span>}
            </Button>
          </form>

          <div className="login-footer">
            <p className="footer-text"><span className="lock-mark" aria-hidden="true">&#9679;</span> Secure Government Portal</p>
            <p className="footer-note">For technical support, contact your administrator</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default LoginPage
