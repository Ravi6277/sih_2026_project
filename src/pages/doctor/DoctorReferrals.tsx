import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, ArrowRight, MapPin, User } from 'lucide-react';
import { referrals } from '../../data/mockData';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

export function DoctorReferrals() {
  const [selected, setSelected] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const { showToast } = useToast();

  const filtered = referrals.filter(r => filter === 'all' || r.status === filter);
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
        <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
        <p className="text-sm text-gray-500 mt-1">Review and process patient referrals.</p>
      </motion.div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'accepted', 'in_transit', 'completed', 'followup_required'].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === s ? 'bg-sahaay-deep text-white' : 'bg-white/60 text-gray-600 hover:bg-white border border-gray-200'}`}>
            {s === 'all' ? 'All' : s.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Referral cards */}
      <div className="space-y-3">
        {filtered.map((ref, i) => (
          <motion.div
            key={ref.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            className="glass-card p-5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            onClick={() => setSelected(ref)}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sahaay-deep/8 flex items-center justify-center text-sahaay-deep shrink-0">
                    <User size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{ref.patientName}</p>
                    <p className="text-xs text-gray-500">{ref.reason}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusColors[ref.status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                  {ref.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={12} className="text-sahaay-deep" />
                <span>{ref.sourceFacility}</span>
                <ArrowRight size={12} className="text-gray-400" />
                <span>{ref.destinationFacility}</span>
                <span className="ml-auto text-gray-400">{ref.createdDate}</span>
              </div>
              {ref.status === 'pending' && (
                <div className="flex gap-2 pt-1">
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); showToast('Referral accepted'); }}>Accept</Button>
                  <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); showToast('Referral declined'); }}>Decline</Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <ClipboardList size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No referrals found</p>
          </div>
        )}
      </div>

      <div className="h-4 lg:hidden" />

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Referral Details" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sahaay-deep/10 flex items-center justify-center text-sahaay-deep">
                <ClipboardList size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900">{selected.patientName}</p>
                <p className="text-sm text-gray-500">{selected.id}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-sahaay-surface space-y-3">
              <div><p className="text-xs text-gray-500">Reason</p><p className="text-sm font-semibold">{selected.reason}</p></div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">{selected.sourceFacility}</span>
                <ArrowRight size={14} className="text-gray-400" />
                <span className="font-semibold">{selected.destinationFacility}</span>
              </div>
              <div><p className="text-xs text-gray-500">Assigned Doctor</p><p className="text-sm font-semibold">{selected.assignedDoctor}</p></div>
              <div><p className="text-xs text-gray-500">Notes</p><p className="text-sm text-gray-600">{selected.notes}</p></div>
              <div className="flex gap-4">
                <div><p className="text-xs text-gray-500">Created</p><p className="text-sm font-semibold">{selected.createdDate}</p></div>
                <div><p className="text-xs text-gray-500">Expected</p><p className="text-sm font-semibold">{selected.expectedDate}</p></div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => { showToast('Referral notes updated'); setSelected(null); }}>Update Status</Button>
              <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
