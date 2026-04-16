import { useEffect, useRef, useState } from 'react';

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
}
export default function Courses() {
  const ref = useRef<HTMLElement>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    el.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();

    return () => obs.disconnect();
  }, []);

  return (
    <section id="courses" ref={ref} style={{ padding: '100px 0', background: '#FEF3C7', position: 'relative', overflow: 'hidden' }}>
      <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} aria-hidden="true" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="pill" style={{ background: '#FEF3C7', border: '2px solid #F59E0B', color: '#92400E', marginBottom: '16px', display: 'inline-flex' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Online Baking Academy
          </div>
          <h2 style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#78350F',
            marginBottom: '16px',
          }}>
            Learn <span style={{ color: '#F59E0B' }}>Anytime</span>, Anywhere
          </h2>
          <p style={{ fontFamily: "'Comic Neue', cursive", fontSize: '1.05rem', color: '#A16207', maxWidth: '520px', margin: '0 auto' }}>
            Can't make it to our Nairobi campus? Join our digital classroom and master the art of baking through high-quality video modules and expert support.
          </p>
        </div>


        {/* Course Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
          alignItems: 'start',
        }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', padding: '100px 0', textAlign: 'center' }}>
              <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-['Baloo_2'] font-bold text-amber-950">Preparing your curriculum...</p>
            </div>
          ) : courses.map((course) => {
            const isPopular = course.tag === 'Best Seller' || course.tag === 'Most Popular';
            const color = course.brand_color || '#B45309';
            return (
              <article
                key={course.id}
                className="card-lift fade-up"
                style={{
                  background: '#fff',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  border: isPopular ? `3px solid ${color}` : '2px solid #F5E6C8',
                  position: 'relative',
                  transform: isPopular ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: isPopular ? `0 20px 50px rgba(245,158,11,0.25)` : '0 4px 20px rgba(146,64,14,0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                {/* Popular badge */}
                {course.tag && (
                  <div style={{
                    position: 'absolute', top: '18px', right: '18px',
                    background: color,
                    color: isPopular ? '#fff' : '#fff',
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    padding: '4px 14px',
                    borderRadius: '999px',
                    zIndex: 2,
                  }}>
                    {course.tag}
                  </div>
                )}

                {/* Image */}
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={course.image_url}
                    alt={`${course.title} baking course at Johsther Academy`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>

                <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Duration pills */}
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
                    {[course.duration, course.sessions].map(d => (
                      <span key={d} style={{
                        fontFamily: "'Baloo 2', cursive",
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        background: '#FEF3C7',
                        color: '#92400E',
                        padding: '3px 10px',
                        borderRadius: '999px',
                        border: '1.5px solid #F5E6C8',
                      }}>{d}</span>
                    ))}
                  </div>

                  <h3 style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '1.25rem', color: '#78350F', marginBottom: '4px' }}>
                    {course.title}
                  </h3>
                  <p style={{ fontFamily: "'Comic Neue', cursive", fontSize: '0.88rem', color: '#A16207', marginBottom: '20px' }}>
                    {course.subtitle}
                  </p>

                  {/* Features */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {course.features.map(f => (
                      <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span style={{ fontFamily: "'Comic Neue', cursive", fontSize: '0.9rem', color: '#78350F' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1.5px solid #F5E6C8', marginTop: 'auto' }}>
                    <div>
                      <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '1.5rem', color: '#78350F' }}>
                        KES {Number(course.price).toLocaleString()}
                      </div>
                      <div style={{ fontFamily: "'Comic Neue', cursive", fontSize: '0.78rem', color: '#A16207' }}>per person · all-inclusive</div>
                    </div>
                    <button
                      style={{
                        fontFamily: "'Baloo 2', cursive",
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        background: `linear-gradient(135deg, ${color}, #F59E0B)`,
                        color: '#fff',
                        border: 'none',
                        padding: '11px 24px',
                        borderRadius: '999px',
                        cursor: 'pointer',
                        boxShadow: `0 6px 18px ${color}44`,
                        transition: 'opacity 0.2s, transform 0.2s',
                      }}
                      onMouseEnter={e => { (e.currentTarget).style.opacity = '0.88'; (e.currentTarget).style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { (e.currentTarget).style.opacity = '1'; (e.currentTarget).style.transform = 'translateY(0)'; }}
                      aria-label={`Enrol in ${course.title}`}
                    >
                      Enrol Now
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Group / Corporate note */}
        <div className="fade-up" style={{
          textAlign: 'center',
          marginTop: '48px',
          padding: '24px',
          background: '#fff',
          borderRadius: '20px',
          border: '2px solid #F5E6C8',
        }}>
          <p style={{ fontFamily: "'Comic Neue', cursive", color: '#A16207', fontSize: '0.95rem', margin: 0 }}>
            <strong style={{ color: '#78350F', fontFamily: "'Baloo 2', cursive" }}>Planning a group or team-building event?</strong>
            {' '}We offer special group discounts for 5+ students.{' '}
            <a href="#contact" style={{ color: '#F59E0B', fontWeight: 700, textDecoration: 'none' }}>Contact us →</a>
          </p>
        </div>
      </div>
    </section>
  );
}

