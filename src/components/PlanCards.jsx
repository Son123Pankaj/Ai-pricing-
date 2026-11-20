import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  ArrowUpRight, 
  Sparkles, 
  Volume2, 
  Pause, 
  Play, 
  Square, 
  ChevronDown,
  PhoneCall, 
  Zap, 
  ShieldCheck, 
  Users,
  Headphones
} from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { PLANS, MODELS, SAMPLES, demoUrl, rateLabel } from '../data/offer';
import { getAssetUrl } from '../utils/assetUrl';
import { claimPlayback, onOtherPlayback } from '../utils/playback';

const CARD_TITLES = {
  bronze: 'AVYUKTA AI BRONZE',
  silver: 'AVYUKTA AI SILVER',
  gold: 'AVYUKTA AI GOLD',
  platinum: 'AVYUKTA AI PLATINUM'
};

const DISPLAY_NAMES = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum'
};

const PLAN_FEATURES = {
  bronze: [
    'Standard clear AI voice assistant',
    '24/7 basic inbound FAQ answering',
    'Automated reminders & confirmation calls',
    'Billed on connected calls only (unanswered ₹0)'
  ],
  silver: [
    'Inbound routine enquiry answering (24/7)',
    'Outbound automated reminder & follow-up calls',
    'Sub-500ms voice turn cadence',
    'Billed on connected calls only (unanswered ₹0)'
  ],
  gold: [
    'Multilingual Hindi, English & regional Indian dialects',
    'Automated lead qualification & booking calls',
    'Natural human turn-taking & live interruption handling',
    '1-click live transfer to human supervisors',
    'Meta WhatsApp post-call summary & link drops'
  ],
  platinum: [
    'Studio-grade expressive brand voices with inflection',
    'High-concurrency outbound (100+ concurrent channels)',
    'Custom Pan-India STD CLI (011, 022, 080) caller ID',
    'Enterprise CRM sync with sentiment intelligence',
    'Dedicated telecom SLA & 99.99% carrier uptime'
  ]
};

export const PLAN_QOS = {
  bronze: {
    fidelity: '8kHz Telephony',
    cadence: '~700ms Cadence',
    engine: 'Standard Intelligible TTS',
    interruption: 'Sequential Prompts',
    languages: 'English & Basic Hindi',
    concurrency: 'Up to 10 Channels',
    useCase: 'Automated OTPs, Alerts & Basic FAQs',
    badge: 'Standard Audio'
  },
  silver: {
    fidelity: '16kHz Wideband',
    cadence: '<500ms Responsive',
    engine: 'Conversational Neural AI',
    interruption: 'Natural Turn-Taking',
    languages: 'English + Standard Hindi',
    concurrency: 'Up to 30 Channels',
    useCase: 'Inbound Reception & Routine Follow-Ups',
    badge: 'Natural Conversational'
  },
  gold: {
    fidelity: '24kHz HD Neural',
    cadence: '<400ms Sub-Second',
    engine: 'Multilingual Indic LLM + Voice',
    interruption: 'Full-Duplex Live Interruption',
    languages: 'Hinglish + 8 Indian Dialects',
    concurrency: 'Up to 75 Channels',
    useCase: 'High-Conversion Outbound Sales Calls',
    badge: '3.4x Sales Conversion'
  },
  platinum: {
    fidelity: '48kHz Studio Master',
    cadence: '<300ms Real-Time',
    engine: 'Human Breath, Empathy & Voice Cloning',
    interruption: 'Sentiment-Adaptive Empathy',
    languages: 'Hyper-Local Accents + Custom Clones',
    concurrency: '100+ Dedicated Channels',
    useCase: 'Executive Brand Ambassador (₹11)',
    badge: 'Executive Brand Trust'
  }
};

