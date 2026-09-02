import { motion } from 'framer-motion';
import { Bell, Stethoscope, AlertCircle, Clock, Pill, Calendar, UserPlus } from 'lucide-react';

const doctorNotifications = [
  { id: 'DN001', title: 'New Patient Referral', message: 'Rahul Sharma has been referred to you for cardiac evaluation', time: '5 minutes ago', type: 'referral', read: false },
  { id: 'DN002', title: 'Appointment Reminder', message: 'Video consultation with Ananya Das at 2:00 PM today', time: '15 minutes ago', type: 'appointment', read: false },
  { id: 'DN003', title: 'Lab Results Available', message: 'Blood test results for Priya Devi are ready for review', time: '1 hour ago', type: 'diagnostic', read: false },
  { id: 'DN004', title: 'Follow-up Missed', message: 'Dipak Gogoi missed the scheduled follow-up appointment', time: '2 hours ago', type: 'followup', read: true },
  { id: 'DN005', title: 'Message from PHC', message: 'Meena Das sent you a patient update for Rakesh Singh', time: '3 hours ago', type: 'consultation', read: true },
  { id: 'DN006', title: 'Referral Completed', message: 'Ananya Das prenatal referral has been completed successfully', time: '1 day ago', type: 'referral', read: true },
  { id: 'DN007', title: 'Schedule Change', message: 'Your 3:30 PM appointment has been rescheduled to 4:00 PM', time: '1 day ago', type: 'appointment', read: true },
];

const typeIcons: Record<string, any> = {
  referral: UserPlus, consultation: Stethoscope, followup: Clock, diagnostic: AlertCircle, medicine: Pill, appointment: Calendar,
};

export function DoctorNotifications() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-sm text-gray-500 mt-1">Stay updated on clinical activities.</p>
      </motion.div>

      <div className="space-y-2">
        {doctorNotifications.map((n, i) => {
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
