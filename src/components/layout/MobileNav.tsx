import { Home, Calendar, FileText, ClipboardList, User, Phone } from 'lucide-react';

interface MobileNavProps {
  activeRoute: string;
  onNavigate: (route: string) => void;
  role: 'patient' | 'doctor' | 'worker' | 'facility';
}

const navItems: Record<string, { label: string; icon: any; route: string }[]> = {
  patient: [
    { label: 'Home', icon: Home, route: '/patient/dashboard' },
    { label: 'Records', icon: FileText, route: '/patient/records' },
    { label: 'Referrals', icon: ClipboardList, route: '/patient/referrals' },
    { label: 'Calendar', icon: Calendar, route: '/patient/appointments' },
    { label: 'Profile', icon: User, route: '/patient/profile' },
  ],
  doctor: [
    { label: 'Home', icon: Home, route: '/doctor/dashboard' },
    { label: 'Patients', icon: User, route: '/doctor/patients' },
    { label: 'Consult', icon: Calendar, route: '/doctor/consultation' },
    { label: 'Referrals', icon: ClipboardList, route: '/doctor/referrals' },
    { label: 'Profile', icon: User, route: '/doctor/profile' },
  ],
  worker: [
    { label: 'Home', icon: Home, route: '/worker/dashboard' },
    { label: 'Patients', icon: User, route: '/worker/patients' },
    { label: 'Referrals', icon: ClipboardList, route: '/worker/referrals' },
    { label: 'Follow-ups', icon: Calendar, route: '/worker/followups' },
    { label: 'Profile', icon: User, route: '/worker/profile' },
  ],
  facility: [
    { label: 'Home', icon: Home, route: '/facility/dashboard' },
    { label: 'Analytics', icon: FileText, route: '/facility/analytics' },
    { label: 'Referrals', icon: ClipboardList, route: '/facility/referrals' },
    { label: 'Inventory', icon: Calendar, route: '/facility/inventory' },
    { label: 'Profile', icon: User, route: '/facility/profile' },
  ],
};

export function MobileNav({ activeRoute, onNavigate, role }: MobileNavProps) {
  const items = navItems[role] || navItems.patient;

  return (
    <>
      {/* Emergency FAB */}
      <button className="lg:hidden fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full bg-red-500 text-white shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors active:scale-95">
        <Phone size={20} />
      </button>

      {/* Bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-sahaay-deep/8 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16">
          {items.map(item => {
            const Icon = item.icon;
            const isActive = activeRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
                  isActive ? 'text-sahaay-deep' : 'text-gray-400'
                }`}
              >
                <div className={`w-10 h-8 flex items-center justify-center rounded-lg ${isActive ? 'bg-sahaay-deep/10' : ''}`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