// Context-oriented business call metadata mapping (Sir Review Point 5 & 6)
const SAMPLE_DETAILS = {
  // Bronze (bronze-1.mp3 through bronze-4.mp3) - Transactional / Basic Inbound
  'bronze-1': { label: 'Aarav', desc: '[Transactional] Flight & Booking Status Alert', context: 'Transactional Alert' },
  'bronze-2': { label: 'Diya', desc: '[Healthcare Alert] Clinic OPD Appointment Reminder', context: 'Appointment Reminder' },
  'bronze-3': { label: 'Kavya', desc: '[Inbound Info] Working Hours & Location FAQs', context: 'Inbound FAQ' },
  'bronze-4': { label: 'Ananya', desc: '[Delivery Alert] E-Commerce Order Out for Delivery', context: 'Courier Dispatch' },

  // Silver (silver-1.mp3 through silver-8.mp3) - Conversational Inbound & Reminders
  'silver-1': { label: 'Achird', desc: '[Inbound Reception] Front-Desk Routing & Transfer', context: 'Front-Desk Reception' },
  'silver-2': { label: 'Aoede', desc: '[Service Reminder] AMC Maintenance & Renewal Booking', context: 'Service Booking' },
  'silver-3': { label: 'Charon', desc: '[Event RSVP] Corporate Webinar & Summit Invitation', context: 'Event RSVP' },
  'silver-4': { label: 'Kore', desc: '[Verification] Account Activation & Secondary Authentication', context: 'OTP / Verification' },
  'silver-5': { label: 'Leda', desc: '[Support Triage] Customer Care First-Line Triage', context: 'Customer Triage' },
  'silver-6': { label: 'Orus', desc: '[Order Desk] Return & Exchange Verification', context: 'Order Verification' },
  'silver-7': { label: 'Achernar', desc: '[Billing Desk] Invoice Clarification & Payment Query', context: 'Billing Inbound' },
  'silver-8': { label: 'Algenib', desc: '[CSAT Survey] Post-Service Customer Satisfaction', context: 'Survey & Feedback' },

  // Gold (gold-1.mp3 through gold-8.mp3) - High-Conversion Outbound & Multilingual (Most Popular)
  'gold-1': { label: 'Aditya', desc: '[Outbound Cold Calling] Bilingual Hindi/English Sales Pitch', context: 'Outbound Cold Call' },
  'gold-2': { label: 'Ritu', desc: '[EMI Collections] Hindi Payment Reminder + WhatsApp UPI', context: 'EMI & Collections' },
  'gold-3': { label: 'Ashutosh', desc: '[Real Estate Sales] Budget Qualification & Flat Visit Booking', context: 'Real Estate Sales' },
  'gold-4': { label: 'Priya', desc: '[Warm Transfer] High-Value Lead with Live Supervisor Handoff', context: 'Supervisor Handoff' },
  'gold-5': { label: 'Neha', desc: '[Healthcare Care] Post-Consultation Follow-Up & Medicine Guidance', context: 'Healthcare Follow-up' },
  'gold-6': { label: 'Rahul', desc: '[B2B SaaS Closer] Commercial Telecom Budget Discovery', context: 'B2B Sales Pitch' },
  'gold-7': { label: 'Pooja', desc: '[WhatsApp Follow-Up] Post-Call Brochure & Deal Closing', context: 'WhatsApp Closing' },
  'gold-8': { label: 'Rohan', desc: '[Urgent Re-Engagement] Dormant Lead Win-Back & Limited Offer', context: 'Lead Win-Back' },

  // Platinum (platinum-1.mp3 through platinum-8.mp3) - Executive Brand Ambassador & Enterprise High-Trust (₹11)
  'platinum-1': { label: 'Indian Origin 3', desc: '[Executive Ambassador] High-Trust BFSI & Wealth Management', context: 'Executive Sales' },
  'platinum-2': { label: 'Indian Origin 2', desc: '[100+ Channel High-Priority] Urgent Enterprise Announcement', context: 'High-Concurrency Outbound' },
  'platinum-3': { label: 'Indian Origin', desc: '[Sentiment Intelligence] Adaptive Empathy for Customer Escalations', context: 'Crisis Escalation' },
  'platinum-4': { label: 'Roger', desc: '[Global Corporate Desk] International B2B Executive Account Care', context: 'Global Enterprise' },
  'platinum-5': { label: 'Sarah', desc: '[Luxury Concierge] VIP Hospitality & High-Touch Inbound Desk', context: 'VIP Concierge' },
  'platinum-6': { label: 'Laura', desc: '[Expressive Empathy] Patient Oncology & Care Coordination', context: 'Sensitive Care' },
  'platinum-7': { label: 'Charlie', desc: '[Enterprise SaaS Closer] Multi-Stakeholder Enterprise Contract', context: 'Strategic Closing' },
  'platinum-8': { label: 'George', desc: '[Dedicated Carrier SLA] Mission-Critical 99.99% Telecom Core Calling', context: 'Carrier Core SLA' }
};

