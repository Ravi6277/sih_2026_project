import { motion } from 'framer-motion';
import {
  Calendar, ClipboardList, Stethoscope, Heart, MapPin, Clock, Video, FileText,
  Search, Pill, Activity, AlertCircle, ChevronRight, Users
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { CareJourney } from '../../components/ui/CareJourney';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { facilities } from '../../data/mockData';

interface PatientDashboardProps {
  onNavigate: (route: string) => void;
}

export function PatientDashboard({ onNavigate }: PatientDashboardProps) {
  const journeySteps = [
    { label: 'Registration', status: 'completed' as const, date: 'Aug 1' },
    { label: 'Initial Assessment', status: 'completed' as const, date: 'Aug 5' },
    { label: 'PHC Consultation', status: 'completed' as const, date: 'Aug 12' },
    { label: 'Specialist Referral', status: 'current' as const, date: 'Aug 28' },
    { label: 'Diagnostics', status: 'upcoming' as const },
    { label: 'Treatment', status: 'upcoming' as const },
    { label: 'Follow-up', status: 'upcoming' as const },
  ];

  const quickActions = [
    { icon: Calendar, label: 'Book Appointment', route: '/patient/appointments', color: 'from-blue-500/10 to-blue-400/5', textColor: 'text-blue-600' },
    { icon: Search, label: 'Find Doctor', route: '/patient/facilities', color: 'from-sahaay-deep/10 to-sahaay-500/5', textColor: 'text-sahaay-deep' },
    { icon: Video, label: 'Video Consultation', route: '/patient/consultation', color: 'from-purple-500/10 to-purple-400/5', textColor: 'text-purple-600' },
    { icon: FileText, label: 'Health Records', route: '/patient/records', color: 'from-emerald-500/10 to-emerald-400/5', textColor: 'text-emerald-600' },
    { icon: ClipboardList, label: 'Track Referral', route: '/patient/referrals', color: 'from-amber-500/10 to-amber-400/5', textColor: 'text-amber-600' },
    { icon: Activity, label: 'Find Diagnostics', route: '/patient/diagnostics', color: 'from-rose-500/10 to-rose-400/5', textColor: 'text-rose-600' },
    { icon: Pill, label: 'Medicine Availability', route: '/patient/medicines', color: 'from-teal-500/10 to-teal-400/5', textColor: 'text-teal-600' },
    { icon: Stethoscope, label: 'Follow-up', route: '/patient/followups', color: 'from-indigo-500/10 to-indigo-400/5', textColor: 'text-indigo-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden glass-card-elevated p-6 lg:p-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-sahaay-200/30 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="relative">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Good morning, Rahul 👋</h1>
          <p className="text-gray-600 mt-1">Here's your healthcare journey at a glance.</p>

          {/* Urgent alert */}
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center gap-3">
            <AlertCircle size={18} className="text-amber-500 shrink-0" />
            <p className="text-sm text-amber-700">
              <span className="font-semibold">Follow-up reminder:</span> Blood pressure review is due in 3 days.
            </p>
            <button onClick={() => onNavigate('/patient/followups')} className="ml-auto text-xs font-semibold text-amber-600 hover:underline whitespace-nowrap">
              View →
            </button>
          </div>
        </div>
      </motion.div>

      {/* Status cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Next Appointment"
          value="11:30 AM"
          subtitle="Dr. Ananya Sharma · Video"
          icon={<Calendar size={22} />}
          delay={0.05}
        />
        <StatCard
          title="Referral Status"
          value="Accepted"
          subtitle="District Hospital · Cardiology"
          icon={<ClipboardList size={22} />}
          trend={{ value: 'On track', positive: true }}
          delay={0.1}
        />
        <StatCard
          title="Follow-up"
          value="In 3 days"
          subtitle="Blood Pressure Review"
          icon={<Stethoscope size={22} />}
          delay={0.15}
        />
        <StatCard
          title="Health Journey"
          value="82%"
          subtitle="5 of 7 steps completed"
          icon={<Heart size={22} />}
          delay={0.2}
        />
      </div>

      {/* Care Journey */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-card-elevated p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Your Care Journey</h2>
            <p className="text-sm text-gray-500">Track your healthcare progress from registration to recovery.</p>
          </div>
          <button onClick={() => onNavigate('/patient/records')} className="text-sm font-semibold text-sahaay-deep hover:underline flex items-center gap-1">
            View Details <ChevronRight size={14} />
          </button>
        </div>

        {/* Horizontal on desktop */}
        <div className="hidden md:block">
          <CareJourney steps={journeySteps} orientation="horizontal" />
        </div>

        {/* Vertical on mobile */}
        <div className="md:hidden">
          <CareJourney steps={journeySteps} orientation="vertical" />
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <ProgressBar value={82} label="Overall Progress" showLabel height={10} />
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card-elevated p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={i}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate(action.route)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br ${action.color} hover:shadow-md transition-shadow text-center`}
                >
                  <Icon size={24} className={action.textColor} />
                  <span className="text-xs font-semibold text-gray-700">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Appointment */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card-elevated p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Appointment</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-sahaay-surface border border-sahaay-deep/6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sahaay-deep to-sahaay-500 flex items-center justify-center text-white text-sm font-bold">
                  AS
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Dr. Ananya Sharma</p>
                  <p className="text-xs text-gray-500">General Physician</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={14} className="text-sahaay-deep" />
                  Today, 11:30 AM
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Video size={14} className="text-sahaay-deep" />
                  Video Consultation
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={14} className="text-sahaay-deep" />
                  PHC Chandrapur
                </div>
              </div>
              <button
                onClick={() => onNavigate('/patient/consultation')}
                className="sahaay-btn-primary w-full mt-4 py-2.5 text-sm"
              >
                <Video size={16} className="inline mr-2" />
                Join Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recommended Facilities */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card-elevated p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Recommended Facilities</h2>
            <p className="text-sm text-gray-500">Based on your healthcare needs and location.</p>
          </div>
          <button onClick={() => onNavigate('/patient/facilities')} className="text-sm font-semibold text-sahaay-deep hover:underline flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facilities.slice(0, 4).map((facility) => (
            <motion.div
              key={facility.id}
              whileHover={{ y: -2 }}
              className="p-4 rounded-2xl bg-white/60 border border-sahaay-deep/6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-gray-900">{facility.name}</p>
                  <p className="text-[11px] text-gray-500">{facility.type}</p>
                </div>
                <StatusBadge status={facility.medicines} />
              </div>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-sahaay-deep" />
                  {facility.distance} km away
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={12} className="text-sahaay-deep" />
                  {facility.doctorsAvailable} doctors available
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={12} className="text-sahaay-deep" />
                  ~{facility.waitingTime} min wait
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-1.5 text-xs font-semibold text-sahaay-deep bg-sahaay-deep/8 rounded-lg hover:bg-sahaay-deep/15 transition-colors">
                  View
                </button>
                <button className="flex-1 py-1.5 text-xs font-semibold text-white bg-sahaay-deep rounded-lg hover:bg-sahaay-700 transition-colors">
                  Select
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom padding for mobile nav */}
      <div className="h-4 lg:hidden" />
    </div>
  );
}
