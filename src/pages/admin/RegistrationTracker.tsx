import { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  CreditCard, 
  Mail, 
  Phone, 
  MoreVertical,
  Loader2,
  Calendar
} from 'lucide-react';

interface Registration {
  id: number;
  student_name: string;
  email: string;
  phone: string;
  course_name: string;
  batch_name: string;
  status: string;
  payment_status: string;
  created_at: string;
}

export default function RegistrationTracker() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/academy/registrations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setRegistrations(data.data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleUpdateStatus = async (id: number, status: string, paymentStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/academy/registrations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ status, payment_status: paymentStatus })
      });
      const data = await res.json();
      if (data.success) {
        fetchRegistrations();
      }
    } catch (error) {
      console.error('Error updating registration:', error);
    }
  };

  const filteredRegistrations = registrations.filter(r => 
    r.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.course_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-['Baloo_2'] font-bold text-amber-950 mb-1">Registration Tracker</h2>
          <p className="text-sm text-slate-500 font-medium">Monitor student applications, intake placements, and payment verification.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-emerald-100">
             <CheckCircle2 size={18} />
             {registrations.filter(r => r.payment_status === 'Paid').length} Paid
           </div>
           <div className="px-5 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-amber-100">
             <Clock size={18} />
             {registrations.filter(r => r.payment_status === 'Unpaid').length} Pending
           </div>
        </div>
      </div>

      {/* Global Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search registrations by name, email, or course..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-500 transition-all font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center text-slate-400">
            <Loader2 size={40} className="animate-spin mb-4 text-amber-500" />
            <p className="font-bold tracking-tight">Accessing student database...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-5">Student Information</th>
                  <th className="px-8 py-5">Course / Batch</th>
                  <th className="px-8 py-5">Date Applied</th>
                  <th className="px-8 py-5">Payment Status</th>
                  <th className="px-8 py-5">Adm. Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredRegistrations.map(reg => (
                  <tr key={reg.id} className="group hover:bg-slate-50/80 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-amber-950">{reg.student_name}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold"><Mail size={10} /> {reg.email}</span>
                          <span className="flex items-center gap-1 text-[10px] text-slate-400 font-bold"><Phone size={10} /> {reg.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div>
                        <p className="text-xs font-bold text-slate-600">{reg.course_name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Batch: {reg.batch_name || 'Generic'}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                          <Calendar size={14} />
                          {new Date(reg.created_at).toLocaleDateString('en-KE')}
                       </div>
                    </td>
                    <td className="px-8 py-5">
                       <button 
                        onClick={() => handleUpdateStatus(reg.id, reg.status, reg.payment_status === 'Paid' ? 'Unpaid' : 'Paid')}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                         reg.payment_status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                       }`}>
                         {reg.payment_status === 'Paid' ? <CheckCircle2 size={10} /> : <CreditCard size={10} />}
                         {reg.payment_status}
                       </button>
                    </td>
                    <td className="px-8 py-5">
                       <select 
                        value={reg.status}
                        onChange={(e) => handleUpdateStatus(reg.id, e.target.value, reg.payment_status)}
                        className={`bg-transparent text-[10px] font-black uppercase tracking-widest border-none focus:ring-0 cursor-pointer ${
                          reg.status === 'Enrolled' ? 'text-blue-600' : 
                          reg.status === 'Pending' ? 'text-amber-600' : 
                          'text-slate-400'
                        }`}
                       >
                         <option value="Pending">Pending</option>
                         <option value="Enrolled">Enrolled</option>
                         <option value="Rejected">Rejected</option>
                         <option value="Completed">Completed</option>
                       </select>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <button className="p-2 text-slate-300 hover:text-amber-600 transition-all opacity-0 group-hover:opacity-100">
                         <MoreVertical size={18} />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
