// ============================================================
// ScholarQuest — Central localStorage Store
// ============================================================

const KEYS = {
  USER: 'sq_user',
  SESSION: 'sq_session',
  SETTINGS: 'sq_settings',
  TRACKER: 'sq_tracker',
  MESSAGES: 'sq_messages',
  SCHOLARSHIPS: 'sq_scholarships',
  ACTIVITY: 'sq_activity',
};

// ─── Helpers ────────────────────────────────────────────────

function get(key) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function set(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('sq_update', { detail: { key } }));
  } catch {}
}

function remove(key) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}

// ─── Default Data ───────────────────────────────────────────

const DEFAULT_TRACKER = [
  {
    id: 'col_interested', label: 'Interested', color: 'text-on-surface',
    badgeBg: 'bg-surface-container-highest text-on-surface-variant',
    cards: [
      { id: 'c1', type: 'Full-Ride', title: 'National Merit Scholar Program', desc: 'Academic excellence award for undergraduates.', urgent: true, urgentLabel: '5 Days Left', date: null },
      { id: 'c2', type: 'STEM', title: 'Boeing Future Leaders Grant', desc: 'Engineering and aviation focus.', date: 'Oct 24, 2026' },
    ],
  },
  {
    id: 'col_preparing', label: 'Preparing', color: 'text-on-surface',
    badgeBg: 'bg-surface-container-highest text-on-surface-variant',
    cards: [
      { id: 'c3', type: '98% Match', title: 'Rhodes Trust Global Fellowship', progress: 70, progressLabel: 'Personal Statement: 70% complete' },
    ],
  },
  { id: 'col_applied', label: 'Applied', color: 'text-on-surface', badgeBg: 'bg-surface-container-highest text-on-surface-variant', cards: [{ id: 'c4', title: 'Google Generations Grant', submitted: 'Submitted Sep 12' }] },
  {
    id: 'col_review', label: 'Under Review', color: 'text-on-surface',
    badgeBg: 'bg-surface-container-highest text-on-surface-variant',
    cards: [{ id: 'c5', title: 'Coca-Cola First Gen Award', desc: 'Reviewing transcripts and essays.', reviewers: ['JD', 'MK'], borderLeft: 'border-l-4 border-l-primary' }],
  },
  { id: 'col_accepted', label: 'Accepted', color: 'text-green-700', badgeBg: 'bg-green-100 text-green-700', cards: [{ id: 'c6', title: 'The Gates Scholarship', amount: '$40,000 /yr', accepted: true }] },
  { id: 'col_rejected', label: 'Rejected', color: 'text-error', badgeBg: 'bg-error-container text-on-error-container', cards: [] },
];

const DEFAULT_MESSAGES = [
  {
    id: 1, name: 'Gates Foundation', avatar: 'GF',
    avatarBg: 'bg-primary/10 text-primary',
    lastMessage: 'Thank you for your application. We are pleased to inform you...',
    time: '2h ago', unread: 2, online: true,
    thread: [
      { id: 1, content: 'Hello! We have reviewed your initial application for the Gates Scholarship.', isMe: false, time: '10:02 AM' },
      { id: 2, content: 'Thank you for reaching out! I am very excited about this opportunity.', isMe: true, time: '10:15 AM' },
      { id: 3, content: 'Your profile shows impressive academic achievements. We would like to invite you to the second round of evaluation.', isMe: false, time: '10:30 AM' },
      { id: 4, content: 'That is wonderful news! What documents will be required for the next stage?', isMe: true, time: '10:45 AM' },
      { id: 5, content: 'Thank you for your application. We are pleased to inform you that you have been selected for the final interview round. Congratulations!', isMe: false, time: '11:20 AM' },
    ],
  },
  {
    id: 2, name: 'World Future Foundation', avatar: 'WF',
    avatarBg: 'bg-secondary/10 text-secondary',
    lastMessage: 'Your application documents have been received.',
    time: 'Yesterday', unread: 0, online: false,
    thread: [
      { id: 1, content: 'Your application documents have been received and are under review.', isMe: false, time: 'Yesterday' },
    ],
  },
  {
    id: 3, name: 'ScholarQuest Support', avatar: 'SQ',
    avatarBg: 'bg-green-100 text-green-700',
    lastMessage: 'Hi! How can I help you today?',
    time: 'Mon', unread: 0, online: true,
    thread: [
      { id: 1, content: 'Hi! How can I help you today?', isMe: false, time: 'Mon' },
    ],
  },
  {
    id: 4, name: 'Rhodes Trust', avatar: 'RT',
    avatarBg: 'bg-tertiary-container/10 text-tertiary',
    lastMessage: 'The interview schedule has been updated for your review.',
    time: 'Sep 28', unread: 1, online: false,
    thread: [
      { id: 1, content: 'The interview schedule has been updated. Please review at your earliest convenience.', isMe: false, time: 'Sep 28' },
    ],
  },
];