const formatTime = (secs) => {
  if (isNaN(secs) || !secs) return '00:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function PlanCards({ navigateTo }) {
  const [model, setModel] = useState('modular');
  const [showQosTable, setShowQosTable] = useState(false);
  const [openDropdownCard, setOpenDropdownCard] = useState(null); // 'bronze' | 'silver' | 'gold' | 'platinum' | null
  const [activeSampleByCard, setActiveSampleByCard] = useState({
    bronze: 'bronze-1',
    silver: 'silver-1',
    gold: 'gold-1',
    platinum: 'platinum-1'
  });
  const [playbackState, setPlaybackState] = useState({
    cardId: null,      // 'bronze' | 'silver' | 'gold' | 'platinum' | null
    sampleId: null,
    status: 'idle',    // 'idle' | 'playing' | 'paused'
    currentTime: 0,
    duration: 0
  });

  const audioRef = useRef(null);

  // Audio event listeners
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setPlaybackState(prev => ({
      ...prev,
      currentTime: audioRef.current.currentTime,
      duration: audioRef.current.duration || prev.duration
    }));
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setPlaybackState(prev => ({
      ...prev,
      duration: audioRef.current.duration || 0
    }));
  };

  const handleAudioEnded = () => {
    setPlaybackState(prev => ({
      ...prev,
      status: 'idle',
      currentTime: 0
    }));
  };

  // Play genuine MP3 from /samples/ folder
  const playSample = async (cardId, sampleItem) => {
    if (!audioRef.current || !sampleItem) return;

    claimPlayback('plancards');

    const sampleSrc = getAssetUrl(sampleItem.src);
    if (audioRef.current.src !== sampleSrc) {
      audioRef.current.src = sampleSrc;
      audioRef.current.currentTime = 0;
    }

    setActiveSampleByCard(prev => ({ ...prev, [cardId]: sampleItem.id }));
    setPlaybackState({
      cardId,
      sampleId: sampleItem.id,
      status: 'playing',
      currentTime: 0,
      duration: audioRef.current.duration || 0
    });

    try {
      await audioRef.current.play();
    } catch (e) {
      if (e.name !== 'AbortError') {
        setPlaybackState(prev => ({ ...prev, status: 'idle' }));
      }
    }
  };

  // Pause playback
  const pauseSample = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setPlaybackState(prev => ({ ...prev, status: 'paused' }));
  };

  // Resume playback
  const resumeSample = async () => {
    if (!audioRef.current) return;
    claimPlayback('plancards');
    setPlaybackState(prev => ({ ...prev, status: 'playing' }));
    try {
      await audioRef.current.play();
    } catch (e) {
      setPlaybackState(prev => ({ ...prev, status: 'paused' }));
    }
  };

  // Stop playback completely and reset
  const stopSample = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlaybackState(prev => ({ ...prev, status: 'idle', currentTime: 0 }));
  };

  // Toggle Dropdown for a specific card
  const handleToggleDropdown = (planId) => {
    if (openDropdownCard === planId) {
      // Closing this dropdown: stop audio if this card was playing
      if (playbackState.cardId === planId) {
        stopSample();
      }
      setOpenDropdownCard(null);
    } else {
      // Opening another card's dropdown: stop any existing audio immediately
      stopSample();
      setOpenDropdownCard(planId);
    }
  };

  // Stop audio when another component plays audio globally
  useEffect(() => {
    const unregister = onOtherPlayback('plancards', () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlaybackState(prev => ({ ...prev, status: 'paused' }));
    });
    return () => {
      unregister();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle click outside to close dropdown and stop audio cleanly
  useEffect(() => {
    if (!openDropdownCard) return;

    const handleClickOutside = (e) => {
      if (!e.target.closest('.card-voice-dropdown-wrapper')) {
        stopSample();
        setOpenDropdownCard(null);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        stopSample();
        setOpenDropdownCard(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdownCard]);

  const local = (event, path) => {
    if (!navigateTo) return;
    event.preventDefault();
    if (path.startsWith('/#')) {
      const targetId = path.slice(2);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState({}, '', path);
        return;
      }
    }
    navigateTo(path);
  };

  return (
    <section id="pricing" className="studio-plan-section" aria-label="Transparent AI Voice & Call Pricing">
      <span id="plans-section" className="section-anchor" aria-hidden="true" style={{ position: 'relative', top: '-86px', display: 'block', visibility: 'hidden' }} />
      {/* Hidden real audio player streaming genuine prerecorded MP3s from /samples/ */}
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
        onError={() => setPlaybackState(prev => ({ ...prev, status: 'idle' }))}
        preload="none"
      />

      <div className="studio-container">
        
        <div className="studio-plan-heading">
          <div>
            <h2>AI Pricing <span className="studio-accent">Plans.</span></h2>
            <p>Choose the right voice tier for your callers. Listen to genuine recorded samples, compare verified call features, and request a tailored quote.</p>
          </div>
        </div>

        {/* QoS Value Guidance Banner (Sir Review Point 3 & 4) */}
        <div className="qos-retention-banner">
          <div className="qos-banner-body">
            <div className="qos-banner-icon-box">
              <Headphones size={22} />
            </div>
            <div className="qos-banner-text">
              <h4 className="qos-banner-title">
                Why Upgrade to Gold &amp; Platinum? Real Acoustic &amp; Conversion QoS.
              </h4>
              <p className="qos-banner-desc">
                Lower tiers use standard telephony TTS ideal for automated OTPs and reminders. For high-conversion outbound cold calling and human-grade customer care, Gold &amp; Platinum deliver 24kHz HD neural audio, natural breath cadence, and live customer interruption that callers can&apos;t distinguish from human agents — delivering 3.4x higher sales booking rates.
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="qos-toggle-btn"
            onClick={() => setShowQosTable(prev => !prev)}
            aria-expanded={showQosTable}
          >
            <span>{showQosTable ? 'Hide QoS Parameters ↑' : 'Compare QoS Parameters ↓'}</span>
          </button>
        </div>

        {/* Collapsible Quality of Service (QoS) Parameter Matrix */}
        {showQosTable && (
          <div className="qos-matrix-card animate-fade-in" role="region" aria-label="Quality of Service Parameter Comparison">
            <div className="qos-table-scroll-wrap">
              <table className="qos-comparison-table">
                <thead>
                  <tr>
                    <th>Quality Parameter</th>
                    <th>Bronze (₹3.50/m)</th>
                    <th>Silver (₹5.00/m)</th>
                    <th className="th-featured">Gold · Recommended (₹9.00/m)</th>
                    <th>Platinum · Executive (₹11.00/m)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Voice Synthesis Engine</strong></td>
                    <td>Standard Intelligible TTS</td>
                    <td>Conversational Neural AI</td>
                    <td className="td-featured">Multilingual Indic LLM + Neural</td>
                    <td>Emotion, Breath &amp; Voice Cloning</td>
                  </tr>
                  <tr>
                    <td><strong>Audio Fidelity / Sampling</strong></td>
                    <td>8kHz Standard Telephony</td>
                    <td>16kHz Wideband Voice</td>
                    <td className="td-featured"><strong>24kHz HD Studio Voice</strong></td>
                    <td><strong>48kHz Ultra-Expressive Master</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Response Turn Latency</strong></td>
                    <td>~700ms Sequential Cadence</td>
                    <td>&lt;500ms Responsive Cadence</td>
                    <td className="td-featured">&lt;400ms Sub-Second Natural</td>
                    <td>&lt;300ms Real-Time Human Cadence</td>
                  </tr>
                  <tr>
                    <td><strong>Interruption &amp; Turn-Taking</strong></td>
                    <td>Sequential Prompts</td>
                    <td>Natural Turn-Taking</td>
                    <td className="td-featured">Full-Duplex Live Interruption</td>
                    <td>Sentiment-Adaptive Empathy Cadence</td>
                  </tr>
                  <tr>
                    <td><strong>Language &amp; Dialect Depth</strong></td>
                    <td>English &amp; Basic Hindi</td>
                    <td>English + Standard Hindi</td>
                    <td className="td-featured">Hinglish + 8 Indian Dialects</td>
                    <td>Hyper-Local Accents + Custom Clones</td>
                  </tr>
                  <tr>
                    <td><strong>Dedicated Channel Concurrency</strong></td>
                    <td>Up to 10 Channels</td>
                    <td>Up to 30 Channels</td>
                    <td className="td-featured">Up to 75 Channels</td>
                    <td>100+ Dedicated Outbound Channels</td>
                  </tr>
                  <tr>
                    <td><strong>Recommended Business Role</strong></td>
                    <td>OTPs, Alerts &amp; Simple FAQs</td>
                    <td>Inbound Reception &amp; Reminders</td>
                    <td className="td-featured"><strong>Outbound Cold Calls &amp; Sales Deals</strong></td>
                    <td><strong>Executive Brand Ambassador (₹11)</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* The 4 Plan Cards: BRONZE | SILVER | GOLD | PLATINUM */}
        <div className="studio-plan-grid conversion-plan-grid">
          {PLANS.map(plan => {
            const isGold = plan.id === 'gold';
            const isDropdownOpen = openDropdownCard === plan.id;
            const qosInfo = PLAN_QOS[plan.id] || PLAN_QOS.silver;
            
            // Available genuine audio samples from /samples/ manifest for this plan
            const tierSamples = SAMPLES.filter(s => s.plan === plan.id);
            const currentSampleId = activeSampleByCard[plan.id] || tierSamples[0]?.id;
            const currentSample = tierSamples.find(s => s.id === currentSampleId) || tierSamples[0];

            const isCardPlaying = playbackState.cardId === plan.id && playbackState.status === 'playing';
            const isCardPaused = playbackState.cardId === plan.id && playbackState.status === 'paused';
            const isCardActive = isCardPlaying || isCardPaused;

            return (
              <article 
                id={`plan-${plan.id}`} 
                key={plan.id} 
                className={`studio-plan-card plan-tier-${plan.id} ${isGold ? 'featured' : ''} ${isDropdownOpen ? 'dropdown-active' : ''} ${isCardActive ? 'has-audio-playing' : ''}`}
              >
                {isGold && (
                  <div className="plan-recommended-badge">
                    <Sparkles size={13} />
                    <span>RECOMMENDED · MOST POPULAR</span>
                  </div>
                )}

                <div className="studio-plan-card-top">
                  <span className="plan-purpose">{plan.label}</span>
                  <div className="studio-plan-symbol" aria-hidden="true">{plan.icon}</div>
                  <h3 className="plan-main-title">{CARD_TITLES[plan.id] || `AVYUKTA AI ${plan.name.toUpperCase()}`}</h3>
                  <p>{plan.description}</p>

                  {/* QoS Badge Strip */}
                  <div className="card-qos-pills-row">
                    <span className="card-qos-pill card-qos-fidelity" title="Audio Fidelity">
                      {qosInfo.fidelity.split(' ')[0]}
                    </span>
                    <span className="card-qos-pill card-qos-cadence" title="Response Latency">
                      {qosInfo.cadence.split(' ')[0]}
                    </span>
                    <span className="card-qos-pill card-qos-usecase" title="Optimal Business Job">
                      {qosInfo.badge}
                    </span>
                  </div>
                </div>

                <div className="studio-plan-price">
                  <strong><small>₹</small>{rateLabel(plan[model])}</strong>
                  <span>per connected minute · indicative · GST extra</span>
                </div>

                <div className="studio-plan-divider" />

                {/* Verified Call-Related Features Checklist (Core Plan Content) */}
                <ul className="plan-feature-list">
                  {(PLAN_FEATURES[plan.id] || plan.features).map(feature => (
                    <li key={feature}>
                      <Check size={15} className="plan-check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Independent Card-Wise Voice Dropdown Component (Below Content) */}
                <div className="card-voice-dropdown-wrapper">
                  <button
                    type="button"
                    className={`card-voice-dropdown-btn ${isDropdownOpen ? 'active' : ''} ${isCardActive ? 'has-audio' : ''}`}
                    onClick={() => handleToggleDropdown(plan.id)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    aria-controls={`voice-menu-${plan.id}`}
                    title={`Open ${DISPLAY_NAMES[plan.id]} Original Voice Samples`}
                  >
                    <div className="dropdown-btn-main">
                      <Volume2 size={16} className={`voice-icon ${isCardPlaying ? 'voice-icon-pulsing' : ''}`} />
                      <span className="dropdown-btn-label">
                        {isCardPlaying 
                          ? `Playing: ${currentSample?.name} (${formatTime(playbackState.currentTime)} / ${formatTime(playbackState.duration)})`
                          : isCardPaused 
                            ? `Paused · ${currentSample?.name}`
                            : `Original Voices · ${DISPLAY_NAMES[plan.id]} (${currentSample?.name})`
                        }
                      </span>
                    </div>

                    <div className="dropdown-btn-end">
                      {isCardPlaying && (
                        <span className="voice-equalizer-dots" aria-hidden="true">
                          <span /><span /><span />
                        </span>
                      )}
                      <ChevronDown size={15} className={`dropdown-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                    </div>
                  </button>

                  {/* Dropdown Menu with Original Prerecorded MP3 Voices */}
                  {isDropdownOpen && (
                    <div 
                      id={`voice-menu-${plan.id}`}
                      className="card-voice-dropdown-menu animate-dropdown-fade"
                      role="region"
                      aria-label={`${CARD_TITLES[plan.id]} Original Voice Controls`}
                    >
                      <div className="dropdown-menu-header">
                        <span className="dropdown-header-badge">
                          <Sparkles size={12} /> ORIGINAL SAMPLES · {DISPLAY_NAMES[plan.id].toUpperCase()}
                        </span>
                        <span className="dropdown-header-rate">
                          {tierSamples.length} Genuine Recordings
                        </span>
                      </div>

                      {/* List of Real Voice Audio Samples from /samples/ */}
                      <div className="dropdown-options-list" role="radiogroup" aria-label={`${DISPLAY_NAMES[plan.id]} Voice Options`}>
                        {tierSamples.map(sampleItem => {
                          const isSelected = currentSampleId === sampleItem.id;
                          const isThisPlaying = isSelected && isCardPlaying;
                          const details = SAMPLE_DETAILS[sampleItem.id] || { desc: `${sampleItem.tier} Voice Sample` };

                          return (
                            <button
                              key={sampleItem.id}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              className={`dropdown-option-row ${isSelected ? 'selected' : ''}`}
                              onClick={() => playSample(plan.id, sampleItem)}
                              title={`Listen to original audio: ${sampleItem.name} (${sampleItem.src.replace('/samples/', '')})`}
                            >
                              <div className="option-radio-dot">
                                <span className={`dot-inner ${isSelected ? 'active' : ''}`} />
                              </div>
                              <div className="option-text-group">
                                <div className="option-title-row">
                                  <strong>{sampleItem.name}</strong>
                                  <span className="sample-file-tag">{sampleItem.src.replace('/samples/', '')}</span>
                                  {isThisPlaying && (
                                    <span className="live-playing-badge">PLAYING</span>
                                  )}
                                </div>
                                <p className="option-desc">{details.desc}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Dropdown Audio Progress Track & Toolbar */}
                      <div className="dropdown-audio-toolbar">
                        <div className="audio-status-readout">
                          <span className={`status-indicator-dot ${isCardPlaying ? 'playing' : isCardPaused ? 'paused' : 'idle'}`} />
                          <span className="status-readout-text">
                            {isCardPlaying 
                              ? `Playing: ${currentSample?.name}`
                              : isCardPaused 
                                ? `Paused (${currentSample?.name})`
                                : `Select voice to play`
                            }
                          </span>
                        </div>

                        <div className="audio-control-buttons-group">
                          {!isCardPlaying && !isCardPaused && (
                            <button
                              type="button"
                              className="ctrl-btn play primary"
                              onClick={() => playSample(plan.id, currentSample)}
                              aria-label={`Play ${currentSample?.name} voice`}
                              title="Play"
                            >
                              <Play size={14} /> <span>Play</span>
                            </button>
                          )}

                          {isCardPlaying && (
                            <button
                              type="button"
                              className="ctrl-btn pause"
                              onClick={pauseSample}
                              aria-label={`Pause ${currentSample?.name} voice`}
                              title="Pause"
                            >
                              <Pause size={14} /> <span>Pause</span>
                            </button>
                          )}

                          {isCardPaused && (
                            <button
                              type="button"
                              className="ctrl-btn resume primary"
                              onClick={resumeSample}
                              aria-label={`Resume ${currentSample?.name} voice`}
                              title="Resume"
                            >
                              <Play size={14} /> <span>Resume</span>
                            </button>
                          )}

                          <button
                            type="button"
                            className="ctrl-btn stop"
                            disabled={!isCardPlaying && !isCardPaused}
                            onClick={stopSample}
                            aria-label={`Stop ${currentSample?.name} voice`}
                            title="Stop"
                          >
                            <Square size={12} /> <span>Stop</span>
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar & Timing */}
                      <div className="dropdown-track-wrap">
                        <div className="dropdown-time-strip">
                          <span>{formatTime(isCardActive ? playbackState.currentTime : 0)}</span>
                          <span className="sample-file-pill">{currentSample?.src.replace('/samples/', '')}</span>
                          <span>{formatTime(isCardActive ? playbackState.duration : 0)}</span>
                        </div>
                        <div className="dropdown-track-bar">
                          <div 
                            className="dropdown-track-fill" 
                            style={{ 
                              width: `${isCardActive && playbackState.duration ? (playbackState.currentTime / playbackState.duration) * 100 : 0}%` 
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="plan-conversion-actions">
                  <a 
                    className={`studio-plan-cta ${isGold ? 'primary' : ''}`} 
                    href={demoUrl(plan.id, currentSample?.name)} 
                    onClick={event => local(event, demoUrl(plan.id, currentSample?.name))}
                  >
                    <span>Request {DISPLAY_NAMES[plan.id] || plan.name} demo</span>
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Call Telephony & Voice Infrastructure Trust Banner */}
        <div className="call-telephony-highlights" aria-label="Core call infrastructure features">
          <div className="call-highlight-item">
            <div className="call-highlight-icon"><PhoneCall size={20} /></div>
            <div>
              <strong>Pan-India Local STD CLI</strong>
              <p>Display trusted 011, 022, 080 caller ID across Indian telecom circles so callers pick up.</p>
            </div>
          </div>

          <div className="call-highlight-item">
            <div className="call-highlight-icon"><Zap size={20} /></div>
            <div>
              <strong>Sub-500ms Voice Cadence</strong>
              <p>Conversational AI engine with natural pacing that accommodates mid-sentence interruptions.</p>
            </div>
          </div>

          <div className="call-highlight-item">
            <div className="call-highlight-icon"><ShieldCheck size={20} /></div>
            <div>
              <strong>Connected-Only Billing</strong>
              <p>Only answered calls are billed. Unanswered, busy, and failed calls cost ₹0.</p>
            </div>
          </div>

          <div className="call-highlight-item">
            <div className="call-highlight-icon"><Users size={20} /></div>
            <div>
              <strong>1-Click Human Handoff</strong>
              <p>Seamlessly route high-intent callers to available live supervisors without disconnection.</p>
            </div>
          </div>
        </div>

        <div className="custom-offer">
          <div>
            <strong>Need high volume or a tailored enterprise telecom setup?</strong>
            <p>Discuss dedicated SIP trunks, carrier DIDs, custom CRM connectors, and SLA commitments with our engineers.</p>
          </div>
          <a href="/contact" onClick={event => local(event, '/contact')}>
            Talk to our team <ArrowUpRight size={17} />
          </a>
        </div>

      </div>
    </section>
  );
}
