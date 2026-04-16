import { useState, useEffect } from 'react';
import { 
  Plus, 
  Calendar, 
  BookOpen, 
  Clock, 
  Users, 
  ChefHat, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  X, 
  CheckCircle2, 
  Loader2,
  AlertCircle
} from 'lucide-react';

interface Course {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  duration: string;
  sessions: string;
  image_url: string;
  brand_color: string;
  features: string[];
  tag: string;
  is_active: boolean;
}

interface Batch {
  id: number;
  name: string;
  start_date: string;
  price: number;
  status: string;
  status_color: string;
  course_name: string;
}

export default function AcademyManager() {
  const [activeSubTab, setActiveSubTab] = useState<'Batches' | 'Courses'>('Batches');
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [batchRes, courseRes] = await Promise.all([
        fetch('http://localhost:5000/api/academy/batches'),
        fetch('http://localhost:5000/api/courses?active=false')
      ]);
      
      const batchData = await batchRes.json();
      const courseData = await courseRes.json();
      
      if (batchData.success) setBatches(batchData.data);
      if (courseData.success) setCourses(courseData.data);
    } catch (error) {
      console.error('Error fetching academy data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-['Baloo_2'] font-bold text-amber-950 mb-1">Academy Management</h2>
          <p className="text-sm text-slate-500 font-medium">Control your campus intakes and digital learning hub.</p>
        </div>
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-amber-950 text-white rounded-2xl font-bold text-sm hover:bg-amber-900 transition-all shadow-xl shadow-amber-950/20"
        >
          <Plus size={18} />
          {activeSubTab === 'Batches' ? 'New Intake Batch' : 'Add Online Course'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit mb-8">
        <button 
          onClick={() => setActiveSubTab('Batches')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeSubTab === 'Batches' ? 'bg-white text-amber-950 shadow-sm' : 'text-slate-500 hover:text-amber-950'
          }`}
        >
          <Calendar size={18} />
          Physical Intakes
        </button>
        <button 
          onClick={() => setActiveSubTab('Courses')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeSubTab === 'Courses' ? 'bg-white text-amber-950 shadow-sm' : 'text-slate-500 hover:text-amber-950'
          }`}
        >
          <BookOpen size={18} />
          Online Courses
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-slate-400">
          <Loader2 size={40} className="animate-spin mb-4 text-amber-500" />
          <p className="font-bold">Syncing campus data...</p>
        </div>
      ) : activeSubTab === 'Batches' ? (
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/50">
                <th className="px-8 py-5">Batch & Intake Name</th>
                <th className="px-8 py-5">Start Date</th>
                <th className="px-8 py-5">Fee (KES)</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {batches.map(batch => (
                <tr key={batch.id} className="group hover:bg-slate-50/80 transition-all">
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-bold text-amber-950">{batch.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{batch.course_name}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={14} className="text-amber-500" />
                      <span className="text-xs font-bold">{new Date(batch.start_date).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                     <span className="text-sm font-extrabold text-amber-950">KES {batch.price?.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${batch.status_color || 'bg-slate-100 text-slate-500'}`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {courses.map(course => (
             <div key={course.id} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
                <div className="h-40 relative">
                   <img src={course.image_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white text-amber-950 rounded-full text-[10px] font-black uppercase shadow-lg">
                        {course.tag || 'Online'}
                      </span>
                   </div>
                </div>
                <div className="p-6">
                   <h3 className="text-lg font-['Baloo_2'] font-bold text-amber-950 mb-1">{course.title}</h3>
                   <p className="text-xs text-slate-500 mb-4 line-clamp-2">{course.subtitle}</p>
                   
                   <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Course Fee</p>
                        <p className="text-lg font-extrabold text-amber-950">KES {course.price.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-2 bg-slate-50 text-slate-400 hover:text-amber-600 rounded-xl transition-all">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      )}
    </div>
  );
}