const DEFAULT_ACTIVITY = [
  { id: 1, icon: 'check_circle', iconColor: 'text-green-600', title: 'Application Submitted', sub: 'Goldman Sachs Scholars Program', time: '2 hours ago' },
  { id: 2, icon: 'info', iconColor: 'text-primary', title: 'Profile View', sub: 'The Gates Foundation viewed your profile', time: 'Yesterday' },
  { id: 3, icon: 'auto_awesome', iconColor: 'text-secondary', title: 'New Match Found', sub: 'AI Research Grant (95% match)', time: '2 days ago' },
];

const DEFAULT_SETTINGS = {
  notifications: { emailMatches: true, emailDeadlines: true, emailUpdates: false, pushMatches: true, pushDeadlines: true },
  privacy: { profileVisible: true, showGPA: false, allowContact: true },
  appearance: { theme: 'light' },
};

// ─── Session / Auth ─────────────────────────────────────────

export function getSession() { return get(KEYS.SESSION); }

export function setSession(user) {
  set(KEYS.SESSION, { userId: user.email, loggedInAt: Date.now() });
}

export function clearSession() {
  remove(KEYS.SESSION);
}

export function isLoggedIn() {
  const s = get(KEYS.SESSION);
  return !!s;
}

// ─── User ───────────────────────────────────────────────────

export function getUser() {
  return get(KEYS.USER);
}

export function saveUser(data) {
  const existing = get(KEYS.USER) || {};
  set(KEYS.USER, { ...existing, ...data });
}

export function registerUser({ firstName, lastName, email, password, institution }) {
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
  const user = {
    firstName, lastName, email, password, institution,
    name: `${firstName} ${lastName}`,
    initials,
    bio: '',
    gpa: '',
    nationality: '',
    state: '',
    dob: '',
    phone: '',
    linkedin: '',
    skills: ['Machine Learning', 'Python', 'Data Analysis'],
    interests: ['Artificial Intelligence', 'Climate Tech', 'Biotech'],
    studyField: '',
    careerGoals: '',
    extracurriculars: '',
    financialNeed: 'Low – Merit-based preferred',
    profileCompletion: 40,
    onboardingComplete: false,
    createdAt: Date.now(),
  };
  set(KEYS.USER, user);
  return user;
}

export function validateLogin(email, password) {
  const user = get(KEYS.USER);
  if (!user) return null;
  if (user.email === email && user.password === password) return user;
  return null;
}

export function getUserInitials() {
  const u = get(KEYS.USER);
  return u?.initials || 'AJ';
}

export function getUserName() {
  const u = get(KEYS.USER);
  return u?.name || 'Alex';
}

export function calcProfileCompletion(user) {
  const fields = ['firstName', 'lastName', 'email', 'bio', 'gpa', 'institution', 'phone', 'linkedin', 'dob', 'nationality'];
  const skillsOk = (user?.skills?.length || 0) > 0;
  const interestsOk = (user?.interests?.length || 0) > 0;
  let filled = fields.filter(f => user?.[f] && user[f] !== '').length;
  if (skillsOk) filled++;
  if (interestsOk) filled++;
  return Math.round((filled / (fields.length + 2)) * 100);
}

// ─── Tracker ─────────────────────────────────────────────────

export function getTracker() {
  return get(KEYS.TRACKER) || DEFAULT_TRACKER;
}

export function saveTracker(columns) {
  set(KEYS.TRACKER, columns);
}

export function addCardToColumn(columnId, card) {
  const cols = getTracker();
  const col = cols.find(c => c.id === columnId);
  if (col) col.cards.push({ id: `card_${Date.now()}`, ...card });
  saveTracker(cols);
  addActivity({ icon: 'add_circle', iconColor: 'text-primary', title: 'Scholarship Added', sub: card.title, time: 'Just now' });
}

