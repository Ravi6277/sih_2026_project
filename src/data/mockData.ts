// SAHAAY Mock Data - Realistic Indian Healthcare Data
export const patients = [
  { id: 'P001', name: 'Rahul Sharma', age: 34, gender: 'Male', bloodGroup: 'B+', phone: '+91 98765 43210', location: 'Chandrapur, Assam', emergencyContact: 'Priya Sharma (+91 98765 43211)', status: 'active', registeredDate: '2026-08-01', avatar: 'RS' },
  { id: 'P002', name: 'Ananya Das', age: 28, gender: 'Female', bloodGroup: 'O+', phone: '+91 98765 43220', location: 'Sonapur, Assam', emergencyContact: 'Rakesh Das (+91 98765 43221)', status: 'active', registeredDate: '2026-08-05', avatar: 'AD' },
  { id: 'P003', name: 'Priya Devi', age: 45, gender: 'Female', bloodGroup: 'A+', phone: '+91 98765 43230', location: 'Goalpara, Assam', emergencyContact: 'Amit Devi (+91 98765 43231)', status: 'active', registeredDate: '2026-08-10', avatar: 'PD' },
  { id: 'P004', name: 'Amit Kumar', age: 52, gender: 'Male', bloodGroup: 'AB+', phone: '+91 98765 43240', location: 'Nagaon, Assam', emergencyContact: 'Sunita Kumar (+91 98765 43241)', status: 'active', registeredDate: '2026-08-12', avatar: 'AK' },
  { id: 'P005', name: 'Rakesh Singh', age: 19, gender: 'Male', bloodGroup: 'B-', phone: '+91 98765 43250', location: 'Jorhat, Assam', emergencyContact: 'Meena Singh (+91 98765 43251)', status: 'active', registeredDate: '2026-08-15', avatar: 'RS' },
  { id: 'P006', name: 'Sunita Boro', age: 31, gender: 'Female', bloodGroup: 'O-', phone: '+91 98765 43260', location: 'Kokrajhar, Assam', emergencyContact: 'Dinesh Boro (+91 98765 43261)', status: 'active', registeredDate: '2026-08-18', avatar: 'SB' },
  { id: 'P007', name: 'Dipak Gogoi', age: 67, gender: 'Male', bloodGroup: 'A-', phone: '+91 98765 43270', location: 'Dibrugarh, Assam', emergencyContact: 'Parul Gogoi (+91 98765 43271)', status: 'followup', registeredDate: '2026-07-20', avatar: 'DG' },
  { id: 'P008', name: 'Mamta Kumari', age: 24, gender: 'Female', bloodGroup: 'B+', phone: '+91 98765 43280', location: 'Tezpur, Assam', emergencyContact: 'Vikram Kumari (+91 98765 43281)', status: 'active', registeredDate: '2026-08-22', avatar: 'MK' },
];

export const doctors = [
  { id: 'D001', name: 'Dr. Ananya Sharma', speciality: 'General Physician', facility: 'PHC Chandrapur', phone: '+91 98760 10001', experience: '12 years', rating: 4.8, patientsToday: 12, available: true, avatar: 'AS' },
  { id: 'D002', name: 'Dr. Arjun Das', speciality: 'Cardiologist', facility: 'District Hospital Guwahati', phone: '+91 98760 10002', experience: '18 years', rating: 4.9, patientsToday: 8, available: true, avatar: 'AD' },
  { id: 'D003', name: 'Dr. Priya Singh', speciality: 'Pediatrician', facility: 'CHC Sonapur', phone: '+91 98760 10003', experience: '8 years', rating: 4.7, patientsToday: 15, available: false, avatar: 'PS' },
  { id: 'D004', name: 'Dr. Ramesh Gupta', speciality: 'Orthopedic', facility: 'District Hospital Guwahati', phone: '+91 98760 10004', experience: '22 years', rating: 4.6, patientsToday: 10, available: true, avatar: 'RG' },
  { id: 'D005', name: 'Dr. Sunita Reddy', speciality: 'Gynecologist', facility: 'PHC Chandrapur', phone: '+91 98760 10005', experience: '15 years', rating: 4.8, patientsToday: 9, available: true, avatar: 'SR' },
  { id: 'D006', name: 'Dr. Vikram Patel', speciality: 'Dermatologist', facility: 'CHC Sonapur', phone: '+91 98760 10006', experience: '10 years', rating: 4.5, patientsToday: 7, available: true, avatar: 'VP' },
];

