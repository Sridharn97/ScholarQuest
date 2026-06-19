// ============================================================
// ScholarQuest — Central localStorage Store
// ============================================================

const KEYS = {
  USER: 'sq_user',
  SESSION: 'sq_session',
  PROVIDER_SESSION: 'sq_provider_session',
  PROVIDERS: 'sq_providers',
  SETTINGS: 'sq_settings',
  TRACKER: 'sq_tracker',
  MESSAGES: 'sq_messages',
  SCHOLARSHIPS: 'sq_scholarships',
  ACTIVITY: 'sq_activity',
  ADMIN_APPLICATIONS: 'sq_admin_applications', // Keep keys matching for compatibility
  ADMIN_SCHOLARSHIPS: 'sq_admin_scholarships',
  ADMIN_STUDENTS: 'sq_admin_students',
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
  { id: 'col_applied', label: 'Applied', color: 'text-on-surface', badgeBg: 'bg-surface-container-highest text-on-surface-variant', cards: [] },
  {
    id: 'col_review', label: 'Under Review', color: 'text-on-surface',
    badgeBg: 'bg-surface-container-highest text-on-surface-variant',
    cards: [],
  },
  { id: 'col_accepted', label: 'Accepted', color: 'text-green-700', badgeBg: 'bg-green-100 text-green-700', cards: [] },
  { id: 'col_rejected', label: 'Rejected', color: 'text-error', badgeBg: 'bg-error-container text-on-error-container', cards: [] },
];

const DEFAULT_MESSAGES = [];

const DEFAULT_ACTIVITY = [
  { id: 1, icon: 'auto_awesome', iconColor: 'text-secondary', title: 'New Match Found', sub: 'Global Tech Innovators Fund (98% match)', time: 'Just now' },
];

const DEFAULT_SETTINGS = {
  notifications: { emailMatches: true, emailDeadlines: true, emailUpdates: false, pushMatches: true, pushDeadlines: true },
  privacy: { profileVisible: true, showGPA: false, allowContact: true },
  appearance: { theme: 'light' },
};

// ─── Session / Auth ─────────────────────────────────────────

export function getSession() { return get(KEYS.SESSION); }

