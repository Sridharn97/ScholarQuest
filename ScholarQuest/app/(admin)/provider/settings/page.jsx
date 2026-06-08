'use client';
import { useState, useEffect } from 'react';
import { getProviderInfo } from '@/lib/store';

export default function ProviderSettingsPage() {
  const [notifications, setNotifications] = useState({ newApplications: true, lowMatch: false, weeklyReport: true });
  const [providerInfo, setProviderInfo] = useState({ name: 'Sponsor Coordinator', initials: 'SC', role: 'Coordinator', organization: 'Company or Institute' });
  const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    const info = getProviderInfo();
    if (info) setProviderInfo(info);
  }, []);

  const Toggle = ({ checked, onChange }) => (
    <button onClick={onChange} className={`w-12 h-6 rounded-full relative transition-all ${checked ? 'bg-primary' : 'bg-outline-variant/40'}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Portal Settings</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Manage notifications, settings, and partner credentials for your organization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Organization Settings */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-6">Organization Configuration</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'org_name', label: 'Organization Name', value: providerInfo.organization, type: 'text', disabled: true },
                  { id: 'rep_name', label: 'Representative Name', value: providerInfo.name, type: 'text', disabled: true },
                  { id: 'rep_email', label: 'Email Address', value: providerInfo.email || 'representative@organization.com', type: 'email', disabled: true },
                  { id: 'rep_role', label: 'Assigned Role', value: providerInfo.role, type: 'text', disabled: true },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="font-label-md text-label-md text-on-surface">{field.label}</label>
                    <input id={field.id} type={field.type} defaultValue={field.value} disabled={field.disabled} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none opacity-80" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-on-surface-variant italic">Note: Institutional details are verified and locked. Contact support to change organization details.</p>
            </form>
          </div>

          {/* Notification Settings */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-6">Sponsor Notifications</h3>
            <div className="space-y-4">
              {[
                { key: 'newApplications', label: 'New Submission Alerts', desc: 'Get notified as soon as a student submits an application to your program' },
                { key: 'lowMatch', label: 'Low Compatibility Filter', desc: 'Flag or hide submissions that score below 70% match rating' },
                { key: 'weeklyReport', label: 'Weekly Summary Report', desc: 'Receive a summary of applicant volumes and deadlines every Monday morning' },
              ].map((item) => (
                <div key={item.key} className="flex items-start justify-between gap-4 p-4 bg-surface-container-low rounded-10">
                  <div>
                    <p className="font-label-md text-on-surface">{item.label}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                  </div>
                  <Toggle checked={notifications[item.key]} onChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {/* Profile Card */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-4">Partner Profile</h3>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-xl mb-3">
                {providerInfo.initials}
              </div>
              <p className="font-label-md text-on-surface">{providerInfo.name}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{providerInfo.role}</p>
              <span className="mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full font-label-sm">{providerInfo.organization}</span>
            </div>
            <button className="w-full py-2 border border-outline-variant rounded-10 font-label-md text-on-surface hover:bg-surface-container-low transition-all">
              Edit Profile
            </button>
          </div>

          {/* Security */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-4">Security</h3>
            <div className="space-y-3">
              {[
                { label: 'Change Password', icon: 'lock' },
                { label: 'Two-Factor Authentication', icon: 'security' },
                { label: 'Authorized Sign-ins', icon: 'history' },
              ].map((item) => (
                <button key={item.label} className="w-full flex items-center justify-between p-3 rounded-10 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span className="font-label-md text-on-surface">{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
