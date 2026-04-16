import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Lock, ShieldCheck, ArrowRight, User, Key, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { goToAdminDashboard, goToHome } = useNavigation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.data.user));
        goToAdminDashboard();
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection failed. Is the server running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] flex flex-col justify-center items-center p-6 relative overflow-hidden pt-24">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-950/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-950 text-amber-500 mb-6 shadow-2xl shadow-amber-950/20 transform hover:scale-110 transition-transform duration-500">
            <Lock size={40} />
          </div>
          <h1 className="text-4xl font-['Baloo_2'] font-extrabold text-amber-950 mb-2">Admin Portal</h1>
          <p className="text-amber-900/60 font-['Comic_Neue'] font-bold uppercase tracking-widest text-xs">
            Johsther Cakes & Academy
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-2xl rounded-[40px] border-2 border-amber-100 p-8 md:p-10 shadow-2xl relative">
          <div className="absolute top-0 right-10 -translate-y-1/2">
             <div className="bg-amber-500 text-amber-950 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                <ShieldCheck size={14} />
                SECURE ACCESS
             </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-950 uppercase ml-1 flex items-center gap-2">
                <User size={14} className="text-amber-500" />
                Username
              </label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Manager ID"
                className="w-full h-14 px-6 bg-white border-2 border-amber-100 rounded-2xl outline-none focus:border-amber-500 transition-all font-medium placeholder:text-amber-900/20"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-amber-950 uppercase ml-1 flex items-center gap-2">
                <Key size={14} className="text-amber-500" />
                Access Key
              </label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 px-6 bg-white border-2 border-amber-100 rounded-2xl outline-none focus:border-amber-500 transition-all font-medium placeholder:text-amber-900/20"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-[shake_0.5s_ease-in-out]">
                <AlertCircle size={20} />
                <p className="text-sm font-bold">{error}</p>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-amber-950 text-white rounded-2xl font-['Baloo_2'] font-bold text-lg flex items-center justify-center gap-3 hover:bg-amber-900 transition-all shadow-xl shadow-amber-950/20 active:scale-95 disabled:opacity-50 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Unlock Dashboard
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[10px] text-amber-900/40 font-bold uppercase tracking-widest leading-relaxed px-10">
            Unauthorized access to this portal is strictly prohibited and monitored.
          </p>
        </div>

        <button 
          onClick={goToHome}
          className="mt-8 text-amber-950/60 hover:text-amber-950 font-bold text-sm transition-colors block mx-auto hover:underline"
        >
          &larr; Return to Public Site
        </button>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
