'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      {...props}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        `${
          isPrimary
            ? 'px-4 py-2 rounded font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400'
            : 'px-4 py-2 rounded font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-300'
        } ${className}`.trim()
      }
    >
      {children}
    </button>
  );
}
