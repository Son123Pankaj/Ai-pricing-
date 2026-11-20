import React, { useState, useRef, useEffect } from 'react';
import { 
  Workflow, 
  Users, 
  LayoutDashboard, 
  TrendingUp,
  ChevronDown,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera
} from 'lucide-react';
import { Eyebrow } from './StudioParts';
import { getAssetUrl } from '../utils/assetUrl';

// Clean, compact dropdown option labels for mobile (no redundant duplicate text or screen overflow)
const CATEGORY_DROPDOWN_LABELS = {
  bpa: 'BPA — Process Automation',
  crm: 'CRM — Customer Platform',
  'command-center': 'Command Center — Operations',
  sales: 'Sales — Customer Journey'
};

// The 4 Required Categories in exact order: 1. BPA | 2. CRM | 3. Command Center | 4. Sales
const CATEGORIES = [
  { 
    id: 'bpa', 
    label: 'BPA', 
    subtitle: 'Process Automation', 
    icon: Workflow,
    fullForm: 'Business Process Automation (BPA)',
    image: '/avyukta-platform-workflow.png',
    snapshotCount: 4
  },
  { 
    id: 'crm', 
    label: 'CRM', 
    subtitle: 'Customer Platform', 
    icon: Users,
    fullForm: 'Customer Relationship Management (CRM)',
    image: '/crm-platform-pricing-promo.png',
    snapshotCount: 4
  },
  { 
    id: 'command-center', 
    label: 'Command Center', 
    subtitle: 'Operations & Monitoring', 
    icon: LayoutDashboard,
    fullForm: 'Command Center',
    image: '/avyukta-command-center-vision.png',
    snapshotCount: 4
  },
  { 
    id: 'sales', 
    label: 'Sales', 
    subtitle: 'Pipeline & Deals', 
    icon: TrendingUp,
    fullForm: 'Sales Management & Customer Journey (Sales)',
    image: '/avyukta-sales-crm-pipeline.png',
    snapshotCount: 4
  },
];