export const facilities = [
  { id: 'F001', name: 'PHC Chandrapur', type: 'Primary Health Centre', distance: 2.4, services: ['General Consultation', 'Basic Diagnostics', 'Maternal Care', 'Child Care'], doctorsAvailable: 3, waitingTime: 18, diagnostics: ['Blood Test', 'Urine Test', 'Basic Imaging'], medicines: 'Available', emergency: true, beds: 10, occupancy: 65, lat: 26.1445, lng: 91.7362 },
  { id: 'F002', name: 'CHC Sonapur', type: 'Community Health Centre', distance: 8.1, services: ['General Consultation', 'Specialist Consultation', 'Diagnostics', 'Maternal Care', 'Emergency'], doctorsAvailable: 6, waitingTime: 32, diagnostics: ['Blood Test', 'X-Ray', 'ECG', 'Ultrasound'], medicines: 'Available', emergency: true, beds: 30, occupancy: 72, lat: 26.1200, lng: 91.7000 },
  { id: 'F003', name: 'District Hospital Guwahati', type: 'District Hospital', distance: 22.5, services: ['All Specialities', 'Advanced Diagnostics', 'Surgery', 'ICU', 'Emergency', 'Blood Bank'], doctorsAvailable: 18, waitingTime: 45, diagnostics: ['Full Blood Panel', 'CT Scan', 'X-Ray', 'MRI', 'ECG', 'Ultrasound'], medicines: 'Available', emergency: true, beds: 200, occupancy: 81, lat: 26.1445, lng: 91.7362 },
  { id: 'F004', name: 'Rural Health Centre Dhekiajuli', type: 'Rural Health Centre', distance: 5.2, services: ['General Consultation', 'Basic Diagnostics', 'Immunization'], doctorsAvailable: 2, waitingTime: 12, diagnostics: ['Blood Test', 'Urine Test'], medicines: 'Low Stock', emergency: false, beds: 5, occupancy: 40, lat: 26.5000, lng: 91.9000 },
  { id: 'F005', name: 'Specialist Centre Tezpur', type: 'Specialist Centre', distance: 15.3, services: ['Cardiology', 'Neurology', 'Orthopedics', 'Advanced Diagnostics'], doctorsAvailable: 10, waitingTime: 38, diagnostics: ['Echo Cardiogram', 'EEG', 'X-Ray', 'CT Scan'], medicines: 'Available', emergency: false, beds: 50, occupancy: 68, lat: 26.6500, lng: 92.6800 },
];

export const appointments = [
  { id: 'A001', patientId: 'P001', patientName: 'Rahul Sharma', doctorId: 'D001', doctorName: 'Dr. Ananya Sharma', speciality: 'General Physician', facility: 'PHC Chandrapur', date: '2026-08-31', time: '11:30 AM', type: 'Video Consultation', status: 'upcoming', priority: 'normal' },
  { id: 'A002', patientId: 'P002', patientName: 'Ananya Das', doctorId: 'D005', doctorName: 'Dr. Sunita Reddy', speciality: 'Gynecologist', facility: 'PHC Chandrapur', date: '2026-08-31', time: '02:00 PM', type: 'In-Person', status: 'upcoming', priority: 'high' },
  { id: 'A003', patientId: 'P003', patientName: 'Priya Devi', doctorId: 'D002', doctorName: 'Dr. Arjun Das', speciality: 'Cardiologist', facility: 'District Hospital Guwahati', date: '2026-08-30', time: '10:00 AM', type: 'Video Consultation', status: 'completed', priority: 'high' },
  { id: 'A004', patientId: 'P004', patientName: 'Amit Kumar', doctorId: 'D004', doctorName: 'Dr. Ramesh Gupta', speciality: 'Orthopedic', facility: 'District Hospital Guwahati', date: '2026-08-29', time: '03:30 PM', type: 'In-Person', status: 'completed', priority: 'normal' },
  { id: 'A005', patientId: 'P005', patientName: 'Rakesh Singh', doctorId: 'D003', doctorName: 'Dr. Priya Singh', speciality: 'Pediatrician', facility: 'CHC Sonapur', date: '2026-09-01', time: '09:00 AM', type: 'In-Person', status: 'upcoming', priority: 'normal' },
  { id: 'A006', patientId: 'P006', patientName: 'Sunita Boro', doctorId: 'D001', doctorName: 'Dr. Ananya Sharma', speciality: 'General Physician', facility: 'PHC Chandrapur', date: '2026-09-02', time: '11:00 AM', type: 'Video Consultation', status: 'upcoming', priority: 'normal' },
];

