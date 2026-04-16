import React, { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Filter,
  MoreVertical,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  LayoutDashboard,
  ChefHat
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import CakesManager from './admin/CakesManager';
import AcademyManager from './admin/AcademyManager';
import RegistrationTracker from './admin/RegistrationTracker';
import InquiryManager from './admin/InquiryManager';
import TestimonialManager from './admin/TestimonialManager';

export default function AdminDashboard() {
  const { goToAdminLogin } = useNavigation();
  const [activeTab, setActiveTab] = useState('Overview');
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('admin_user');
    if (userStr) setAdmin(JSON.parse(userStr));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    goToAdminLogin();
  };

  const stats = [
    { label: 'Total Students', value: '1,284', grow: '+12%', icon: <GraduationCap size={24} />, color: 'bg-amber-500' },
    { label: 'New Registrations', value: '42', grow: '+8%', icon: <Users size={24} />, color: 'bg-emerald-500' },
    { label: 'Active Batches', value: '8', grow: 'Optimal', icon: <Calendar size={24} />, color: 'bg-indigo-500' },
    { label: 'Growth Rating', value: '4.8', grow: '+0.2%', icon: <TrendingUp size={24} />, color: 'bg-rose-500' },
  ];

  const recentStudents = [
    { id: '#STUD-001', name: 'Duran Clayton', course: 'Beginner Baker Pro', status: 'Active', date: '2 min ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Duran' },
    { id: '#STUD-002', name: 'Zoe Kenyan', course: 'Fondant Masterclass', status: 'Pending', date: '15 min ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe' },
    { id: '#STUD-003', name: 'Mark Omondi', course: 'Pastry Arts', status: 'Completed', date: '1 hour ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark' },
    { id: '#STUD-004', name: 'Faith Wambui', course: 'Beginner Baker Pro', status: 'Active', date: '2 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faith' },
  ];

  const navItems = [
    { id: 'Overview', icon: <LayoutDashboard size={18} />, label: 'Overview' },
    { id: 'Registrations', icon: <Users size={18} />, label: 'Registrations' },
    { id: 'Academy', icon: <GraduationCap size={18} />, label: 'Academy Batches' },
    { id: 'Cakes', icon: <ChefHat size={18} />, label: 'Cake Boutique' },
    { id: 'Inquiries', icon: <Bell size={18} />, label: 'Inquiries' },
    { id: 'Testimonials', icon: <TrendingUp size={18} />, label: 'Testimonials' },
    { id: 'Settings', icon: <Settings size={18} />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-amber-950 text-white flex flex-col shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-amber-950 font-black">
              <ChefHat size={24} />
            </div>
            <span className="text-2xl font-['Baloo_2'] font-bold">Admin Hub</span>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === item.id ? 'bg-amber-500 text-amber-950 shadow-lg' : 'text-amber-100/50 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-rose-400 hover:bg-rose-400/10 transition-all"
          >
            <LogOut size={18} />
            Check Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search data, students, or orders..." 
              className="w-full h-11 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-amber-950 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-10 w-[1px] bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-amber-950">{admin?.name || 'Administrator'}</p>
                <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest">{admin?.role || 'System Admin'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${admin?.name || 'Admin'}`} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-10">
          {activeTab === 'Overview' && (
            <>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-3xl font-['Baloo_2'] font-bold text-amber-950 mb-1">Academy Overview</h2>
                  <p className="text-sm text-slate-500 font-medium">Welcome back, {admin?.name || 'Admin'}. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                    <Calendar size={18} />
                    Date Range
                  </button>
                  <button className="px-5 py-2.5 bg-amber-950 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-amber-900 transition-all shadow-xl shadow-amber-950/20">
                    Generate Report
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-lg">
                        {stat.grow}
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl font-['Baloo_2'] font-bold text-amber-950">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Table Section */}
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-xl font-['Baloo_2'] font-bold text-amber-950">Recent Academy Enrolments</h3>
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-400 hover:text-amber-950 transition-all">
                      <Filter size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-amber-950 transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                        <th className="px-8 py-4">Student Info</th>
                        <th className="px-8 py-4">Course</th>
                        <th className="px-8 py-4">Enrolment Date</th>
                        <th className="px-8 py-4">Status</th>
                        <th className="px-8 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {recentStudents.map((student, i) => (
                        <tr key={i} className="group hover:bg-slate-50/80 transition-all">
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200" />
                              <div>
                                <p className="text-sm font-bold text-amber-950">{student.name}</p>
                                <p className="text-[10px] font-black text-slate-400 tracking-tighter">{student.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <ChefHat className="text-amber-500" size={14} />
                              <span className="text-sm font-bold text-slate-600">{student.course}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-slate-500">
                              <Clock size={14} />
                              <span className="text-xs font-semibold">{student.date}</span>
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              student.status === 'Active' ? 'bg-amber-100 text-amber-700' : 
                              student.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {student.status === 'Active' && <Clock size={10} />}
                              {student.status === 'Completed' && <CheckCircle2 size={10} />}
                              {student.status === 'Pending' && <XCircle size={10} />}
                              {student.status}
                            </div>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <button className="p-2 text-slate-300 hover:text-amber-500 transition-colors">
                              <MoreVertical size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-xs text-slate-500 font-bold">Showing 4 of 1,284 students</p>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-amber-950 disabled:opacity-50" disabled>&larr;</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-950 text-white font-bold text-xs ring-4 ring-amber-950/10">1</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-amber-950">2</button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-amber-950">&rarr;</button>
                  </div>
                </div>
              </div>
            </>
          )}
          {activeTab === 'Cakes' && <CakesManager />}
          {activeTab === 'Academy' && <AcademyManager />}
          {activeTab === 'Registrations' && <RegistrationTracker />}
          {activeTab === 'Inquiries' && <InquiryManager />}
          {activeTab === 'Testimonials' && <TestimonialManager />}

          {activeTab !== 'Overview' && activeTab !== 'Cakes' && activeTab !== 'Academy' && activeTab !== 'Registrations' && activeTab !== 'Inquiries' && activeTab !== 'Testimonials' && (
            <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
               <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                  {navItems.find(n => n.id === activeTab)?.icon}
               </div>
               <h3 className="text-2xl font-['Baloo_2'] font-bold text-slate-400 mb-2">
                 {navItems.find(n => n.id === activeTab)?.label} Manager
               </h3>
               <p className="text-slate-400 font-medium">Coming soon in the next implementation phase.</p>
            </div>
          )}
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