// Rich In-Page Product Snapshots with Hover & Lightbox Previews (Sir Review Point 10)
const CATEGORY_SNAPSHOTS = {
  bpa: [
    {
      id: 0,
      label: '1. Workflow Orchestration',
      src: '/avyukta-platform-workflow.png',
      alt: 'Avyukta BPA multi-step telephony and automated webhook workflow architecture',
      caption: 'Visual workflow builder: connect triggers, AI call branches, and SMS/WhatsApp follow-ups with zero code.'
    },
    {
      id: 1,
      label: '2. Inbound Journey Map',
      src: '/avyukta-inbound-journey-map.jpg',
      alt: 'Avyukta Inbound Customer Journey Map: 90% automated by AI from lead ingestion to nurturing loop and closure',
      caption: 'End-to-end customer journey logic: multi-channel ingestion, immediate AI assistant response, CRM updates, and automated nurturing.'
    },
    {
      id: 2,
      label: '3. Agentic AI CX Platform',
      src: '/avyukta-agentic-flow-builder.png',
      alt: 'Avyukta & Datamatics Agentic AI Module: SaaS CX Journey Platform with visual flow builder and knowledge base',
      caption: 'Visual conversational flow builder: interrupt detection, knowledge base ingestion, and bidirectional Avyukta CRM synchronization.'
    },
    {
      id: 3,
      label: '4. Stage-Based Automation',
      src: '/avyukta-bpa-stage-flow.png',
      alt: 'Avyukta AI BPA Platform 8-stage omnichannel automation workflow',
      caption: '8-stage execution pipeline: from entry gateway to AI dialer follow-up, calendar booking, and commercial proposal closure.'
    }
  ],
  crm: [
    {
      id: 0,
      label: '1. CRM Platform & Pricing',
      src: '/crm-platform-pricing-promo.png',
      alt: 'Avyukta CRM Platform pricing and omnichannel calling dashboard',
      caption: 'Unified contact center CRM: omni-channel telephony, transparent per-minute ledger, and live agent status.'
    },
    {
      id: 1,
      label: '2. Live Call Communications',
      src: '/avyukta-communications-dashboard.png',
      alt: 'Avyukta CRM omnichannel communications and activity dashboard',
      caption: 'Real-time call transcripts, automated recording playback, customer sentiment metrics, and follow-up notes.'
    },
    {
      id: 2,
      label: '3. Agent Extension Directory',
      src: '/avyukta-crm-live-workspace.png',
      alt: 'Avyukta Intellicall live employee insights dashboard and integrated WebRTC softphone',
      caption: 'Multi-seat extension management, live SIP registration monitoring, and agent productivity KPIs.'
    },
    {
      id: 3,
      label: '4. Performance & Work Matrix',
      src: '/avyukta-crm-performance-matrix.png',
      alt: 'Avyukta CRM: Plan, Assign, Execute, Assess, Grow with KRA, SOD and Happy Code',
      caption: 'Team success engine: track Key Result Areas (KRA), Schedule of the Day (SOD), task completion, and Happy Code recognition.'
    }
  ],
  'command-center': [
    {
      id: 0,
      label: '1. AI Vision Floor Operations',
      src: '/avyukta-command-center-vision.png',
      alt: 'Avyukta Command Center live AI computer vision floor monitoring and agent workstation tracking',
      caption: 'Mission-control NOC: AI computer vision detection of active agents, supervisor audits, call dwell times, and system health status.'
    },
    {
      id: 1,
      label: '2. Hybrid Telephony Architecture',
      src: '/avyukta-hybrid-telephony-architecture.png',
      alt: 'Avyukta Hybrid Call Center Architecture: 3 on-premise dialer servers connected via VPN to cloud admin server',
      caption: 'Enterprise hybrid architecture: on-premise dialer clusters with local PRI/SIP trunks linked via encrypted VPN to cloud admin & reporting.'
    },
    {
      id: 2,
      label: '3. Pan-India Telecom Network',
      src: '/avyukta-pan-india-network-map.png',
      alt: 'Avyukta Pan-India Telecom Footprint across 11 countries, 700+ live centers, and 4000+ installations',
      caption: 'Pan-India telecom presence: redundant carrier switching hubs across all major metro and Tier-2 business corridors.'
    },
    {
      id: 3,
      label: '4. Live Operations Console',
      src: '/command-center-operations.jpg',
      alt: 'Avyukta live operations command center, active calls and SIP trunk NOC',
      caption: 'Live trunk monitor: sub-500ms voice cadence, zero runaway bill protection, and continuous telecom SLA tracking.'
    }
  ],
  sales: [
    {
      id: 0,
      label: '1. Sales Pipeline & Deals',
      src: '/avyukta-sales-crm-pipeline.png',
      alt: 'Avyukta Sales CRM live deal pipeline, disposition management, and WON status tracking',
      caption: 'Real-time deal velocity tracker: auto-classify inbound leads into Hot, Warm, and Cold with automated next actions.'
    },
    {
      id: 1,
      label: '2. SIP Channel Pricing Slabs',
      src: '/avyukta-telephony-pricing-slabs.png',
      alt: 'Avyukta Intellicall 080 CLI SIP Channel offer slabs and transparent pricing schedule',
      caption: 'Transparent channel economics: volume-tiered 080 CLI SIP trunks from 4 to 30+ channels with optional AI Caller addons.'
    },
    {
      id: 2,
      label: '3. Automated Proposal Engine',
      src: '/avyukta-automated-proposals.png',
      alt: 'Avyukta CRM automated proposal generation, template compilation and client delivery',
      caption: 'Automated proposal workflow: merge CRM client data into custom service quotes, send via WhatsApp/Email, and track e-signatures.'
    },
    {
      id: 3,
      label: '4. Outbound ROI & Unit Economics',
      src: '/call-center-profit.jpg',
      alt: 'Avyukta call center ROI analysis and per-minute telephony economics',
      caption: 'Measurable cost savings: compare traditional call center agent overhead versus AI voice automation.'
    }
  ]
};

