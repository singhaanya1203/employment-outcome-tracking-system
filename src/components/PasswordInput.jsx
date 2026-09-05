import React, { useState } from 'react'
import '../styles/PasswordInput.css'

const PasswordInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder,
  error,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="password-input-group">
      {label && <label className="password-input-label">{label}</label>}
      <div className="password-input-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`password-input ${error ? 'error' : ''}`}
          {...props}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
      {error && <span className="password-input-error">{error}</span>}
    </div>
  )
}

export default PasswordInput
