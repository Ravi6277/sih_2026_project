import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Send, Trash2, Activity,
  Bot, User, Info
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  analysis?: AnalysisData | null;
}

interface AnalysisData {
  urgency_score: number;
  diagnoses: {
    condition: string;
    icd10: string;
    likelihood: string;
    confidence: number;
    factors: string[];
  }[];
  recommended_action: string;
  specialist: string | null;
}

interface Session {
  id: string;
  chiefComplaint: string;
  messages: ChatMessage[];
  analysis?: AnalysisData | null;
  createdAt: string;
  status: string;
}

// AI response generator (simulated — mirrors hokai1's SymptomAnalyst behavior)
function generateAIResponse(input: string, history: ChatMessage[]): { text: string; analysis: AnalysisData | null } {
  const lower = input.toLowerCase();

  // Emergency detection
  if (lower.includes('chest pain') || lower.includes('numb') || lower.includes('sweating') || lower.includes('heart attack')) {
    return {
      text: '⚠️ **EMERGENCY DETECTED**\n\nBased on your symptoms, this could indicate a serious cardiac event.\n\n**IMMEDIATE ACTION REQUIRED:**\n• Call emergency services (108 / 112) right now\n• Sit or lie down in a comfortable position\n• Chew an aspirin (325mg) if not allergic\n• Loosen tight clothing\n• Do NOT drive yourself to the hospital\n\nThis is an AI assessment — please seek immediate medical attention.',
      analysis: {
        urgency_score: 10,
        diagnoses: [{ condition: 'Acute Myocardial Infarction (Heart Attack)', icd10: 'I21.9', likelihood: 'high', confidence: 0.85, factors: ['severe chest pain', 'numbness', 'sweating'] }],
        recommended_action: 'Call emergency services (108/112) immediately',
        specialist: 'Emergency Medicine'
      }
    };
  }

  // Headache follow-up detection
  const hasHeadache = lower.includes('headache') || lower.includes('head pain') || lower.includes('head ache');
  const hasFollowUp = lower.includes('throbbing') || lower.includes('/10') || lower.includes('photophobia') || lower.includes('light') || lower.includes('nausea');

  if (hasFollowUp && history.some(m => m.content.toLowerCase().includes('headache') || m.content.toLowerCase().includes('head'))) {
    return {
      text: "Based on your detailed symptoms, here is my analysis:\n\n1. **Migraine without aura** (likelihood: high)\n2. **Tension-type headache** (likelihood: medium)\n3. **Medication-related headache** (likelihood: low)\n\n**Recommended next step:** Schedule an appointment with your doctor within the next few days. Rest in a dark, quiet room and stay hydrated. Over-the-counter pain relief may help. Seek immediate care if the headache suddenly worsens or you develop vision changes, weakness, or difficulty speaking.\n\n**Specialist referral:** Neurology\n\n*This is an AI-assisted assessment, not a medical diagnosis. Please consult a healthcare provider for definitive evaluation.*",
      analysis: {
        urgency_score: 4,
        diagnoses: [
          { condition: 'Migraine without aura', icd10: 'G43.0', likelihood: 'high', confidence: 0.78, factors: ['unilateral throbbing pain', 'photophobia', 'nausea', 'recurrent episodes'] },
          { condition: 'Tension-type headache', icd10: 'G44.2', likelihood: 'medium', confidence: 0.45, factors: ['prolonged duration', 'screen-related aggravation'] },
          { condition: 'Medication-related headache', icd10: 'G44.4', likelihood: 'low', confidence: 0.2, factors: ['on antihypertensive medication'] },
        ],
        recommended_action: 'Schedule an appointment with your doctor within the next few days.',
        specialist: 'Neurology'
      }
    };
  }

  if (hasHeadache) {
    return {
      text: "I understand you're dealing with a headache. Let me ask some follow-up questions to better assess your condition:\n\n1. How would you describe the pain — throbbing, pressing, or sharp?\n2. On a scale of 1-10, how severe is the pain?\n3. Have you noticed any sensitivity to light or sound?\n4. Have you had similar headaches before?\n5. Are you taking any medications currently?\n\nThese details will help me provide a more accurate assessment.",
      analysis: null
    };
  }

  // Fever
  if (lower.includes('fever') || lower.includes('temperature')) {
    return {
      text: "I see you're experiencing fever. Let me gather more information:\n\n1. What is your current body temperature?\n2. How long have you had the fever?\n3. Do you have any other symptoms — cough, sore throat, body aches?\n4. Have you traveled anywhere recently?\n5. Have you been in contact with anyone who is ill?\n\nFever above 103°F (39.4°C) or lasting more than 3 days warrants medical evaluation.",
      analysis: null
    };
  }

  // Stomach/digestive
  if (lower.includes('stomach') || lower.includes('abdominal') || lower.includes('belly') || lower.includes('vomit')) {
    return {
      text: "I understand you're having abdominal discomfort. A few questions:\n\n1. Where exactly is the pain? (upper, lower, left, right)\n2. Is it sharp, cramping, or a dull ache?\n3. When did it start and how long does it last?\n4. Does anything make it better or worse?\n5. Any changes in bowel movements, nausea, or vomiting?\n\nPlease seek immediate care if you experience severe pain, blood in stool, or persistent vomiting.",
      analysis: null
    };
  }

  // Joint/muscle pain
  if (lower.includes('joint') || lower.includes('knee') || lower.includes('back pain') || lower.includes('muscle')) {
    return {
      text: "I see you're experiencing musculoskeletal discomfort. Let me understand better:\n\n1. Which joints or muscles are affected?\n2. Did this start after an injury or gradually?\n3. Is there swelling, redness, or warmth in the area?\n4. How does it affect your daily activities?\n5. Any stiffness in the morning?\n\nRest, ice, and over-the-counter anti-inflammatory medication may help in the meantime.",
      analysis: null
    };
  }

  // Skin
  if (lower.includes('rash') || lower.includes('skin') || lower.includes('itch') || lower.includes('pimple')) {
    return {
      text: "I understand you have a skin concern. Let me ask:\n\n1. Where on your body is the rash?\n2. When did it first appear?\n3. Is it itchy, painful, or both?\n4. Have you used any new products, foods, or medications recently?\n5. Is it spreading or staying in one area?\n\nA dermatologist can provide the most accurate diagnosis for skin conditions.",
      analysis: null
    };
  }

  // General fallback
  if (history.length <= 1) {
    return {
      text: "Thank you for sharing your symptoms. I'm here to help assess your condition.\n\nTo provide an accurate analysis, I need more details:\n\n1. When did these symptoms first start?\n2. How would you describe the severity (mild, moderate, severe)?\n3. Are there any activities or positions that make them better or worse?\n4. Do you have any existing medical conditions or take any medications?\n\nPlease describe your symptoms in as much detail as possible.",
      analysis: null
    };
  }

  return {
    text: "Thank you for the additional information. Based on what you've shared, here are my recommendations:\n\n1. **Monitor your symptoms** closely over the next few days\n2. **Schedule a consultation** with your primary care physician\n3. **Seek immediate care** if symptoms suddenly worsen or new symptoms develop\n\nIn the meantime:\n• Stay hydrated and get adequate rest\n• Keep a symptom diary (timing, severity, triggers)\n• Avoid self-medication unless directed by a healthcare provider\n\n*This is an AI-assisted assessment. For a definitive diagnosis, please consult a healthcare provider.*",
    analysis: {
      urgency_score: 3,
      diagnoses: [
        { condition: 'Requires further evaluation', icd10: 'N/A', likelihood: 'medium', confidence: 0.5, factors: ['insufficient data for specific diagnosis'] }
      ],
      recommended_action: 'Schedule a consultation with your primary care physician within 1-2 days.',
      specialist: 'General Practice'
    }
  };
}

