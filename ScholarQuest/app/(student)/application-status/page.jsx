'use client';
import useNotifications from '@/lib/hooks/useNotifications';
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ApplicationStatusPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const handleCreateMock = async () => {
    if (!auth.currentUser) return;
    await addDoc(collection(db, 'notifications'), {
      userId: auth.currentUser.uid,
      scholarshipName: 'National Merit Scholarship',
      type: 'status_update',
      status: 'Approved',
      message: 'Congratulations! Your application for the National Merit Scholarship was Approved!',
      createdAt: new Date().toISOString(),
      read: false
    });
  };

  const confirmedApps = notifications.filter(n => n.status === 'Approved' || n.status === 'Accepted');
  const rejectedApps = notifications.filter(n => n.status === 'Rejected');
  const otherUpdates = notifications.filter(n => n.status !== 'Approved' && n.status !== 'Accepted' && n.status !== 'Rejected');

  const renderNotificationCard = (n) => (
    <SpotlightCard 
      key={n.id} 
      spotlightColor="rgba(79, 57, 246, 0.05)"
      className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
        !n.read 
          ? 'bg-white border-primary/30 shadow-md shadow-primary/5' 
          : 'bg-gray-50 border-gray-100 shadow-sm opacity-80'
      }`}
    >
      <div 
        className="flex items-start gap-4"
        onClick={() => !n.read && markAsRead(n.id)}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
          (n.status === 'Approved' || n.status === 'Accepted') ? 'bg-emerald-100 text-emerald-600' :
          n.status === 'Rejected' ? 'bg-rose-100 text-rose-600' :
          'bg-blue-100 text-blue-600'
        }`}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            {(n.status === 'Approved' || n.status === 'Accepted') ? 'check_circle' : n.status === 'Rejected' ? 'cancel' : 'info'}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h4 className={`text-lg font-bold truncate ${!n.read ? 'text-gray-900' : 'text-gray-700'}`}>
              {n.scholarshipName || 'Application Update'}
            </h4>
            <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">
              {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className={`text-sm leading-relaxed ${!n.read ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
            {n.message}
          </p>
        </div>
        
        {!n.read && (
          <div className="w-3 h-3 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
        )}
      </div>
    </SpotlightCard>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#111827] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Application Status</h1>
          <p className="text-gray-500">You have {unreadCount} unread update{unreadCount !== 1 && 's'}.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleCreateMock}
            className="px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-lg hover:bg-emerald-200 transition-all text-sm"
          >
            + Add Demo Update
          </button>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-all text-sm"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">notifications_off</span>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Updates</h3>
          <p className="text-gray-500">You're all caught up! Check back later for updates on your applications.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {confirmedApps.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">verified</span>
                Confirmed Applications
              </h2>
              <div className="space-y-4">
                {confirmedApps.map(renderNotificationCard)}
              </div>
            </section>
          )}

          {rejectedApps.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-500">block</span>
                Rejected Applications
              </h2>
              <div className="space-y-4">
                {rejectedApps.map(renderNotificationCard)}
              </div>
            </section>
          )}

          {otherUpdates.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-500">info</span>
                Other Updates
              </h2>
              <div className="space-y-4">
                {otherUpdates.map(renderNotificationCard)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
