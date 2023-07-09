import React from 'react'

const FormRow = ({name, type, labelText, defaultValue}) => {
  return (
    <div className='form-row'>
    <label htmlFor={name} className='form-label'>
      {labelText || name}
    </label>
    <input
      type={type}
      className='form-input'
      name={name}
      id={name}
      required
      defaultValue={defaultValue || null}
    />
  </div>
  )
}

export default FormRow