import React from 'react'
import styles from './Button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return <button className={styles.button} {...props}>{label}</button>
}
