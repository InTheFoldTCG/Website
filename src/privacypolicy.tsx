import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-zinc-300 font-['Space_Mono'] text-xs leading-relaxed">
      <h1 className="text-xl font-bold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Effective Date: September 26, 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-sm font-bold text-foreground mb-2">Business Entity</h2>
          <p>Sixfold Holdings ("we," "our," or "us") — Storefront: In The Fold TCG (website-uden.vercel.app)</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-foreground mb-2">1. Information We Collect</h2>
          <p className="mb-2">When you interact with our website, submit custom card orders, or contact us, we may collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li><strong className="text-foreground">Contact & Shipping Details:</strong> Your name, email address, shipping address, and phone number provided during checkout or inquiries.</li>
            <li><strong className="text-foreground">Customer Uploads:</strong> Image files or custom assets uploaded specifically for the production of custom card orders.</li>
            <li><strong className="text-foreground">Transaction Data:</strong> Order history, fulfillment updates, and payment status (note: full payment card details are handled securely by our third-party payment processors and are never stored on our servers).</li>
            <li><strong className="text-foreground">Technical Data:</strong> Standard web analytics and browser metadata (such as IP address, device type, and basic usage logs) to ensure site security and performance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-bold text-foreground mb-2">2. How We Use Your Information</h2>
          <p className="mb-2">We use the collected information strictly for operational and customer service purposes, including:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Processing, printing, and shipping your custom trading card orders.</li>
            <li>Communicating order confirmations, tracking details, and customer support inquiries via our automated notification systems.</li>
            <li>Maintaining internal order tracking sheets and business records.</li>
            <li>Complying with state and local tax obligations (such as Arizona Transaction Privilege Tax requirements).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-bold text-foreground mb-2">3. Data Sharing & Security</h2>
          <p className="mb-2">We do not sell, trade, or rent your personal information to third parties. We share data only with trusted service providers strictly necessary to run our operations:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-3">
            <li><strong className="text-foreground">Infrastructure & Storage:</strong> Secure cloud storage (such as Google Drive) used temporarily to hold customer-uploaded print assets.</li>
            <li><strong className="text-foreground">Transactional Messaging:</strong> Email dispatch services (such as ZeptoMail) used to send order updates and receipts.</li>
            <li><strong className="text-foreground">Legal Compliance:</strong> Authorities, if required by applicable law or tax regulations.</li>
          </ul>
          <p>We implement appropriate technical and organizational security measures to protect your personal data and uploaded files against unauthorized access, alteration, or disclosure.</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-foreground mb-2">4. Your Rights & Choices</h2>
          <p>You may request to access, update, or delete your personal information and associated upload files by reaching out to us directly through our active channels or vendor event appearances.</p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-foreground mb-2">5. Policy Updates</h2>
          <p>We may update this privacy policy from time to time to reflect changes in our operational workflows or legal requirements. The updated version will be indicated by a revised effective date.</p>
        </section>
      </div>
    </div>
  );
}
