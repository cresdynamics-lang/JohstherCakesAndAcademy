import { useState, useEffect } from 'react';
import { 
  MessageSquare, Search, Filter, MoreVertical, Loader2, CheckCircle2, 
  Mail, Phone, Calendar, Clock, XCircle, Trash2, Edit2
} from 'lucide-react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  status: string;
  created_at: string;
}

export default function InquiryManager() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/inquiries', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        fetchInquiries();
      }
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const handleDelete = async (id: number) => {
      if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
      try {
        const res = await fetch(`http://localhost:5000/api/inquiries/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        const data = await res.json();
        if (data.success) {
          fetchInquiries();
        }
      } catch (error) {
          console.error('Error deleting inquiry:', error);
      }
  }

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-['Baloo_2'] font-bold text-amber-950 mb-1">Inquiry Inbox</h2>
          <p className="text-sm text-slate-500 font-medium">Manage customer questions, custom orders, and academy inquiries.</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-5 py-2.5 bg-amber-50 text-amber-700 rounded-xl text-sm font-bold flex items-center gap-2 border border-amber-100">
             <MessageSquare size={18} />
             {inquiries.filter(i => i.status === 'New').length} New Messages
           </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search messages..." 
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
             <p className="font-bold tracking-tight">Loading messages...</p>
           </div>
        ) : (
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead>
                   <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/50">
                      <th className="px-8 py-5">Sender</th>
                      <th className="px-8 py-5">Topic</th>
                      <th className="px-8 py-5">Message Prep</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {filteredInquiries.map(inq => (
                      <tr key={inq.id} className={`group hover:bg-slate-50/80 transition-all ${inq.status === 'New' ? 'bg-amber-50/30' : ''}`}>
                         <td className="px-8 py-5">
                            <div className="flex flex-col">
                               <p className="text-sm font-bold text-amber-950">{inq.name}</p>
                               <div className="flex flex-col gap-1 mt-1">
                                  <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium"><Mail size={10} /> {inq.email}</span>
                                  {inq.phone && <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium"><Phone size={10} /> {inq.phone}</span>}
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-5">
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">{inq.type}</span>
                         </td>
                         <td className="px-8 py-5 max-w-[300px]">
                            <p className="text-sm text-slate-600 line-clamp-2">{inq.message}</p>
                            <span className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                               <Clock size={10} /> {new Date(inq.created_at).toLocaleString()}
                            </span>
                         </td>
                         <td className="px-8 py-5">
                            <select 
                               value={inq.status}
                               onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                               className={`bg-transparent text-[10px] font-black uppercase tracking-widest border-none focus:ring-0 cursor-pointer ${
                                 inq.status === 'New' ? 'text-rose-600' : 
                                 inq.status === 'Replied' ? 'text-emerald-600' : 
                                 'text-slate-400'
                               }`}
                            >
                               <option value="New">New</option>
                               <option value="Read">Read</option>
                               <option value="Replied">Replied</option>
                               <option value="Archived">Archived</option>
                            </select>
                         </td>
                         <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button 
                                onClick={() => handleDelete(inq.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                  <Trash2 size={16} />
                               </button>
                               <button className="p-2 text-slate-400 hover:text-amber-600 transition-all">
                                  <MoreVertical size={18} />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}
      </div>
    </div>
  )
}