export const referrals = [
  { id: 'R001', patientId: 'P001', patientName: 'Rahul Sharma', sourceFacility: 'PHC Chandrapur', destinationFacility: 'District Hospital Guwahati', reason: 'Cardiac evaluation — elevated blood pressure', priority: 'high', status: 'accepted', createdDate: '2026-08-28', expectedDate: '2026-09-02', assignedDoctor: 'Dr. Arjun Das', notes: 'Patient requires ECG and echocardiogram' },
  { id: 'R002', patientId: 'P002', patientName: 'Ananya Das', sourceFacility: 'PHC Chandrapur', destinationFacility: 'CHC Sonapur', reason: 'Prenatal checkup referral', priority: 'high', status: 'completed', createdDate: '2026-08-20', expectedDate: '2026-08-25', assignedDoctor: 'Dr. Sunita Reddy', notes: 'Regular prenatal follow-up' },
  { id: 'R003', patientId: 'P003', patientName: 'Priya Devi', sourceFacility: 'RHC Dhekiajuli', destinationFacility: 'PHC Chandrapur', reason: 'Chronic diabetes management', priority: 'medium', status: 'pending', createdDate: '2026-08-29', expectedDate: '2026-09-05', assignedDoctor: 'Dr. Ananya Sharma', notes: 'HbA1c monitoring required' },
  { id: 'R004', patientId: 'P004', patientName: 'Amit Kumar', sourceFacility: 'PHC Chandrapur', destinationFacility: 'Specialist Centre Tezpur', reason: 'Knee pain — possible meniscus tear', priority: 'medium', status: 'in_transit', createdDate: '2026-08-27', expectedDate: '2026-09-03', assignedDoctor: 'Dr. Ramesh Gupta', notes: 'X-ray results pending review' },
  { id: 'R005', patientId: 'P007', patientName: 'Dipak Gogoi', sourceFacility: 'District Hospital Guwahati', destinationFacility: 'PHC Chandrapur', reason: 'Post-surgery follow-up', priority: 'low', status: 'followup_required', createdDate: '2026-08-15', expectedDate: '2026-09-10', assignedDoctor: 'Dr. Ananya Sharma', notes: 'Hip replacement recovery monitoring' },
  { id: 'R006', patientId: 'P005', patientName: 'Rakesh Singh', sourceFacility: 'CHC Sonapur', destinationFacility: 'District Hospital Guwahati', reason: 'Blood work — iron deficiency', priority: 'medium', status: 'appointment_scheduled', createdDate: '2026-08-25', expectedDate: '2026-09-01', assignedDoctor: 'Dr. Arjun Das', notes: 'CBC and iron studies needed' },
];

