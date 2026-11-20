import React, { useState } from 'react';
import { ArrowLeft, Lock, User, Eye, EyeOff, AlertCircle, ShieldCheck, GraduationCap } from 'lucide-react';
import { AuthSession, UserRole } from '../types';

interface LoginPageProps {
  initialRole?: UserRole;
  onLoginSuccess: (session: AuthSession) => void;
  onBackHome: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialRole = 'student',
  onLoginSuccess,
  onBackHome,
}) => {
  const [roleTab, setRoleTab] = useState<UserRole>(initialRole);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTabSwitch = (nextRole: UserRole) => {
    setRoleTab(nextRole);
    setErrorMessage(null);
    setUsername('');
    setPassword('');
  };

  const handleFillDemo = () => {
    setErrorMessage(null);
    if (roleTab === 'student') {
      setUsername('student');
      setPassword('1234');
    } else {
      setUsername('admin');
      setPassword('admin123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUser = username.trim().toLowerCase();

    if (roleTab === 'student') {
      if (trimmedUser === 'student' && password === '1234') {
        setErrorMessage(null);
        onLoginSuccess({
          role: 'student',
          username: 'student',
          displayName: 'Adnan',
          loggedInAt: new Date().toISOString(),
        });
        return;
      }
      setErrorMessage('Wrong password');
      return;
    }

    if (roleTab === 'admin') {
      if (trimmedUser === 'admin' && password === 'admin123') {
        setErrorMessage(null);
        onLoginSuccess({
          role: 'admin',
          username: 'admin',
          displayName: 'Sir',
          loggedInAt: new Date().toISOString(),
        });
        return;
      }
      setErrorMessage('Wrong password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060919] via-[#0F1638] to-[#1D1242] flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md px-1 py-1"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <div className="rounded-2xl border border-indigo-500/30 bg-[#0B1028]/95 p-6 sm:p-8 shadow-2xl">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight text-white">
              ICT From ABC Portal
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Sign in to access lessons, past papers, or administration tools.
            </p>
          </div>

          {/* 2 Role Tabs: Student Login / Admin Login */}
          <div
            role="tablist"
            aria-label="Login role selection"
            className="mt-6 grid grid-cols-2 gap-1 rounded-lg border border-indigo-500/25 bg-[#060919] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={roleTab === 'student'}
              onClick={() => handleTabSwitch('student')}
              className={`flex min-h-[42px] items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                roleTab === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="h-4 w-4 shrink-0" />
              <span>Student Login</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={roleTab === 'admin'}
              onClick={() => handleTabSwitch('admin')}
              className={`flex min-h-[42px] items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                roleTab === 'admin'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Admin Login</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="login-username" className="block text-xs font-medium text-slate-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder={roleTab === 'student' ? 'student' : 'admin'}
                  className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Enter password"
                  className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] py-2.5 pl-10 pr-11 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="flex items-center gap-2.5 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3.5 py-2.5 text-sm font-medium text-rose-300"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full min-h-[44px] items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-blue-500 hover:to-purple-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              {roleTab === 'student' ? 'Sign In as Student' : 'Sign In as Admin'}
            </button>
          </form>

          {/* Demo credentials guide */}
          <div className="mt-6 rounded-lg border border-indigo-500/20 bg-[#070B1E] p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-indigo-300">Demo Credentials</p>
                <p className="mt-1 font-mono text-xs text-slate-300">
                  {roleTab === 'student'
                    ? 'Username: student  ·  Pass: 1234'
                    : 'Username: admin  ·  Pass: admin123'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="rounded-md border border-indigo-400/35 bg-indigo-500/15 px-3 py-1.5 text-xs font-semibold text-indigo-100 hover:bg-indigo-500/30 transition-colors whitespace-nowrap shrink-0"
              >
                Auto-fill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
