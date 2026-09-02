import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Send, Bot, User, Volume2, VolumeX,
  Stethoscope, Info, RotateCcw
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isVoice?: boolean;
}

function generateMedicalResponse(input: string, history: ChatMessage[]): string {
  const lower = input.toLowerCase();
  const previousMessages = history.map(m => m.content.toLowerCase()).join(' ');

  if (lower.includes('chest pain') || lower.includes('heart attack') || lower.includes('can\'t breathe') || lower.includes('difficulty breathing') || lower.includes('stroke') || lower.includes('fainting') || lower.includes('seizure') || lower.includes('severe bleeding')) {
    return "This sounds like a medical emergency. Please call emergency services right away — dial 108 or 112 immediately. While you wait: stay calm, sit in a comfortable position, and if you suspect a heart attack and are not allergic to aspirin, chew one aspirin tablet. Do not drive yourself to the hospital. I'm here to support you, but immediate medical attention is critical.";
  }

  if (lower.includes('headache') || lower.includes('head pain') || lower.includes('migraine')) {
    if (history.length > 1 && previousMessages.includes('headache')) {
      return "Based on what you've told me, your symptoms are consistent with a migraine or tension-type headache. Here's what I recommend: Rest in a dark, quiet room. Stay hydrated — drink plenty of water. You can try over-the-counter pain relief like acetaminophen or ibuprofen. Apply a cold compress to your forehead. If this is the worst headache of your life, or if you have vision changes, weakness, or difficulty speaking, please seek emergency care immediately. I'd suggest scheduling a follow-up with your doctor within a few days.";
    }
    return "I understand you're experiencing a headache. Let me help you assess this. Can you tell me: How would you describe the pain — is it throbbing, pressing, or sharp? On a scale of 1 to 10, how severe is it? Have you noticed any sensitivity to light or sound? And when did this start?";
  }

  if (lower.includes('fever') || lower.includes('temperature') || lower.includes('chills')) {
    if (previousMessages.includes('fever')) {
      return "For managing your fever: Stay well hydrated — drink water, clear broths, or oral rehydration solutions. Rest as much as possible. You may take acetaminophen or ibuprofen to reduce fever — follow the dosage on the package. Use a lukewarm compress on your forehead. Seek medical attention if: your temperature exceeds 103 degrees Fahrenheit, the fever lasts more than 3 days, you develop a severe headache, stiff neck, confusion, or difficulty breathing.";
    }
    return "I see you have a fever. To better understand your condition, I need a few more details: What is your current temperature? How long have you had the fever? Do you have any other symptoms like cough, sore throat, body aches, or nausea? Have you traveled recently or been around anyone who is sick?";
  }

  if (lower.includes('stomach') || lower.includes('abdominal') || lower.includes('belly') || lower.includes('nausea') || lower.includes('vomit') || lower.includes('diarrhea') || lower.includes('constipation')) {
    return "I understand you're having digestive discomfort. Here are some things that may help: For nausea, try sipping ginger tea or clear fluids. Eat small, bland meals — the BRAT diet: bananas, rice, applesauce, and toast. Avoid spicy, fatty, or dairy foods for now. Stay hydrated with small sips of water or oral rehydration salts. Seek immediate care if you experience: blood in vomit or stool, severe abdominal pain, signs of dehydration like dark urine or dizziness, or if symptoms persist beyond 48 hours.";
  }

  if (lower.includes('joint') || lower.includes('knee') || lower.includes('back') || lower.includes('muscle') || lower.includes('pain') || lower.includes('ache')) {
    if (previousMessages.includes('pain') || previousMessages.includes('ache')) {
      return "For managing your pain at home: Apply ice for the first 48 hours if there's swelling, then switch to warm compresses. Rest the affected area but avoid complete immobilization. Over-the-counter anti-inflammatory medications like ibuprofen can help reduce pain and inflammation. Gentle stretching and movement can prevent stiffness. Please see a doctor if: the pain is severe or worsening, you notice swelling, redness, or warmth in the area, you have difficulty moving the joint, or the pain persists beyond a week.";
    }
    return "I understand you're experiencing pain. To help me better understand: Where exactly is the pain located? Did this start after an injury or did it come on gradually? Is the pain constant or does it come and go? On a scale of 1 to 10, how would you rate it? Any swelling, redness, or stiffness in the area?";
  }

  if (lower.includes('rash') || lower.includes('skin') || lower.includes('itch') || lower.includes('pimple') || lower.includes('eczema')) {
    return "For skin concerns, here's what I suggest: Avoid scratching the affected area to prevent infection. Apply a gentle, fragrance-free moisturizer. Over-the-counter hydrocortisone cream may help with itching and inflammation. Keep the area clean and dry. See a dermatologist if: the rash is spreading rapidly, you have a fever along with the rash, there are blisters or open sores, the rash doesn't improve within a week, or you suspect an allergic reaction.";
  }

  if (lower.includes('diabetes') || lower.includes('blood sugar') || lower.includes('sugar level') || lower.includes('insulin')) {
    return "For diabetes management, consistency is key: Monitor your blood sugar levels regularly as advised by your doctor. Take medications or insulin as prescribed — never skip doses. Follow a balanced diet with controlled carbohydrate portions. Exercise regularly — even a 30-minute walk helps. Watch for signs of high blood sugar: excessive thirst, frequent urination, blurred vision, fatigue. For low blood sugar: confusion, shakiness, sweating — eat a quick source of sugar like glucose tablets or fruit juice. Keep regular follow-ups with your endocrinologist.";
  }

  if (lower.includes('cold') || lower.includes('cough') || lower.includes('congestion') || lower.includes('sore throat') || lower.includes('runny nose')) {
    return "For cold and respiratory symptoms: Rest and stay hydrated — warm fluids like tea with honey can soothe a sore throat. Use saline nasal drops or a steam inhaler for congestion. Over-the-counter cold medications can help with symptoms. A warm salt water gargle can help sore throats. Honey is effective for cough in adults. Seek medical care if: symptoms last more than 10 days, you develop a high fever, you have difficulty breathing, chest pain, or your cough produces colored sputum.";
  }

  if (lower.includes('anxious') || lower.includes('anxiety') || lower.includes('depressed') || lower.includes('depression') || lower.includes('stress') || lower.includes('sleep') || lower.includes('insomnia') || lower.includes('mental health')) {
    return "I hear you, and it's important that you're reaching out. Your feelings are valid. Here are some things that may help: Practice deep breathing — inhale for 4 seconds, hold for 4, exhale for 6. Maintain a regular sleep schedule. Physical activity, even a short walk, can significantly improve mood. Limit caffeine and screen time before bed. Talk to someone you trust about how you're feeling. Please consider reaching out to a mental health professional. If you're in crisis, please call the Vandrevala Foundation helpline at 1860-2662-345 or the iCall helpline at 9152987821. You're not alone.";
  }

  if (lower.includes('medication') || lower.includes('medicine') || lower.includes('drug') || lower.includes('side effect') || lower.includes('dosage')) {
    return "Regarding medications: Always take medications as prescribed by your doctor — don't change doses without consulting them. Never share prescription medications with others. If you experience side effects, note them and discuss with your doctor at your next visit. For missed doses, check the medication guide or ask your pharmacist. Keep an updated list of all medications, supplements, and allergies. If you're unsure about any medication, your pharmacist is an excellent resource for quick questions.";
  }

  if (history.length <= 1) {
    return "Hello! I'm your AI health assistant. I'm here to listen to your health concerns and provide general guidance. Please describe what symptoms or health issues you're experiencing, and I'll do my best to help. Remember, I can provide general health information but I'm not a replacement for professional medical advice.";
  }

  return "Thank you for sharing that information. Based on what you've told me, here are my general recommendations: Monitor your symptoms closely and note any changes. Stay hydrated and get adequate rest. Maintain a healthy diet and avoid self-medication unless directed by a healthcare professional. If your symptoms worsen or persist, please schedule an appointment with your doctor. Would you like to tell me more about any specific symptom you're experiencing?";
}