export const healthRecords = {
  patient: patients[0],
  timeline: [
    { date: '2026-08-01', event: 'Registration', facility: 'PHC Chandrapur', type: 'registration', details: 'Initial registration with healthcare worker' },
    { date: '2026-08-05', event: 'Health Intake Assessment', facility: 'PHC Chandrapur', type: 'assessment', details: 'Complete health intake questionnaire completed' },
    { date: '2026-08-12', event: 'PHC Consultation', facility: 'PHC Chandrapur', type: 'consultation', details: 'General checkup — Dr. Ananya Sharma' },
    { date: '2026-08-18', event: 'Blood Test', facility: 'PHC Chandrapur', type: 'diagnostic', details: 'CBC, Lipid Profile, Blood Sugar' },
    { date: '2026-08-21', event: 'Specialist Referral', facility: 'PHC → District Hospital', type: 'referral', details: 'Cardiac referral — Dr. Arjun Das' },
    { date: '2026-08-28', event: 'Specialist Consultation', facility: 'District Hospital Guwahati', type: 'consultation', details: 'ECG and blood pressure evaluation' },
    { date: '2026-08-31', event: 'Follow-up Consultation', facility: 'PHC Chandrapur', type: 'followup', details: 'Video follow-up with Dr. Ananya Sharma' },
  ],
  conditions: [
    { name: 'Hypertension', diagnosedDate: '2026-08-12', status: 'Under Management', severity: 'moderate' },
    { name: 'Mild Anemia', diagnosedDate: '2026-08-18', status: 'Improving', severity: 'mild' },
  ],
  prescriptions: [
    { date: '2026-08-28', doctor: 'Dr. Arjun Das', medicines: ['Amlodipine 5mg — Once daily', 'Aspirin 75mg — Once daily'], notes: 'Follow up in 2 weeks' },
    { date: '2026-08-12', doctor: 'Dr. Ananya Sharma', medicines: ['Iron Supplement — Twice daily', 'Folic Acid — Once daily'], notes: 'Recheck blood levels in 4 weeks' },
  ],
  diagnostics: [
    { date: '2026-08-18', test: 'Complete Blood Count', facility: 'PHC Chandrapur', status: 'Available', results: 'Hemoglobin: 10.2 g/dL (Low)', downloadUrl: '#' },
    { date: '2026-08-28', test: 'ECG', facility: 'District Hospital Guwahati', status: 'Available', results: 'Sinus rhythm — No acute abnormalities', downloadUrl: '#' },
  ],
  vaccinations: [
    { name: 'COVID-19 Booster', date: '2026-03-15', status: 'Completed' },
    { name: 'Tetanus', date: '2025-08-20', status: 'Completed' },
  ],
  allergies: ['Penicillin', 'Sulfa drugs'],
};

export const followups = [
  { id: 'FU001', patientId: 'P001', patientName: 'Rahul Sharma', condition: 'Hypertension — Blood Pressure Review', lastConsultation: '2026-08-28', nextFollowup: '2026-09-03', assignedDoctor: 'Dr. Ananya Sharma', priority: 'high', status: 'upcoming', completionRate: 75 },
  { id: 'FU002', patientId: 'P002', patientName: 'Ananya Das', condition: 'Prenatal — Month 7 Checkup', lastConsultation: '2026-08-25', nextFollowup: '2026-09-08', assignedDoctor: 'Dr. Sunita Reddy', priority: 'high', status: 'upcoming', completionRate: 100 },
  { id: 'FU003', patientId: 'P003', patientName: 'Priya Devi', condition: 'Diabetes — HbA1c Monitoring', lastConsultation: '2026-08-20', nextFollowup: '2026-08-28', assignedDoctor: 'Dr. Ananya Sharma', priority: 'high', status: 'missed', completionRate: 50 },
  { id: 'FU004', patientId: 'P007', patientName: 'Dipak Gogoi', condition: 'Post-Surgery Recovery', lastConsultation: '2026-08-15', nextFollowup: '2026-09-10', assignedDoctor: 'Dr. Ramesh Gupta', priority: 'medium', status: 'upcoming', completionRate: 60 },
  { id: 'FU005', patientId: 'P005', patientName: 'Rakesh Singh', condition: 'Iron Deficiency — Blood Test', lastConsultation: '2026-08-22', nextFollowup: '2026-09-05', assignedDoctor: 'Dr. Arjun Das', priority: 'medium', status: 'upcoming', completionRate: 80 },
  { id: 'FU006', patientId: 'P006', patientName: 'Sunita Boro', condition: 'Thyroid — TSH Monitoring', lastConsultation: '2026-08-10', nextFollowup: '2026-08-25', assignedDoctor: 'Dr. Ananya Sharma', priority: 'low', status: 'completed', completionRate: 100 },
];