export function moveCard(cardId, fromColId, toColId) {
  const cols = getTracker();
  const fromCol = cols.find(c => c.id === fromColId);
  const toCol = cols.find(c => c.id === toColId);
  if (!fromCol || !toCol) return;
  const cardIdx = fromCol.cards.findIndex(c => c.id === cardId);
  if (cardIdx === -1) return;
  const [card] = fromCol.cards.splice(cardIdx, 1);
  toCol.cards.push(card);
  saveTracker(cols);
  addActivity({ icon: 'swap_horiz', iconColor: 'text-secondary', title: 'Application Updated', sub: `${card.title} → ${toCol.label}`, time: 'Just now' });
}

export function deleteCard(cardId) {
  const cols = getTracker();
  for (const col of cols) {
    const idx = col.cards.findIndex(c => c.id === cardId);
    if (idx !== -1) { col.cards.splice(idx, 1); break; }
  }
  saveTracker(cols);
}

// ─── Messages ─────────────────────────────────────────────────

export function getMessages() {
  return get(KEYS.MESSAGES) || DEFAULT_MESSAGES;
}

export function sendMessage(convId, text) {
  const convs = getMessages();
  const conv = convs.find(c => c.id === convId);
  if (!conv) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msg = { id: Date.now(), content: text, isMe: true, time: timeStr };
  conv.thread.push(msg);
  conv.lastMessage = text;
  conv.time = 'Just now';
  set(KEYS.MESSAGES, convs);

  // Simulate a reply after 1–2 seconds
  setTimeout(() => {
    const replies = [
      'Thank you for your message! We will get back to you shortly.',
      'We have received your inquiry and will respond within 24 hours.',
      'Great question! Our team will look into this for you.',
      'Thank you for reaching out. Please allow us some time to review.',
    ];
    const reply = { id: Date.now() + 1, content: replies[Math.floor(Math.random() * replies.length)], isMe: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedConvs = getMessages();
    const updatedConv = updatedConvs.find(c => c.id === convId);
    if (updatedConv) {
      updatedConv.thread.push(reply);
      updatedConv.lastMessage = reply.content;
      updatedConv.time = 'Just now';
      set(KEYS.MESSAGES, updatedConvs);
    }
  }, 1500);
}

export function markAsRead(convId) {
  const convs = getMessages();
  const conv = convs.find(c => c.id === convId);
  if (conv) { conv.unread = 0; set(KEYS.MESSAGES, convs); }
}

// ─── Activity Log ─────────────────────────────────────────────

export function getActivity() {
  return get(KEYS.ACTIVITY) || DEFAULT_ACTIVITY;
}

export function addActivity(entry) {
  const activities = getActivity();
  activities.unshift({ id: Date.now(), ...entry });
  if (activities.length > 20) activities.pop();
  set(KEYS.ACTIVITY, activities);
}

// ─── Settings ─────────────────────────────────────────────────

export function getSettings() {
  return get(KEYS.SETTINGS) || DEFAULT_SETTINGS;
}

export function saveSettings(data) {
  const existing = get(KEYS.SETTINGS) || DEFAULT_SETTINGS;
  set(KEYS.SETTINGS, { ...existing, ...data });
}

// ─── Stats ────────────────────────────────────────────────────

export function getStats() {
  const tracker = getTracker();
  let applied = 0, saved = 0, deadlines = 0;
  for (const col of tracker) {
    if (['col_applied', 'col_review', 'col_accepted'].includes(col.id)) applied += col.cards.length;
    if (col.id === 'col_interested') saved += col.cards.length;
    if (['col_interested', 'col_preparing'].includes(col.id)) {
      deadlines += col.cards.filter(c => c.urgentLabel).length;
    }
  }
  const matched = applied * 7 + saved * 3 + 60;
  return { matched, applied, saved, deadlines };
}

// ─── Nuke All Data ────────────────────────────────────────────

export function clearAllData() {
  Object.values(KEYS).forEach(k => remove(k));
}

// ─── Seed (ensures defaults exist) ───────────────────────────

export function ensureDefaults() {
  if (!get(KEYS.TRACKER)) set(KEYS.TRACKER, DEFAULT_TRACKER);
  if (!get(KEYS.MESSAGES)) set(KEYS.MESSAGES, DEFAULT_MESSAGES);
  if (!get(KEYS.ACTIVITY)) set(KEYS.ACTIVITY, DEFAULT_ACTIVITY);
  if (!get(KEYS.SETTINGS)) set(KEYS.SETTINGS, DEFAULT_SETTINGS);
}
