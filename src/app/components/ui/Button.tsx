import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-black text-white hover:bg-neutral-800 border border-transparent dark:bg-white dark:text-black dark:hover:bg-neutral-200',
    secondary: 'bg-neutral-100 text-black hover:bg-neutral-200 border border-transparent dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700',
    ghost: 'bg-transparent text-neutral-600 hover:text-black hover:bg-neutral-50 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800',
    outline: 'bg-transparent text-black border border-black hover:bg-black hover:text-white dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black',
  };

  const sizes = {
    sm: 'px-3.5 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        'font-medium transition-[transform,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] flex items-center justify-center gap-2 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
