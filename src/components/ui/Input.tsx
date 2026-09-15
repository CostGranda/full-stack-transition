'use client';

import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

export function Input({
  placeholder,
  value,
  onChange,
  onKeyDown,
  type = 'text',
  name,
  className = '',
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${className}`.trim()}
    />
  );
}
