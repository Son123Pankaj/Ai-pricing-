import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Phone, 
  Bot, 
  Zap, 
  Database, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { getAssetUrl } from '../utils/assetUrl';

const FEATURE_CHIPS = [
  { id: 'ai-voice', label: 'AI Voice Calling', icon: Bot },
  { id: 'cloud-dialer', label: 'Smart Cloud Dialer', icon: Zap },
  { id: 'crm-sync', label: 'CRM Integration', icon: Database },
  { id: 'whatsapp-comm', label: 'WhatsApp Communication', icon: MessageSquare }
];

const CHANNELS = [
  { 
    id: 'Voice', 
    label: 'Voice', 
    desc: 'Qualify leads and handle inbound calls with autonomous conversational AI voice agents with sub-500ms cadence.' 
  },
  { 
    id: 'WhatsApp', 
    label: 'WhatsApp', 
    desc: 'Continue the conversation with Meta-integrated WhatsApp automated follow-ups and payment alerts.' 
  },
  { 
    id: 'Email', 
    label: 'Email', 
    desc: 'Send call transcripts, summaries, and action steps directly from the unified lead workspace.' 
  },
  { 
    id: 'Dialer', 
    label: 'Dialer', 
    desc: 'Connect leads and teammates using the enterprise cloud auto dialer platform.' 
  }
];

