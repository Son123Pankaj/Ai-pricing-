import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MicOff, 
  RefreshCw, 
  Wallet, 
  CheckCircle2, 
  AlertTriangle,
  Zap,
  PhoneOff
} from 'lucide-react';
import { Eyebrow } from './StudioParts';

const SAFETY_PILLARS = [
  {
    icon: Clock,
    title: '10-Minute Hard Call Cutoff',
    badge: 'Duration Watchdog',
    accent: '#0b99a7',
    desc: 'Automated server-side timer disconnects any automated AI call at 10 minutes (configurable per campaign), preventing infinite runaway bills.'
  },
  {
    icon: MicOff,
    title: '15-Second Silence Auto-Disconnect',
    badge: 'VAD Activity Guard',
    accent: '#3b82f6',
    desc: 'Voice Activity Detection checks for dead air. After 6s of silence AI prompts "Are you there?"; after 15s of no response, the call terminates instantly.'
  },
  {
    icon: RefreshCw,
    title: 'Max 25-Turn Loop Protector',
    badge: 'Anti-Hallucination',
    accent: '#8b5cf6',
    desc: 'Prevents prompt looping or repetitive conversational stalling. If a dialogue stalls, the AI politely closes and releases the carrier channel.'
  },
  {
    icon: Wallet,
    title: 'Zero Negative Balance Shield',
    badge: 'Prepaid Protection',
    accent: '#10b981',
    desc: 'Pre-call balance check reserves required minutes. If your wallet credit reaches ₹0.00, calling halts automatically — zero overdraft, zero surprise debt.'
  },
  {
    icon: PhoneOff,
    title: 'Billed on Connected Calls Only',
    badge: 'Telecom Rule',
    accent: '#f59e0b',
    desc: 'Unanswered, busy, invalid numbers, and failed calls cost ₹0.00. Connected calls bill at standard 30-sec minimum, then exact 6-sec increments.'
  },
  {
    icon: Zap,
    title: 'Live Human Warm Transfer',
    badge: 'Instant Escalation',
    accent: '#06b6d4',
    desc: 'When a caller requests a supervisor or complexity threshold triggers, the call transfers in 1-click to human agents with full live transcript context.'
  }
];

export default function CallSafetySection() {
  return (
    <section id="call-safety" className="studio-section call-safety-section" aria-label="AI Call Safety and Billing Protection">
      <div className="studio-container">
        
        {/* Section Heading */}
        <div className="call-safety-header text-center" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 48px' }}>
          <Eyebrow>ZERO RUNAWAY BILL GUARANTEE</Eyebrow>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, margin: '14px 0 16px', lineHeight: 1.2 }}>
            Built-in Auto-Disconnect &amp; <span className="studio-accent">Billing Protection.</span>
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>
            If an AI call doesn&apos;t stop, an unlimited bill would kill your budget. Avyukta guarantees server-side hard cutoffs, dead-air silence detection, and strict prepaid balance shields so you never pay for runaway calls.
          </p>
        </div>

        {/* Safety Grid */}
        <div className="safety-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {SAFETY_PILLARS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="safety-card"
                style={{
                  background: 'linear-gradient(180deg, rgba(11, 26, 44, 0.75) 0%, rgba(5, 14, 25, 0.9) 100%)',
                  border: '1px solid rgba(18, 221, 226, 0.15)',
                  borderRadius: '18px',
                  padding: '26px 24px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Glow pill behind icon */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px'
                }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: `${item.accent}20`,
                    border: `1px solid ${item.accent}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.accent
                  }}>
                    <Icon size={24} />
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: `${item.accent}15`,
                    color: item.accent,
                    border: `1px solid ${item.accent}30`
                  }}>
                    {item.badge}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '19px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '10px',
                  lineHeight: 1.3
                }}>
                  {item.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.65)',
                  lineHeight: 1.6,
                  margin: 0,
                  flexGrow: 1
                }}>
                  {item.desc}
                </p>

                <div style={{
                  marginTop: '18px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#12dde2',
                  fontWeight: 600
                }}>
                  <CheckCircle2 size={14} />
                  <span>Enforced at Telecom Gateway Level</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Assurance Banner */}
        <div style={{
          marginTop: '36px',
          background: 'rgba(18, 221, 226, 0.06)',
          border: '1px solid rgba(18, 221, 226, 0.25)',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(18, 221, 226, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#12dde2',
              flexShrink: 0
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <strong style={{ display: 'block', color: '#ffffff', fontSize: '15px' }}>
                Prepaid Wallet Safety Guarantee
              </strong>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '13px' }}>
                You control the budget. Set custom call duration ceilings, daily spend caps, and alert thresholds in your dashboard.
              </span>
            </div>
          </div>
          <span style={{
            fontSize: '12px',
            color: '#12dde2',
            background: 'rgba(18, 221, 226, 0.12)',
            padding: '6px 14px',
            borderRadius: '999px',
            fontWeight: 700,
            whiteSpace: 'nowrap'
          }}>
            100% Transparent Telecom Billing
          </span>
        </div>

      </div>
    </section>
  );
}
