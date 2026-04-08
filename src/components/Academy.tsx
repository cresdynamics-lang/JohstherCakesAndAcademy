import { useEffect, useRef } from 'react';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    title: 'Expert Instructors',
    desc: 'Learn from certified pastry chefs with 10+ years of experience in award-winning bakeries.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Flexible Schedules',
    desc: 'Morning, evening, and weekend classes to fit around your busy life.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/>
      </svg>
    ),
    title: 'Certificate Awarded',
    desc: 'Get a professional Certificate of Completion recognised by top bakeries.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Small Class Sizes',
    desc: 'Maximum 8 students per session — hands-on attention from your instructor.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: 'All Materials Included',
    desc: 'Ingredients, tools, and aprons provided. Just show up ready to bake!',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    ),
    title: 'Career Support',
    desc: 'Graduate with confidence — we help connect you to baking opportunities and clients.',
  },
];

export default function Academy() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    el.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="academy"
      ref={ref}
      style={{
        padding: '100px 0',
        background: '#78350F',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot pattern overlay */}
      <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.07 }} aria-hidden="true" />

      {/* Decorative blob */}
      <div className="blob" style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '400px', height: '400px',
        background: 'linear-gradient(135deg, #F59E0B, #B45309)',
        opacity: 0.12, zIndex: 0,
      }} aria-hidden="true" />
      <div className="blob" style={{
        position: 'absolute', bottom: '-80px', left: '-60px',
        width: '300px', height: '300px',
        background: '#F59E0B',
        opacity: 0.08, zIndex: 0,
      }} aria-hidden="true" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

        {/* Two columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
          marginBottom: '72px',
        }} className="academy-grid">

          {/* Left — Image stack */}
          <div style={{ position: 'relative', height: '480px' }} className="fade-up">
            {/* Main image */}
            <img
              src="/academy-class.png"
              alt="Students learning to bake at Johsther Academy"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '78%',
                height: '370px',
                objectFit: 'cover',
                borderRadius: '24px',
                border: '4px solid #F59E0B',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              }}
            />
            {/* Secondary image */}
            <img
              src="/hero_baker.png"
              alt="Baker decorating a cake"
              style={{
                position: 'absolute',
                bottom: 0, right: 0,
                width: '55%',
                height: '260px',
                objectFit: 'cover',
                borderRadius: '20px',
                border: '4px solid #B45309',
                boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
              }}
            />
            {/* Floating stat */}
            <div style={{
              position: 'absolute',
              bottom: '30px', left: '0',
              background: 'linear-gradient(135deg, #F59E0B, #B45309)',
              borderRadius: '18px',
              padding: '16px 20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              zIndex: 5,
            }}>
              <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '2rem', color: '#fff' }}>350+</div>
              <div style={{ fontFamily: "'Comic Neue', cursive", color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>Graduates & counting</div>
            </div>
          </div>

          {/* Right — Text */}
          <div>
            <div className="fade-up pill" style={{ background: 'rgba(245,158,11,0.15)', border: '2px solid #F59E0B', color: '#F59E0B', marginBottom: '20px', width: 'fit-content' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              The Academy
            </div>
            <h2 className="fade-up" style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: '#FEF3C7',
              marginBottom: '20px',
              lineHeight: '1.2',
            }}>
              Learn to Bake Like<br />
              <span style={{ color: '#F59E0B' }}>a Professional</span>
            </h2>
            <p className="fade-up" style={{
              fontFamily: "'Comic Neue', cursive",
              fontSize: '1.05rem',
              color: '#FDE68A',
              lineHeight: '1.75',
              marginBottom: '32px',
            }}>
              Johsther Academy is where passion meets precision. Whether you're a complete beginner or want to sharpen your skills, our hands-on baking courses will transform you into a confident cake artist.
            </p>
            <p className="fade-up" style={{
              fontFamily: "'Comic Neue', cursive",
              fontSize: '1rem',
              color: '#FCD34D',
              lineHeight: '1.7',
              marginBottom: '40px',
            }}>
              Join hundreds of students who've turned their love of baking into thriving businesses and unforgettable celebrations.
            </p>
            <div className="fade-up" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#courses"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 700,
                  background: '#F59E0B',
                  color: '#1C0A00',
                  padding: '13px 30px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  boxShadow: '0 8px 20px rgba(245,158,11,0.4)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { (e.currentTarget).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget).style.transform = 'translateY(0)'; }}
              >
                View All Courses
              </a>
              <a
                href="#contact"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontWeight: 700,
                  background: 'transparent',
                  color: '#FEF3C7',
                  padding: '13px 30px',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  border: '2px solid rgba(254,243,199,0.5)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { (e.currentTarget).style.borderColor = '#FEF3C7'; }}
                onMouseLeave={e => { (e.currentTarget).style.borderColor = 'rgba(254,243,199,0.5)'; }}
              >
                Book a Tour
              </a>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
        }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="fade-up card-lift"
              style={{
                background: 'rgba(255,251,235,0.06)',
                border: '1.5px solid rgba(245,158,11,0.25)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'default',
              }}
            >
              <div style={{
                width: '52px', height: '52px',
                background: 'rgba(245,158,11,0.12)',
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, color: '#FEF3C7', fontSize: '1rem', marginBottom: '8px' }}>
                {f.title}
              </h3>
              <p style={{ fontFamily: "'Comic Neue', cursive", color: '#FDE68A', fontSize: '0.88rem', lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .academy-grid { grid-template-columns: 1fr !important; }
          .academy-grid > div:first-child { height: 260px !important; }
        }
      `}</style>
    </section>
  );
}
