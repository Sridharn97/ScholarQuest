'use client';
import { useState } from 'react';

export default function AdminSettingsPage() {
  const [notifications, setNotifications] = useState({ newApplications: true, lowMatch: false, weeklyReport: true });
  const toggle = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  const Toggle = ({ checked, onChange }) => (
    <button onClick={onChange} className={`w-12 h-6 rounded-full relative transition-all ${checked ? 'bg-primary' : 'bg-outline-variant/40'}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Admin Settings</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Manage platform configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Platform Settings */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-6">Platform Configuration</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'platform_name', label: 'Platform Name', value: 'ScholarQuest', type: 'text' },
                  { id: 'support_email', label: 'Support Email', value: 'support@scholarquest.io', type: 'email' },
                  { id: 'max_applications', label: 'Max Applications Per Student', value: '50', type: 'number' },
                  { id: 'match_threshold', label: 'Minimum Match Score (%)', value: '60', type: 'number' },
                ].map((field) => (
                  <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="font-label-md text-label-md text-on-surface">{field.label}</label>
                    <input id={field.id} type={field.type} defaultValue={field.value} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                <button type="submit" className="px-6 py-3 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95 shadow-md shadow-primary/20">Save Settings</button>
              </div>
            </form>
          </div>

          {/* Notification Settings */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-6">Admin Notifications</h3>
            <div className="space-y-4">
              {[
                { key: 'newApplications', label: 'New Application Alerts', desc: 'Get notified when new applications are submitted' },
                { key: 'lowMatch', label: 'Low Match Score Alerts', desc: 'Alert when applications fall below match threshold' },
                { key: 'weeklyReport', label: 'Weekly Analytics Report', desc: 'Receive a summary every Monday morning' },
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
          {/* Admin Profile */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-4">Admin Profile</h3>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-xl mb-3">AS</div>
              <p className="font-label-md text-on-surface">Alex Sterling</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Lead Administrator</p>
              <span className="mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full font-label-sm">Super Admin</span>
            </div>
            <button className="w-full py-2 border border-outline-variant rounded-10 font-label-md text-on-surface hover:bg-surface-container-low transition-all">
              Edit Admin Profile
            </button>
          </div>

          {/* Security */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-4">Security</h3>
            <div className="space-y-3">
              {[
                { label: 'Change Password', icon: 'lock' },
                { label: 'Two-Factor Auth', icon: 'security' },
                { label: 'Activity Log', icon: 'history' },
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

          {/* System Status */}
          <div className="glass-card p-10 rounded-2xl border border-outline-variant/20">
            <h3 className="font-headline-md text-headline-md mb-4">System Status</h3>
            <div className="space-y-3">
              {[
                { service: 'AI Matching Engine', status: 'Operational', color: 'bg-green-500' },
                { service: 'Database', status: 'Operational', color: 'bg-green-500' },
                { service: 'Email Service', status: 'Operational', color: 'bg-green-500' },
                { service: 'Storage', status: '92% used', color: 'bg-orange-400' },
              ].map((item) => (
                <div key={item.service} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="font-body-sm text-body-sm text-on-surface">{item.service}</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