export const diagnostics = [
  { id: 'DG001', test: 'Complete Blood Count', facility: 'PHC Chandrapur', availability: 'Available', waitingTime: '30 min', distance: 2.4, price: '₹250', category: 'Blood Test' },
  { id: 'DG002', test: 'Lipid Profile', facility: 'PHC Chandrapur', availability: 'Available', waitingTime: '45 min', distance: 2.4, price: '₹400', category: 'Blood Test' },
  { id: 'DG003', test: 'Blood Sugar (Fasting)', facility: 'PHC Chandrapur', availability: 'Available', waitingTime: '20 min', distance: 2.4, price: '₹150', category: 'Blood Test' },
  { id: 'DG004', test: 'X-Ray Chest', facility: 'CHC Sonapur', availability: 'Available', waitingTime: '60 min', distance: 8.1, price: '₹500', category: 'X-Ray' },
  { id: 'DG005', test: 'ECG', facility: 'District Hospital Guwahati', availability: 'Available', waitingTime: '25 min', distance: 22.5, price: '₹300', category: 'ECG' },
  { id: 'DG006', test: 'Ultrasound Abdomen', facility: 'CHC Sonapur', availability: 'Low Slot', waitingTime: '90 min', distance: 8.1, price: '₹800', category: 'Ultrasound' },
  { id: 'DG007', test: 'HbA1c', facility: 'District Hospital Guwahati', availability: 'Available', waitingTime: '40 min', distance: 22.5, price: '₹600', category: 'Blood Test' },
  { id: 'DG008', test: 'CT Scan', facility: 'District Hospital Guwahati', availability: 'Unavailable', waitingTime: '—', distance: 22.5, price: '₹2500', category: 'Imaging' },
  { id: 'DG009', test: 'Thyroid Profile', facility: 'PHC Chandrapur', availability: 'Available', waitingTime: '35 min', distance: 2.4, price: '₹450', category: 'Blood Test' },
  { id: 'DG010', test: 'Urine Routine', facility: 'PHC Chandrapur', availability: 'Available', waitingTime: '15 min', distance: 2.4, price: '₹100', category: 'Pathology' },
];

export const medicines = [
  { id: 'M001', name: 'Amlodipine 5mg', category: 'Chronic Care', facility: 'PHC Chandrapur', stock: 'Available', lastUpdated: '2026-08-30', distance: 2.4, manufacturer: 'Cipla' },
  { id: 'M002', name: 'Metformin 500mg', category: 'Chronic Care', facility: 'PHC Chandrapur', stock: 'Available', lastUpdated: '2026-08-30', distance: 2.4, manufacturer: 'Sun Pharma' },
  { id: 'M003', name: 'Iron Supplement', category: 'Essential Medicines', facility: 'PHC Chandrapur', stock: 'Available', lastUpdated: '2026-08-29', distance: 2.4, manufacturer: 'Zydus' },
  { id: 'M004', name: 'Paracetamol 500mg', category: 'Essential Medicines', facility: 'PHC Chandrapur', stock: 'Available', lastUpdated: '2026-08-31', distance: 2.4, manufacturer: 'Dr. Reddy\'s' },
  { id: 'M005', name: 'ORS Sachets', category: 'Essential Medicines', facility: 'CHC Sonapur', stock: 'Low Stock', lastUpdated: '2026-08-28', distance: 8.1, manufacturer: 'Abbot' },
  { id: 'M006', name: 'Iron Folic Acid', category: 'Maternal Care', facility: 'PHC Chandrapur', stock: 'Available', lastUpdated: '2026-08-30', distance: 2.4, manufacturer: 'FDC Ltd' },
  { id: 'M007', name: 'Amoxicillin 500mg', category: 'Essential Medicines', facility: 'District Hospital Guwahati', stock: 'Available', lastUpdated: '2026-08-31', distance: 22.5, manufacturer: 'Cipla' },
  { id: 'M008', name: 'Aspirin 75mg', category: 'Chronic Care', facility: 'PHC Chandrapur', stock: 'Available', lastUpdated: '2026-08-30', distance: 2.4, manufacturer: 'Bayer' },
  { id: 'M009', name: 'Vitamin D3', category: 'Essential Medicines', facility: 'CHC Sonapur', stock: 'Low Stock', lastUpdated: '2026-08-27', distance: 8.1, manufacturer: 'Glenmark' },
  { id: 'M010', name: 'Salbutamol Inhaler', category: 'Emergency', facility: 'District Hospital Guwahati', stock: 'Available', lastUpdated: '2026-08-31', distance: 22.5, manufacturer: 'Cipla' },
  { id: 'M011', name: 'Calcium supplements', category: 'Maternal Care', facility: 'PHC Chandrapur', stock: 'Unavailable', lastUpdated: '2026-08-20', distance: 2.4, manufacturer: 'Alkem' },
  { id: 'M012', name: 'ORS + Zinc', category: 'Child Care', facility: 'CHC Sonapur', stock: 'Available', lastUpdated: '2026-08-30', distance: 8.1, manufacturer: 'FDC Ltd' },
];

