import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50';

        const variants = {
            primary: 'bg-neutral-900 text-neutral-50 shadow-sm hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200',
            secondary: 'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700',
            outline: 'border border-neutral-200 bg-transparent shadow-sm hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800',
            ghost: 'hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
            danger: 'bg-red-500 text-white shadow-sm hover:bg-red-600 dark:bg-red-900 dark:hover:bg-red-800',
        };

        const sizes = {
            sm: 'h-8 px-3 text-xs',
            md: 'h-9 px-4 py-2 text-sm',
            lg: 'h-10 px-8 text-base',
            icon: 'h-9 w-9',
        };

        const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

        return (
            <button
                ref={ref}
                className={combinedClassName}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
