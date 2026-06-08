import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 border-b border-white/8">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-10 bg-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-white" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>school</span>
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">ScholarQuest</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm mb-6">
              Empowering academic futures through intelligent scholarship discovery and application management.
            </p>
            <div className="flex gap-3">
              {['public', 'alternate_email', 'rss_feed'].map((icon) => (
                <button key={icon} className="w-9 h-9 rounded-10 bg-white/8 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all">
                  <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>{icon}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-white font-bold mb-2">Stay updated with new scholarships</p>
            <p className="text-gray-400 text-sm mb-4">Get weekly match alerts and application tips directly to your inbox.</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 bg-white/8 border border-white/10 rounded-10 text-sm text-white placeholder:text-gray-500 outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button className="px-5 h-11 bg-primary text-white text-sm font-bold rounded-10 hover:bg-primary/90 transition-all flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Mid: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          {[
            {
              title: 'Platform',
              links: [
                { label: 'Scholarship Discovery', href: '/discovery' },
                { label: 'AI Matcher', href: '/ai-matcher' },
                { label: 'Application Tracker', href: '/tracker' },
                { label: 'Success Stories', href: '#' },
              ],
            },
            {
              title: 'Students',
              links: [
                { label: 'Create Profile', href: '/signup' },
                { label: 'Browse Scholarships', href: '/discovery' },
                { label: 'My Applications', href: '/tracker' },
                { label: 'Help Center', href: '/help' },
              ],
            },
            {
              title: 'Organizations',
              links: [
                { label: 'Post a Scholarship', href: '/provider-signup' },
                { label: 'Company / Institute Portal', href: '/provider-login' },
                { label: 'Partner Program', href: '#' },
                { label: 'API Access', href: '#' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About Us', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-white font-semibold text-sm mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Legal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-white/8">
          <p className="text-gray-500 text-sm">© 2024 ScholarQuest. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Cookies', 'Sitemap'].map((item) => (
              <Link key={item} href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
