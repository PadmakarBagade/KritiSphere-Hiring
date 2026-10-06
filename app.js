/**
 * Tech_solvity Recruitment Web Application
 * Interactivity: Modals, Form Submissions, FAQ Accordions, Navbar Transitions
 */

// Project Modules Data
const projectModules = {
  dashboard: {
    number: '01',
    category: 'Operations & Milestones',
    title: 'Real-Time Site Operations & Gantt Milestones',
    description: 'A centralized, high-visibility operational dashboard designed for small contractors. Replaces uncoordinated WhatsApp messages and calls with live milestone status, critical path tracking, and automated delay risk notifications to keep projects strictly on schedule.',
    image: 'images/construction-dashboard.jpg',
    specs: [
      { label: 'Key Capabilities', value: 'Live Gantt timeline, critical path analysis, daily site logs' },
      { label: 'Primary Benefit', value: 'Eliminates 75% of delay blind spots between job site and office' },
      { label: 'Target Users', value: 'Site Supervisors, General Contractors, Client PMs' },
      { label: 'Tech Stack', value: 'React / Next.js, Node.js REST API, Tailwind / CSS3' }
    ]
  },
  material: {
    number: '02',
    category: 'Inventory & Supply Chain',
    title: 'Digital Material Inventory & Procurement Hub',
    description: 'Eliminates paper delivery slips and untracked material shrinkage. Provides real-time inventory management for steel rebar, cement, concrete, and aggregates with supplier PO validation and automatic reorder alerts when critical thresholds are breached.',
    image: 'images/material-tracking.jpg',
    specs: [
      { label: 'Key Capabilities', value: 'Delivery docket logging, supplier PO match, low-stock warnings' },
      { label: 'Primary Benefit', value: 'Stops pilferage and prevents costly material-stockout site halts' },
      { label: 'Target Materials', value: 'Rebar, Ready-mix Concrete, Cement Bags, Structural Steel' },
      { label: 'Tech Stack', value: 'QR/Barcode verification, Cloud DB, Real-time sync' }
    ]
  },
  labour: {
    number: '03',
    category: 'Workforce & Attendance Automation',
    title: 'Field Labour Attendance & Daily Wage Accounting',
    description: 'Replaces paper muster rolls with an easy mobile-friendly daily shift logger. Accurately tracks subcontractor crew counts (masons, carpenters, welders, helpers), validates hours, and automatically calculates daily wage liabilities without discrepancy.',
    image: 'images/labour-tracking.jpg',
    specs: [
      { label: 'Key Capabilities', value: 'Shift assignments, role categorization, daily wage ledger' },
      { label: 'Primary Benefit', value: 'Eliminates ghost workers and disputed subcontractor wage claims' },
      { label: 'Workforce Roles', value: 'Masons, Carpenters, Electricians, Welders, Laborers' },
      { label: 'Tech Stack', value: 'Mobile PWA, Geo-tagging, SQLite / PostgreSQL' }
    ]
  },
  cost: {
    number: '04',
    category: 'Financial Analytics & AI Forecasting',
    title: 'Budget vs. Actual Cost Engine & Overrun Alerts',
    description: 'Real-time financial visibility that connects physical progress with dynamic cost expenditure. Computes cost variances across labor, materials, and equipment, forecasting cash flows and warning contractors before project margins fall into deficit.',
    image: 'images/cost-analytics.jpg',
    specs: [
      { label: 'Key Capabilities', value: 'Variance analytics, delay penalty cost model, profit gauge' },
      { label: 'Primary Benefit', value: 'Alerts contractors to cost overruns weeks before project completion' },
      { label: 'Analytics Engine', value: 'Python predictive models, Trend extrapolation, Cash flow projections' },
      { label: 'Target Metrics', value: 'Budget burn rate, Material price variance, Overtime impact' }
    ]
  }
};

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  if (header) {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Mobile Navigation Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

function toggleMobileMenu() {
  if (!mobileMenuDrawer) return;
  const isHidden = mobileMenuDrawer.classList.contains('hidden');
  if (isHidden) {
    mobileMenuDrawer.classList.remove('hidden');
    menuIconOpen?.classList.add('hidden');
    menuIconClose?.classList.remove('hidden');
    mobileMenuToggle?.setAttribute('aria-expanded', 'true');
  } else {
    mobileMenuDrawer.classList.add('hidden');
    menuIconOpen?.classList.remove('hidden');
    menuIconClose?.classList.add('hidden');
    mobileMenuToggle?.setAttribute('aria-expanded', 'false');
  }
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenuDrawer && !mobileMenuDrawer.classList.contains('hidden')) {
      toggleMobileMenu();
    }
  });
});

