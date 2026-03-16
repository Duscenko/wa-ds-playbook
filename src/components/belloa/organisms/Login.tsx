import { useState } from 'react';
import '../../../styles/belloa.css';
import Button from '../atoms/Button';
import TextField from '../atoms/TextField';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LoginProps {
  /** Callback when login form is submitted */
  onSubmit?: (email: string, password: string) => void;
  /** Callback when "Forgot password" is clicked */
  onForgotPassword?: () => void;
  /** Callback when "Register" is clicked */
  onRegister?: () => void;
  /** Show loading state */
  isLoading?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Customize the title */
  title?: string;
  /** Customize the submit button text */
  submitButtonText?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const Login: React.FC<LoginProps> = ({
  onSubmit,
  onForgotPassword,
  onRegister,
  isLoading = false,
  errorMessage,
  title = 'Log In',
  submitButtonText = 'Log In',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    let hasError = false;
    
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      hasError = true;
    } else {
      setEmailError('');
    }
    
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
