import React from 'react';
import { ExternalLink, Instagram, Globe, Sparkles, MessageSquare } from 'lucide-react';

export function Links() {
  const links = [
    {
      title: 'Website',
      subtitle: 'Browse inventory, sets, and custom cards',
      url: 'https://website-uden.vercel.app',
      icon: ,
      primary: true,
    },
    {
      title: 'Instagram',
      subtitle: 'Follow us @inthefoldtcg for pulls & updates',
      url: 'https://instagram.com/inthefoldtcg',
      icon: ,
      primary: false,
    },
  ];

  return (
{/* Background ambient glow */}

{/* Branding Header */}

IN THE FOLD TCG
Trading Card Retail & Customs

{/* Custom Order Notice Box */}

Want to place a custom card order?
Head over to our custom card submission builder on our main website to upload your designs, or slide into our Instagram DMs to start your project.

{/* Links List */}

{links.map((link, index) => (
[

{link.icon}

{link.title}

{link.subtitle}

]({link.url})
))}

{/* Footer info */}

© {new Date().getFullYear()} Sixfold Holdings LLC. All rights reserved.

);
}