export function AIAssistant() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }
      if (finalTranscript) {
        setInputText(prev => prev + finalTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error !== 'no-speech') setIsListening(false);
    };

    recognition.onend = () => {
      if (isListening) {
        try { recognition.start(); } catch (_e) { /* already started */ }
      }
    };

    recognitionRef.current = recognition;
    synthRef.current = window.speechSynthesis;

    return () => {
      recognition.stop();
      synthRef.current?.cancel();
    };
  }, [isListening]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isProcessing]);

  const speakText = useCallback((text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#{1,6}\s/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural'));
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try { recognitionRef.current.start(); setIsListening(true); } catch (_e) { /* noop */ }
    }
  }, [isListening]);

  const sendMessage = useCallback((text?: string) => {
    const msg = (text || inputText).trim();
    if (!msg || isProcessing) return;
    setInputText('');
    setIsProcessing(true);
    const userMsg: ChatMessage = { role: 'user', content: msg, timestamp: new Date().toLocaleTimeString(), isVoice: isListening };
    setMessages(prev => [...prev, userMsg]);
    setTimeout(() => {
      const response = generateMedicalResponse(msg, messages);
      const aiMsg: ChatMessage = { role: 'assistant', content: response, timestamp: new Date().toLocaleTimeString() };
      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);
      if (isVoiceMode) setTimeout(() => speakText(response), 300);
    }, 1200 + Math.random() * 800);
  }, [inputText, isProcessing, messages, isListening, isVoiceMode, speakText]);

  useEffect(() => {
    if (!isListening && inputText.trim() && isVoiceMode) {
      const timer = setTimeout(() => { if (inputText.trim()) sendMessage(); }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isListening, inputText, isVoiceMode, sendMessage]);

  const toggleVoiceMode = () => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); }
    if (isSpeaking) stopSpeaking();
    setIsVoiceMode(prev => !prev);
  };

  const startNewConversation = () => {
    setMessages([]);
    setInputText('');
    setIsListening(false);
    setIsSpeaking(false);
    setIsVoiceMode(false);
  };

  const renderMarkdown = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-gray-500">$1</em>')
      .replace(/\n/g, '<br/>');

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col glass-card-elevated rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-3 border-b border-sahaay-deep/8 bg-white/50 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full sahaay-gradient flex items-center justify-center">
          <Stethoscope size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-bold text-gray-900">{t('ai.title')}</h2>
          <p className="text-[11px] text-gray-400">
            {isVoiceMode ? t('ai.voiceListening') : t('ai.textChat')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={startNewConversation} className="p-2 rounded-lg hover:bg-sahaay-deep/5 transition-colors text-gray-400 hover:text-gray-600" title={t('ai.newConversation')}>
            <RotateCcw size={16} />
          </button>
          <button onClick={toggleVoiceMode} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${isVoiceMode ? 'sahaay-gradient text-white' : 'bg-sahaay-deep/8 text-sahaay-deep hover:bg-sahaay-deep/15'}`}>
            <Mic size={12} />
            {isVoiceMode ? t('ai.voiceOn') : t('ai.voiceMode')}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-sahaay-surface/50 to-white/30">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 rounded-3xl sahaay-gradient flex items-center justify-center mb-6 shadow-lg">
              <Stethoscope size={40} className="text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t('ai.welcome')}</h3>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed mb-4">
              {t('ai.welcomeDesc')}
              {voiceSupported ? ' ' + t('ai.tryVoice') : ''}
            </p>
            <div className="grid grid-cols-2 gap-2 max-w-sm">
              {["I have a headache for 3 days", "I feel feverish and tired", "My stomach hurts after eating", "I'm feeling anxious and can't sleep"].map((suggestion, i) => (
                <button key={i} onClick={() => setInputText(suggestion)} className="p-3 rounded-xl bg-white/80 border border-sahaay-deep/8 text-left text-xs text-gray-600 hover:border-sahaay-deep/30 hover:shadow-sm transition-all">
                  {suggestion}
                </button>
              ))}
            </div>
            {!voiceSupported && (
              <div className="mt-4 flex items-center gap-2 text-xs text-amber-500 bg-amber-50 px-3 py-2 rounded-lg">
                <span>{t('ai.voiceNotSupported')}</span>
              </div>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-sahaay-deep/10 flex items-center justify-center shrink-0 mt-1">
                <Bot size={16} className="text-sahaay-deep" />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'sahaay-gradient text-white rounded-br-sm' : 'bg-white border border-sahaay-deep/8 text-gray-700 rounded-bl-sm shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-50">{msg.role === 'user' ? t('ai.you') : t('ai.assistant')}</span>
                  {msg.isVoice && <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">{t('ai.voice')}</span>}
                </div>
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
              </div>
              {msg.role === 'assistant' && (
                <button onClick={() => isSpeaking ? stopSpeaking() : speakText(msg.content)} className="mt-1.5 flex items-center gap-1 text-[11px] text-sahaay-deep/50 hover:text-sahaay-deep transition-colors">
                  {isSpeaking ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  {isSpeaking ? t('ai.stop') : t('ai.listen')}
                </button>
              )}
              <p className="text-[10px] text-gray-300 mt-0.5 px-1">{msg.timestamp}</p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full sahaay-gradient flex items-center justify-center shrink-0 mt-1">
                <User size={16} className="text-white" />
              </div>
            )}
          </motion.div>
        ))}

        {isProcessing && (
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

      {/* Voice Listening Indicator */}
      <AnimatePresence>
        {isVoiceMode && isListening && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-6 py-3 bg-sahaay-deep/5 border-t border-sahaay-deep/10 flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <motion.div key={i} animate={{ height: [4, 16, 8, 20, 4] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} className="w-1 bg-sahaay-deep rounded-full" />
              ))}
            </div>
            <p className="text-xs text-sahaay-deep font-medium">{t('ai.listening')}</p>
            {inputText && <p className="ml-auto text-xs text-gray-500 italic max-w-xs truncate">"{inputText}"</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="p-4 border-t border-sahaay-deep/8 bg-white/50 relative z-[60]">
        <div className="flex gap-2 items-end">
          {voiceSupported && (
            <button onClick={toggleListening} className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all ${isListening ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse' : 'bg-sahaay-deep/8 text-sahaay-deep hover:bg-sahaay-deep/15'}`} title={isListening ? 'Stop listening' : 'Start voice input'}>
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
          )}
          <textarea ref={textareaRef} value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} placeholder={isListening ? t('ai.listening') : t('ai.placeholder')} rows={1} className="flex-1 sahaay-input resize-none min-h-[44px] max-h-24 py-3" />
          <button onClick={() => sendMessage()} disabled={!inputText.trim() || isProcessing} className="shrink-0 sahaay-btn-primary w-11 h-11 rounded-xl flex items-center justify-center disabled:opacity-40">
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 px-1">
          <Info size={10} className="text-gray-300" />
          <span className="text-[10px] text-gray-300">{t('ai.disclaimer')}</span>
        </div>
      </div>
    </div>
  );
}
