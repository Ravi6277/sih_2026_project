import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Phone, MapPin, ChevronRight, FileText } from 'lucide-react';
import { patients } from '../../data/mockData';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';

export function DoctorPatients() {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const filtered = patients.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your patient list and clinical records.</p>
      </motion.div>

      {/* Search and filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients by name or ID..." className="sahaay-input pl-9" />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'followup'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${filter === f ? 'bg-sahaay-deep text-white' : 'bg-white/60 text-gray-600 hover:bg-white'}`}>
              {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Follow-up'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Patient list */}
      <div className="space-y-3">
        {filtered.map((patient, i) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 * i }}
            className="glass-card p-5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            onClick={() => setSelectedPatient(patient)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sahaay-deep to-sahaay-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {patient.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-gray-900">{patient.name}</p>
                  <StatusBadge status={patient.status} />
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{patient.id} · {patient.age}y {patient.gender} · {patient.bloodGroup}</p>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-gray-500 shrink-0">
                <span className="flex items-center gap-1"><MapPin size={12} className="text-sahaay-deep" />{patient.location.split(',')[0]}</span>
                <span className="flex items-center gap-1"><Phone size={12} className="text-sahaay-deep" />{patient.phone}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400 shrink-0" />
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500 font-medium">No patients found</p>
          </div>
        )}
      </div>

      <div className="h-4 lg:hidden" />

      {/* Patient detail modal */}
      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title="Patient Details" size="lg">
        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sahaay-deep to-sahaay-500 flex items-center justify-center text-white font-bold text-lg">
                {selectedPatient.avatar}
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{selectedPatient.name}</p>
                <p className="text-sm text-gray-500">{selectedPatient.id} · {selectedPatient.age}y {selectedPatient.gender}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-sahaay-surface">
                <p className="text-xs text-gray-500">Blood Group</p>
                <p className="text-sm font-semibold">{selectedPatient.bloodGroup}</p>
              </div>
              <div className="p-3 rounded-xl bg-sahaay-surface">
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-semibold">{selectedPatient.location}</p>
              </div>
              <div className="p-3 rounded-xl bg-sahaay-surface">
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-sm font-semibold">{selectedPatient.phone}</p>
              </div>
              <div className="p-3 rounded-xl bg-sahaay-surface">
                <p className="text-xs text-gray-500">Registered</p>
                <p className="text-sm font-semibold">{selectedPatient.registeredDate}</p>
              </div>
              <div className="p-3 rounded-xl bg-sahaay-surface col-span-2">
                <p className="text-xs text-gray-500">Emergency Contact</p>
                <p className="text-sm font-semibold">{selectedPatient.emergencyContact}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => {}}><Phone size={14} /> Call Patient</Button>
              <Button variant="secondary" onClick={() => {}}><FileText size={14} /> View Records</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
