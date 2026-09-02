import { motion } from 'framer-motion';
import { Bell, CheckCircle2, Stethoscope, AlertCircle, Clock, Pill, Calendar } from 'lucide-react';
import { notifications } from '../../data/mockData';

const typeIcons: Record<string, any> = {
  referral: CheckCircle2, consultation: Stethoscope, followup: Clock, diagnostic: AlertCircle, medicine: Pill, appointment: Calendar,
};

export function PatientNotifications() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500 mt-1">Stay updated on your healthcare activities.</p>
      </motion.div>

      <div className="space-y-2">
        {notifications.map((n, i) => {
          const Icon = typeIcons[n.type] || Bell;
          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i }}
              className={`glass-card p-4 flex items-start gap-3 hover:-translate-y-0.5 transition-all cursor-pointer ${!n.read ? 'border-l-4 border-l-sahaay-deep bg-sahaay-surface/50' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-sahaay-deep/8 flex items-center justify-center text-sahaay-deep shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{n.title}</p>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-sahaay-deep" />}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="h-4 lg:hidden" />
    </div>
  );
}
