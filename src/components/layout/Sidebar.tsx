import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Calendar, MessageSquare, FileText, Stethoscope,
  Pill, Activity, Building2, Bell, BarChart3, Settings, Heart,
  ChevronLeft, ChevronRight, LogOut, HelpCircle, ClipboardList,
  Video, Mic, Upload
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeRoute: string;
  onNavigate: (route: string) => void;
  role: 'patient' | 'doctor' | 'worker' | 'facility';
}

const roleMenus: Record<string, { label: string; icon: any; route: string }[]> = {
  patient: [
    { label: 'Overview', icon: LayoutDashboard, route: '/patient/dashboard' },
    { label: 'Symptom Checker', icon: Stethoscope, route: '/patient/symptom-checker' },
    { label: 'AI Assistant', icon: Mic, route: '/patient/ai-assistant' },
    { label: 'My Vitals', icon: Activity, route: '/patient/vitals' },
    { label: 'Lab Reports', icon: Upload, route: '/patient/lab-reports' },
    { label: 'Appointments', icon: Calendar, route: '/patient/appointments' },
    { label: 'Health Records', icon: FileText, route: '/patient/records' },
    { label: 'Referrals', icon: ClipboardList, route: '/patient/referrals' },
    { label: 'Facilities', icon: Building2, route: '/patient/facilities' },
    { label: 'Diagnostics', icon: Activity, route: '/patient/diagnostics' },
    { label: 'Medicines', icon: Pill, route: '/patient/medicines' },
    { label: 'Follow-ups', icon: ClipboardList, route: '/patient/followups' },
    { label: 'Messages', icon: MessageSquare, route: '/patient/messages' },
    { label: 'Notifications', icon: Bell, route: '/patient/notifications' },
    { label: 'Analytics', icon: BarChart3, route: '/patient/analytics' },
    { label: 'Settings', icon: Settings, route: '/settings' },
  ],
  doctor: [
    { label: 'Overview', icon: LayoutDashboard, route: '/doctor/dashboard' },
    { label: 'My Patients', icon: Users, route: '/doctor/patients' },
    { label: 'Consultations', icon: Video, route: '/doctor/consultation' },
    { label: 'Appointments', icon: Calendar, route: '/doctor/appointments' },
    { label: 'Referrals', icon: ClipboardList, route: '/doctor/referrals' },
    { label: 'Follow-ups', icon: Stethoscope, route: '/doctor/followups' },
    { label: 'Messages', icon: MessageSquare, route: '/doctor/messages' },
    { label: 'Notifications', icon: Bell, route: '/doctor/notifications' },
    { label: 'Settings', icon: Settings, route: '/settings' },
  ],
  worker: [
    { label: 'Overview', icon: LayoutDashboard, route: '/worker/dashboard' },
    { label: 'My Patients', icon: Users, route: '/worker/patients' },
    { label: 'Referrals', icon: ClipboardList, route: '/worker/referrals' },
    { label: 'Follow-ups', icon: Stethoscope, route: '/worker/followups' },
    { label: 'Facilities', icon: Building2, route: '/worker/facilities' },
    { label: 'Messages', icon: MessageSquare, route: '/worker/messages' },
    { label: 'Settings', icon: Settings, route: '/settings' },
  ],
  facility: [
    { label: 'Overview', icon: LayoutDashboard, route: '/facility/dashboard' },
    { label: 'Analytics', icon: BarChart3, route: '/facility/analytics' },
    { label: 'Referrals', icon: ClipboardList, route: '/facility/referrals' },
    { label: 'Inventory', icon: Pill, route: '/facility/inventory' },
    { label: 'Patients', icon: Users, route: '/facility/patients' },
    { label: 'Messages', icon: MessageSquare, route: '/facility/messages' },
    { label: 'Settings', icon: Settings, route: '/settings' },
  ],
};

const roleNames: Record<string, string> = { patient: 'Patient', doctor: 'Doctor', worker: 'Healthcare Worker', facility: 'Facility Admin' };


const menuLabels: Record<string, string> = {
  'Overview': 'dash.overview',
  'Appointments': 'dash.appointments',
  'Health Records': 'dash.records',
  'Referrals': 'dash.referrals',
  'Facilities': 'dash.facilities',
  'Diagnostics': 'dash.diagnostics',
  'Medicines': 'dash.medicines',
  'Follow-ups': 'dash.followups',
  'Messages': 'dash.messages',
  'Notifications': 'dash.notifications',
  'Analytics': 'dash.analytics',
  'Settings': 'dash.settings',
  'My Patients': 'dash.patients',
  'Consultations': 'dash.consultations',
  'Patients': 'dash.patients',
  'Inventory': 'dash.inventory',
  'Symptom Checker': 'dash.symptomChecker',
  'AI Assistant': 'dash.aiAssistant',
  'My Vitals': 'dash.myVitals',
  'Lab Reports': 'dash.labReports',
};

export function Sidebar({ collapsed, onToggle, activeRoute, onNavigate, role }: SidebarProps) {
  const { t } = useLanguage();
  const menuItems = roleMenus[role] || roleMenus.patient;
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 sahaay-gradient-deep overflow-hidden"
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-4 h-16 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
            <Heart size={18} className="text-sahaay-300" fill="currentColor" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden">
                <h1 className="text-white font-bold text-lg tracking-tight">SAHAAY</h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Role badge */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 mb-3">
              <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">{roleNames[role]}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-0.5">
          {menuItems.map((item) => {
            const isActive = activeRoute === item.route || (activeRoute === '' && item.route === menuItems[0]?.route);
            const Icon = item.icon;
            return (
              <button
                key={item.route}
                onClick={() => onNavigate(item.route)}
                onMouseEnter={() => setHovered(item.route)}
                onMouseLeave={() => setHovered(null)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/60 hover:bg-white/8 hover:text-white'
                }`}
                title={collapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-sahaay-300 rounded-r-full" />
                )}
                <Icon size={20} className="shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                      {t(menuLabels[item.label] || 'dash.overview')}
                    </motion.span>
                  )}
                </AnimatePresence>
                {collapsed && hovered === item.route && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 pb-4 space-y-1 border-t border-white/10 pt-3 mt-2">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-all">
            <HelpCircle size={20} className="shrink-0" />
            {!collapsed && <span>{t('footer.support')}</span>}
          </button>
          <button
            onClick={() => onNavigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-white/8 hover:text-white transition-all"
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && <span>{t('dash.logout')}</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-sahaay-deep border-2 border-white/20 items-center justify-center text-white/60 hover:text-white hover:bg-sahaay-700 transition-all z-50"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>
    </>
  );
}