export const notifications = [
  { id: 'N001', title: 'Referral Accepted', message: 'Dr. Arjun Das has accepted the referral for Rahul Sharma', time: '10 minutes ago', type: 'referral', read: false },
  { id: 'N002', title: 'Consultation Ready', message: 'Dr. Ananya Sharma is ready for your video consultation at 11:30 AM', time: '25 minutes ago', type: 'consultation', read: false },
  { id: 'N003', title: 'Follow-up Reminder', message: 'Your blood pressure review follow-up is due in 3 days', time: '1 hour ago', type: 'followup', read: false },
  { id: 'N004', title: 'Diagnostic Report', message: 'Your ECG results from District Hospital are now available', time: '3 hours ago', type: 'diagnostic', read: true },
  { id: 'N005', title: 'Medicine Update', message: 'Iron supplements are now available at PHC Chandrapur', time: '5 hours ago', type: 'medicine', read: true },
  { id: 'N006', title: 'Appointment Confirmed', message: 'Your appointment with Dr. Priya Singh is confirmed for Sept 1', time: '1 day ago', type: 'appointment', read: true },
];

export const messages = [
  {
    id: 'MSG001',
    contactName: 'Dr. Ananya Sharma',
    contactRole: 'General Physician',
    lastMessage: 'Please take the blood pressure medication regularly before your next follow-up.',
    time: '10:30 AM',
    unread: 2,
    messages: [
      { sender: 'doctor', text: 'Good morning Rahul, I\'ve reviewed your latest blood test results.', time: '9:45 AM' },
      { sender: 'patient', text: 'Good morning Doctor. How are my results?', time: '9:50 AM' },
      { sender: 'doctor', text: 'Your hemoglobin has improved to 11.2 g/dL. That\'s good progress.', time: '10:00 AM' },
      { sender: 'doctor', text: 'Please continue the iron supplements and we\'ll recheck in 4 weeks.', time: '10:05 AM' },
      { sender: 'patient', text: 'Thank you Doctor. Should I continue the blood pressure medication?', time: '10:15 AM' },
      { sender: 'doctor', text: 'Yes, please take the blood pressure medication regularly before your next follow-up.', time: '10:30 AM' },
    ]
  },
  {
    id: 'MSG002',
    contactName: 'PHC Chandrapur',
    contactRole: 'Healthcare Facility',
    lastMessage: 'Your next appointment is scheduled for August 31 at 11:30 AM.',
    time: 'Yesterday',
    unread: 0,
    messages: [
      { sender: 'facility', text: 'This is a reminder about your upcoming video consultation.', time: 'Yesterday' },
      { sender: 'facility', text: 'Your next appointment is scheduled for August 31 at 11:30 AM.', time: 'Yesterday' },
    ]
  },
  {
    id: 'MSG003',
    contactName: 'Care Coordinator',
    contactRole: 'Healthcare Worker',
    lastMessage: 'I\'ve arranged your referral to District Hospital. You\'ll hear from Dr. Arjun Das soon.',
    time: '2 days ago',
    unread: 1,
    messages: [
      { sender: 'coordinator', text: 'Hello Rahul, I\'m your care coordinator Meena.', time: '2 days ago' },
      { sender: 'coordinator', text: 'I\'ve arranged your referral to District Hospital. You\'ll hear from Dr. Arjun Das soon.', time: '2 days ago' },
    ]
  },
];

