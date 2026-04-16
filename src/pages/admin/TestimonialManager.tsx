import { useState, useEffect } from 'react';
import { 
  MessageCircle, Star, Search, Filter, Plus, Edit2, Trash2, 
  MoreVertical, CheckCircle2, ShieldCheck, Loader2
} from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
}

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/testimonials?active=false', {
        headers: {
           'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleToggleActive = async (id: number, currentData: Testimonial) => {
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ ...currentData, is_active: !currentData.is_active })
      });
      if ((await res.json()).success) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error toggling testimonial:', error);
    }
  };

  const handleToggleFeatured = async (id: number, currentData: Testimonial) => {
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ ...currentData, is_featured: !currentData.is_featured })
      });
      if ((await res.json()).success) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      if ((await res.json()).success) {
        fetchTestimonials();
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const filteredTestimonials = testimonials.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-['Baloo_2'] font-bold text-amber-950 mb-1">Reviews & Testimonials</h2>
          <p className="text-sm text-slate-500 font-medium">Curate the social proof displayed on the public landing page.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-amber-950 text-white rounded-2xl font-bold text-sm hover:bg-amber-900 transition-all shadow-xl shadow-amber-950/20">
          <Plus size={18} />
          Add Review
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search reviews by name or content..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-500 transition-all font-medium"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex-1 md:flex-none">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
             <div className="py-40 flex flex-col items-center justify-center text-slate-400">
               <Loader2 size={40} className="animate-spin mb-4 text-amber-500" />
               <p className="font-bold tracking-tight">Loading social proof...</p>
             </div>
        ) : (
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/50">
                         <th className="px-8 py-5">Reviewer</th>
                         <th className="px-8 py-5">Feedback</th>
                         <th className="px-8 py-5">Rating</th>
                         <th className="px-8 py-5">Visibility</th>
                         <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {filteredTestimonials.map(test => (
                         <tr key={test.id} className="group hover:bg-slate-50/80 transition-all">
                            <td className="px-8 py-5">
                               <div className="flex items-center gap-4">
                                  <img 
                                      src={test.image_url || '/api/placeholder/40/40'} 
                                      alt={test.name} 
                                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shrink-0"
                                  />
                                  <div>
                                     <p className="text-sm font-bold text-amber-950 flex items-center gap-2">
                                        {test.name}
                                        {test.is_featured && <ShieldCheck size={14} className="text-amber-500" />}
                                     </p>
                                     <p className="text-[10px] text-slate-400 font-medium">{test.role}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-5 max-w-[300px]">
                               <p className="text-sm text-slate-600 line-clamp-2 italic">"{test.content}"</p>
                            </td>
                            <td className="px-8 py-5">
                               <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                     <Star key={i} size={14} className={i < test.rating ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"} />
                                  ))}
                               </div>
                            </td>
                            <td className="px-8 py-5">
                               <div className="flex gap-2">
                                  <button 
                                      onClick={() => handleToggleActive(test.id, test)}
                                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${
                                        test.is_active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                      }`}
                                  >
                                      {test.is_active ? 'Public' : 'Hidden'}
                                  </button>
                                  <button 
                                      onClick={() => handleToggleFeatured(test.id, test)}
                                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                                        test.is_featured ? 'border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100' : 'border-slate-200 text-slate-400 bg-transparent hover:bg-slate-50'
                                      }`}
                                  >
                                      Featured
                                  </button>
                               </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                               <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                                    <Edit2 size={16} />
                                  </button>
                                  <button 
                                    onClick={() => handleDelete(test.id)}
                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                  >
                                    <Trash2 size={16} />
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
  );
}