export default function DynamicPricingSection({ navigateTo }) {
  const [activeCategory, setActiveCategory] = useState('bpa');
  const [snapshotIdx, setSnapshotIdx] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const tabRefs = useRef([]);
  const dropdownRef = useRef(null);

  // Close custom mobile dropdown on outside click or Escape key
  useEffect(() => {
    if (!isDropdownOpen) return undefined;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  // Handle keyboard navigation inside in-page lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isLightboxOpen) return undefined;
    const handleLightboxKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        const snaps = CATEGORY_SNAPSHOTS[activeCategory] || [];
        setSnapshotIdx(prev => (prev + 1) % snaps.length);
      } else if (e.key === 'ArrowLeft') {
        const snaps = CATEGORY_SNAPSHOTS[activeCategory] || [];
        setSnapshotIdx(prev => (prev - 1 + snaps.length) % snaps.length);
      }
    };
    document.addEventListener('keydown', handleLightboxKeyDown);
    return () => document.removeEventListener('keydown', handleLightboxKeyDown);
  }, [isLightboxOpen, activeCategory]);

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];
  const currentSnapshots = CATEGORY_SNAPSHOTS[activeCategory] || CATEGORY_SNAPSHOTS.bpa;
  const currentSnapshot = currentSnapshots[snapshotIdx] || currentSnapshots[0];

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSnapshotIdx(0);
    setIsDropdownOpen(false);
  };

  // Keyboard navigation for vertical categories
  const handleKeyDown = (e, index) => {
    let nextIndex;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (index + 1) % CATEGORIES.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = CATEGORIES.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    handleCategoryChange(CATEGORIES[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="platform-showcase" className="dynamic-pricing-section" aria-label="Dynamic AI Pricing and Solutions">
      <span id="product" className="section-anchor" aria-hidden="true" style={{ position: 'relative', top: '-86px', display: 'block', visibility: 'hidden' }} />
      <span id="platform" className="section-anchor" aria-hidden="true" style={{ position: 'relative', top: '-86px', display: 'block', visibility: 'hidden' }} />
      <div className="studio-container">
        
        {/* Section Heading */}
        <div className="dynamic-section-heading">
          <div className="dynamic-eyebrow-row">
            <Eyebrow>DYNAMIC PLATFORM &amp; PRICING WORKSPACE</Eyebrow>
            <span className="snapshot-total-pill">
              <Camera size={13} />
              <span>16 Live Product Snapshots · Hover to Preview</span>
            </span>
          </div>
          <h2 className="dynamic-section-title">
            One Connected Workspace. <span className="studio-accent">Four Core Solutions.</span>
          </h2>
          <p className="dynamic-section-desc">
            Explore Avyukta&apos;s process automation, customer CRM, live operations command center, and sales pipeline management. Hover over any snapshot to inspect interface details without leaving the page.
          </p>
        </div>

        {/* 2-Column Dynamic Interactive Workspace */}
        <div className="dynamic-workspace-shell">
          
          {/* ========================================================= */}
          {/* 1. LEFT-SIDE CATEGORY NAVIGATION (BPA, CRM, Command Center, Sales) */}
          {/* ========================================================= */}
          <aside className="dynamic-category-sidebar">
            <div className="dynamic-sidebar-header">
              <span>EXPLORE PLATFORM</span>
              <h3>Categories</h3>
            </div>

            {/* Custom Mobile Category Selector (Matching Image 2: Clean 1-Line Labels) */}
            <div className="dynamic-mobile-category-select" ref={dropdownRef}>
              <button 
                type="button"
                id="dynamic-cat-btn"
                className={`dynamic-custom-select-btn ${isDropdownOpen ? 'is-open' : ''}`}
                onClick={() => setIsDropdownOpen(prev => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-label="Choose platform category"
              >
                <span className="dynamic-select-clean-text">
                  {CATEGORY_DROPDOWN_LABELS[currentCategory.id] || currentCategory.label}
                </span>
                <ChevronDown size={18} className={`dynamic-select-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="dynamic-custom-dropdown-popover" role="listbox" aria-label="Platform categories">
                  {CATEGORIES.map(cat => {
                    const isSelected = activeCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`dynamic-custom-option-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleCategoryChange(cat.id)}
                      >
                        <span className="dynamic-option-clean-label">
                          {CATEGORY_DROPDOWN_LABELS[cat.id]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Vertical Desktop/Tablet Navigation */}
            <nav 
              className="dynamic-category-nav-list" 
              role="tablist" 
              aria-label="Platform category tabs" 
              aria-orientation="vertical"
            >
              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    ref={el => { tabRefs.current[idx] = el; }}
                    type="button"
                    role="tab"
                    id={`cat-tab-${cat.id}`}
                    aria-selected={isSelected}
                    aria-controls={`cat-panel-${cat.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    className={`dynamic-category-tab ${isSelected ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                    onMouseEnter={() => handleCategoryChange(cat.id)}
                    onKeyDown={e => handleKeyDown(e, idx)}
                  >
                    <div className="cat-tab-icon-wrap">
                      <Icon size={19} className="cat-icon" />
                    </div>
                    <div className="cat-tab-text">
                      <div className="cat-tab-label-row">
                        <span className="cat-tab-label">{cat.label}</span>
                        <span className="cat-tab-count">{cat.snapshotCount} views</span>
                      </div>
                      <span className="cat-tab-sub">{cat.subtitle}</span>
                    </div>
                    {isSelected && <span className="cat-active-indicator" aria-hidden="true" />}
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Commercial Note */}
            <div className="dynamic-sidebar-badge">
              <div className="sidebar-badge-dot" />
              <span>Sub-500ms Voice Cadence &amp; Pan-India STD CLI</span>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* 2. DYNAMIC CONTENT & PRODUCT SNAPSHOTS */}
          {/* ========================================================= */}
          <main 
            id={`cat-panel-${activeCategory}`}
            className="dynamic-content-panel"
            role="tabpanel"
            aria-labelledby={`cat-tab-${activeCategory}`}
          >
            <div 
              className="dynamic-category-view animate-fade-in" 
              key={`${activeCategory}-${snapshotIdx}`}
            >
              <div className="dynamic-view-title-row">
                <h1 className="dynamic-view-title">{currentCategory.fullForm}</h1>

                {/* In-Page Snapshot Tabs (Hover or Click to Preview - Sir Review Point 10) */}
                <div className="product-snapshot-bar" role="tablist" aria-label={`${currentCategory.label} views`}>
                  {currentSnapshots.map((snap, idx) => (
                    <button
                      key={snap.id}
                      type="button"
                      role="tab"
                      id={`snap-tab-${idx + 1}`}
                      aria-selected={snapshotIdx === idx}
                      className={`snapshot-tab-btn ${snapshotIdx === idx ? 'active' : ''}`}
                      onClick={() => setSnapshotIdx(idx)}
                      onMouseEnter={() => setSnapshotIdx(idx)}
                      title={`Preview ${snap.label}`}
                    >
                      {snap.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Snapshot Media Frame with Zoom-In Overlay */}
              <div className="dynamic-media-frame">
                <button 
                  type="button" 
                  className="snapshot-zoom-trigger"
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click to inspect in fullscreen lightbox (no tab navigation)"
                  aria-label="Inspect snapshot in fullscreen lightbox"
                >
                  <Maximize2 size={15} />
                  <span>Inspect Fullscreen</span>
                </button>

                <div className="dynamic-image-viewer-container">
                  <img 
                    src={getAssetUrl(currentSnapshot.src)} 
                    alt={currentSnapshot.alt || currentCategory.fullForm}
                    className="dynamic-full-image"
                    onClick={() => setIsLightboxOpen(true)}
                    style={{ cursor: 'zoom-in' }}
                    title="Click to open fullscreen modal preview"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {currentSnapshot.caption && (
                  <div className="snapshot-caption-bar">
                    <span className="caption-tag">FEATURE INSIGHT:</span>
                    <span className="caption-text">{currentSnapshot.caption}</span>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. IN-PAGE LIGHTBOX MODAL (Zero tab redirection, zero lost user) */}
      {/* ========================================================= */}
      {isLightboxOpen && (
        <div 
          className="snapshot-lightbox-overlay" 
          role="dialog" 
          aria-modal="true" 
          aria-label={currentSnapshot.alt}
          onClick={(e) => {
            if (e.target.classList.contains('snapshot-lightbox-overlay')) {
              setIsLightboxOpen(false);
            }
          }}
        >
          <div className="snapshot-lightbox-dialog">
            <div className="snapshot-lightbox-header">
              <div>
                <span className="lightbox-category-tag">{currentCategory.fullForm}</span>
                <h3 className="lightbox-title">{currentSnapshot.label}</h3>
              </div>
              <button 
                type="button" 
                className="lightbox-close-btn"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close fullscreen snapshot view"
              >
                <X size={20} />
              </button>
            </div>

            <div className="snapshot-lightbox-content">
              <button 
                type="button" 
                className="lightbox-nav-btn lightbox-nav-prev"
                onClick={() => setSnapshotIdx(prev => (prev - 1 + currentSnapshots.length) % currentSnapshots.length)}
                aria-label="Previous snapshot"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="snapshot-lightbox-img-wrap">
                <img 
                  src={getAssetUrl(currentSnapshot.src)} 
                  alt={currentSnapshot.alt} 
                  className="lightbox-img" 
                />
              </div>

              <button 
                type="button" 
                className="lightbox-nav-btn lightbox-nav-next"
                onClick={() => setSnapshotIdx(prev => (prev + 1) % currentSnapshots.length)}
                aria-label="Next snapshot"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="snapshot-lightbox-footer">
              <p className="lightbox-caption">{currentSnapshot.caption}</p>
              <span className="lightbox-counter">
                {snapshotIdx + 1} of {currentSnapshots.length} Snapshots
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
