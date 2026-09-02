import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, EyeOff, ArrowRight, Shield, Clock, Users } from 'lucide-react';
import { HealthcareCarousel } from '../components/ui/HealthcareCarousel';
import { LanguageSelector } from '../components/ui/LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

interface LoginPageProps {
  onNavigate: (route: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white relative overflow-hidden">
        {/* Background decorative images */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sahaay-deep via-sahaay-500 to-sahaay-300" />

        {/* Faded background images */}
        <div className="absolute top-20 right-10 w-64 h-44 rounded-2xl overflow-hidden opacity-[0.04] rotate-6">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-20 left-10 w-52 h-36 rounded-2xl overflow-hidden opacity-[0.04] -rotate-3">
          <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=300&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/2 left-1/3 w-40 h-28 rounded-2xl overflow-hidden opacity-[0.03] rotate-12">
          <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Logo + Language */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sahaay-deep to-sahaay-600 flex items-center justify-center">
                <Heart size={20} className="text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold text-sahaay-deep">SAHAAY</span>
            </div>
            <LanguageSelector />
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{t('login.welcome')}</h1>
          <p className="text-gray-500 mb-8">{t('login.subtitle')}</p>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('login.email')}</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder')}
                className="sahaay-input"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('login.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  className="sahaay-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sahaay-deep accent-sahaay-deep" />
                {t('login.remember')}
              </label>
              <button type="button" className="text-sahaay-deep font-semibold hover:underline">{t('login.forgot')}</button>
            </div>

            <button
              onClick={() => onNavigate('/patient/dashboard')}
              className="sahaay-btn-primary w-full py-3 text-base flex items-center justify-center gap-2"
            >
              {t('login.submit')} <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">{t('login.orContinue')}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Quick login buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onNavigate('/patient/dashboard')}
              className="glass-card p-3 text-center hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-sahaay-deep/8 mx-auto mb-2 flex items-center justify-center text-sahaay-deep group-hover:bg-sahaay-deep/15 transition-colors overflow-hidden">
                <Users size={20} />
              </div>
              <p className="text-xs font-bold text-gray-800">{t('login.patient')}</p>
            </button>

            <button
              onClick={() => onNavigate('/doctor/dashboard')}
              className="glass-card p-3 text-center hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/8 mx-auto mb-2 flex items-center justify-center text-blue-600 group-hover:bg-blue-500/15 transition-colors overflow-hidden">
                <Shield size={20} />
              </div>
              <p className="text-xs font-bold text-gray-800">{t('login.doctor')}</p>
            </button>

            <button
              onClick={() => onNavigate('/worker/dashboard')}
              className="glass-card p-3 text-center hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/8 mx-auto mb-2 flex items-center justify-center text-amber-600 group-hover:bg-amber-500/15 transition-colors overflow-hidden">
                <Clock size={20} />
              </div>
              <p className="text-xs font-bold text-gray-800">{t('login.worker')}</p>
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            {t('login.needHelp')} <button className="text-sahaay-deep font-semibold hover:underline">{t('login.contactSupport')}</button>
          </p>
        </motion.div>
      </div>

      {/* Right side - Healthcare Image Carousel */}
      <div className="hidden lg:block flex-1 relative">
        <HealthcareCarousel variant="login" />
      </div>
    </div>
  );
}
