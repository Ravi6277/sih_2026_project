import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Globe, Eye, Shield, Phone, Palette } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import { useLanguage } from '../i18n/LanguageContext';

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const { t } = useLanguage();
  const [language, setLanguage] = useState('English');
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const { showToast } = useToast();

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'accessibility', label: 'Accessibility', icon: Eye },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'emergency', label: 'Emergency Contact', icon: Phone },
    { id: 'display', label: 'Display Preferences', icon: Palette },
  ];

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-sahaay-deep' : 'bg-gray-300'} relative`}>
      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-[2px]'} mt-[2px]`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900">{t('dash.settings')}</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account preferences and accessibility settings.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="glass-card p-2 flex lg:flex-col gap-1 overflow-x-auto">
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    activeSection === s.id ? 'bg-sahaay-deep text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 glass-card-elevated p-6">
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Profile Settings</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label><input type="text" defaultValue="Rahul Sharma" className="sahaay-input" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Email</label><input type="email" defaultValue="rahul.sharma@email.com" className="sahaay-input" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label><input type="tel" defaultValue="+91 98765 43210" className="sahaay-input" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth</label><input type="date" defaultValue="1992-05-15" className="sahaay-input" /></div>
              </div>
              <button className="sahaay-btn-primary" onClick={() => showToast('Profile updated')}>Save Changes</button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
              {[
                { label: 'Appointment reminders', desc: 'Get notified before appointments', default: true },
                { label: 'Follow-up alerts', desc: 'Notifications for upcoming follow-ups', default: true },
                { label: 'Referral updates', desc: 'Updates on referral status changes', default: true },
                { label: 'Medicine availability', desc: 'When medicines become available', default: false },
                { label: 'Messages from doctors', desc: 'New messages from healthcare providers', default: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-sahaay-surface">
                  <div><p className="text-sm font-semibold">{item.label}</p><p className="text-xs text-gray-500">{item.desc}</p></div>
                  <Toggle checked={item.default} onChange={() => showToast('Notification setting updated')} />
                </div>
              ))}
            </div>
          )}

          {activeSection === 'language' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Language Settings</h2>
              <div className="space-y-2">
                {['English', 'हिन्दी (Hindi)', 'অসমীয়া (Assamese)', 'বাংলা (Bengali)'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => { setLanguage(lang); showToast('Language updated'); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      language === lang ? 'bg-sahaay-deep text-white' : 'bg-sahaay-surface hover:bg-sahaay-deep/5'
                    }`}
                  >
                    <span className="text-sm font-medium">{lang}</span>
                    {language === lang && <span className="text-xs font-bold">✓ Selected</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'accessibility' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Accessibility</h2>
              <div className="space-y-3">
                {[
                  { label: 'Large Text', desc: 'Increase text size across the application', checked: largeText, onChange: () => setLargeText(!largeText) },
                  { label: 'High Contrast', desc: 'Increase contrast for better visibility', checked: highContrast, onChange: () => setHighContrast(!highContrast) },
                  { label: 'Reduce Motion', desc: 'Minimize animations and transitions', checked: reduceMotion, onChange: () => setReduceMotion(!reduceMotion) },
                  { label: 'Voice Assistance', desc: 'Screen reader optimized navigation', checked: false, onChange: () => showToast('Voice assistance updated') },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-sahaay-surface">
                    <div><p className="text-sm font-semibold">{item.label}</p><p className="text-xs text-gray-500">{item.desc}</p></div>
                    <Toggle checked={item.checked} onChange={item.onChange} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Privacy Settings</h2>
              <div className="space-y-3">
                {[
                  { label: 'Share health records with doctors', default: true },
                  { label: 'Allow facility to access appointment history', default: true },
                  { label: 'Show profile to care coordinator', default: true },
                  { label: 'Anonymous analytics', default: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-sahaay-surface">
                    <span className="text-sm font-medium">{item.label}</span>
                    <Toggle checked={item.default} onChange={() => showToast('Privacy setting updated')} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'emergency' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Emergency Contact</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Contact Name</label><input type="text" defaultValue="Priya Sharma" className="sahaay-input" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Relationship</label><input type="text" defaultValue="Spouse" className="sahaay-input" /></div>
                <div><label className="block text-xs font-semibold text-gray-600 mb-1">Phone Number</label><input type="tel" defaultValue="+91 98765 43211" className="sahaay-input" /></div>
              </div>
              <button className="sahaay-btn-primary" onClick={() => showToast('Emergency contact updated')}>Save Contact</button>
            </div>
          )}

          {activeSection === 'display' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-gray-900">Display Preferences</h2>
              <div className="space-y-3">
                {[
                  { label: 'Compact view', desc: 'Show more information with less spacing', default: false },
                  { label: 'Show health tips', desc: 'Display daily health tips on dashboard', default: true },
                  { label: 'Dark mode', desc: 'Switch to dark theme (coming soon)', default: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-sahaay-surface">
                    <div><p className="text-sm font-semibold">{item.label}</p><p className="text-xs text-gray-500">{item.desc}</p></div>
                    <Toggle checked={item.default} onChange={() => showToast('Display preference updated')} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-4 lg:hidden" />
    </div>
  );
}
