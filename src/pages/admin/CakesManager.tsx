import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  ChefHat, 
  ExternalLink,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Cake {
  id: number;
  name: string;
  category: string;
  color: string;
  price: number;
  image_url: string;
  tag: string;
  description: string;
  is_active: boolean;
}

const CATEGORIES = ['Wedding', 'Birthday', 'Corporate', 'Academy', 'Special Event'];
const COLORS = ['White', 'Pink', 'Chocolate', 'Gold', 'Blue', 'Green', 'Red', 'Purple'];

export default function CakesManager() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCake, setEditingCake] = useState<Cake | null>(null);
  const [form, setForm] = useState({
    name: '',
    category: 'Wedding',
    color: 'White',
    price: '',
    image_url: '',
    tag: '',
    description: ''
  });

  const fetchCakes = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/cakes?active=false', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setCakes(data.data);
      }
    } catch (error) {
      console.error('Error fetching cakes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const handleOpenModal = (cake: Cake | null = null) => {
    if (cake) {
      setEditingCake(cake);
      setForm({
        name: cake.name,
        category: cake.category,
        color: cake.color,
        price: cake.price.toString(),
        image_url: cake.image_url,
        tag: cake.tag,
        description: cake.description
      });
    } else {
      setEditingCake(null);
      setForm({
        name: '',
        category: 'Wedding',
        color: 'White',
        price: '',
        image_url: '',
        tag: '',
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingCake 
      ? `http://localhost:5000/api/cakes/${editingCake.id}` 
      : 'http://localhost:5000/api/cakes';
    
    const method = editingCake ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price)
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchCakes();
      }
    } catch (error) {
      console.error('Error saving cake:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to remove this masterpiece?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/cakes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        fetchCakes();
      }
    } catch (error) {
      console.error('Error deleting cake:', error);
    }
  };

  const filteredCakes = cakes.filter(cake => 
    cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cake.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-['Baloo_2'] font-bold text-amber-950 mb-1">Cake Boutique</h2>
          <p className="text-sm text-slate-500 font-medium">Manage your masterpiece gallery and product catalogue.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-amber-950 text-white rounded-2xl font-bold text-sm hover:bg-amber-900 transition-all shadow-xl shadow-amber-950/20 active:scale-95"
        >
          <Plus size={18} />
          Add New Cake
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search cakes by name or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-amber-500 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex-1 md:flex-none justify-center">
            <Filter size={18} />
            Category
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex-1 md:flex-none justify-center">
            <AlertCircle size={18} />
            Status
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center text-slate-400">
            <Loader2 size={40} className="animate-spin mb-4 text-amber-500" />
            <p className="font-bold">Loading masterpieces...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/50">
                  <th className="px-8 py-5">Product Details</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5">Theme</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredCakes.map((cake) => (
                  <tr key={cake.id} className="group hover:bg-slate-50/80 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img src={cake.image_url} alt={cake.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-amber-950 flex items-center gap-2">
                            {cake.name}
                            {cake.tag && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[8px] font-black rounded-full uppercase tracking-tighter">{cake.tag}</span>}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium line-clamp-1 max-w-[200px]">{cake.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">{cake.category}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-extrabold text-amber-950">KES {cake.price.toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-5">
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-slate-200" style={{ background: cake.color.toLowerCase() }} />
                          <span className="text-xs font-bold text-slate-500">{cake.color}</span>
                       </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        cake.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${cake.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                        {cake.is_active ? 'Visible' : 'Draft'}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenModal(cake)}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(cake.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredCakes.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-slate-400">
             <ChefHat size={48} className="mb-4 opacity-20" />
             <p className="font-bold text-lg text-slate-400">No cakes found</p>
             <p className="text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-amber-950/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
           <div className="relative bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="text-2xl font-['Baloo_2'] font-bold text-amber-950">
                    {editingCake ? 'Edit Masterpiece' : 'Add New Cake'}
                 </h3>
                 <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-amber-900 transition-all"
                 >
                    <X size={20} />
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Cake Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500"
                            placeholder="e.g. Royal Ivory Dream"
                            value={form.name}
                            onChange={e => setForm({...form, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Price (KES)</label>
                        <input 
                            required
                            type="number" 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500"
                            placeholder="e.g. 12500"
                            value={form.price}
                            onChange={e => setForm({...form, price: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                        <select 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500"
                            value={form.category}
                            onChange={e => setForm({...form, category: e.target.value})}
                        >
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Color Theme</label>
                        <select 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500"
                            value={form.color}
                            onChange={e => setForm({...form, color: e.target.value})}
                        >
                            {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Tag / Badge</label>
                        <input 
                            type="text" 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500"
                            placeholder="e.g. Premium, Best Seller"
                            value={form.tag}
                            onChange={e => setForm({...form, tag: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Image URL</label>
                        <input 
                            required
                            type="text" 
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500"
                            placeholder="/hero_cake_elegant.png"
                            value={form.image_url}
                            onChange={e => setForm({...form, image_url: e.target.value})}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
                        <textarea 
                            required
                            rows={3}
                            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500 resize-none"
                            placeholder="Describe the flavors, layers, and artistic details..."
                            value={form.description}
                            onChange={e => setForm({...form, description: e.target.value})}
                        />
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="flex-1 px-8 py-4 bg-amber-950 text-white rounded-2xl font-bold text-sm hover:bg-amber-900 transition-all shadow-xl shadow-amber-950/20"
                    >
                        {editingCake ? 'Save Changes' : 'Publish Product'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
