import React from 'react';
import { 
  Landmark, 
  Headphones, 
  HeartPulse, 
  GraduationCap, 
  ShoppingCart, 
  Building2, 
  LifeBuoy,
  CheckCircle2,
  ArrowRight,
  Workflow
} from 'lucide-react';
import { SectionHeading } from './StudioParts';
import VoiceSamplePlayer from './VoiceSamplePlayer';

const INDUSTRIES = [
  {
    id: 'banking',
    title: 'Banking & Financial Services',
    icon: Landmark,
    accent: '#0284c7', // Sky Blue
    badge: 'BFSI & Fintech',
    description: 'Automate loan eligibility checks, payment reminder calls, EMI updates, and secure transaction confirmations.',
    highlight: 'Instant Payment Follow-ups',
    voiceDemo: {
      title: 'EMI & Payment Collection Call',
      scenario: 'Polite Hindi reminder for overdue EMI, customer authentication, and instant WhatsApp payment link drop.',
      src: '/samples/gold-2.mp3'
    },
    bpaWorkflow: {
      tag: 'BFSI Collections BPA',
      steps: [
        { num: '01', title: 'Overdue Webhook', desc: 'Core Banking / LOS detects overdue EMI & triggers automated campaign' },
        { num: '02', title: 'AI Voice Auth & Negotiation', desc: 'Voice bot verifies DOB & agrees on payment commitment in Hindi/English' },
        { num: '03', title: 'Instant WhatsApp UPI', desc: 'Dispatches secure payment link with timestamped token via WhatsApp API' },
        { num: '04', title: 'Ledger Disposition', desc: 'Marks PTP in CRM, updates ledger, and pauses automated dialer' }
      ]
    }
  },
  {
    id: 'bpo',
    title: 'BPO & Call Centers',
    icon: Headphones,
    accent: '#8b5cf6', // Violet
    badge: 'High Concurrency',
    description: 'High-volume outbound predictive dialing, live agent handoff, sub-500ms voice cadence, and real-time call disposition.',
    highlight: '100+ Concurrent Channels',
    voiceDemo: {
      title: 'AI Outbound Predictive Sales',
      scenario: 'AI sales caller dials prospect, pitches business telephony, qualifies budget, and books callback in natural Hindi & English.',
      src: '/samples/gold-1.mp3'
    },
    bpaWorkflow: {
      tag: 'Predictive Sales BPA',
      steps: [
        { num: '01', title: 'Campaign Blast', desc: 'Predictive cloud dialer spins 500+ contacts concurrently' },
        { num: '02', title: 'AI Pitch & CAD Screening', desc: 'Sub-500ms voice cadence pitches and filters answering machines in 1.2s' },
        { num: '03', title: 'Live Agent Handoff', desc: 'Warm SIP transfer to senior closer within 200ms of purchase intent' },
        { num: '04', title: 'Disposition & Audio Sync', desc: 'Call transcript, sentiment score & full audio logged into CRM' }
      ]
    }
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Clinics',
    icon: HeartPulse,
    accent: '#e11d48', // Rose
    badge: 'Clinical Telephony',
    description: 'Patient appointment reminders, doctor OPD schedule management, diagnostic test alerts, and post-consultation care calls.',
    highlight: 'Reduce Patient No-Shows',
    voiceDemo: {
      title: 'OPD Appointment Confirmation',
      scenario: 'AI assistant verifies patient details, confirms doctor consultation time, and sends clinic directions on WhatsApp.',
      src: '/samples/gold-5.mp3'
    },
    bpaWorkflow: {
      tag: 'Clinic OPD BPA',
      steps: [
        { num: '01', title: 'HMS 24h Trigger', desc: 'Hospital management system triggers reminder 24 hrs prior to appointment' },
        { num: '02', title: 'Voice Confirmation', desc: 'AI verifies patient attendance & handles reschedule or cancel requests' },
        { num: '03', title: 'WhatsApp Directions & Token', desc: 'Sends clinic map pin, digital token & fasting instructions' },
        { num: '04', title: 'Doctor Slot Sync', desc: 'HMS calendar marked confirmed or slot released for walk-in patients' }
      ]
    }
  },
  {
    id: 'education',
    title: 'Education & EdTech',
    icon: GraduationCap,
    accent: '#2563eb', // Royal Blue
    badge: 'Admissions & Counseling',
    description: 'Student admission enquiry qualification, entrance exam updates, webinar invitations, and fee schedule reminders.',
    highlight: 'Faster Lead Qualification',
    voiceDemo: {
      title: 'Admissions & Course Counseling',
      scenario: 'AI academic advisor qualifies student target exam, course interest, and schedules personalized counseling session.',
      src: '/samples/gold-6.mp3'
    },
    bpaWorkflow: {
      tag: 'EdTech Admission BPA',
      steps: [
        { num: '01', title: 'Inquiry Ingestion', desc: 'Digital marketing lead captured via portal or Google Ads' },
        { num: '02', title: '60s Instant AI Callback', desc: 'AI counselor dials prospect to evaluate exam goals & budget' },
        { num: '03', title: 'WhatsApp Prospectus', desc: 'Fires course brochure PDF, fee breakdown & scholarship link' },
        { num: '04', title: 'Counselor Calendar Slot', desc: 'Books 1-on-1 counseling demo and updates CRM stage to Qualified' }
      ]
    }
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Retail',
    icon: ShoppingCart,
    accent: '#d97706', // Amber
    badge: 'Order Operations',
    description: 'Automated cash-on-delivery (COD) order verification calls, shipment tracking notifications, and abandoned cart recovery.',
    highlight: 'Lower Return-to-Origin (RTO)',
    voiceDemo: {
      title: 'COD Verification & Order Dispatch Confirmation',
      scenario: 'AI caller verifies high-value Cash-on-Delivery orders, confirms shipping address, and reduces return-to-origin (RTO) costs.',
      src: '/samples/gold-7.mp3'
    },
    bpaWorkflow: {
      tag: 'COD Order Shield BPA',
      steps: [
        { num: '01', title: 'Shopify / WooCommerce Webhook', desc: 'New Cash-on-Delivery order placed above threshold value' },
        { num: '02', title: 'Address & Intent Verification', desc: 'AI agent calls customer to confirm delivery address & pincode' },
        { num: '03', title: 'WMS Warehouse Release', desc: 'If confirmed, marks Approved for Dispatch in courier shipping API' },
        { num: '04', title: 'RTO Loss Prevention', desc: 'If buyer cancels, holds shipment, saving forward + return freight' }
      ]
    }
  },
  {
    id: 'real-estate',
    title: 'Real Estate & Builders',
    icon: Building2,
    accent: '#ea580c', // Coral Brand
    badge: 'Property Enquiries',
    description: 'Pre-qualify buyer budgets, schedule on-site flat visits, automate builder CRM updates, and manage NRI investor calls.',
    highlight: 'Schedule Site Visits Faster',
    voiceDemo: {
      title: 'Real Estate Flat Visit Booking',
      scenario: 'Pre-qualifies 2BHK/3BHK buyer budget, preferred locality, and schedules a weekend on-site visit.',
      src: '/samples/gold-3.mp3'
    },
    bpaWorkflow: {
      tag: 'Property Site Visit BPA',
      steps: [
        { num: '01', title: 'Portal Lead Webhook', desc: '99acres / MagicBricks / Meta buyer inquiry received' },
        { num: '02', title: 'Budget & Timeline Audit', desc: 'AI queries budget bracket (1Cr - 2Cr), unit type & timeline' },
        { num: '03', title: 'WhatsApp Project Kit', desc: 'Sends floor plans, amenities brochure & site walkthrough video' },
        { num: '04', title: 'Site Tour Calendar Invite', desc: 'Locks weekend site visit & alerts relationship manager via SMS' }
      ]
    }
  },
  {
    id: 'support',
    title: 'Customer Support',
    icon: LifeBuoy,
    accent: '#10b981', // Emerald
    badge: '24/7 Operations',
    description: '24/7 routine inquiry handling, ticket status lookups, multi-channel customer triage, and seamless human agent escalation.',
    highlight: '24/7 Voice & WhatsApp Support',
    voiceDemo: {
      title: '24/7 Inbound Triage Desk',
      scenario: 'Greets caller with zero wait time, diagnoses enquiry, and transfers to human supervisor with full context.',
      src: '/samples/silver-2.mp3'
    },
    bpaWorkflow: {
      tag: 'Omnichannel Triage BPA',
      steps: [
        { num: '01', title: 'Inbound IVR Bypass', desc: 'Caller dials toll-free, answered in 0 seconds with zero hold time' },
        { num: '02', title: 'Tier-1 Intent Diagnosis', desc: 'Voice bot verifies ticket ID or diagnoses issue via knowledge base' },
        { num: '03', title: 'Ticketing API Action', desc: 'Auto-resolves query or creates ticket in Zendesk / Freshdesk / Jira' },
        { num: '04', title: 'Context-Preserved Transfer', desc: 'Escalates complex cases to human tech with live transcribed notes' }
      ]
    }
  }
];

