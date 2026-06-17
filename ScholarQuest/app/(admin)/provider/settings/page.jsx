'use client';
import { useState, useEffect } from 'react';
import { getProviderInfo } from '@/lib/store';

export default function ProviderSettingsPage() {
  const [providerInfo, setProviderInfo] = useState({ name: 'Sponsor Coordinator', initials: 'SC', role: 'Coordinator', organization: 'Company or Institute' });

  useEffect(() => {
    const info = getProviderInfo();
    if (info) setProviderInfo(info);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>Settings</h2>
        <p className="text-slate-500 mt-1 text-sm">Manage your profile and security preferences.</p>
      </div>

      <div className="space-y-6">
        
        {/* Profile / Organization Details */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Profile Details</h3>
            </div>
            <p className="text-sm text-slate-500 ml-11">View and update your personal and organizational profile.</p>
          </div>
          <div className="p-5 sm:p-6">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'org_name', label: 'Organization Name', value: providerInfo.organization, type: 'text', disabled: true },
                  { id: 'rep_name', label: 'Representative Name', value: providerInfo.name, type: 'text', disabled: false },
                  { id: 'rep_email', label: 'Work Email', value: providerInfo.email || 'representative@organization.com', type: 'email', disabled: false },
                  { id: 'rep_role', label: 'Assigned Role', value: providerInfo.role, type: 'text', disabled: true },
                ].map((field) => (
                  <div key={field.id} className="space-y-1.5">
                    <label htmlFor={field.id} className="block text-sm font-bold text-slate-700">{field.label}</label>
                    <input 
                      id={field.id} 
                      type={field.type} 
                      defaultValue={field.value} 
                      disabled={field.disabled} 
                      className={`w-full px-3 h-10 rounded-xl text-sm outline-none transition-all ${field.disabled ? 'bg-slate-50 border border-slate-200 text-slate-500 cursor-not-allowed' : 'bg-white border border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 shadow-sm'}`}
                    />
                  </div>
                ))}
              </div>
              <div className="pt-3 flex items-center justify-between">
                <p className="text-xs text-slate-400 font-medium">Some details are locked by your administrator.</p>
                <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm transition-all active:scale-95">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Change Password</h3>
            </div>
            <p className="text-sm text-slate-500 ml-11">Ensure your account is using a long, random password to stay secure.</p>
          </div>
          <div className="p-5 sm:p-6">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-3 max-w-md">
                <div className="space-y-1.5">
                  <label htmlFor="current_password" className="block text-sm font-bold text-slate-700">Current Password</label>
                  <input 
                    id="current_password" 
                    type="password" 
                    placeholder="Enter current password"
                    className="w-full px-3 h-10 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="new_password" className="block text-sm font-bold text-slate-700">New Password</label>
                  <input 
                    id="new_password" 
                    type="password" 
                    placeholder="Min. 8 characters"
                    className="w-full px-3 h-10 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="confirm_password" className="block text-sm font-bold text-slate-700">Confirm New Password</label>
                  <input 
                    id="confirm_password" 
                    type="password" 
                    placeholder="Confirm new password"
                    className="w-full px-3 h-10 rounded-xl text-sm outline-none transition-all bg-white border border-slate-200 text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 shadow-sm"
                  />
                </div>
              </div>
              
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-xl shadow-md shadow-primary/20 transition-all active:scale-95">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
