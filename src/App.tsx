import { useState, useCallback, type ReactNode } from 'react';
import { ToastProvider } from './components/ui/Toast';
import { AppShell } from './components/layout/AppShell';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { PatientAppointments } from './pages/patient/PatientAppointments';
import { PatientRecords } from './pages/patient/PatientRecords';
import { PatientReferrals } from './pages/patient/PatientReferrals';
import { PatientFacilities } from './pages/patient/PatientFacilities';
import { PatientDiagnostics } from './pages/patient/PatientDiagnostics';
import { PatientMedicines } from './pages/patient/PatientMedicines';
import { PatientFollowups } from './pages/patient/PatientFollowups';
import { PatientMessages } from './pages/patient/PatientMessages';
import { PatientNotifications } from './pages/patient/PatientNotifications';
import { PatientAnalytics } from './pages/patient/PatientAnalytics';
import { VideoConsultation } from './pages/patient/VideoConsultation';
import { SymptomChecker } from './pages/patient/SymptomChecker';
import { MyVitals } from './pages/patient/MyVitals';
import { LabReportUpload } from './pages/patient/LabReportUpload';
import { AIAssistant } from './pages/patient/AIAssistant';
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorPatients } from './pages/doctor/DoctorPatients';
import { DoctorAppointments } from './pages/doctor/DoctorAppointments';
import { DoctorReferrals } from './pages/doctor/DoctorReferrals';
import { DoctorFollowups } from './pages/doctor/DoctorFollowups';
import { DoctorMessages } from './pages/doctor/DoctorMessages';
import { DoctorNotifications } from './pages/doctor/DoctorNotifications';
import { WorkerDashboard } from './pages/worker/WorkerDashboard';
import { WorkerPatients } from './pages/worker/WorkerPatients';
import { WorkerFacilities } from './pages/worker/WorkerFacilities';
import { WorkerReferrals } from './pages/worker/WorkerReferrals';
import { WorkerFollowups } from './pages/worker/WorkerFollowups';
import { FacilityDashboard } from './pages/facility/FacilityDashboard';
import { SettingsPage } from './pages/SettingsPage';
import { GenericPage } from './pages/GenericPage';
import { Scene as KageScene } from './pages/KageScene';
import { PageTransition } from './components/fx/PageTransition';
import { LanguageProvider } from './i18n/LanguageContext';

