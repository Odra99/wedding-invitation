import React, { useState } from 'react';
import { Code2, Copy, Check, X, Download, FileText, Sparkles, Terminal } from 'lucide-react';

interface NextjsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NextjsExportModal: React.FC<NextjsExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'page' | 'layout' | 'package'>('guide');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const nextJsPageCode = `'use client';

import React from 'react';
import { WeddingInvitationFatimaLuis } from '@/components/WeddingInvitationFatimaLuis';
import { MusicPlayer } from '@/components/MusicPlayer';

export default function WeddingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#eaf3fa] via-[#f3f8fd] to-[#e4eef7] text-[#1b476e]">
      {/* Invitación Digital Boda Civil Fatima & Luis */}
      <WeddingInvitationFatimaLuis onOpenNextJsGuide={() => {}} />
      <MusicPlayer />
    </main>
  );
}`;

  const nextJsLayoutCode = `import type { Metadata } from 'next';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Boda Civil · Fatima & Luis',
  description: 'Invitación digital para la Boda Civil de Fatima & Luis - Domingo 20 de Diciembre de 2026 en La Quebrada, Quetzaltenango.',
  openGraph: {
    title: 'Boda Civil · Fatima & Luis',
    description: '¡Tenemos el honor de invitarte a celebrar nuestra unión matrimonial! Domingo 20 de Diciembre de 2026.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={\`\${montserrat.variable} \${cormorantGaramond.variable} scroll-smooth\`}
    >
      <body className="bg-gradient-to-b from-[#eaf3fa] via-[#f3f8fd] to-[#e4eef7] text-[#1b476e] font-sans antialiased selection:bg-sky-200">
        {children}
      </body>
    </html>
  );
}`;

  const packageJsonCode = `{
  "name": "boda-civil-fatima-luis",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@phosphor-icons/web": "^2.1.1",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "tailwindcss": "^3.4.0",
    "typescript": "^5"
  }
}`;

  const getCurrentSnippet = () => {
    switch (activeTab) {
      case 'page':
        return nextJsPageCode;
      case 'layout':
        return nextJsLayoutCode;
      case 'package':
        return packageJsonCode;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    const text = getCurrentSnippet();
    if (!text) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-sky-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-sky-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-xs">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-slate-900">
                Next.js Project Integration &amp; Export
              </h3>
              <p className="text-xs text-slate-500">
                Ready-to-use Next.js 14/15 App Router code structure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-white flex items-center gap-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'guide'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Next.js Setup Guide
          </button>
          <button
            onClick={() => setActiveTab('page')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'page'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            app/page.tsx
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'layout'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            app/layout.tsx
          </button>
          <button
            onClick={() => setActiveTab('package')}
            className={`py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'package'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            package.json
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          {activeTab === 'guide' ? (
            <div className="space-y-6 text-sm text-slate-700">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-sky-950">
                  <strong className="block font-semibold mb-1">Dual-Engine Compatibility:</strong>
                  This application is currently live and fully functional here in AI Studio as a modern React application. All components in <code className="bg-white/70 px-1 rounded">/src/components</code> are 100% modular and drop straight into any Next.js App Router project!
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-600" />
                  Step 1: Create Next.js App
                </h4>
                <div className="bg-slate-900 text-sky-300 font-mono text-xs p-3.5 rounded-lg overflow-x-auto">
                  npx create-next-app@latest wedding-site --typescript --tailwind --app --eslint
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-600" />
                  Step 2: Install UI Icons &amp; Motion
                </h4>
                <div className="bg-slate-900 text-sky-300 font-mono text-xs p-3.5 rounded-lg overflow-x-auto">
                  npm install lucide-react motion
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-sky-600" />
                  Step 3: Copy Components &amp; Pages
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Simply copy the <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">src/components</code> and <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800">src/data</code> folders into your Next.js project root, and paste the code from the <strong>app/page.tsx</strong> and <strong>app/layout.tsx</strong> tabs.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('page')}
                  className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                >
                  View Next.js Page Code →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-500">
                  {activeTab === 'page' ? 'app/page.tsx' : activeTab === 'layout' ? 'app/layout.tsx' : 'package.json'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={() =>
                      handleDownloadFile(
                        activeTab === 'page' ? 'page.tsx' : activeTab === 'layout' ? 'layout.tsx' : 'package.json',
                        getCurrentSnippet()
                      )
                    }
                    className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-200 text-xs font-mono rounded-xl overflow-x-auto max-h-[380px] leading-relaxed">
                {getCurrentSnippet()}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
