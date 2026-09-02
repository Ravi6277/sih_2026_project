import { motion } from 'framer-motion';
import { Users, ClipboardList, Stethoscope, AlertTriangle, UserPlus, Activity, Building2, FileText, WifiOff, RefreshCw } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { patients } from '../../data/mockData';
import { useToast } from '../../components/ui/Toast';
import { useLanguage } from '../../i18n/LanguageContext';

interface WorkerDashboardProps {
  onNavigate: (route: string) => void;
}

export function WorkerDashboard({ onNavigate }: WorkerDashboardProps) {
  const { showToast } = useToast();
  const { t } = useLanguage();

  const quickActions = [
    { icon: UserPlus, label: 'Register Patient', route: '/worker/patients' },
    { icon: Activity, label: 'Health Intake', route: '/worker/patients' },
    { icon: ClipboardList, label: 'Create Referral', route: '/worker/referrals' },
    { icon: Building2, label: 'Check Facility', route: '/worker/facilities' },
    { icon: Stethoscope, label: 'View Follow-ups', route: '/worker/followups' },
    { icon: FileText, label: 'Offline Records', route: '/worker/patients' },
  ];

  return (
    <div className="space-y-6">
      {/* Offline mode indicator */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200/60"
      >
        <div className="flex items-center gap-2">
          <WifiOff size={16} className="text-amber-500" />
          <span className="text-xs font-semibold text-amber-700">Offline Mode</span>
        </div>
        <span className="text-xs text-amber-600">Last synced 4 minutes ago · 3 records waiting to sync</span>
        <button onClick={() => showToast('Syncing data...')} className="ml-auto flex items-center gap-1 text-xs font-semibold text-amber-700 hover:text-amber-900">
          <RefreshCw size={12} /> Sync Now
        </button>
      </motion.div>

      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden glass-card-elevated p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="relative">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{t('dash.goodMorning')}, Meena 🌟</h1>
          <p className="text-gray-600 mt-1">ASHA Worker · PHC Chandrapur · Chandrapur Village</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Patients" value={8} icon={<Users size={22} />} delay={0.05} />
        <StatCard title="Pending Referrals" value={3} icon={<ClipboardList size={22} />} delay={0.1} />
        <StatCard title="Follow-ups" value={5} icon={<Stethoscope size={22} />} delay={0.15} />
        <StatCard title="High Priority" value={2} icon={<AlertTriangle size={22} />} delay={0.2} />
      </div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card-elevated p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={i}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(action.route)}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-sahaay-deep/4 hover:bg-sahaay-deep/8 transition-all text-center"
              >
                <Icon size={24} className="text-sahaay-deep" />
                <span className="text-xs font-semibold text-gray-700">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Recent patients */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card-elevated p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Patients</h2>
        <div className="space-y-2">
          {patients.slice(0, 5).map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-white/60 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sahaay-deep to-sahaay-500 flex items-center justify-center text-white text-xs font-bold">{p.avatar}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.location}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => showToast(`Patient ${p.name} viewed`)}>View</Button>
                <Button size="sm" variant="secondary" onClick={() => showToast('Referral created')}>Refer</Button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="h-4 lg:hidden" />
    </div>
  );
}
