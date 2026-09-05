import React from 'react'
import '../styles/TextInput.css'

const TextInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  icon,
  error,
  ...props 
}) => {
  return (
    <div className="text-input-group">
      {label && <label className="text-input-label">{label}</label>}
      <div className="text-input-wrapper">
        {icon && <span className="text-input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`text-input ${error ? 'error' : ''} ${icon ? 'with-icon' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="text-input-error">{error}</span>}
    </div>
  )
}

export default TextInput