export default function IndustriesSection({ navigateTo }) {
  const local = (e, path) => {
    if (navigateTo) {
      e.preventDefault();
      navigateTo(path);
    }
  };

  return (
    <section id="industries" className="studio-section industries-section">
      <div className="studio-container">
        <SectionHeading 
          centered 
          eyebrow="TAILORED INDUSTRY SOLUTIONS" 
          title="Industries We" 
          accent="Serve." 
          text="Avyukta Intellicall conversational voice agents, cloud dialers, and Business Process Automation (BPA) workflows are configured for each industry's customer journey."
        />

        <div className="industries-grid">
          {INDUSTRIES.map(item => {
            const Icon = item.icon;
            const hasVoice = Boolean(item.voiceDemo);
            const hasBpa = Boolean(item.bpaWorkflow);

            return (
              <article 
                key={item.id} 
                className={`industry-card ${hasVoice ? 'has-voice-demo' : ''}`}
                style={{ '--industry-accent': item.accent }}
              >
                <div className="industry-card-top">
                  <div 
                    className="industry-icon-wrapper" 
                    style={{ color: item.accent, backgroundColor: `${item.accent}14` }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="industry-badge" style={{ color: item.accent, borderColor: `${item.accent}30` }}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="industry-card-title">{item.title}</h3>
                <p className="industry-card-desc">{item.description}</p>

                {/* Embedded compact Voice Demo Player */}
                {hasVoice && (
                  <div className="industry-voice-player-wrap">
                    <VoiceSamplePlayer
                      id={`ind-voice-${item.id}`}
                      src={item.voiceDemo.src}
                      title={item.voiceDemo.title}
                      scenario={item.voiceDemo.scenario}
                      accentColor={item.accent}
                    />
                  </div>
                )}

                {/* BPA Business Process Automation Flow (Sir Review Point 9) */}
                {hasBpa && (
                  <div className="industry-bpa-box">
                    <div className="industry-bpa-header">
                      <div className="industry-bpa-tag">
                        <Workflow size={13} style={{ color: item.accent }} />
                        <span>{item.bpaWorkflow.tag}</span>
                      </div>
                      <span className="industry-bpa-badge">4-Step Flow</span>
                    </div>

                    <div className="industry-bpa-stepper" role="list" aria-label={`${item.title} BPA workflow steps`}>
                      {item.bpaWorkflow.steps.map((step, sIdx) => (
                        <div key={sIdx} className="industry-bpa-step-item" role="listitem">
                          <div 
                            className="bpa-step-number" 
                            style={{ borderColor: `${item.accent}55`, color: item.accent }}
                          >
                            {step.num}
                          </div>
                          <div className="bpa-step-text">
                            <strong className="bpa-step-name">{step.title}</strong>
                            <span className="bpa-step-details">{step.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="industry-card-footer">
                  <span className="industry-highlight">
                    <CheckCircle2 size={15} style={{ color: item.accent }} />
                    {item.highlight}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="industry-cta-strip">
          <div>
            <strong>Need a specialized workflow for your industry?</strong>
            <p>Our telecom engineers and solution architects configure scripts, CRM stages, and numbers for your domain.</p>
          </div>
          <a href="/contact" className="studio-btn studio-btn-primary" onClick={e => local(e, '/contact')}>
            Request tailored demo <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