export default function HeroSection({ navigateTo }) {
  const [activeChannel, setActiveChannel] = useState('Voice');

  const handleNav = (e, path) => {
    e.preventDefault();
    if (path.startsWith('/#') || path.startsWith('#')) {
      const targetId = path.replace(/^\/?#/, '');
      const elem = document.getElementById(targetId) || 
        (targetId === 'pricing' ? document.getElementById('plans-section') : null);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState({}, '', `#${targetId}`);
        return;
      }
    }
    if (navigateTo) {
      navigateTo(path);
    } else {
      window.location.href = path;
    }
  };

  const currentChannel = CHANNELS.find(c => c.id === activeChannel) || CHANNELS[0];

  return (
    <section 
      id="hero" 
      className="landing-hero avyukta-hero-section" 
      aria-label="Avyukta Intellicall Enterprise AI Communication Hero"
    >
      {/* Exact Reference Hero Image (Right side, seamlessly blended) */}
      <img 
        className="landing-hero-scene hero-caller-image" 
        src={getAssetUrl('/hero-premium.webp')} 
        alt="Avyukta AI Caller Professional with Headset" 
        fetchPriority="high" 
        loading="eager" 
        decoding="async"
      />

      {/* Futuristic Electric Circuit Pulse Overlay on Headset / Face */}
      <div className="ai-face-circuit-overlay" aria-hidden="true">
        <svg className="electric-circuit-svg" viewBox="0 0 360 440" fill="none">
          <path 
            d="M 60 160 L 110 160 L 145 195 L 200 195 L 230 225 L 280 225" 
            stroke="#00f2fe" 
            strokeWidth="2" 
            strokeDasharray="6 4" 
            className="electric-circuit-path circuit-pulse-1" 
          />
          <path 
            d="M 100 120 L 140 120 L 175 155 L 225 155 L 255 185 L 305 185" 
            stroke="#38bdf8" 
            strokeWidth="1.5" 
            strokeDasharray="8 6" 
            className="electric-circuit-path circuit-pulse-2" 
          />
          <path 
            d="M 130 240 L 170 240 L 205 275 L 265 275 L 295 305" 
            stroke="#10b981" 
            strokeWidth="1.5" 
            strokeDasharray="5 5" 
            className="electric-circuit-path circuit-pulse-3" 
          />
          <circle cx="60" cy="160" r="3.5" fill="#00f2fe" className="circuit-node" />
          <circle cx="145" cy="195" r="3.5" fill="#00f2fe" className="circuit-node" />
          <circle cx="230" cy="225" r="4" fill="#38bdf8" className="circuit-node node-active" />
          <circle cx="280" cy="225" r="3" fill="#00f2fe" className="circuit-node" />
          <circle cx="140" cy="120" r="3" fill="#38bdf8" className="circuit-node" />
          <circle cx="225" cy="155" r="4" fill="#38bdf8" className="circuit-node node-active" />
          <circle cx="205" cy="275" r="3.5" fill="#10b981" className="circuit-node" />
          <circle cx="265" cy="275" r="3" fill="#10b981" className="circuit-node" />
        </svg>
      </div>

      {/* Main Content Wrap */}
      <div className="landing-wrap landing-hero-content hero-inner-container">
        <div className="hero-content-col">
          
          {/* Top Badge */}
          <p className="landing-kicker hero-badge-pill" role="status">
            <span className="kicker-dot" aria-hidden="true" />
            <span className="hero-badge-text">AI-POWERED BUSINESS COMMUNICATION</span>
          </p>

          {/* Main Heading */}
          <h1 className="hero-main-heading">
            Smarter Calls.{' '}
            <em className="hero-heading-highlight">
              Stronger Customer Connections.
            </em>
          </h1>

          {/* Description */}
          <p className="hero-lead-text hero-description-text">
            Bring AI Voice Calling, Cloud Dialers, WhatsApp and CRM together in one 
            connected communication platform. Engage leads, manage customer conversations 
            and simplify follow-ups with Avyukta Intellicall.
          </p>

          {/* Feature Highlights: 4 Feature Chips */}
          <div className="hero-feature-chips-grid" role="list" aria-label="Key Communication Capabilities">
            {FEATURE_CHIPS.map(chip => (
              <div key={chip.id} className="hero-feature-chip" role="listitem">
                <div className="hero-chip-icon-box" aria-hidden="true">
                  <chip.icon size={16} />
                </div>
                <span className="hero-chip-label">{chip.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Actions */}
          <div className="landing-actions hero-cta-actions-row">
            <a 
              href="/#pricing"
              className="landing-button hero-btn-primary"
              onClick={e => handleNav(e, '/#pricing')}
              aria-label="Explore AI Solutions"
            >
              <span>Explore AI Solutions</span>
              <ArrowUpRight size={18} className="hero-btn-arrow-icon" />
            </a>

            <a 
              href="tel:+918560000600"
              className="landing-button secondary hero-btn-secondary"
              aria-label="Talk to an Expert on +91 85600 00600"
              title="Call +91 85600 00600"
            >
              <Phone size={17} className="hero-btn-phone-icon" />
              <span>Talk to an Expert</span>
            </a>
          </div>

          {/* SLA and Carrier Trust Indicators */}
          <div className="hero-trust-indicators" aria-label="Service highlights">
            <div className="trust-indicator-item">
              <CheckCircle2 size={15} className="trust-icon" />
              <span>Sub-500ms Turn Cadence</span>
            </div>
            <div className="trust-indicator-item">
              <CheckCircle2 size={15} className="trust-icon" />
              <span>Billed on Connected Calls Only</span>
            </div>
            <div className="trust-indicator-item">
              <ShieldCheck size={15} className="trust-icon" />
              <span>99.99% Carrier Grade Telephony</span>
            </div>
          </div>

          {/* Interactive Multi-channel Switching Strip */}
          <div className="landing-hero-channels" role="tablist" aria-label="Explore communication channels">
            {CHANNELS.map(ch => (
              <button 
                key={ch.id} 
                type="button" 
                role="tab"
                aria-selected={activeChannel === ch.id}
                className={activeChannel === ch.id ? 'active' : ''} 
                onClick={() => setActiveChannel(ch.id)}
              >
                {ch.label}
              </button>
            ))}
          </div>
          <p className="landing-channel-detail" aria-live="polite">
            {currentChannel.desc}
          </p>

        </div>
      </div>
    </section>
  );
}
