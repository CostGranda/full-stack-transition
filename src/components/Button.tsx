import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={isPrimary ? 'px-4 py-2 rounded font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400' : 'px-4 py-2 rounded font-medium transition-colors bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-300'}
    >
      {children}
    </button>
  );
}
