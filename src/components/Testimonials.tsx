import { useState, useEffect, useRef } from 'react';

const reviews = [
  {
    name: 'Amani Wanjiku',
    role: 'Bride, Nairobi 2025',
    avatar: '/hero_cake_elegant.png',
    stars: 5,
    text: "Johsther made our wedding cake absolutely magical. It was exactly what I envisioned and tasted even better than it looked. Our guests couldn't stop talking about it!",
    course: null,
  },
  {
    name: 'Kevin Oduya',
    role: 'Course Graduate · Pro Masterclass',
    avatar: '/hero_baker.png',
    stars: 5,
    text: "I came in knowing nothing about cakes. After the Pro Masterclass, I launched my own business in 3 months. The business training sessions were honestly priceless.",
    course: 'Pro Masterclass',
  },
  {
    name: 'Fatuma Hassan',
    role: 'Birthday cake client',
    avatar: '/red_velvet_cake.png',
    stars: 5,
    text: "Ordered a custom red velvet cake for my daughter's birthday. The quality, the detail, the taste — absolutely chef's kiss! Will definitely be ordering again.",
    course: null,
  },
  {
    name: 'Brian Mwangi',
    role: 'Course Graduate · Intermediate',
    avatar: '/academy-class.png',
    stars: 5,
    text: "The instructors are so patient and passionate. The fondant and sugar flower lessons completely blew my mind. Worth every shilling — 10/10 would recommend!",
    course: 'Intermediate',
  },
  {
    name: 'Cynthia Otieno',
    role: 'Corporate client, Nairobi',
    avatar: '/hero-cake.png',
    stars: 5,
    text: "We hired Johsther Cakes for our company annual dinner. 200 guests, stunning 3-tiered cake — delivered on time and perfectly executed. Absolute professionals.",
    course: null,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '3px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
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

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => setCurrent(p => (p + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" ref={ref} style={{ padding: '100px 0', background: '#FFFBEB', position: 'relative', overflow: 'hidden' }}>
      <div className="blob" style={{
        position: 'absolute', top: '-60px', left: '-80px',
        width: '320px', height: '320px',
        background: '#F59E0B',
        opacity: 0.07,
      }} aria-hidden="true" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div className="fade-up" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="pill" style={{ background: '#FEF3C7', border: '2px solid #F59E0B', color: '#92400E', marginBottom: '16px', display: 'inline-flex' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Happy Clients
          </div>
          <h2 style={{
            fontFamily: "'Baloo 2', cursive",
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#78350F',
            marginBottom: '12px',
          }}>
            Words That Warm <span style={{ color: '#F59E0B' }}>Our Hearts</span>
          </h2>
          <p style={{ fontFamily: "'Comic Neue', cursive", fontSize: '1rem', color: '#A16207' }}>
            Over 1,200 happy clients and 350+ graduates speak for themselves.
          </p>
        </div>

        {/* Featured review */}
        <div className="fade-up" style={{
          background: '#fff',
          borderRadius: '28px',
          padding: '40px 48px',
          border: '2px solid #F5E6C8',
          boxShadow: '0 12px 40px rgba(146,64,14,0.1)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '220px',
          transition: 'all 0.4s ease',
        }}>
          {/* Quote mark */}
          <div style={{
            position: 'absolute', top: '24px', right: '32px',
            fontFamily: "'Baloo 2', cursive",
            fontSize: '8rem',
            color: '#FEF3C7',
            lineHeight: 1,
            pointerEvents: 'none',
          }} aria-hidden="true">"</div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <img
              src={reviews[current].avatar}
              alt={reviews[current].name}
              style={{
                width: '72px', height: '72px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '3px solid #F59E0B',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: '200px' }}>
              <StarRating count={reviews[current].stars} />
              <p style={{
                fontFamily: "'Comic Neue', cursive",
                fontSize: '1.05rem',
                color: '#78350F',
                lineHeight: 1.75,
                margin: '12px 0 16px',
                fontStyle: 'italic',
              }}>
                "{reviews[current].text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, color: '#78350F', fontSize: '0.95rem' }}>
                    {reviews[current].name}
                  </div>
                  <div style={{ fontFamily: "'Comic Neue', cursive", color: '#A16207', fontSize: '0.82rem' }}>
                    {reviews[current].role}
                  </div>
                </div>
                {reviews[current].course && (
                  <span style={{
                    fontFamily: "'Baloo 2', cursive",
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    background: '#FEF3C7',
                    color: '#92400E',
                    padding: '3px 12px',
                    borderRadius: '999px',
                    border: '1.5px solid #F59E0B',
                  }}>
                    {reviews[current].course}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dots navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '48px' }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Review ${i + 1}`}
              style={{
                width: i === current ? '28px' : '10px',
                height: '10px',
                borderRadius: '999px',
                border: 'none',
                background: i === current ? '#F59E0B' : '#E5D0A8',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* All review grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {reviews.map((r, i) => (
            <div
              key={i}
              className="card-lift fade-up"
              onClick={() => setCurrent(i)}
              style={{
                background: i === current ? 'linear-gradient(135deg, #FEF3C7, #FFFBEB)' : '#fff',
                border: i === current ? '2px solid #F59E0B' : '2px solid #F5E6C8',
                borderRadius: '20px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <StarRating count={r.stars} />
              <p style={{
                fontFamily: "'Comic Neue', cursive",
                fontSize: '0.88rem',
                color: '#78350F',
                margin: '10px 0 14px',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                "{r.text.substring(0, 90)}..."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={r.avatar}
                  alt={r.name}
                  style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #F59E0B' }}
                />
                <div>
                  <div style={{ fontFamily: "'Baloo 2', cursive", fontWeight: 700, color: '#78350F', fontSize: '0.85rem' }}>{r.name}</div>
                  <div style={{ fontFamily: "'Comic Neue', cursive", color: '#A16207', fontSize: '0.75rem' }}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