// Project Details Modal
function openProjectModal(moduleId) {
  const modal = document.getElementById('project-modal');
  const data = projectModules[moduleId];
  if (!modal || !data) return;

  document.getElementById('modal-project-number').innerText = `Module ${data.number}`;
  document.getElementById('modal-project-category').innerText = data.category;
  document.getElementById('modal-project-title').innerText = data.title;
  document.getElementById('modal-project-desc').innerText = data.description;
  
  const imgElem = document.getElementById('modal-project-img');
  imgElem.src = data.image;
  imgElem.alt = data.title;

  // Render specifications
  const specsContainer = document.getElementById('modal-project-specs');
  if (specsContainer) {
    specsContainer.innerHTML = data.specs.map(spec => `
      <div class="p-3 bg-white rounded-lg border border-slate-200/60 shadow-2xs">
        <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">${spec.label}</p>
        <p class="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">${spec.value}</p>
      </div>
    `).join('');
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Application Modal
function openApplyModal(preferredSpot = '') {
  const modal = document.getElementById('apply-modal');
  if (!modal) return;

  if (preferredSpot) {
    const noteField = document.getElementById('applicant-note');
    if (noteField && !noteField.value) {
      noteField.value = `Hi Om! I would like to apply for ${preferredSpot} on Team Tech_solvity.`;
    }
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeApplyModal() {
  const modal = document.getElementById('apply-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Global modal backdrop close & Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeApplyModal();
  }
});

const projectModal = document.getElementById('project-modal');
if (projectModal) {
  projectModal.addEventListener('click', closeProjectModal);
}

const applyModal = document.getElementById('apply-modal');
if (applyModal) {
  applyModal.addEventListener('click', closeApplyModal);
}

// Application Form Submission
function handleApplySubmit(e) {
  e.preventDefault();

  const name = document.getElementById('applicant-name').value.trim();
  const email = document.getElementById('applicant-email').value.trim();
  const phone = document.getElementById('applicant-phone').value.trim();
  const dept = document.getElementById('applicant-dept').value;
  const year = document.getElementById('applicant-year').value;
  const role = document.getElementById('applicant-interest').value;
  const skills = document.getElementById('applicant-skills').value.trim();
  const note = document.getElementById('applicant-note').value.trim();

  if (!name || !email || !phone || !dept || !year) {
    showToast('Missing Fields', 'Please complete all required fields.', true);
    return;
  }

  const application = {
    name,
    email,
    phone,
    dept,
    year,
    role,
    skills,
    note,
    timestamp: new Date().toISOString()
  };

  // Save to localStorage for demo persistence
  try {
    const existing = JSON.parse(localStorage.getItem('tech_solvity_applicants') || '[]');
    existing.push(application);
    localStorage.setItem('tech_solvity_applicants', JSON.stringify(existing));
  } catch (err) {
    console.warn('Storage unavailable', err);
  }

  // Close modal
  closeApplyModal();

  // Reset Form
  document.getElementById('team-apply-form').reset();

  // Show Toast
  showToast(
    'Application Received! 🎉',
    `Thank you, ${name}! Team Leader Om Bhaltilak will reach out to ${email} shortly.`
  );
}

// Team Leader Contact Details
const LEADER_EMAIL = "oibhaltilak2006@gmail.com";
const LEADER_PHONE = "9960489309";
const LEADER_WHATSAPP_NUMBER = "919960489309";

function openWhatsApp(e) {
  if (e && e.preventDefault) e.preventDefault();
  const text = encodeURIComponent("Hi Om, I am interested in joining Tech_solvity for the Inpulse LMS construction tracking project as a female team member!");
  const url = `https://wa.me/${LEADER_WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

function callLeader(e) {
  window.location.href = `tel:+91${LEADER_PHONE}`;
}

function copyLeaderPhone(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  if (e && e.preventDefault) e.preventDefault();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(LEADER_PHONE).then(() => {
      showToast('Number Copied! 📱', `${LEADER_PHONE} copied to clipboard.`);
    }).catch(() => {
      prompt('Copy Contact Number:', LEADER_PHONE);
    });
  } else {
    prompt('Copy Contact Number:', LEADER_PHONE);
  }
}

function openGmailCompose(e) {
  if (e && e.preventDefault) e.preventDefault();
  const subject = encodeURIComponent("Tech_solvity Team Recruitment Inquiry - Female Member");
  const body = encodeURIComponent("Hi Om,\n\nI am interested in joining Tech_solvity for the Inpulse LMS construction tracking project!\n\nFull Name: \nDepartment: \nAcademic Year: \nMy Key Skills / Interests: \n\nLooking forward to hearing from you!");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(LEADER_EMAIL)}&su=${subject}&body=${body}`;
  window.open(gmailUrl, '_blank', 'noopener,noreferrer');
}

function copyLeaderEmail(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  if (e && e.preventDefault) e.preventDefault();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(LEADER_EMAIL).then(() => {
      showToast('Email Copied! 📋', `${LEADER_EMAIL} copied to clipboard.`);
    }).catch(() => {
      prompt('Copy Leader Email:', LEADER_EMAIL);
    });
  } else {
    prompt('Copy Leader Email:', LEADER_EMAIL);
  }
}

function openContactModal() {
  const modal = document.getElementById('contact-modal') || document.getElementById('apply-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeContactModal() {
  const modal = document.getElementById('contact-modal') || document.getElementById('apply-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// Toast Notifications
let toastTimeout;
function showToast(title, message, isError = false) {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastMsg = document.getElementById('toast-msg');

  if (!toast) return;

  if (toastTitle) toastTitle.innerText = title;
  if (toastMsg) toastMsg.innerText = message;

  if (isError) {
    toast.classList.add('bg-red-900');
    toast.classList.remove('bg-slate-900');
  } else {
    toast.classList.remove('bg-red-900');
    toast.classList.add('bg-slate-900');
  }

  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// Modern Clean FAQ Accordion Handler
function initFaqAccordion() {
  document.querySelectorAll('.faq-card-trigger, .faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const card = trigger.closest('.faq-card') || trigger.closest('.faq-item');
      if (!card) return;

      const isActive = card.classList.contains('active');

      // Close all other cards for clean, uncluttered reading
      document.querySelectorAll('.faq-card, .faq-item').forEach(other => {
        if (other !== card) {
          other.classList.remove('active');
          const body = other.querySelector('.faq-card-body, .faq-content');
          if (body) body.classList.add('hidden');
        }
      });

      // Toggle current card
      if (isActive) {
        card.classList.remove('active');
        const body = card.querySelector('.faq-card-body, .faq-content');
        if (body) body.classList.add('hidden');
      } else {
        card.classList.add('active');
        const body = card.querySelector('.faq-card-body, .faq-content');
        if (body) body.classList.remove('hidden');
      }
    });
  });
}

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFaqAccordion);
} else {
  initFaqAccordion();
}

console.log('Tech_solvity Recruitment App Initialized');