function getUrgencyColor(score: number): string {
  if (score >= 8) return 'text-red-500';
  if (score >= 5) return 'text-amber-500';
  return 'text-emerald-500';
}

function getUrgencyBg(score: number): string {
  if (score >= 8) return 'bg-red-50 border-red-200';
  if (score >= 5) return 'bg-amber-50 border-amber-200';
  return 'bg-emerald-50 border-emerald-200';
}

function getUrgencyBarColor(score: number): string {
  if (score >= 8) return 'bg-red-500';
  if (score >= 5) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function getLikelihoodBadge(likelihood: string): string {
  switch (likelihood) {
    case 'high': return 'bg-emerald-100 text-emerald-700';
    case 'medium': return 'bg-amber-100 text-amber-700';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export function SymptomChecker() {
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [activeSession?.messages.length, isTyping, scrollToBottom]);

  const startSession = useCallback(() => {
    if (!complaintText.trim()) return;
    const id = `session-${Date.now()}`;
    const now = new Date().toLocaleTimeString();
    const newSession: Session = {
      id,
      chiefComplaint: complaintText.trim(),
      messages: [{ role: 'user', content: complaintText.trim(), timestamp: now, analysis: null }],
      createdAt: now,
      status: 'in_progress',
    };

    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(id);
    setComplaintText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const { text, analysis } = generateAIResponse(complaintText.trim(), []);
      const aiMsg: ChatMessage = { role: 'assistant', content: text, timestamp: new Date().toLocaleTimeString(), analysis };
      setSessions(prev => prev.map(s => s.id === id ? { ...s, messages: [...s.messages, aiMsg], analysis } : s));
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  }, [complaintText]);

  const sendMessage = useCallback(() => {
    if (!inputText.trim() || !activeSessionId) return;
    const msg = inputText.trim();
    setInputText('');

    const userMsg: ChatMessage = { role: 'user', content: msg, timestamp: new Date().toLocaleTimeString(), analysis: null };
    setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: [...s.messages, userMsg] } : s));
    setIsTyping(true);

    const session = sessions.find(s => s.id === activeSessionId);
    const history = session?.messages || [];

    setTimeout(() => {
      const { text, analysis } = generateAIResponse(msg, history);
      const aiMsg: ChatMessage = { role: 'assistant', content: text, timestamp: new Date().toLocaleTimeString(), analysis };
      setSessions(prev => prev.map(s => s.id === activeSessionId ? {
        ...s,
        messages: [...s.messages, aiMsg],
        analysis: analysis || s.analysis
      } : s));
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  }, [inputText, activeSessionId, sessions]);

  const deleteSession = useCallback((id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) setActiveSessionId(sessions.length > 1 ? sessions.find(s => s.id !== id)?.id || null : null);
  }, [activeSessionId, sessions]);

  const renderMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-gray-500">$1</em>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="h-[calc(100vh-120px)] flex rounded-2xl overflow-hidden glass-card-elevated">
      {/* Sidebar — Sessions */}
      <div className="w-72 border-r border-sahaay-deep/8 flex flex-col bg-white/40 shrink-0">
        <div className="p-4 border-b border-sahaay-deep/8">
          <h2 className="text-xs font-bold text-sahaay-deep/50 uppercase tracking-wider mb-3">{t('sc.newCheck')}</h2>
          <textarea
            value={complaintText}
            onChange={e => setComplaintText(e.target.value)}
            placeholder={t('sc.placeholder')}
            className="w-full h-20 p-3 rounded-xl bg-white/80 border border-sahaay-deep/10 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-sahaay-deep/30 resize-none"
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); startSession(); } }}
          />
          <button
            onClick={startSession}
            disabled={!complaintText.trim()}
            className="sahaay-btn-primary w-full mt-2 py-2 text-sm flex items-center justify-center gap-2"
          >
            <Stethoscope size={16} /> {t('sc.start')}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          <AnimatePresence>
            {sessions.map(session => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => setActiveSessionId(session.id)}
                className={`group p-3 rounded-xl cursor-pointer transition-all relative ${
                  session.id === activeSessionId
                    ? 'bg-sahaay-deep/10 border border-sahaay-deep/20'
                    : 'hover:bg-sahaay-deep/5 border border-transparent'
                }`}
              >
                <p className="text-sm font-medium text-gray-800 truncate pr-6">{session.chiefComplaint}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] text-gray-400">{session.createdAt}</span>
                  {session.analysis && (
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      session.analysis.urgency_score >= 8 ? 'bg-red-100 text-red-600' :
                      session.analysis.urgency_score >= 5 ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {session.analysis.urgency_score >= 8 ? t('sc.emergency') :
                       session.analysis.urgency_score >= 5 ? t('sc.urgent') : t('sc.nonUrgent')}
                    </span>
                  )}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); deleteSession(session.id); }}
                  className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-500"
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-sahaay-surface to-white min-w-0">
        {!activeSession ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-2xl bg-sahaay-deep/10 flex items-center justify-center mb-6">
              <Stethoscope size={36} className="text-sahaay-deep" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('sc.title')}</h3>
            <p className="text-gray-500 max-w-md text-sm leading-relaxed">
              {t('sc.desc')}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-sahaay-deep/50">
              <Info size={14} />
              <span>{t('sc.poweredBy')}</span>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="px-6 py-3 border-b border-sahaay-deep/8 flex items-center gap-3 bg-white/50">
              <div className="w-8 h-8 rounded-full bg-sahaay-deep/10 flex items-center justify-center">
                <Bot size={16} className="text-sahaay-deep" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{t('sc.analyst')}</p>
                <p className="text-[11px] text-gray-400">{t('sc.framework')}</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-emerald-600 font-medium">{t('sc.active')}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeSession.messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-sahaay-deep/10 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={16} className="text-sahaay-deep" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'sahaay-gradient text-white rounded-br-sm'
                          : 'bg-white border border-sahaay-deep/8 text-gray-700 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      <div className="text-[10px] font-semibold uppercase tracking-wider opacity-50 mb-2">
                        {msg.role === 'user' ? t('sc.you') : t('sc.aiAgent')}
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                    </div>

                    {/* Analysis Card */}
                    {msg.analysis && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`mt-3 p-4 rounded-xl border ${getUrgencyBg(msg.analysis.urgency_score)}`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Activity size={16} className="text-sahaay-deep" />
                          <h4 className="text-sm font-bold text-gray-800">{t('sc.aiAnalysis')}</h4>
                        </div>

                        {msg.analysis.diagnoses.length > 0 && (
                          <div className="space-y-2 mb-3">
                            {msg.analysis.diagnoses.map((dx, j) => (
                              <div key={j} className="p-2.5 rounded-lg bg-white/80 border-l-3 border-sahaay-deep/30">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-semibold text-gray-800">{dx.condition}</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getLikelihoodBadge(dx.likelihood)}`}>
                                    {dx.confidence ? `${Math.round(dx.confidence * 100)}%` : dx.likelihood}
                                  </span>
                                </div>
                                <p className="text-[11px] text-gray-500 mt-1">
                                  ICD-10: {dx.icd10} • {dx.factors.join(', ')}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mb-2">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                            <span>{t('sc.urgencyScore')}</span>
                            <span className={`font-bold ${getUrgencyColor(msg.analysis.urgency_score)}`}>
                              {msg.analysis.urgency_score}/10
                            </span>
                          </div>
                          <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${msg.analysis.urgency_score * 10}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className={`h-full rounded-full ${getUrgencyBarColor(msg.analysis.urgency_score)}`}
                            />
                          </div>
                        </div>

                        {msg.analysis.recommended_action && (
                          <div className="p-2.5 rounded-lg bg-sahaay-surface border border-sahaay-deep/10 mt-2">
                            <p className="text-[10px] font-bold text-sahaay-deep uppercase tracking-wider mb-1">{t('sc.recommendedAction')}</p>
                            <p className="text-xs text-gray-700">{msg.analysis.recommended_action}</p>
                          </div>
                        )}

                        {msg.analysis.specialist && (
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-600">
                            <User size={12} />
                            <span>{t('sc.specialist')}: <strong className="text-sahaay-deep">{msg.analysis.specialist}</strong></span>
                          </div>
                        )}
                      </motion.div>
                    )}

                    <p className="text-[10px] text-gray-300 mt-1 px-1">{msg.timestamp}</p>
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full sahaay-gradient flex items-center justify-center shrink-0 mt-1">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-sahaay-deep/10 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-sahaay-deep" />
                  </div>
                  <div className="p-4 rounded-2xl rounded-bl-sm bg-white border border-sahaay-deep/8 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-sahaay-deep/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <span className="w-2 h-2 bg-sahaay-deep/30 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 bg-sahaay-deep/30 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-sahaay-deep/8 bg-white/50 relative z-[60]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                  placeholder={t('sc.typeResponse')}
                  className="flex-1 sahaay-input"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="sahaay-btn-primary px-5 py-2.5 flex items-center gap-2 disabled:opacity-50"
                >
                  <Send size={16} /> {t('sc.send')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
