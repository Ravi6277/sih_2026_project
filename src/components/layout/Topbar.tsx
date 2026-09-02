import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, X, Phone } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { LanguageSelector } from '../ui/LanguageSelector';
import { notifications } from '../../data/mockData';

interface TopbarProps {
  sidebarCollapsed: boolean;
  onMenuToggle: () => void;
  title?: string;
  subtitle?: string;
}

export function Topbar({ onMenuToggle, title, subtitle }: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);

    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const mockResults = [
    { category: 'Patients', results: ['Rahul Sharma', 'Ananya Das', 'Priya Devi'] },
    { category: 'Doctors', results: ['Dr. Ananya Sharma', 'Dr. Arjun Das', 'Dr. Priya Singh'] },
    { category: 'Facilities', results: ['PHC Chandrapur', 'CHC Sonapur', 'District Hospital Guwahati'] },
  ];



  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-4 px-4 lg:px-6 bg-sahaay-surface/80 backdrop-blur-xl border-b border-sahaay-deep/6">
      {/* Mobile menu */}
      <button onClick={onMenuToggle} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/60 transition-colors">
        <Menu size={20} className="text-gray-600" />
      </button>

      {/* Title */}
      <div className="hidden sm:block">
        {title ? (
          <div>
            <h1 className="text-base font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        ) : (
          <div>
            <h1 className="text-base font-bold text-gray-900">SAHAAY</h1>
            <p className="text-[11px] text-gray-500">Connecting Care. Continuing Hope.</p>
          </div>
        )}
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="relative hidden md:block" style={{ width: searchOpen ? 360 : 200 }}>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 border transition-all duration-200 ${searchOpen ? 'border-sahaay-deep/30 shadow-sm' : 'border-transparent'}`}>
          <Search size={16} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search patients, doctors..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(''); setSearchOpen(false); }}>
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>
        {searchOpen && searchQuery && (
          <div className="absolute top-full mt-2 left-0 right-0 glass-card-elevated p-3 max-h-80 overflow-y-auto shadow-xl">
            {mockResults.map(cat => (
              <div key={cat.category} className="mb-3 last:mb-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">{cat.category}</p>
                {cat.results.map(r => (
                  <button key={r} className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-sahaay-deep/5 transition-colors">
                    {r}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile search */}
      <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/60 transition-colors">
        <Search size={18} className="text-gray-600" />
      </button>

      {/* Language selector */}
      <div>
        <LanguageSelector />
      </div>

      {/* Emergency button */}
      <button className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-xs font-semibold">
        <Phone size={14} />
        <span className="hidden lg:inline">Emergency</span>
      </button>

      {/* Notifications */}
      <div ref={notifRef} className="relative">
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/60 transition-colors"
        >
          <Bell size={18} className="text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse-soft">
              {unreadCount}
            </span>
          )}
        </button>
        {notifOpen && (
          <div className="absolute top-full mt-2 right-0 glass-card-elevated w-80 shadow-xl">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-sahaay-surface/50 transition-colors cursor-pointer ${!n.read ? 'bg-sahaay-50/50' : ''}`}>
                  <p className="text-sm font-semibold text-gray-800">{n.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-white/60 transition-colors">
        <Avatar initials="RS" size="sm" />
        <span className="hidden lg:inline text-sm font-medium text-gray-700">Rahul S.</span>
      </button>
    </header>
  );
}
