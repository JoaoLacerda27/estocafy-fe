import React, { useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './BaseInput.module.css';

interface BaseInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  label?: string;
  icon?: ReactNode;
  error?: string | FieldError;
  register?: UseFormRegisterReturn;
  name?: string;
}

export const BaseInput = React.forwardRef<HTMLInputElement, BaseInputProps>(
  (
    { label, icon, error, disabled, register, name, type, ...props },
    ref
  ) => {
    const errorMessage = typeof error === 'string' ? error : error?.message;
    const registerRest = register ? Object.fromEntries(Object.entries(register).filter(([k]) => k !== 'ref')) : {};
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label} htmlFor={name}>{label}</label>}
        <div
          className={[
            styles.inputWrapper,
            errorMessage ? styles.error : '',
            disabled ? styles.disabled : '',
            icon ? styles.withIcon : '',
          ].join(' ')}
        >
          {icon && <span className={styles.icon}>{icon}</span>}
          <input
            id={name}
            ref={ref}
            className={styles.input}
            disabled={disabled}
            type={isPassword ? (showPassword ? 'text' : 'password') : type}
            {...registerRest}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              className={styles.eyeButton}
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
            >
              {showPassword ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.13 0 2.21.195 3.225.555M19.07 19.07A9.953 9.953 0 0021 12c0-1.657-.672-3.157-1.77-4.29M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" /></svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          )}
          {errorMessage && <span className={styles.errorIcon}>!</span>}
        </div>
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput'; 