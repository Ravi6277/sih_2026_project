import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MapPin, Filter } from 'lucide-react';
import { Tabs } from '../../components/ui/Tabs';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { appointments } from '../../data/mockData';
import { useToast } from '../../components/ui/Toast';
import { useLanguage } from '../../i18n/LanguageContext';

interface PatientAppointmentsProps {
  onNavigate: (route: string) => void;
}

export function PatientAppointments({ onNavigate }: PatientAppointmentsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const { showToast } = useToast();

  const tabs = [
    { id: 'upcoming', label: t('common.upcoming'), count: appointments.filter(a => a.status === 'upcoming').length },
    { id: 'completed', label: t('common.completed'), count: appointments.filter(a => a.status === 'completed').length },
    { id: 'cancelled', label: t('common.cancelled'), count: 0 },
  ];

  const filtered = appointments.filter(a => a.status === activeTab || (activeTab === 'upcoming' && a.status === 'upcoming'));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('dash.appointments')}</h1>
            <p className="text-sm text-gray-500 mt-1">{t('ap.manageConsultations')}</p>
          </div>
          <Button onClick={() => { showToast('Appointment booking opened'); }}>{t('dash.bookAppointment')}</Button>
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Tabs tabs={tabs} onChange={setActiveTab} />
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-white/60 transition-colors">
          <Filter size={14} /> {t('common.filter')}
        </button>
      </div>

      {/* Calendar mock */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800">August 2026</h3>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 text-sm">←</button>
            <button className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 text-sm">→</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-[10px] font-semibold text-gray-400 py-1">{d}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const hasAppointment = day === 31 || day === 30 || day === 29;
            const isToday = day === 31;
            return (
              <button
                key={day}
                className={`h-8 rounded-lg text-xs font-medium transition-all ${
                  isToday ? 'bg-sahaay-deep text-white' : hasAppointment ? 'bg-sahaay-deep/10 text-sahaay-deep font-bold' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Appointment list */}
      <div className="space-y-3">
        {filtered.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="glass-card p-5 hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sahaay-deep to-sahaay-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {apt.doctorName.split(' ').slice(1).map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-gray-900">{apt.doctorName}</p>
                    <StatusBadge status={apt.priority} />
                  </div>
                  <p className="text-xs text-gray-500">{apt.speciality} · {apt.facility}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span className="flex items-center gap-1"><Calendar size={12} className="text-sahaay-deep" />{apt.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} className="text-sahaay-deep" />{apt.time}</span>
                <span className="flex items-center gap-1">{apt.type === 'Video Consultation' ? <Video size={12} className="text-sahaay-deep" /> : <MapPin size={12} className="text-sahaay-deep" />}{apt.type}</span>
              </div>

              <div className="flex gap-2 shrink-0">
                {apt.status === 'upcoming' && apt.type === 'Video Consultation' && (
                  <Button size="sm" onClick={() => onNavigate('/patient/consultation')}>
                    <Video size={14} /> {t('apt.join')}
                  </Button>
                )}
                <Button size="sm" variant="secondary" onClick={() => setSelectedAppointment(apt)}>
                  {t('apt.details')}
                </Button>
                {apt.status === 'upcoming' && (
                  <Button size="sm" variant="ghost" onClick={() => showToast('Appointment cancelled')}>
                    {t('apt.cancel')}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Calendar size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No {activeTab} appointments</p>
          </div>
        )}
      </div>

      <div className="h-4 lg:hidden" />

      {/* Detail modal */}
      <Modal isOpen={!!selectedAppointment} onClose={() => setSelectedAppointment(null)} title={t('apt.details')} size="lg">
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sahaay-deep to-sahaay-500 flex items-center justify-center text-white font-bold">
                {selectedAppointment.doctorName.split(' ').slice(1).map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="font-bold text-gray-900">{selectedAppointment.doctorName}</p>
                <p className="text-sm text-gray-500">{selectedAppointment.speciality}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-sahaay-surface">
              <div><p className="text-xs text-gray-500">{t('apt.date')}</p><p className="text-sm font-semibold">{selectedAppointment.date}</p></div>
              <div><p className="text-xs text-gray-500">{t('apt.time')}</p><p className="text-sm font-semibold">{selectedAppointment.time}</p></div>
              <div><p className="text-xs text-gray-500">{t('dash.facilities')}</p><p className="text-sm font-semibold">{selectedAppointment.facility}</p></div>
              <div><p className="text-xs text-gray-500">{t('apt.type')}</p><p className="text-sm font-semibold">{selectedAppointment.type}</p></div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => { showToast('Reschedule request sent'); setSelectedAppointment(null); }}>{t('apt.reschedule')}</Button>
              <Button variant="secondary" onClick={() => setSelectedAppointment(null)}>{t('common.close')}</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
