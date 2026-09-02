import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Plus } from 'lucide-react';
import { referrals } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { useLanguage } from '../../i18n/LanguageContext';

export function WorkerReferrals() {
  const [selected, setSelected] = useState<any>(null);
  const { t } = useLanguage();
  const { showToast } = useToast();

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    accepted: 'bg-sahaay-surface text-sahaay-deep border-sahaay-deep/20',
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
    in_transit: 'bg-purple-50 text-purple-700 border-purple-200',
    followup_required: 'bg-rose-50 text-rose-700 border-rose-200',
    appointment_scheduled: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('dash.referrals')}</h1>
            <p className="text-sm text-gray-500 mt-1">Create and track referrals for patients.</p>
          </div>
          <Button onClick={() => showToast('Referral form opened')}><Plus size={16} /> New Referral</Button>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Pending', count: referrals.filter(r => r.status === 'pending').length, color: 'text-amber-600' },
          { label: 'In Transit', count: referrals.filter(r => r.status === 'in_transit').length, color: 'text-purple-600' },
          { label: 'Completed', count: referrals.filter(r => r.status === 'completed').length, color: 'text-sahaay-deep' },
        ].map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="glass-card p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Referral list */}
      <div className="space-y-3">
        {referrals.map((ref, i) => (
          <motion.div
            key={ref.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            className="glass-card p-4 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            onClick={() => setSelected(ref)}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-gray-900">{ref.patientName}</p>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${statusColors[ref.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                {ref.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-2">{ref.reason}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin size={11} className="text-sahaay-deep" />
              <span>{ref.sourceFacility}</span>
              <ArrowRight size={11} className="text-gray-400" />
              <span>{ref.destinationFacility}</span>
              <span className="ml-auto text-gray-400">{ref.createdDate}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-4 lg:hidden" />

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Referral Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-sahaay-surface space-y-3">
              <div><p className="text-xs text-gray-500">Patient</p><p className="text-sm font-semibold">{selected.patientName}</p></div>
              <div><p className="text-xs text-gray-500">Reason</p><p className="text-sm font-semibold">{selected.reason}</p></div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{selected.sourceFacility}</span>
                <ArrowRight size={14} className="text-gray-400" />
                <span className="font-semibold">{selected.destinationFacility}</span>
              </div>
              <div><p className="text-xs text-gray-500">Assigned Doctor</p><p className="text-sm font-semibold">{selected.assignedDoctor}</p></div>
              <div><p className="text-xs text-gray-500">Notes</p><p className="text-sm text-gray-600">{selected.notes}</p></div>
            </div>
            <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
