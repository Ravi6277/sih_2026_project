import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, IndianRupee, Search } from 'lucide-react';
import { diagnostics } from '../../data/mockData';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { useLanguage } from '../../i18n/LanguageContext';

export function PatientDiagnostics() {
  const [search, setSearch] = useState('');
  const { t } = useLanguage();
  const [category, setCategory] = useState('all');
  const { showToast } = useToast();

  const categories = ['all', 'Blood Test', 'X-Ray', 'ECG', 'Ultrasound', 'Imaging', 'Pathology'];
  const filtered = diagnostics.filter(d =>
    (category === 'all' || d.category === category) &&
    (search === '' || d.test.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">{t('dash.diagnostics')}</h1>
        <p className="text-sm text-gray-500 mt-1">Check availability and book diagnostic tests near you.</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder={t('diag.searchTests')} value={search} onChange={e => setSearch(e.target.value)} className="sahaay-input pl-10" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${category === cat ? 'bg-sahaay-deep text-white' : 'bg-white/60 text-gray-600 hover:bg-white border border-gray-200'}`}>
              {cat === 'all' ? 'All Tests' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((diag, i) => (
          <motion.div key={diag.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }} className="glass-card p-4 hover:-translate-y-0.5 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-bold text-gray-900">{diag.test}</p>
                <p className="text-xs text-gray-500">{diag.category}</p>
              </div>
              <StatusBadge status={diag.availability} />
            </div>
            <div className="space-y-1.5 text-xs text-gray-600 mb-4">
              <div className="flex items-center gap-1.5"><MapPin size={12} className="text-sahaay-deep" />{diag.facility} · {diag.distance} km</div>
              <div className="flex items-center gap-1.5"><Clock size={12} className="text-sahaay-deep" />~{diag.waitingTime}</div>
              <div className="flex items-center gap-1.5"><IndianRupee size={12} className="text-sahaay-deep" />{diag.price}</div>
            </div>
            <Button size="sm" variant="secondary" className="w-full" onClick={() => showToast(`${diag.test} availability checked`)}>
              Check Availability
            </Button>
          </motion.div>
        ))}
      </div>
      <div className="h-4 lg:hidden" />
    </div>
  );
}
