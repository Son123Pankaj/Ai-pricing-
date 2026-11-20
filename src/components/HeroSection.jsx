import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowUpRight, 
  Phone, 
  Bot, 
  Zap, 
  Database, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck,
  Headphones,
  X
} from 'lucide-react';
import VoiceLibrary from './VoiceLibrary';
import heroCallerImg from '../assets/avyukta-ai-caller-hero.png';
import { getAssetUrl } from '../utils/assetUrl';

const FEATURE_CHIPS = [
  { id: 'ai-voice', label: 'AI Voice Calling', icon: Bot },
  { id: 'cloud-dialer', label: 'Smart Cloud Dialer', icon: Zap },
  { id: 'crm-sync', label: 'CRM Integration', icon: Database },
  { id: 'whatsapp-comm', label: 'WhatsApp Communication', icon: MessageSquare }
];

export default function HeroSection({ navigateTo }) {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const leaveTimerRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsVoiceOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = setTimeout(() => {
      setIsVoiceOpen(false);
    }, 280);
  }, []);

  const handleToggle = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setIsVoiceOpen(prev => !prev);
  }, []);

  const handleClose = useCallback(() => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    setIsVoiceOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isVoiceOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVoiceOpen, handleClose]);

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

  const callerImgSrc = heroCallerImg || getAssetUrl('/avyukta-ai-caller-hero.png');

  return (
    <section 
      id="hero" 
      className="hero-voice-studio-section" 
      aria-label="Avyukta Intellicall Enterprise AI Communication Hero"
    >
      {/* Decorative Subtle Background Grid & Glows */}
      <div className="hero-grid-pattern" aria-hidden="true" />
      <div className="hero-halo-light hero-halo-left" aria-hidden="true" />
      <div className="hero-halo-light hero-halo-right" aria-hidden="true" />

      <div className="hero-content-container">
        <div className="hero-two-col-layout">
          
          {/* ========================================================= */}
          {/* 50% LEFT COLUMN: Content, Headline, Chips, CTAs, Trust   */}
          {/* ========================================================= */}
          <div className="hero-left-col">
            
            {/* Top AI Badge */}
            <div className="hero-top-badge" role="status">
              <span className="hero-badge-dot" aria-hidden="true" />
              <span className="hero-badge-title">AI-POWERED BUSINESS COMMUNICATION</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-title">
              Smarter Calls.{' '}
              <span className="hero-title-accent">
                Stronger Customer Connections.
              </span>
            </h1>

            {/* Description */}
            <p className="hero-desc">
              Bring AI Voice Calling, Cloud Dialers, WhatsApp and CRM together in one 
              connected communication platform. Engage leads, manage customer conversations 
              and simplify follow-ups with Avyukta Intellicall.
            </p>

            {/* Four Feature Chips */}
            <div className="hero-feature-chips" role="list" aria-label="Core Capabilities">
              {FEATURE_CHIPS.map(chip => (
                <div key={chip.id} className="hero-chip-item" role="listitem">
                  <span className="hero-chip-icon" aria-hidden="true">
                    <chip.icon size={16} />
                  </span>
                  <span className="hero-chip-text">{chip.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <a 
                href="/#pricing" 
                className="hero-primary-cta"
                onClick={e => handleNav(e, '/#pricing')}
                aria-label="Explore AI Solutions"
              >
                <span>Explore AI Solutions</span>
                <ArrowUpRight size={17} />
              </a>

              <a 
                href="tel:+918560000600"
                className="hero-secondary-cta"
                aria-label="Talk to an Expert on +91 85600 00600"
                title="Call +91 85600 00600"
              >
                <Phone size={16} />
                <span>Talk to an Expert</span>
              </a>
            </div>

            {/* Trust Highlights */}
            <div className="hero-trust-row" aria-label="Service highlights">
              <div className="hero-trust-tag">
                <CheckCircle2 size={15} />
                <span>Sub-500ms Turn Cadence</span>
              </div>
              <div className="hero-trust-tag">
                <CheckCircle2 size={15} />
                <span>Billed on Connected Calls Only</span>
              </div>
              <div className="hero-trust-tag">
                <ShieldCheck size={15} />
                <span>99.99% Carrier Grade Telephony</span>
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* 54% RIGHT COLUMN: Enlarged AI Caller & Interactive Studio */}
          {/* ========================================================= */}
          <div className="hero-right-col">
            <div 
              className={`hero-interactive-stage ${isVoiceOpen ? 'overlay-active' : ''}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              
              {/* UPPER AREA: Enlarged AI Caller Portrait (25-40% Scale Increase, 100% Unobstructed) */}
              <div className="hero-caller-portrait-stage">
                <div className="hero-girl-halo" aria-hidden="true" />
                <div className="hero-girl-frame">
                  <img 
                    src={callerImgSrc}
                    alt="Avyukta AI Caller Specialist with Headset"
                    className="hero-girl-img"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* TRIGGER AREA: Premium "Explore AI Voices" Button below Girl */}
              <div className="hero-trigger-wrap">
                <button
                  type="button"
                  className={`hero-voice-preview-trigger ${isVoiceOpen ? 'active' : ''}`}
                  onClick={handleToggle}
                  aria-expanded={isVoiceOpen}
                  aria-controls="voice-samples"
                  aria-label="Explore AI Voices"
                >
                  <span className="trigger-icon-pill" aria-hidden="true">
                    <Headphones size={17} />
                  </span>
                  <span className="trigger-label">Explore AI Voices</span>
                  <span className="trigger-badge-live">Live Preview</span>
                </button>
              </div>

              {/* OVERLAY AREA: Full Voice Studio Card displayed over the Girl on Hover / Tap */}
              <div 
                id="voice-samples" 
                className={`hero-voice-studio-wrap hero-voice-studio-overlay ${isVoiceOpen ? 'is-open' : ''}`}
                role="region"
                aria-label="Interactive AI Voice Studio"
                aria-hidden={!isVoiceOpen}
              >
                <div className="voice-studio-decorative-tilt" aria-hidden="true" />
                <div className="voice-studio-card-inner">
                  <div className="overlay-top-utility-bar">
                    <div className="overlay-badge-wrap">
                      <span className="overlay-live-dot" aria-hidden="true" />
                      <span className="overlay-badge-text">VOICE STUDIO OVERLAY</span>
                    </div>
                    <button
                      type="button"
                      className="overlay-dismiss-btn"
                      onClick={handleClose}
                      aria-label="Close Voice Studio"
                      title="Close Voice Studio (Esc)"
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <VoiceLibrary navigateTo={navigateTo} isVisible={isVoiceOpen} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
