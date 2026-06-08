'use client';
import { useState, useEffect } from 'react';
import { getSettings, saveSettings, getUser, saveUser, clearAllData } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState('');
  const [notifications, setNotifications] = useState({ emailMatches: true, emailDeadlines: true, emailUpdates: false, pushMatches: true, pushDeadlines: true });
  const [privacy, setPrivacy] = useState({ profileVisible: true, showGPA: false, allowContact: true });
  const [theme, setTheme] = useState('light');
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', email: '', phone: '', bio: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const settings = getSettings();
    if (settings?.notifications) setNotifications(settings.notifications);
    if (settings?.privacy) setPrivacy(settings.privacy);
    if (settings?.appearance?.theme) setTheme(settings.appearance.theme);
    const user = getUser();
    if (user) setProfileForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      bio: user.bio || '',
    });
  }, []);

  const showToast = (msg) => {
    setSaved(msg);
    setTimeout(() => setSaved(''), 3000);
  };

  const toggle = (setter, stateObj, key, settingsKey) => {
    const newObj = { ...stateObj, [key]: !stateObj[key] };
    setter(newObj);
    const settings = getSettings();
    saveSettings({ ...settings, [settingsKey]: newObj });
    showToast('Setting saved!');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    saveUser({
      ...profileForm,
      name: `${profileForm.firstName} ${profileForm.lastName}`,
      initials: `${(profileForm.firstName || 'A')[0]}${(profileForm.lastName || 'J')[0]}`.toUpperCase(),
    });
    showToast('Profile saved!');
  };

  const handleThemeChange = (t) => {
    setTheme(t);
    const settings = getSettings();
    saveSettings({ ...settings, appearance: { theme: t } });
    showToast('Theme saved!');
  };

  const handleDeleteAccount = () => {
    clearAllData();
    router.push('/');
  };

  const handleExportData = () => {
    const data = {
      user: getUser(),
      settings: getSettings(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scholarquest_data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported!');
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full relative transition-all ${checked ? 'bg-primary' : 'bg-outline-variant/40'}`}
    >
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  );

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: 'person' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'privacy', label: 'Privacy & Security', icon: 'lock' },
    { id: 'appearance', label: 'Appearance', icon: 'palette' },
    { id: 'account', label: 'Account', icon: 'manage_accounts' },
  ];

  return (
    <div className="max-w-container-max mx-auto px-gutter py-10">
      {/* Toast */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-subtle-float">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          {saved}
        </div>
      )}

      <div className="mb-10">
        <h1 className="font-headline-lg text-headline-lg text-on-background" style={{ fontFamily: 'Manrope, sans-serif' }}>Settings</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">Manage your account preferences and profile settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Settings Navigation */}
        <div className="lg:col-span-1 overflow-x-auto pb-2 lg:pb-0">
          <nav className="glass-card rounded-2xl p-4 flex lg:flex-col gap-2 sticky top-24 min-w-max lg:min-w-0">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-10 font-label-md text-label-md transition-all text-left whitespace-nowrap ${activeSection === section.id ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
              >
                <span className="material-symbols-outlined shrink-0" style={{ fontSize: '20px' }}>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-10">
          {/* ── PROFILE ── */}
          {activeSection === 'profile' && (
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-6">Profile Settings</h2>
              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-outline-variant/20">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
                  {`${(profileForm.firstName || 'A')[0]}${(profileForm.lastName || 'J')[0]}`.toUpperCase()}
                </div>
                <div>
                  <p className="font-label-md text-on-surface mb-2">Profile Photo</p>
                  <div className="flex gap-2">
                    <label className="px-4 py-2 bg-primary text-on-primary rounded-6 font-label-sm hover:opacity-90 transition-all cursor-pointer">
                      Upload Photo
                      <input type="file" className="hidden" accept="image/*" onChange={() => showToast('Photo upload would connect to backend in production')} />
                    </label>
                  </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 'firstName', label: 'First Name', type: 'text' },
                    { id: 'lastName', label: 'Last Name', type: 'text' },
                    { id: 'email', label: 'Email Address', type: 'email' },
                    { id: 'phone', label: 'Phone Number', type: 'tel' },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2">
                      <label htmlFor={field.id} className="font-label-md text-label-md text-on-surface">{field.label}</label>
                      <input
                        id={field.id}
                        type={field.type}
                        value={profileForm[field.id] || ''}
                        onChange={e => setProfileForm({...profileForm, [field.id]: e.target.value})}
                        className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <label htmlFor="bio" className="font-label-md text-label-md text-on-surface">Bio</label>
                  <textarea
                    id="bio"
                    rows={4}
                    value={profileForm.bio || ''}
                    onChange={e => setProfileForm({...profileForm, bio: e.target.value})}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                  <button type="submit" className="px-6 py-3 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95 shadow-md shadow-primary/20">
                    Save Changes
                  </button>
                  <button type="button" onClick={() => { const user = getUser(); if (user) setProfileForm({ firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '', phone: user.phone || '', bio: user.bio || '' }); }} className="px-6 py-3 border border-outline-variant rounded-10 font-label-md text-on-surface hover:bg-surface-container-low transition-all">
                    Discard
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeSection === 'notifications' && (
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'emailMatches', label: 'New Scholarship Matches', desc: 'Get notified when new scholarships match your profile' },
                      { key: 'emailDeadlines', label: 'Deadline Reminders', desc: 'Receive reminders 7 days and 1 day before deadlines' },
                      { key: 'emailUpdates', label: 'Platform Updates', desc: 'News about new features and improvements' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start justify-between gap-4 p-4 bg-surface-container-low rounded-10">
                        <div>
                          <p className="font-label-md text-on-surface">{item.label}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle checked={notifications[item.key]} onChange={() => toggle(setNotifications, notifications, item.key, 'notifications')} />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'pushMatches', label: 'New Matches', desc: 'Real-time alerts for high-match scholarships' },
                      { key: 'pushDeadlines', label: 'Urgent Deadlines', desc: 'Same-day deadline alerts' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start justify-between gap-4 p-4 bg-surface-container-low rounded-10">
                        <div>
                          <p className="font-label-md text-on-surface">{item.label}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle checked={notifications[item.key]} onChange={() => toggle(setNotifications, notifications, item.key, 'notifications')} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PRIVACY ── */}
          {activeSection === 'privacy' && (
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-6">Privacy &amp; Security</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Profile Visibility</h3>
                  <div className="space-y-4">
                    {[
                      { key: 'profileVisible', label: 'Make profile visible to sponsors', desc: 'Scholarship providers can discover your profile' },
                      { key: 'showGPA', label: 'Show GPA publicly', desc: 'Display your GPA on your public profile' },
                      { key: 'allowContact', label: 'Allow direct contact from providers', desc: 'Enable scholarship providers to message you' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-start justify-between gap-4 p-4 bg-surface-container-low rounded-10">
                        <div>
                          <p className="font-label-md text-on-surface">{item.label}</p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle checked={privacy[item.key]} onChange={() => toggle(setPrivacy, privacy, item.key, 'privacy')} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-outline-variant/20 pt-6">
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Security</h3>
                  <div className="space-y-3">
                    <button onClick={() => showToast('Password reset email sent!')} className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-10 hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">lock</span>
                        <span className="font-label-md text-on-surface">Change Password</span>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                    </button>
                    <button onClick={() => showToast('Two-factor authentication is enabled!')} className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-10 hover:bg-surface-container transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">security</span>
                        <span className="font-label-md text-on-surface">Two-Factor Authentication</span>
                      </div>
                      <span className="bg-green-100 text-green-700 font-label-sm px-2 py-0.5 rounded-full">Enabled</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── APPEARANCE ── */}
          {activeSection === 'appearance' && (
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-6">Appearance</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Light', icon: 'light_mode', value: 'light' },
                      { label: 'Dark', icon: 'dark_mode', value: 'dark' },
                      { label: 'System', icon: 'computer', value: 'system' },
                    ].map((t) => (
                      <button
                        key={t.value}
                        onClick={() => handleThemeChange(t.value)}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${theme === t.value ? 'border-primary bg-primary/5' : 'border-outline-variant hover:border-primary/50'}`}
                      >
                        <span className={`material-symbols-outlined ${theme === t.value ? 'text-primary' : 'text-on-surface-variant'}`} style={{ fontSize: '28px' }}>{t.icon}</span>
                        <span className={`font-label-md text-label-md ${theme === t.value ? 'text-primary' : 'text-on-surface-variant'}`}>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-4">Accent Color</h3>
                  <div className="flex gap-3">
                    {['#004ac6', '#712ae2', '#943700', '#16a34a', '#dc2626', '#0891b2'].map((color) => (
                      <button key={color} onClick={() => showToast(`Accent color set! (Full theming requires CSS vars in production)`)} className="w-10 h-10 rounded-full border-4 border-white shadow-md hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ACCOUNT ── */}
          {activeSection === 'account' && (
            <div className="space-y-10">
              <div className="glass-card rounded-2xl p-10">
                <h2 className="font-headline-md text-headline-md mb-6">Account Management</h2>
                <div className="space-y-4">
                  <button onClick={handleExportData} className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-10 hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">download</span>
                      <div className="text-left">
                        <p className="font-label-md text-on-surface">Export My Data</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Download all your profile and application data as JSON</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </button>
                  <button onClick={() => showToast('Account deactivated. You can reactivate by logging in.')} className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-10 hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">pause_circle</span>
                      <div className="text-left">
                        <p className="font-label-md text-on-surface">Deactivate Account</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">Temporarily disable your account</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                  </button>
                </div>
              </div>

              <div className="p-10 bg-error-container/20 border border-error/20 rounded-2xl">
                <h3 className="font-headline-md text-headline-md text-error mb-2">Danger Zone</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                {!showDeleteConfirm ? (
                  <button onClick={() => setShowDeleteConfirm(true)} className="px-6 py-3 bg-error text-on-error rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95">
                    Delete Account
                  </button>
                ) : (
                  <div className="flex gap-3 items-center flex-wrap">
                    <p className="font-label-md text-error">Are you sure? This will erase all your data.</p>
                    <button onClick={handleDeleteAccount} className="px-6 py-3 bg-error text-on-error rounded-10 font-label-md hover:opacity-90 transition-all">
                      Yes, Delete Everything
                    </button>
                    <button onClick={() => setShowDeleteConfirm(false)} className="px-6 py-3 border border-outline-variant rounded-10 font-label-md text-on-surface hover:bg-surface-container-low transition-all">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
