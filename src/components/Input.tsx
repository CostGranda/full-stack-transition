'use client';

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
}

export function Input({
  placeholder,
  value,
  onChange,
  onKeyDown,
  type = 'text'
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
    />
  );
}