export function setSession(user) {
  set(KEYS.SESSION, { userId: user.email, name: user.name, loggedInAt: Date.now() });
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
    bio: 'Senior student looking to make an impact in the academic world.',
    gpa: '3.92',
    nationality: 'United States',
    state: 'California',
    dob: '2003-05-15',
    phone: '+1 (555) 019-2834',
    linkedin: 'linkedin.com/in/alex-johnson',
    skills: ['Machine Learning', 'Python', 'Data Analysis', 'Research'],
    interests: ['Artificial Intelligence', 'Climate Tech', 'Biotech'],
    studyField: 'Computer Science',
    careerGoals: '',
    extracurriculars: '',
    financialNeed: 'Low – Merit-based preferred',
    profileCompletion: 80,
    onboardingComplete: true,
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

// ─── Provider Auth (Company & Institute) ────────────────────

const PROVIDER_CREDENTIALS = [
  { email: 'provider@scholarquest.io', password: 'provider123', name: 'Global Sponsor Coordinator', initials: 'GC', role: 'Sponsor Coordinator', organization: 'Global Tech Foundation' },
  { email: 'admin@admin.com', password: 'admin123', name: 'Demo Provider', initials: 'DP', role: 'Program Manager', organization: 'ScholarQuest Institute' },
];

export function validateProviderLogin(email, password) {
  // Check hardcoded defaults
  const foundDefault = PROVIDER_CREDENTIALS.find(p => p.email === email && p.password === password);
  if (foundDefault) return foundDefault;
  
  // Check registered providers
  const providers = get(KEYS.PROVIDERS) || [];
  const found = providers.find(p => p.email === email && p.password === password);
  return found || null;
}

export function registerProvider({ firstName, lastName, email, password, organization, role }) {
  const providers = get(KEYS.PROVIDERS) || [];
  if (providers.some(p => p.email === email)) {
    return null;
  }
  const provider = {
    firstName, lastName, email, password, organization,
    role: role || 'Coordinator',
    name: `${firstName} ${lastName}`,
    initials: `${(firstName || 'P')[0]}${(lastName || 'O')[0]}`.toUpperCase(),
    createdAt: Date.now(),
  };
  providers.push(provider);
  set(KEYS.PROVIDERS, providers);
  return provider;
}

export function getProviderSession() { return get(KEYS.PROVIDER_SESSION); }

export function setProviderSession(provider) {
  set(KEYS.PROVIDER_SESSION, { email: provider.email, name: provider.name, initials: provider.initials, role: provider.role, organization: provider.organization, loggedInAt: Date.now() });
}

export function clearProviderSession() {
  remove(KEYS.PROVIDER_SESSION);
}

export function isProviderLoggedIn() {
  return !!get(KEYS.PROVIDER_SESSION);
}

export function getProviderInfo() {
  return get(KEYS.PROVIDER_SESSION);
}

// Backwards-compatible aliases for layout files
export const validateAdminLogin = validateProviderLogin;
export const registerAdmin = registerProvider;
export const getAdminSession = getProviderSession;
export const setAdminSession = setProviderSession;
export const clearAdminSession = clearProviderSession;
export const isAdminLoggedIn = isProviderLoggedIn;
export const getAdminInfo = getProviderInfo;

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

export function updateCard(cardId, updates) {
  const cols = getTracker();
  for (const col of cols) {
    const idx = col.cards.findIndex(c => c.id === cardId);
    if (idx !== -1) {
      col.cards[idx] = { ...col.cards[idx], ...updates };
      break;
    }
  }
  saveTracker(cols);
}

// ─── Messages ─────────────────────────────────────────────────

export function getMessages() {
  const storedConvs = get(KEYS.MESSAGES) || DEFAULT_MESSAGES;
  const scholarships = getAdminScholarships();
  
  const uniqueOrgs = [...new Set(scholarships.map(s => s.org).filter(Boolean))];
  
  const allProviders = get(KEYS.PROVIDERS) || [];
  allProviders.forEach(p => {
    if (p.organization && !uniqueOrgs.includes(p.organization)) {
      uniqueOrgs.push(p.organization);
    }
  });

  PROVIDER_CREDENTIALS.forEach(p => {
    if (p.organization && !uniqueOrgs.includes(p.organization)) {
      uniqueOrgs.push(p.organization);
    }
  });

  const updatedConvs = storedConvs.filter(c => uniqueOrgs.includes(c.name) || uniqueOrgs.includes(c.name.replace(' Support', '')));
  let changed = updatedConvs.length !== storedConvs.length;

  // Ensure every provider has a support thread
  uniqueOrgs.forEach(org => {
    const exists = updatedConvs.find(c => c.name === org || c.name === `${org} Support`);
    if (!exists) {
      const avatarStr = org.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() || 'P';
      const colors = ['bg-primary/10 text-primary', 'bg-secondary/10 text-secondary', 'bg-tertiary-container/10 text-tertiary', 'bg-blue-500/10 text-blue-600'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      updatedConvs.push({
        id: Date.now() + Math.floor(Math.random() * 10000),
        name: org,
        avatar: avatarStr,
        avatarBg: randomColor,
        lastMessage: `Welcome to ${org} support.`,
        time: 'Just now', unread: 0, online: true,
        thread: [
          { id: 1, content: `Hello! If you have any questions about our scholarships, feel free to ask here.`, isMe: false, time: 'Just now' }
        ]
      });
      changed = true;
    }
  });

  if (changed) {
    set(KEYS.MESSAGES, updatedConvs);
  }
  
  return updatedConvs;
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
}

export function markAsRead(convId) {
  const convs = getMessages();
  const conv = convs.find(c => c.id === convId);
  if (conv) { conv.unread = 0; set(KEYS.MESSAGES, convs); }
}

export function providerSendMessage(convId, text) {
  const convs = getMessages();
  const conv = convs.find(c => c.id === convId);
  if (!conv) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // Provider sending a message looks like `isMe: false` from the student's perspective
  const msg = { id: Date.now(), content: text, isMe: false, time: timeStr };
  conv.thread.push(msg);
  conv.lastMessage = text;
  conv.time = 'Just now';
  conv.unread = (conv.unread || 0) + 1; // Increment unread counter for student
  conv.hiddenForStudent = false;
  set(KEYS.MESSAGES, convs);
}

export function leaveConversation(convId) {
  const convs = getMessages();
  const conv = convs.find(c => c.id === convId);
  if (conv) {
    conv.hiddenForStudent = true;
    set(KEYS.MESSAGES, convs);
  }
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
  const matched = getAdminScholarships().filter(s => s.status === 'Active').length;
  return { matched: matched || 5, applied, saved, deadlines };
}

// ─── Provider Dashboard / Scholarship Data ────────────────────

const DEFAULT_ADMIN_APPLICATIONS = [
  { id: 1, initials: 'EK', color: 'bg-primary/10 text-primary', student: 'Elena Kovalev', email: 'elena.k@stanford.edu', scholarship: 'Global Tech Innovators Fund', submitted: 'Oct 24, 2026', score: 96, status: 'Approved' },
  { id: 2, initials: 'JM', color: 'bg-secondary/10 text-secondary', student: 'Julian Martinez', email: 'j.martinez@mit.edu', scholarship: 'Future Leaders Foundation', submitted: 'Oct 23, 2026', score: 82, status: 'Under Review' },
];

const DEFAULT_ADMIN_SCHOLARSHIPS = [
  { id: 1, name: 'Global Tech Innovators Fund', category: 'STEM', amount: '$25,000', deadline: '2026-10-15', applicants: 142, status: 'Active', icon: 'school', org: 'Global Tech Foundation', match: '98%', desc: 'Awarded to students demonstrating exceptional leadership in computer science and AI ethics.' },
  { id: 2, name: 'Future Leaders Foundation', category: 'Leadership', amount: '$10,000', deadline: '2026-11-02', applicants: 87, status: 'Active', icon: 'star', org: 'Meridian Academic Foundation', match: '92%', desc: 'Supporting visionary students who are driving change in their local communities.' },
  { id: 3, name: 'Women in Tech Grant', category: 'STEM', amount: '$12,000', deadline: '2026-10-30', applicants: 203, status: 'Active', icon: 'school', org: 'Ada Lovelace Institute', match: '92%', desc: 'Supporting female students pursuing undergraduate or graduate degrees in STEM fields.' },
  { id: 4, name: 'Green Future Fund', category: 'International', amount: '$8,500', deadline: '2026-12-01', applicants: 56, status: 'Active', icon: 'public', org: 'EcoRoots Global', match: '85%', desc: 'Funding projects and studies dedicated to climate change research and sustainability initiatives.' },
  { id: 5, name: 'Visual Arts Merit Award', category: 'Creative', amount: '$20,000', deadline: '2026-01-15', applicants: 31, status: 'Active', icon: 'draw', org: 'National Endowment for Arts', match: '79%', desc: 'For outstanding portfolios in visual arts, design, and digital media.' },
];

const DEFAULT_ADMIN_STUDENTS = [
  { id: 1, initials: 'EK', color: 'bg-primary/10 text-primary', name: 'Elena Kovalev', email: 'elena.k@stanford.edu', program: 'Computer Science', gpa: '3.96', applications: 8, status: 'Active' },
  { id: 2, initials: 'JM', color: 'bg-secondary/10 text-secondary', name: 'Julian Martinez', email: 'j.martinez@mit.edu', program: 'Mechanical Engineering', gpa: '3.82', applications: 5, status: 'Active' },
];

export function getAdminApplications() {
  return get(KEYS.ADMIN_APPLICATIONS) || DEFAULT_ADMIN_APPLICATIONS;
}

export function addApplication(data) {
  const { studentName, studentEmail, scholarshipId, scholarshipName, gpa, institution, studyField, gradDate, honors, customResponses } = data;
  const apps = getAdminApplications();
  const colors = ['bg-primary/10 text-primary', 'bg-secondary/10 text-secondary', 'bg-tertiary-container/10 text-tertiary'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const score = Math.floor(Math.random() * 20) + 80; // 80 - 99
  const initials = studentName.split(' ').map(n => n[0]).join('').toUpperCase();
  
  const newApp = {
    id: Date.now(),
    initials,
    color: randomColor,
    student: studentName,
    email: studentEmail,
    scholarship: scholarshipName,
    submitted: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    score,
    status: 'Pending',
    gpa,
    institution,
    studyField,
    gradDate,
    honors,
    customResponses: customResponses || []
  };
  apps.unshift(newApp);
  set(KEYS.ADMIN_APPLICATIONS, apps);

  // Increment applicants count
  const scholarships = getAdminScholarships();
  const s = scholarships.find(item => item.id === Number(scholarshipId) || item.name === scholarshipName);
  if (s) {
    s.applicants = (s.applicants || 0) + 1;
    set(KEYS.ADMIN_SCHOLARSHIPS, scholarships);
  }

  // Update student's tracker
  const tracker = getTracker();
  const appliedCol = tracker.find(c => c.id === 'col_applied');
  if (appliedCol) {
    // Remove if exists elsewhere first
    for (const col of tracker) {
      const foundIdx = col.cards.findIndex(c => c.title === scholarshipName);
      if (foundIdx !== -1) {
        col.cards.splice(foundIdx, 1);
        break;
      }
    }
    appliedCol.cards.push({
      id: `card_${Date.now()}`,
      title: scholarshipName,
      submitted: `Submitted ${newApp.submitted}`,
      desc: s?.desc || ''
    });
    saveTracker(tracker);
  }

  // Add activity log
  addActivity({
    icon: 'check_circle',
    iconColor: 'text-green-600',
    title: 'Application Submitted',
    sub: scholarshipName,
    time: 'Just now'
  });

  return newApp;
}

export function updateApplicationStatus(id, status) {
  const apps = getAdminApplications();
  const app = apps.find(a => a.id === id);
  if (app) { 
    app.status = status; 
    set(KEYS.ADMIN_APPLICATIONS, apps); 

    // Sync to student's tracker
    const tracker = getTracker();
    let cardToMove = null;
    let fromCol = null;
    
    for (const col of tracker) {
      const card = col.cards.find(c => c.title === app.scholarship);
      if (card) {
        cardToMove = card;
        fromCol = col;
        break;
      }
    }

    if (cardToMove && fromCol) {
      const idx = fromCol.cards.indexOf(cardToMove);
      fromCol.cards.splice(idx, 1);

      let targetColId = 'col_review';
      if (status === 'Approved') targetColId = 'col_accepted';
      if (status === 'Rejected') targetColId = 'col_rejected';
      if (status === 'Under Review') targetColId = 'col_review';
      if (status === 'Pending') targetColId = 'col_applied';

      const targetCol = tracker.find(c => c.id === targetColId);
      if (targetCol) {
        if (status === 'Approved') {
          cardToMove.accepted = true;
          cardToMove.amount = '$25,000 /yr';
        } else {
          delete cardToMove.accepted;
        }
        targetCol.cards.push(cardToMove);
      }
      saveTracker(tracker);
    }

    // Add activity log
    let icon = 'info';
    let color = 'text-primary';
    let title = 'Application Status Updated';
    if (status === 'Approved') {
      icon = 'verified';
      color = 'text-green-600';
      title = 'Application Accepted! 🎉';
    } else if (status === 'Rejected') {
      icon = 'cancel';
      color = 'text-error';
      title = 'Application Rejected';
    } else if (status === 'Under Review') {
      icon = 'pending';
      color = 'text-blue-600';
      title = 'Application Under Review';
    }

    addActivity({
      icon,
      iconColor: color,
      title,
      sub: app.scholarship,
      time: 'Just now'
    });
  }
  return apps;
}

export function deleteApplication(id) {
  const apps = getAdminApplications().filter(a => a.id !== id);
  set(KEYS.ADMIN_APPLICATIONS, apps);
  return apps;
}

export function getAdminScholarships() {
  return get(KEYS.ADMIN_SCHOLARSHIPS) || DEFAULT_ADMIN_SCHOLARSHIPS;
}

export function addAdminScholarship(scholarship) {
  const list = getAdminScholarships();
  const newItem = { 
    id: Date.now(), 
    name: scholarship.name,
    category: scholarship.category || 'STEM',
    amount: scholarship.amount || '$10,000',
    deadline: scholarship.deadline || '2026-12-31',
    applicants: 0, 
    status: scholarship.status || 'Active',
    icon: scholarship.icon || 'school',
    org: scholarship.org || 'Sponsor Organization',
    match: scholarship.match || '90%',
    desc: scholarship.desc || 'A valuable scholarship opportunity.',
    formSections: scholarship.formSections || []
  };
  list.unshift(newItem);
  set(KEYS.ADMIN_SCHOLARSHIPS, list);
  return list;
}

export function updateAdminScholarship(id, updates) {
  const list = getAdminScholarships();
  const idx = list.findIndex(s => s.id === id);
  if (idx !== -1) { 
    list[idx] = { ...list[idx], ...updates }; 
    set(KEYS.ADMIN_SCHOLARSHIPS, list); 
  }
  return list;
}

export function deleteAdminScholarship(id) {
  const list = getAdminScholarships().filter(s => s.id !== id);
  set(KEYS.ADMIN_SCHOLARSHIPS, list);
  return list;
}

export function getAdminStudents() {
  return get(KEYS.ADMIN_STUDENTS) || DEFAULT_ADMIN_STUDENTS;
}

export function updateStudentStatus(id, status) {
  const students = getAdminStudents();
  const s = students.find(s => s.id === id);
  if (s) { s.status = status; set(KEYS.ADMIN_STUDENTS, students); }
  return students;
}

// ─── Nuke All Data ────────────────────────────────────────────

export function clearAllData() {
  Object.values(KEYS).forEach(k => remove(k));
}

// ─── Seed (ensures defaults exist) ───────────────────────────

export function ensureDefaults() {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem(KEYS.USER)) {
    const defaultUser = {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'student@student.com',
      password: 'student123',
      institution: 'Stanford University',
      name: 'Alex Johnson',
      initials: 'AJ',
      bio: 'Computer Science senior interested in Machine Learning and Artificial Intelligence.',
      gpa: '3.92',
      nationality: 'United States',
      state: 'California',
      dob: '2003-05-15',
      phone: '+1 (555) 019-2834',
      linkedin: 'linkedin.com/in/alex-johnson',
      skills: ['Machine Learning', 'Python', 'Data Analysis', 'Research'],
      interests: ['Artificial Intelligence', 'Climate Tech', 'Biotech'],
      studyField: 'Computer Science',
      careerGoals: 'To become an AI research scientist and work on solving global climate issues.',
      extracurriculars: 'Vice President of CS Club, Volunteer Tutor at local high school.',
      financialNeed: 'Low – Merit-based preferred',
      profileCompletion: 100,
      onboardingComplete: true,
      createdAt: Date.now(),
    };
    localStorage.setItem(KEYS.USER, JSON.stringify(defaultUser));
  }
  
  if (!localStorage.getItem(KEYS.PROVIDERS)) {
    const defaultProvider = {
      firstName: 'Global Sponsor',
      lastName: 'Coordinator',
      email: 'provider@scholarquest.io',
      password: 'provider123',
      organization: 'Global Tech Foundation',
      role: 'Sponsor Coordinator',
      name: 'Global Sponsor Coordinator',
      initials: 'GC',
      createdAt: Date.now(),
    };
    localStorage.setItem(KEYS.PROVIDERS, JSON.stringify([defaultProvider]));
  }
  
  if (!localStorage.getItem(KEYS.TRACKER)) {
    localStorage.setItem(KEYS.TRACKER, JSON.stringify(DEFAULT_TRACKER));
  }
  if (!localStorage.getItem(KEYS.MESSAGES)) {
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
  }
  if (!localStorage.getItem(KEYS.ACTIVITY)) {
    localStorage.setItem(KEYS.ACTIVITY, JSON.stringify(DEFAULT_ACTIVITY));
  }
  if (!localStorage.getItem(KEYS.SETTINGS)) {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  }
  if (!localStorage.getItem(KEYS.ADMIN_APPLICATIONS)) {
    localStorage.setItem(KEYS.ADMIN_APPLICATIONS, JSON.stringify(DEFAULT_ADMIN_APPLICATIONS));
  }
  if (!localStorage.getItem(KEYS.ADMIN_SCHOLARSHIPS)) {
    localStorage.setItem(KEYS.ADMIN_SCHOLARSHIPS, JSON.stringify(DEFAULT_ADMIN_SCHOLARSHIPS));
  }
  if (!localStorage.getItem(KEYS.ADMIN_STUDENTS)) {
    localStorage.setItem(KEYS.ADMIN_STUDENTS, JSON.stringify(DEFAULT_ADMIN_STUDENTS));
  }
}
