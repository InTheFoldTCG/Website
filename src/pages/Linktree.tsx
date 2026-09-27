
import React from 'react';
import { ExternalLink, Instagram, Globe, Sparkles } from 'lucide-react';

export function Links() {
  const links = [
    {
      title: 'Main Store & Website',
      subtitle: 'Browse inventory, sets, and custom cards',
      url: 'https://website-uden.vercel.app',
      icon: Globe,
      primary: true,
    },
    {
      title: 'Instagram',
      subtitle: 'Follow us @inthefoldtcg for pulls & updates',
      url: 'https://instagram.com/inthefoldtcg',
      icon: Instagram,
      primary: false,
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 16px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 1,
            color: '#b5ff00',
            margin: 0,
          }}
        >
          IN THE FOLD TCG
        </h1>
        <p style={{ color: '#aaa', marginTop: 8, fontSize: 14 }}>
          Trading Card Retail & Customs
        </p>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 420,
          background: '#151515',
          border: '1px solid #2a2a2a',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Sparkles size={18} color="#b5ff00" />
          <strong style={{ fontSize: 15 }}>Want to place a custom card order?</strong>
        </div>
        <p style={{ color: '#bbb', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
          Head over to our custom card submission builder on our main website to
          upload your designs, or slide into our Instagram DMs to start your project.
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {links.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                textDecoration: 'none',
                borderRadius: 14,
                padding: '16px 18px',
                background: link.primary ? '#b5ff00' : '#151515',
                border: link.primary ? 'none' : '1px solid #2a2a2a',
                color: link.primary ? '#000' : '#fff',
              }}
            >
              <Icon size={20} color={link.primary ? '#000' : '#b5ff00'} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{link.title}</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
                  {link.subtitle}
                </div>
              </div>
              <ExternalLink size={16} color={link.primary ? '#000' : '#888'} />
            </a>
          );
        })}
      </div>

      <p style={{ marginTop: 40, fontSize: 11, color: '#555' }}>
        © {new Date().getFullYear()} Sixfold Holdings LLC. All rights reserved.
      </p>
    </div>
  );
}
