import React from 'react';
import { ExternalLink, Instagram, Globe, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import logo from '@/imports/Untitled (1).svg';

export function Links() {
  const links = [
    {
      title: 'Instagram',
      subtitle: 'Follow us @inthefoldtcg',
      url: 'https://instagram.com/inthefoldtcg',
      icon: Instagram,
      primary: true,
    },
    {
      title: 'Website',
      subtitle: 'Browse inventory show schedules',
      url: 'https://inthefoldtcg.com',
      icon: Globe,
      primary: false,
    },
    {
      title: 'Custom Cards',
      subtitle: 'Contact us to get started!',
   
      icon: Sparkles,
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
      {/* Logo with glow */}
      <div
        style={{
          position: 'relative',
          width: 160,
          height: 160,
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#b5ff00',
            filter: 'blur(40px)',
            opacity: 0.35,
            borderRadius: '50%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <ImageWithFallback
          src={logo}
          alt="In The Fold TF logo"
          style={{
            position: 'relative',
            zIndex: 1,
            width: 96,
            height: 96,
            objectFit: 'contain',
            filter: 'invert(1)',
            opacity: 0.9,
          }}
        />
      </div>

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
     
        </p>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 8,
        }}
      >
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
