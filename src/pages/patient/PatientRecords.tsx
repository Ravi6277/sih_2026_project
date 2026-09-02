import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Share2, ChevronDown, ChevronUp, Activity, Pill, Syringe, AlertTriangle, Heart } from 'lucide-react';
import { healthRecords, patients } from '../../data/mockData';
import { Avatar } from '../../components/ui/Avatar';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CareJourney } from '../../components/ui/CareJourney';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';

export function PatientRecords() {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');
  const { showToast } = useToast();
  const patient = patients[0];

  const toggleSection = (section: string) => setExpandedSection(expandedSection === section ? null : section);

  const sections = [
    { id: 'overview', label: 'Patient Overview', icon: Heart },
    { id: 'history', label: 'Medical History', icon: FileText },
    { id: 'conditions', label: 'Current Conditions', icon: Activity },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'diagnostics', label: 'Diagnostic Reports', icon: Activity },
    { id: 'vaccinations', label: 'Vaccination', icon: Syringe },
    { id: 'allergies', label: 'Allergies', icon: AlertTriangle },
  ];

  const timelineSteps = healthRecords.timeline.map(t => ({
    label: t.event,
    status: t.date <= '2026-08-21' ? 'completed' as const : t.date === '2026-08-28' ? 'current' as const : 'upcoming' as const,
    date: t.date,
  }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Health Records</h1>
            <p className="text-sm text-gray-500 mt-1">Your complete health timeline and medical records.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" icon={<Download size={14} />} onClick={() => showToast('Record downloaded')}>Download</Button>
            <Button variant="secondary" icon={<Share2 size={14} />} onClick={() => showToast('Share link copied')}>Share</Button>
          </div>
        </div>
      </motion.div>

      {/* Patient header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card-elevated p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Avatar initials={patient.avatar} size="xl" />
          <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div><p className="text-xs text-gray-500 font-medium">Name</p><p className="text-sm font-bold">{patient.name}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">Age / Gender</p><p className="text-sm font-bold">{patient.age} years · {patient.gender}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">Blood Group</p><p className="text-sm font-bold">{patient.bloodGroup}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">Location</p><p className="text-sm font-bold">{patient.location}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">Phone</p><p className="text-sm font-bold">{patient.phone}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">Emergency Contact</p><p className="text-sm font-bold">{patient.emergencyContact}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">Registered</p><p className="text-sm font-bold">{patient.registeredDate}</p></div>
            <div><p className="text-xs text-gray-500 font-medium">Status</p><StatusBadge status={patient.status} size="md" /></div>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-elevated p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Health Timeline</h2>
        <div className="hidden md:block">
          <CareJourney steps={timelineSteps} orientation="horizontal" />
        </div>
        <div className="md:hidden">
          <CareJourney steps={timelineSteps} orientation="vertical" />
        </div>
      </motion.div>

      {/* Expandable sections */}
      <div className="space-y-3">
        {sections.map((section, i) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 p-4 hover:bg-sahaay-surface/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-sahaay-deep/8 flex items-center justify-center text-sahaay-deep shrink-0">
                  <Icon size={18} />
                </div>
                <span className="text-sm font-bold text-gray-900 flex-1 text-left">{section.label}</span>
                {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                      {section.id === 'conditions' && (
                        <div className="space-y-3">
                          {healthRecords.conditions.map((c, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-sahaay-surface">
                              <div>
                                <p className="text-sm font-semibold">{c.name}</p>
                                <p className="text-xs text-gray-500">Diagnosed: {c.diagnosedDate}</p>
                              </div>
                              <StatusBadge status={c.status === 'Under Management' ? 'active' : 'completed'} />
                            </div>
                          ))}
                        </div>
                      )}
                      {section.id === 'prescriptions' && (
                        <div className="space-y-3">
                          {healthRecords.prescriptions.map((p, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-sahaay-surface">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold">{p.doctor}</p>
                                <p className="text-xs text-gray-500">{p.date}</p>
                              </div>
                              <ul className="space-y-1">
                                {p.medicines.map((m, mi) => (
                                  <li key={mi} className="text-xs text-gray-600 flex items-center gap-2">
                                    <Pill size={10} className="text-sahaay-deep" /> {m}
                                  </li>
                                ))}
                              </ul>
                              <p className="text-xs text-gray-500 mt-2 italic">{p.notes}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.id === 'diagnostics' && (
                        <div className="space-y-3">
                          {healthRecords.diagnostics.map((d, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-sahaay-surface">
                              <div>
                                <p className="text-sm font-semibold">{d.test}</p>
                                <p className="text-xs text-gray-500">{d.facility} · {d.date}</p>
                                <p className="text-xs text-gray-600 mt-1">{d.results}</p>
                              </div>
                              <StatusBadge status={d.status} />
                            </div>
                          ))}
                        </div>
                      )}
                      {section.id === 'vaccinations' && (
                        <div className="space-y-2">
                          {healthRecords.vaccinations.map((v, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-sahaay-surface">
                              <div><p className="text-sm font-semibold">{v.name}</p><p className="text-xs text-gray-500">{v.date}</p></div>
                              <StatusBadge status={v.status === 'Completed' ? 'completed' : 'upcoming'} />
                            </div>
                          ))}
                        </div>
                      )}
                      {section.id === 'allergies' && (
                        <div className="flex flex-wrap gap-2">
                          {healthRecords.allergies.map((a, idx) => (
                            <span key={idx} className="px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-1">
                              <AlertTriangle size={12} /> {a}
                            </span>
                          ))}
                        </div>
                      )}
                      {section.id === 'overview' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div className="p-3 rounded-xl bg-sahaay-surface text-center">
                            <p className="text-2xl font-bold text-sahaay-deep">7</p>
                            <p className="text-xs text-gray-500">Total Visits</p>
                          </div>
                          <div className="p-3 rounded-xl bg-sahaay-surface text-center">
                            <p className="text-2xl font-bold text-sahaay-deep">2</p>
                            <p className="text-xs text-gray-500">Conditions</p>
                          </div>
                          <div className="p-3 rounded-xl bg-sahaay-surface text-center">
                            <p className="text-2xl font-bold text-sahaay-deep">4</p>
                            <p className="text-xs text-gray-500">Prescriptions</p>
                          </div>
                        </div>
                      )}
                      {section.id === 'history' && (
                        <div className="space-y-2">
                          {healthRecords.timeline.map((t, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-2">
                              <div className="w-2 h-2 rounded-full bg-sahaay-deep mt-1.5 shrink-0" />
                              <div>
                                <p className="text-sm font-semibold">{t.event}</p>
                                <p className="text-xs text-gray-500">{t.date} · {t.facility}</p>
                                <p className="text-xs text-gray-600">{t.details}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
      <div className="h-4 lg:hidden" />
    </div>
  );
}