function AppInner() {
  const [route, setRoute] = useState('/');

  const navigate = useCallback((newRoute: string) => {
    setRoute(newRoute);
    window.scrollTo(0, 0);
  }, []);

  const getRole = (): 'patient' | 'doctor' | 'worker' | 'facility' => {
    if (route.startsWith('/doctor')) return 'doctor';
    if (route.startsWith('/worker')) return 'worker';
    if (route.startsWith('/facility')) return 'facility';
    return 'patient';
  };

  const pageTitles: Record<string, { title: string; subtitle: string }> = {
    '/patient/dashboard': { title: 'Overview', subtitle: 'Your healthcare dashboard' },
    '/patient/appointments': { title: 'Appointments', subtitle: 'Manage consultations' },
    '/patient/records': { title: 'Health Records', subtitle: 'Your medical records' },
    '/patient/referrals': { title: 'Referrals', subtitle: 'Referral tracking' },
    '/patient/facilities': { title: 'Facilities', subtitle: 'Find healthcare facilities' },
    '/patient/diagnostics': { title: 'Diagnostics', subtitle: 'Diagnostic services' },
    '/patient/medicines': { title: 'Medicines', subtitle: 'Medicine availability' },
    '/patient/followups': { title: 'Follow-ups', subtitle: 'Follow-up care' },
    '/patient/messages': { title: 'Messages', subtitle: 'Healthcare communication' },
    '/patient/notifications': { title: 'Notifications', subtitle: 'Updates & alerts' },
    '/patient/analytics': { title: 'Analytics', subtitle: 'Healthcare insights' },
    '/patient/consultation': { title: 'Video Consultation', subtitle: 'Teleconsultation' },
    '/patient/symptom-checker': { title: 'Symptom Checker', subtitle: 'AI-assisted symptom analysis' },
    '/patient/vitals': { title: 'My Vitals', subtitle: 'Track your health measurements' },
    '/patient/lab-reports': { title: 'Lab Report Upload', subtitle: 'Upload & manage lab reports' },
    '/patient/ai-assistant': { title: 'AI Assistant', subtitle: 'Voice & text health guidance' },
    '/doctor/dashboard': { title: 'Overview', subtitle: 'Clinical dashboard' },
    '/doctor/patients': { title: 'My Patients', subtitle: 'Patient management' },
    '/doctor/consultation': { title: 'Consultations', subtitle: 'Video consultations' },
    '/doctor/appointments': { title: 'Appointments', subtitle: 'Schedule management' },
    '/doctor/referrals': { title: 'Referrals', subtitle: 'Referral management' },
    '/doctor/followups': { title: 'Follow-ups', subtitle: 'Patient follow-ups' },
    '/doctor/messages': { title: 'Messages', subtitle: 'Communication' },
    '/doctor/notifications': { title: 'Notifications', subtitle: 'Updates' },
    '/worker/dashboard': { title: 'Overview', subtitle: 'Field worker dashboard' },
    '/worker/patients': { title: 'My Patients', subtitle: 'Patient registration' },
    '/worker/referrals': { title: 'Referrals', subtitle: 'Create & track referrals' },
    '/worker/followups': { title: 'Follow-ups', subtitle: 'Community follow-ups' },
    '/worker/facilities': { title: 'Facilities', subtitle: 'Find facilities' },
    '/worker/messages': { title: 'Messages', subtitle: 'Communication' },
    '/facility/dashboard': { title: 'Overview', subtitle: 'Facility operations' },
    '/facility/analytics': { title: 'Analytics', subtitle: 'Facility analytics' },
    '/facility/referrals': { title: 'Referrals', subtitle: 'Inbound referrals' },
    '/facility/inventory': { title: 'Inventory', subtitle: 'Medicine & supply inventory' },
    '/facility/patients': { title: 'Patients', subtitle: 'Patient management' },
    '/facility/messages': { title: 'Messages', subtitle: 'Communication' },
    '/settings': { title: 'Settings', subtitle: 'Account preferences' },
  };

  /* Route resolution is unchanged — it is wrapped in a function only so the
     single return below can hand the result to PageTransition. */
  const resolve = (): ReactNode => {

  // Public routes
  if (route === '/') return (
    <ToastProvider>
      <LandingPage onNavigate={navigate} />
    </ToastProvider>
  );

  if (route === '/login') return (
    <ToastProvider>
      <LoginPage onNavigate={navigate} />
    </ToastProvider>
  );

  // ThreeUI Kage landing page
  if (route === '/kage') return <KageScene />;

  // Settings
  if (route === '/settings') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role={getRole()} title="Settings" subtitle="Account preferences">
        <SettingsPage />
      </AppShell>
    </ToastProvider>
  );

  // Video consultation
  if (route === '/patient/consultation') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="patient" title="Video Consultation" subtitle="Teleconsultation">
        <VideoConsultation />
      </AppShell>
    </ToastProvider>
  );

  // Symptom Checker
  if (route === '/patient/symptom-checker') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="patient" title="Symptom Checker" subtitle="AI-assisted symptom analysis">
        <SymptomChecker />
      </AppShell>
    </ToastProvider>
  );

  // My Vitals
  if (route === '/patient/vitals') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="patient" title="My Vitals" subtitle="Track your health measurements">
        <MyVitals />
      </AppShell>
    </ToastProvider>
  );

  // Lab Report Upload
  if (route === '/patient/lab-reports') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="patient" title="Lab Report Upload" subtitle="Upload & manage lab reports">
        <LabReportUpload />
      </AppShell>
    </ToastProvider>
  );

  // AI Assistant
  if (route === '/patient/ai-assistant') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="patient" title="AI Assistant" subtitle="Voice & text health guidance">
        <AIAssistant />
      </AppShell>
    </ToastProvider>
  );

  // Patient routes
  const patientPages: Record<string, () => ReactNode> = {
    '/patient/dashboard': () => <PatientDashboard onNavigate={navigate} />,
    '/patient/appointments': () => <PatientAppointments onNavigate={navigate} />,
    '/patient/records': () => <PatientRecords />,
    '/patient/referrals': () => <PatientReferrals />,
    '/patient/facilities': () => <PatientFacilities />,
    '/patient/diagnostics': () => <PatientDiagnostics />,
    '/patient/medicines': () => <PatientMedicines />,
    '/patient/followups': () => <PatientFollowups />,
    '/patient/messages': () => <PatientMessages />,
    '/patient/notifications': () => <PatientNotifications />,
    '/patient/analytics': () => <PatientAnalytics />,
  };

  if (patientPages[route]) {
    const info = pageTitles[route] || { title: '', subtitle: '' };
    return (
      <ToastProvider>
        <AppShell activeRoute={route} onNavigate={navigate} role="patient" title={info.title} subtitle={info.subtitle}>
          {patientPages[route]()}
        </AppShell>
      </ToastProvider>
    );
  }

  // Doctor routes
  if (route === '/doctor/dashboard') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="doctor" title="Overview" subtitle="Clinical dashboard">
        <DoctorDashboard onNavigate={navigate} />
      </AppShell>
    </ToastProvider>
  );

  if (route === '/doctor/consultation') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="doctor" title="Consultations" subtitle="Video consultations">
        <VideoConsultation />
      </AppShell>
    </ToastProvider>
  );

  const doctorPages: Record<string, { component: ReactNode; title: string; subtitle: string }> = {
    '/doctor/patients': { component: <DoctorPatients />, title: 'My Patients', subtitle: 'Patient management' },
    '/doctor/appointments': { component: <DoctorAppointments />, title: 'Appointments', subtitle: 'Schedule management' },
    '/doctor/referrals': { component: <DoctorReferrals />, title: 'Referrals', subtitle: 'Referral management' },
    '/doctor/followups': { component: <DoctorFollowups />, title: 'Follow-ups', subtitle: 'Patient follow-ups' },
    '/doctor/messages': { component: <DoctorMessages />, title: 'Messages', subtitle: 'Communication' },
    '/doctor/notifications': { component: <DoctorNotifications />, title: 'Notifications', subtitle: 'Updates' },
  };

  if (doctorPages[route]) {
    const info = doctorPages[route];
    return (
      <ToastProvider>
        <AppShell activeRoute={route} onNavigate={navigate} role="doctor" title={info.title} subtitle={info.subtitle}>
          {info.component}
        </AppShell>
      </ToastProvider>
    );
  }

  // Worker routes
  if (route === '/worker/dashboard') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="worker" title="Overview" subtitle="Field worker dashboard">
        <WorkerDashboard onNavigate={navigate} />
      </AppShell>
    </ToastProvider>
  );

  const workerPages: Record<string, { component: ReactNode; title: string; subtitle: string }> = {
    '/worker/patients': { component: <WorkerPatients />, title: 'My Patients', subtitle: 'Patient registration' },
    '/worker/referrals': { component: <WorkerReferrals />, title: 'Referrals', subtitle: 'Create & track referrals' },
    '/worker/followups': { component: <WorkerFollowups />, title: 'Follow-ups', subtitle: 'Community follow-ups' },
    '/worker/facilities': { component: <WorkerFacilities />, title: 'Facilities', subtitle: 'Find facilities' },
    '/worker/messages': { component: <GenericPage title="Messages" description="Communicate with supervisors and doctors." onBack={() => navigate('/worker/dashboard')} role="worker" />, title: 'Messages', subtitle: 'Communication' },
  };

  if (workerPages[route]) {
    const info = workerPages[route];
    return (
      <ToastProvider>
        <AppShell activeRoute={route} onNavigate={navigate} role="worker" title={info.title} subtitle={info.subtitle}>
          {info.component}
        </AppShell>
      </ToastProvider>
    );
  }

  // Facility routes
  if (route === '/facility/dashboard') return (
    <ToastProvider>
      <AppShell activeRoute={route} onNavigate={navigate} role="facility" title="Overview" subtitle="Facility operations">
        <FacilityDashboard onNavigate={navigate} />
      </AppShell>
    </ToastProvider>
  );

  const facilityPages: Record<string, { title: string; desc: string }> = {
    '/facility/analytics': { title: 'Analytics', desc: 'Facility performance and operational metrics.' },
    '/facility/referrals': { title: 'Referrals', desc: 'Manage inbound and outbound referrals.' },
    '/facility/inventory': { title: 'Inventory', desc: 'Medicine and supply inventory management.' },
    '/facility/patients': { title: 'Patients', desc: 'Patient management and records.' },
    '/facility/messages': { title: 'Messages', desc: 'Communication hub.' },
  };

  if (facilityPages[route]) {
    const info = facilityPages[route];
    return (
      <ToastProvider>
        <AppShell activeRoute={route} onNavigate={navigate} role="facility" title={info.title} subtitle={info.desc}>
          <GenericPage title={info.title} description={info.desc} onBack={() => navigate('/facility/dashboard')} role="facility" />
        </AppShell>
      </ToastProvider>
    );
  }

  // Fallback
  return (
    <ToastProvider>
      <LandingPage onNavigate={navigate} />
    </ToastProvider>
  );

  };

  return <PageTransition routeKey={route}>{resolve()}</PageTransition>;
}

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;
