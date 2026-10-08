'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const { login, activateAccount, forgotPassword } = useEMS();

  const [mode, setMode] = useState<'login' | 'activate' | 'forgot'>('login');

  // Login form state (Figma Page 2 & Page 12)
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // First Login / Account Activation form state (Figma Page 3)
  const [actEmpId, setActEmpId] = useState('');
  const [actEmail, setActEmail] = useState('');
  const [actUsername, setActUsername] = useState('');
  const [actPassword, setActPassword] = useState('');
  const [actConfirmPassword, setActConfirmPassword] = useState('');
  const [showActPass, setShowActPass] = useState(false);
  const [actError, setActError] = useState('');

  // Forgot password state
  const [forgotId, setForgotId] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [forgotError, setForgotError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginId.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both your ID/Email and password.');
      return;
    }
    const res = login(loginId, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials.');
    }
  };

  const handleActivationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActError('');
    if (!actPassword || actPassword.length < 6) {
      setActError('Password must contain at least 6 characters.');
      return;
    }
    if (actPassword !== actConfirmPassword) {
      setActError('New password and confirm password do not match.');
      return;
    }

    const res = activateAccount(actEmpId, actEmail, actUsername, actPassword);
    if (!res.success) {
      setActError(res.error || 'Account activation failed.');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    if (forgotStep === 1) {
      if (!forgotId.trim()) {
        setForgotError('Please enter your Employee ID or Email.');
        return;
      }
      setForgotStep(2);
    } else {
      if (forgotNewPassword.length < 6) {
        setForgotError('Password must be at least 6 characters.');
        return;
      }
      if (forgotNewPassword !== forgotConfirmPassword) {
        setForgotError('Passwords do not match.');
        return;
      }
      const res = forgotPassword(forgotId, forgotNewPassword);
      if (!res.success) {
        setForgotError(res.error || 'Reset failed.');
      } else {
        setMode('login');
        setLoginId(forgotId);
        setLoginPassword(forgotNewPassword);
        setForgotStep(1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#4A7268] flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      <div className="w-full max-w-4xl">
        {/* Main Figma Card Container (Figma Pages 2 & 3) */}
        <div className="bg-[#3D635B] rounded-[32px] p-5 sm:p-8 shadow-2xl border border-white/15">
          {mode === 'login' ? (
            /* ========================================================================= */
            /* Figma Page 2 & Page 12: Employee & Manager Login Screen                   */
            /* ========================================================================= */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left Column: Login Form Container */}
              <div className="bg-[#2D4E47] p-6 sm:p-8 rounded-[24px] shadow-2xl border border-white/10 text-white space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-wide text-white">Welcome</h1>
                  <p className="text-xs text-white/70 mt-1 font-light">
                    Please enter your details to login
                  </p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">
                      Company Email / Employee ID
                    </label>
                    <input
                      type="text"
                      required
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      placeholder="Enter your ID here..."
                      className="w-full px-4 py-3 bg-[#385B53] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password here..."
                        className="w-full px-4 py-3 pr-10 bg-[#385B53] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div className="p-2.5 bg-rose-900/70 border border-rose-500/40 rounded-xl text-xs text-rose-200">
                      {loginError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#24413B] hover:bg-[#1D3631] text-white font-bold rounded-xl text-xs tracking-wider transition-all shadow-md cursor-pointer border border-white/10 active:scale-[0.99]"
                    >
                      Log in
                    </button>
                  </div>
                </form>

                <div className="pt-2 flex items-center justify-between text-[11px] text-white/60 border-t border-white/10">
                  <button
                    onClick={() => {
                      setMode('activate');
                      setActError('');
                    }}
                    className="hover:text-emerald-300 transition-colors font-medium underline cursor-pointer"
                  >
                    First-login? Activate Account
                  </button>
                  <button
                    onClick={() => {
                      setMode('forgot');
                      setForgotError('');
                    }}
                    className="hover:text-emerald-300 transition-colors font-medium underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Right Column: Skyscraper Architectural Photo */}
              <div className="h-full min-h-[380px] rounded-[24px] overflow-hidden shadow-2xl relative border border-white/10 hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
                  alt="Modern Corporate Skyscraper"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27413B]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Employee Management System
                    </p>
                    <p className="text-sm font-semibold">Figma UI Design • James Maqui Pantas</p>
                  </div>
                </div>
              </div>
            </div>
          ) : mode === 'activate' ? (
            /* ========================================================================= */
            /* Figma Page 3: First Login / Account Activation Screen                     */
            /* ========================================================================= */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left Column: Skyscraper Architectural Photo */}
              <div className="h-full min-h-[380px] rounded-[24px] overflow-hidden shadow-2xl relative border border-white/10 hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
                  alt="Modern Corporate Skyscraper"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#27413B]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Account Activation
                    </p>
                    <p className="text-sm font-semibold">First-time login credential setup</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Activation Form Container */}
              <div className="bg-[#2D4E47] p-6 sm:p-8 rounded-[24px] shadow-2xl border border-white/10 text-white space-y-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-wide text-white">Welcome</h1>
                  <p className="text-xs text-white/70 mt-0.5 font-light">
                    Set your personal username and password
                  </p>
                </div>

                <form onSubmit={handleActivationSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-white/80 mb-1">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        required
                        value={actEmpId}
                        onChange={(e) => setActEmpId(e.target.value)}
                        placeholder="e.g. EMP-2026-005"
                        className="w-full px-3 py-2 bg-[#385B53] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-white/80 mb-1">
                        Company Email
                      </label>
                      <input
                        type="email"
                        required
                        value={actEmail}
                        onChange={(e) => setActEmail(e.target.value)}
                        placeholder="e.g. new.hire@company.com"
                        className="w-full px-3 py-2 bg-[#385B53] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={actUsername}
                      onChange={(e) => setActUsername(e.target.value)}
                      placeholder="Enter your Username here..."
                      className="w-full px-4 py-2.5 bg-[#385B53] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showActPass ? 'text' : 'password'}
                        required
                        value={actPassword}
                        onChange={(e) => setActPassword(e.target.value)}
                        placeholder="Enter your password here..."
                        className="w-full px-4 py-2.5 pr-10 bg-[#385B53] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowActPass(!showActPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showActPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/80 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type={showActPass ? 'text' : 'password'}
                      required
                      value={actConfirmPassword}
                      onChange={(e) => setActConfirmPassword(e.target.value)}
                      placeholder="Enter your password here..."
                      className="w-full px-4 py-2.5 bg-[#385B53] border border-white/10 rounded-xl text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>

                  {actError && (
                    <div className="p-2.5 bg-rose-900/70 border border-rose-500/40 rounded-xl text-xs text-rose-200">
                      {actError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#24413B] hover:bg-[#1D3631] text-white font-bold rounded-xl text-xs tracking-wider transition-all shadow-md cursor-pointer border border-white/10 active:scale-[0.99]"
                    >
                      Save & Continue
                    </button>
                  </div>
                </form>

                <div className="text-center pt-1">
                  <button
                    onClick={() => setMode('login')}
                    className="text-xs text-white/70 hover:text-emerald-300 underline cursor-pointer"
                  >
                    Already activated? Return to Log In
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* Forgot Password Recovery                                                  */
            /* ========================================================================= */
            <div className="max-w-md mx-auto bg-[#2D4E47] p-6 sm:p-8 rounded-[24px] shadow-2xl border border-white/10 text-white space-y-4">
              <h2 className="text-2xl font-bold">Password Recovery</h2>
              <form onSubmit={handleForgotSubmit} className="space-y-4 text-xs">
                {forgotStep === 1 ? (
                  <div>
                    <label className="block text-white/80 font-semibold mb-1">
                      Company Email or Employee ID
                    </label>
                    <input
                      type="text"
                      required
                      value={forgotId}
                      onChange={(e) => setForgotId(e.target.value)}
                      placeholder="e.g. james.pantas@company.com"
                      className="w-full px-4 py-3 bg-[#385B53] border border-white/10 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-white/80 font-semibold mb-1">New Password</label>
                      <input
                        type="password"
                        required
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        placeholder="Enter new password..."
                        className="w-full px-4 py-3 bg-[#385B53] border border-white/10 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-semibold mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        required
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        placeholder="Confirm new password..."
                        className="w-full px-4 py-3 bg-[#385B53] border border-white/10 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {forgotError && (
                  <div className="p-2.5 bg-rose-900/70 border border-rose-500/40 rounded-xl text-xs text-rose-200">
                    {forgotError}
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="py-2.5 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 bg-[#24413B] hover:bg-[#1D3631] rounded-xl text-xs font-bold border border-white/10 cursor-pointer"
                  >
                    {forgotStep === 1 ? 'Next' : 'Reset & Log In'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