export const analyticsData = {
  patientFlow: [
    { month: 'Apr', registrations: 120, consultations: 95, referrals: 32 },
    { month: 'May', registrations: 145, consultations: 120, referrals: 38 },
    { month: 'Jun', registrations: 132, consultations: 110, referrals: 35 },
    { month: 'Jul', registrations: 168, consultations: 142, referrals: 45 },
    { month: 'Aug', registrations: 195, consultations: 165, referrals: 52 },
  ],
  referralCompletion: [
    { month: 'Apr', completed: 28, pending: 4, rate: 87 },
    { month: 'May', completed: 33, pending: 5, rate: 87 },
    { month: 'Jun', completed: 30, pending: 5, rate: 86 },
    { month: 'Jul', completed: 40, pending: 5, rate: 89 },
    { month: 'Aug', completed: 46, pending: 6, rate: 88 },
  ],
  waitingTime: [
    { facility: 'PHC Chandrapur', avgTime: 18 },
    { facility: 'CHC Sonapur', avgTime: 32 },
    { facility: 'District Hospital', avgTime: 45 },
    { facility: 'RHC Dhekiajuli', avgTime: 12 },
    { facility: 'Specialist Centre', avgTime: 38 },
  ],
  facilityLoad: [
    { name: 'PHC Chandrapur', occupancy: 65, capacity: 100 },
    { name: 'CHC Sonapur', occupancy: 72, capacity: 100 },
    { name: 'District Hospital', occupancy: 81, capacity: 100 },
    { name: 'RHC Dhekiajuli', occupancy: 40, capacity: 100 },
    { name: 'Specialist Centre', occupancy: 68, capacity: 100 },
  ],
  followupCompletion: [
    { month: 'Apr', completed: 85, missed: 15 },
    { month: 'May', completed: 88, missed: 12 },
    { month: 'Jun', completed: 82, missed: 18 },
    { month: 'Jul', completed: 90, missed: 10 },
    { month: 'Aug', completed: 87, missed: 13 },
  ],
  kpis: {
    avgTravelDistanceAvoided: '14.2 km',
    avgWaitingTime: '28 min',
    referralCompletionRate: '88%',
    referralTurnaround: '3.2 days',
    followupCompletionRate: '87%',
    diagnosticAvailability: '78%',
    medicineAvailability: '82%',
  },
};

export const healthcareWorkers = [
  { id: 'HW001', name: 'Meena Das', role: 'ASHA Worker', facility: 'PHC Chandrapur', area: 'Chandrapur Village', patientsRegistered: 48, referralsCreated: 12, followupsCompleted: 35, phone: '+91 98760 20001' },
  { id: 'HW002', name: 'Rina Boro', role: 'ANM', facility: 'CHC Sonapur', area: 'Sonapur Block', patientsRegistered: 62, referralsCreated: 18, followupsCompleted: 48, phone: '+91 98760 20002' },
];

export const facilityStats = {
  patientLoad: { today: 45, thisWeek: 280, thisMonth: 1120 },
  avgWaitingTime: 28,
  pendingReferrals: 8,
  followupGaps: 5,
  availableDoctors: 3,
  diagnosticCapacity: 72,
  medicineStockLevel: 82,
};
