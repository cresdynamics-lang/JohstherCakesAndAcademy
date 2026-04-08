import { useEffect, useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    el.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      style={{
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '60px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Dot background */}
      <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} aria-hidden="true" />

      {/* Decorative blobs */}
      <div className="blob" style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '420px', height: '420px',
        background: 'linear-gradient(135deg, #FBD26A, #F59E0B)',
        opacity: 0.25, zIndex: 0,
      }} aria-hidden="true" />
      <div className="blob" style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '300px', height: '300px',
        background: 'linear-gradient(135deg, #92400E, #B45309)',
        opacity: 0.12, zIndex: 0,
      }} aria-hidden="true" />

      {/* Sprinkles */}
      {[
        { top: '18%', left: '8%', bg: '#F59E0B', w: 12, h: 5, rotate: '45deg' },
        { top: '30%', left: '14%', bg: '#92400E', w: 8, h: 8, rotate: '0deg' },
        { top: '70%', left: '6%', bg: '#FBD26A', w: 14, h: 5, rotate: '-30deg' },
        { top: '12%', right: '10%', bg: '#B45309', w: 10, h: 5, rotate: '60deg' },
        { top: '55%', right: '8%', bg: '#F59E0B', w: 12, h: 5, rotate: '-45deg' },
        { top: '80%', right: '18%', bg: '#92400E', w: 8, h: 8, rotate: '0deg' },
      ].map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: s.top,
            left: (s as any).left,
            right: (s as any).right,
            width: `${s.w}px`,
            height: `${s.h}px`,
            background: s.bg,
            borderRadius: s.h === s.w ? '50%' : '3px',
            transform: `rotate(${s.rotate})`,
            opacity: 0.7,
          }}
        />
      ))}

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '48px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }} className="hero-grid">

        {/* Left — Text */}
        <div>
          {/* Badge */}
          <div className="fade-up pill" style={{ background: '#FEF3C7', border: '2px solid #F59E0B', color: '#92400E', marginBottom: '24px', width: 'fit-content' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Nairobi's #1 Cake Studio & Academy
          </div>

          <h1 className="fade-up" style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            lineHeight: '1.15',
            color: '#78350F',
            marginBottom: '20px',
          }}>
            Cakes That Make
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #F59E0B, #92400E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Every Moment</span>
            <br />
            <span className="squiggle">Sweeter</span>
          </h1>

          <p className="fade-up" style={{
            fontFamily: "'Comic Neue', cursive",
            fontSize: '1.1rem',
            color: '#A16207',
            lineHeight: '1.7',
            marginBottom: '36px',
            maxWidth: '480px',
          }}>
            Handcrafted cakes baked with love — and baking courses for every skill level.
            Whether you want a dream cake or want to <strong>learn the art of baking</strong>, you're in the right place!
          </p>

          <div className="fade-up" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#cakes"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 700,
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #92400E, #B45309)',
                color: '#fff',
                padding: '14px 32px',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(146,64,14,0.35)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { (e.currentTarget).style.transform = 'translateY(-3px)'; (e.currentTarget).style.boxShadow = '0 12px 32px rgba(146,64,14,0.45)'; }}
              onMouseLeave={e => { (e.currentTarget).style.transform = 'translateY(0)'; (e.currentTarget).style.boxShadow = '0 8px 24px rgba(146,64,14,0.35)'; }}
            >
              Order a Cake
            </a>
            <a
              href="#academy"
              style={{
                fontFamily: "'Baloo 2', cursive",
                fontWeight: 700,
                fontSize: '1rem',
                background: 'transparent',
                color: '#92400E',
                padding: '14px 32px',
                borderRadius: '999px',
                textDecoration: 'none',
                border: '2.5px solid #92400E',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => { (e.currentTarget).style.background = '#92400E'; (e.currentTarget).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget).style.background = 'transparent'; (e.currentTarget).style.color = '#92400E'; }}
            >
              Explore Academy
            </a>
          </div>

          {/* Stats */}
          <div className="fade-up" style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap' }}>
            {[
              { num: '1,200+', label: 'Cakes Delivered' },
              { num: '350+', label: 'Students Trained' },
              { num: '4.9★', label: 'Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 800, fontSize: '1.6rem', color: '#78350F' }}>{stat.num}</div>
                <div style={{ fontFamily: "'Comic Neue', cursive", fontSize: '0.85rem', color: '#A16207' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Image */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Blob behind image */}
          <div className="blob animate-float-slow" style={{
            position: 'absolute',
            width: '440px', height: '440px',
            background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
            opacity: 0.35,
            zIndex: 0,
          }} aria-hidden="true" />

          {/* Main cake image */}
          <div className="animate-float" style={{ position: 'relative', zIndex: 2 }}>
            <img
              src="/hero-cake.png"
              alt="A beautifully decorated cake by Johsther Cakes"
              style={{
                width: 'min(420px, 90vw)',
                height: 'min(420px, 90vw)',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '6px solid #F59E0B',
                boxShadow: '0 24px 60px rgba(146,64,14,0.25)',
              }}
            />
          </div>

          {/* Floating badge */}
          <div className="animate-wiggle" style={{
            position: 'absolute', bottom: '20px', left: '0',
            background: '#fff',
            border: '2.5px solid #F59E0B',
            borderRadius: '20px',
            padding: '12px 18px',
            boxShadow: '0 8px 24px rgba(146,64,14,0.2)',
            zIndex: 3,
            minWidth: '150px',
          }}>
            <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, color: '#92400E', fontSize: '0.85rem' }}>Fresh every day</div>
            <div style={{ fontFamily: "'Comic Neue', cursive", color: '#A16207', fontSize: '0.78rem' }}>Made with real butter & love</div>
          </div>

          {/* Top badge */}
          <div style={{
            position: 'absolute', top: '10px', right: '0',
            background: 'linear-gradient(135deg, #F59E0B, #B45309)',
            borderRadius: '20px',
            padding: '12px 18px',
            boxShadow: '0 8px 24px rgba(146,64,14,0.3)',
            zIndex: 3,
          }}>
            <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, color: '#fff', fontSize: '0.85rem' }}>Custom Orders</div>
            <div style={{ fontFamily: "'Comic Neue', cursive", color: 'rgba(255,255,255,0.85)', fontSize: '0.78rem' }}>Available 7 days a week</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: 0.6 }}>
        <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: '0.75rem', color: '#92400E' }}>Scroll down</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#92400E" strokeWidth="2" strokeLinecap="round" style={{ animation: 'float 1.5s ease-in-out infinite' }}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-grid > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
