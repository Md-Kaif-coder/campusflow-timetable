import {
  Subject,
  Faculty,
  Batch,
  Room,
  TimeSlot,
  TimetableEntry,
  AttendanceRecord,
  NotificationItem,
  SettingsState
} from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-1',
    code: 'CS201',
    name: 'Data Structures & Algorithms',
    department: 'Computer Science',
    color: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      accent: 'bg-blue-600',
      badge: 'bg-blue-100 text-blue-800 border-blue-200'
    }
  },
  {
    id: 'sub-2',
    code: 'CS202',
    name: 'Database Management Systems',
    department: 'Information Tech',
    color: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-900',
      accent: 'bg-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  },
  {
    id: 'sub-3',
    code: 'CS203',
    name: 'Operating Systems',
    department: 'Information Tech',
    color: {
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      text: 'text-violet-900',
      accent: 'bg-violet-600',
      badge: 'bg-violet-100 text-violet-800 border-violet-200'
    }
  },
  {
    id: 'sub-4',
    code: 'CS204',
    name: 'Computer Networks',
    department: 'Computer Science',
    color: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
      accent: 'bg-amber-600',
      badge: 'bg-amber-100 text-amber-800 border-amber-200'
    }
  },
  {
    id: 'sub-5',
    code: 'MA201',
    name: 'Discrete Mathematics',
    department: 'Mathematics',
    color: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-900',
      accent: 'bg-rose-600',
      badge: 'bg-rose-100 text-rose-800 border-rose-200'
    }
  },
  {
    id: 'sub-6',
    code: 'CS205',
    name: 'Java Programming & Web Tech',
    department: 'Information Tech',
    color: {
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      text: 'text-cyan-900',
      accent: 'bg-cyan-600',
      badge: 'bg-cyan-100 text-cyan-800 border-cyan-200'
    }
  },
  {
    id: 'sub-7',
    code: 'CS206',
    name: 'Software Engineering & Agile',
    department: 'Computer Science',
    color: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      text: 'text-indigo-900',
      accent: 'bg-indigo-600',
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    }
  }
];

export const INITIAL_FACULTY: Faculty[] = [
  {
    id: 'fac-1',
    name: 'Dr. Arvind Sharma',
    title: 'Professor & Head',
    department: 'Computer Science',
    email: 'arvind.sharma@campusflow.edu',
    phone: '+91 98230 11201',
    subjects: ['Data Structures & Algorithms', 'Software Engineering & Agile'],
    classesToday: 3,
    pendingAttendance: 1,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'fac-2',
    name: 'Prof. Priya Menon',
    title: 'Associate Professor',
    department: 'Information Tech',
    email: 'priya.menon@campusflow.edu',
    phone: '+91 98450 22312',
    subjects: ['Database Management Systems', 'Java Programming & Web Tech'],
    classesToday: 2,
    pendingAttendance: 1,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'fac-3',
    name: 'Dr. Rajesh Kulkarni',
    title: 'Professor',
    department: 'Information Tech',
    email: 'rajesh.kulkarni@campusflow.edu',
    phone: '+91 98110 33456',
    subjects: ['Operating Systems', 'Computer Networks'],
    classesToday: 2,
    pendingAttendance: 0,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'fac-4',
    name: 'Prof. Ananya Iyer',
    title: 'Assistant Professor',
    department: 'Mathematics',
    email: 'ananya.iyer@campusflow.edu',
    phone: '+91 98770 44521',
    subjects: ['Discrete Mathematics'],
    classesToday: 1,
    pendingAttendance: 0,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'fac-5',
    name: 'Prof. Vikram Malhotra',
    title: 'Assistant Professor',
    department: 'Computer Science',
    email: 'vikram.malhotra@campusflow.edu',
    phone: '+91 98920 55678',
    subjects: ['Computer Networks', 'Data Structures & Algorithms'],
    classesToday: 2,
    pendingAttendance: 1,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
  },
  {
    id: 'fac-6',
    name: 'Prof. Sneha Patel',
    title: 'Assistant Professor',
    department: 'Information Tech',
    email: 'sneha.patel@campusflow.edu',
    phone: '+91 98330 66789',
    subjects: ['Java Programming & Web Tech', 'Database Management Systems'],
    classesToday: 1,
    pendingAttendance: 0,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80'
  }
];

export const INITIAL_BATCHES: Batch[] = [
  { id: 'b-1', name: 'IT-3B', department: 'Information Tech', semester: 5, section: 'B', studentCount: 64 },
  { id: 'b-2', name: 'CS-3A', department: 'Computer Science', semester: 5, section: 'A', studentCount: 60 },
  { id: 'b-3', name: 'CS-2B', department: 'Computer Science', semester: 3, section: 'B', studentCount: 58 },
  { id: 'b-4', name: 'IT-2A', department: 'Information Tech', semester: 3, section: 'A', studentCount: 62 }
];

export const INITIAL_ROOMS: Room[] = [
  { id: 'r-1', name: 'Hall B-204', block: 'Block B, 2nd Floor', capacity: 70, type: 'Classroom', isAvailable: true },
  { id: 'r-2', name: 'Lab 302', block: 'Computing Center, 3rd Floor', capacity: 65, type: 'Computer Lab', isAvailable: true },
  { id: 'r-3', name: 'Room C-105', block: 'Block C, 1st Floor', capacity: 75, type: 'Classroom', isAvailable: true },
  { id: 'r-4', name: 'Seminar Hall 1', block: 'Main Admin Block, Ground Floor', capacity: 120, type: 'Seminar Hall', isAvailable: true },
  { id: 'r-5', name: 'Lab 201', block: 'Networking Center, 2nd Floor', capacity: 60, type: 'Computer Lab', isAvailable: true },
  { id: 'r-6', name: 'Room A-101', block: 'Block A, 1st Floor', capacity: 65, type: 'Classroom', isAvailable: true }
];

export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  { id: 'slot-1', label: '09:00 - 10:00', startTime: '09:00', endTime: '10:00' },
  { id: 'slot-2', label: '10:00 - 11:00', startTime: '10:00', endTime: '11:00' },
  { id: 'slot-3', label: '11:00 - 12:00', startTime: '11:00', endTime: '12:00' },
  { id: 'slot-lunch', label: '12:00 - 13:00', startTime: '12:00', endTime: '13:00', isLunch: true },
  { id: 'slot-4', label: '13:00 - 14:00', startTime: '13:00', endTime: '14:00' },
  { id: 'slot-5', label: '14:00 - 15:00', startTime: '14:00', endTime: '15:00' },
  { id: 'slot-6', label: '15:00 - 16:00', startTime: '15:00', endTime: '16:00' }
];

export const INITIAL_TIMETABLE_ENTRIES: TimetableEntry[] = [
  // Monday
  {
    id: 'tt-mon-1',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    subjectId: 'sub-1',
    subjectName: 'Data Structures & Algorithms',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-2',
    roomName: 'Lab 302',
    scheduleType: 'regular',
    status: 'scheduled',
    notes: 'Practical lab on Binary Search Trees'
  },
  {
    id: 'tt-mon-2',
    day: 'Monday',
    startTime: '10:00',
    endTime: '11:00',
    subjectId: 'sub-2',
    subjectName: 'Database Management Systems',
    facultyId: 'fac-2',
    facultyName: 'Prof. Priya Menon',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-1',
    roomName: 'Hall B-204',
    scheduleType: 'regular',
    status: 'scheduled',
    notes: 'Relational algebra and SQL joins'
  },
  {
    id: 'tt-mon-3',
    day: 'Monday',
    startTime: '11:00',
    endTime: '12:00',
    subjectId: 'sub-5',
    subjectName: 'Discrete Mathematics',
    facultyId: 'fac-4',
    facultyName: 'Prof. Ananya Iyer',
    batchId: 'b-2',
    batchName: 'CS-3A',
    roomId: 'r-3',
    roomName: 'Room C-105',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-mon-4',
    day: 'Monday',
    startTime: '13:00',
    endTime: '14:00',
    subjectId: 'sub-3',
    subjectName: 'Operating Systems',
    facultyId: 'fac-3',
    facultyName: 'Dr. Rajesh Kulkarni',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-1',
    roomName: 'Hall B-204',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-mon-5',
    day: 'Monday',
    startTime: '14:00',
    endTime: '15:00',
    subjectId: 'sub-4',
    subjectName: 'Computer Networks',
    facultyId: 'fac-5',
    facultyName: 'Prof. Vikram Malhotra',
    batchId: 'b-2',
    batchName: 'CS-3A',
    roomId: 'r-5',
    roomName: 'Lab 201',
    scheduleType: 'regular',
    status: 'scheduled'
  },

  // Tuesday
  {
    id: 'tt-tue-1',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    subjectId: 'sub-3',
    subjectName: 'Operating Systems',
    facultyId: 'fac-3',
    facultyName: 'Dr. Rajesh Kulkarni',
    batchId: 'b-2',
    batchName: 'CS-3A',
    roomId: 'r-3',
    roomName: 'Room C-105',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-tue-2',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '11:00',
    subjectId: 'sub-1',
    subjectName: 'Data Structures & Algorithms',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-2',
    roomName: 'Lab 302',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-tue-3',
    day: 'Tuesday',
    startTime: '11:00',
    endTime: '12:00',
    subjectId: 'sub-6',
    subjectName: 'Java Programming & Web Tech',
    facultyId: 'fac-6',
    facultyName: 'Prof. Sneha Patel',
    batchId: 'b-3',
    batchName: 'CS-2B',
    roomId: 'r-2',
    roomName: 'Lab 302',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-tue-4',
    day: 'Tuesday',
    startTime: '13:00',
    endTime: '14:00',
    subjectId: 'sub-2',
    subjectName: 'Database Management Systems',
    facultyId: 'fac-2',
    facultyName: 'Prof. Priya Menon',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-1',
    roomName: 'Hall B-204',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-tue-5',
    day: 'Tuesday',
    startTime: '14:00',
    endTime: '15:00',
    subjectId: 'sub-7',
    subjectName: 'Software Engineering & Agile',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    batchId: 'b-2',
    batchName: 'CS-3A',
    roomId: 'r-4',
    roomName: 'Seminar Hall 1',
    scheduleType: 'regular',
    status: 'scheduled'
  },

  // Wednesday (Demonstrating a week-specific override for Week 8!)
  {
    id: 'tt-wed-1',
    day: 'Wednesday',
    startTime: '09:00',
    endTime: '10:00',
    subjectId: 'sub-4',
    subjectName: 'Computer Networks',
    facultyId: 'fac-5',
    facultyName: 'Prof. Vikram Malhotra',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-5',
    roomName: 'Lab 201',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-wed-2',
    day: 'Wednesday',
    startTime: '10:00',
    endTime: '11:00',
    subjectId: 'sub-7',
    subjectName: 'Software Engineering & Agile',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-4',
    roomName: 'Seminar Hall 1',
    scheduleType: 'override',
    overrideWeek: 8,
    overrideDate: '2026-10-28',
    status: 'scheduled',
    notes: 'Week 8 special Guest Session on Cloud Microservices Architecture'
  },
  {
    id: 'tt-wed-3',
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '12:00',
    subjectId: 'sub-5',
    subjectName: 'Discrete Mathematics',
    facultyId: 'fac-4',
    facultyName: 'Prof. Ananya Iyer',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-1',
    roomName: 'Hall B-204',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-wed-4',
    day: 'Wednesday',
    startTime: '13:00',
    endTime: '14:00',
    subjectId: 'sub-6',
    subjectName: 'Java Programming & Web Tech',
    facultyId: 'fac-2',
    facultyName: 'Prof. Priya Menon',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-2',
    roomName: 'Lab 302',
    scheduleType: 'regular',
    status: 'scheduled'
  },

  // Thursday
  {
    id: 'tt-thu-1',
    day: 'Thursday',
    startTime: '09:00',
    endTime: '10:00',
    subjectId: 'sub-1',
    subjectName: 'Data Structures & Algorithms',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    batchId: 'b-2',
    batchName: 'CS-3A',
    roomId: 'r-3',
    roomName: 'Room C-105',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-thu-2',
    day: 'Thursday',
    startTime: '10:00',
    endTime: '11:00',
    subjectId: 'sub-3',
    subjectName: 'Operating Systems',
    facultyId: 'fac-3',
    facultyName: 'Dr. Rajesh Kulkarni',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-1',
    roomName: 'Hall B-204',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-thu-3',
    day: 'Thursday',
    startTime: '11:00',
    endTime: '12:00',
    subjectId: 'sub-4',
    subjectName: 'Computer Networks',
    facultyId: 'fac-5',
    facultyName: 'Prof. Vikram Malhotra',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-5',
    roomName: 'Lab 201',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-thu-4',
    day: 'Thursday',
    startTime: '14:00',
    endTime: '15:00',
    subjectId: 'sub-2',
    subjectName: 'Database Management Systems',
    facultyId: 'fac-2',
    facultyName: 'Prof. Priya Menon',
    batchId: 'b-3',
    batchName: 'CS-2B',
    roomId: 'r-2',
    roomName: 'Lab 302',
    scheduleType: 'regular',
    status: 'scheduled'
  },

  // Friday
  {
    id: 'tt-fri-1',
    day: 'Friday',
    startTime: '09:00',
    endTime: '10:00',
    subjectId: 'sub-6',
    subjectName: 'Java Programming & Web Tech',
    facultyId: 'fac-2',
    facultyName: 'Prof. Priya Menon',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-2',
    roomName: 'Lab 302',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-fri-2',
    day: 'Friday',
    startTime: '10:00',
    endTime: '11:00',
    subjectId: 'sub-5',
    subjectName: 'Discrete Mathematics',
    facultyId: 'fac-4',
    facultyName: 'Prof. Ananya Iyer',
    batchId: 'b-4',
    batchName: 'IT-2A',
    roomId: 'r-6',
    roomName: 'Room A-101',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-fri-3',
    day: 'Friday',
    startTime: '11:00',
    endTime: '12:00',
    subjectId: 'sub-1',
    subjectName: 'Data Structures & Algorithms',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-1',
    roomName: 'Hall B-204',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-fri-4',
    day: 'Friday',
    startTime: '13:00',
    endTime: '14:00',
    subjectId: 'sub-3',
    subjectName: 'Operating Systems',
    facultyId: 'fac-3',
    facultyName: 'Dr. Rajesh Kulkarni',
    batchId: 'b-2',
    batchName: 'CS-3A',
    roomId: 'r-3',
    roomName: 'Room C-105',
    scheduleType: 'regular',
    status: 'scheduled'
  },

  // Saturday
  {
    id: 'tt-sat-1',
    day: 'Saturday',
    startTime: '09:00',
    endTime: '10:00',
    subjectId: 'sub-7',
    subjectName: 'Software Engineering & Agile',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    batchId: 'b-1',
    batchName: 'IT-3B',
    roomId: 'r-1',
    roomName: 'Hall B-204',
    scheduleType: 'regular',
    status: 'scheduled'
  },
  {
    id: 'tt-sat-2',
    day: 'Saturday',
    startTime: '10:00',
    endTime: '11:00',
    subjectId: 'sub-4',
    subjectName: 'Computer Networks',
    facultyId: 'fac-5',
    facultyName: 'Prof. Vikram Malhotra',
    batchId: 'b-2',
    batchName: 'CS-3A',
    roomId: 'r-5',
    roomName: 'Lab 201',
    scheduleType: 'regular',
    status: 'scheduled'
  }
];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'att-1',
    timetableEntryId: 'tt-tue-1',
    date: '2026-10-27',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:00',
    subjectName: 'Operating Systems',
    batchName: 'CS-3A',
    facultyId: 'fac-3',
    facultyName: 'Dr. Rajesh Kulkarni',
    roomName: 'Room C-105',
    status: 'Completed',
    markedAt: '2026-10-27 09:58 AM',
    submittedBy: 'Dr. Rajesh Kulkarni',
    remarks: 'Process scheduling algorithms covered. 56/60 students present.',
    presentCount: 56,
    totalStudents: 60
  },
  {
    id: 'att-2',
    timetableEntryId: 'tt-tue-2',
    date: '2026-10-27',
    day: 'Tuesday',
    startTime: '10:00',
    endTime: '11:00',
    subjectName: 'Data Structures & Algorithms',
    batchName: 'IT-3B',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    roomName: 'Lab 302',
    status: 'Pending',
    remarks: 'AVL Trees rebalancing demo'
  },
  {
    id: 'att-3',
    timetableEntryId: 'tt-tue-3',
    date: '2026-10-27',
    day: 'Tuesday',
    startTime: '11:00',
    endTime: '12:00',
    subjectName: 'Java Programming & Web Tech',
    batchName: 'CS-2B',
    facultyId: 'fac-6',
    facultyName: 'Prof. Sneha Patel',
    roomName: 'Lab 302',
    status: 'Completed',
    markedAt: '2026-10-27 11:55 AM',
    submittedBy: 'Prof. Sneha Patel',
    remarks: 'Servlet lifecycle and request dispatching. 54/58 students present.',
    presentCount: 54,
    totalStudents: 58
  },
  {
    id: 'att-4',
    timetableEntryId: 'tt-tue-4',
    date: '2026-10-27',
    day: 'Tuesday',
    startTime: '13:00',
    endTime: '14:00',
    subjectName: 'Database Management Systems',
    batchName: 'IT-3B',
    facultyId: 'fac-2',
    facultyName: 'Prof. Priya Menon',
    roomName: 'Hall B-204',
    status: 'Pending',
    remarks: 'Transaction ACID properties and 2PL concurrency'
  },
  {
    id: 'att-5',
    timetableEntryId: 'tt-tue-5',
    date: '2026-10-27',
    day: 'Tuesday',
    startTime: '14:00',
    endTime: '15:00',
    subjectName: 'Software Engineering & Agile',
    batchName: 'CS-3A',
    facultyId: 'fac-1',
    facultyName: 'Dr. Arvind Sharma',
    roomName: 'Seminar Hall 1',
    status: 'Pending',
    remarks: 'Sprint planning and user story estimations'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'class_reminder',
    title: 'Class Starting in 5 Minutes',
    message: 'Your Data Structures & Algorithms class with Batch IT-3B begins at 10:00 AM in Lab 302.',
    time: '09:55 AM',
    timestamp: '2026-10-27T09:55:00',
    read: false,
    channel: 'In-App',
    metadata: {
      facultyName: 'Dr. Arvind Sharma',
      subjectName: 'Data Structures & Algorithms',
      roomName: 'Lab 302',
      batchName: 'IT-3B',
      startTime: '10:00 AM'
    }
  },
  {
    id: 'notif-2',
    type: 'evening_attendance',
    title: 'Daily Attendance Reminder',
    message: 'You have 2 pending class attendance entries to submit today (Database Management Systems, Software Engineering).',
    time: 'Yesterday 05:30 PM',
    timestamp: '2026-10-26T17:30:00',
    read: false,
    channel: 'Email',
    metadata: {
      facultyName: 'Prof. Priya Menon',
      pendingCount: 2
    }
  },
  {
    id: 'notif-3',
    type: 'schedule_change',
    title: 'Room Shift Override Approved',
    message: 'Software Engineering (Wednesday 10:00 AM) shifted to Seminar Hall 1 for Batch IT-3B guest lecture.',
    time: 'Oct 26, 02:15 PM',
    timestamp: '2026-10-26T14:15:00',
    read: true,
    channel: 'WhatsApp',
    metadata: {
      subjectName: 'Software Engineering & Agile',
      roomName: 'Seminar Hall 1',
      batchName: 'IT-3B'
    }
  },
  {
    id: 'notif-4',
    type: 'class_reminder',
    title: 'Upcoming Lab Session in 5 Minutes',
    message: 'Operating Systems lab with Batch CS-3A begins at 09:00 AM in Room C-105.',
    time: '08:55 AM',
    timestamp: '2026-10-27T08:55:00',
    read: true,
    channel: 'In-App',
    metadata: {
      facultyName: 'Dr. Rajesh Kulkarni',
      subjectName: 'Operating Systems',
      roomName: 'Room C-105',
      batchName: 'CS-3A',
      startTime: '09:00 AM'
    }
  }
];

export const INITIAL_SETTINGS: SettingsState = {
  institutionName: 'Apex Institute of Technology & Engineering',
  academicYear: '2026 - 2027',
  semester: 'Fall Semester 2026 (Odd)',
  workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  defaultClassDuration: 60,
  dayStartTime: '09:00',
  dayEndTime: '16:00',
  enableFiveMinReminder: true,
  enableEveningAttendanceReminder: true,
  eveningReminderTime: '17:30',
  reminderChannel: 'WhatsApp'
};

export const RECENT_ACTIVITIES = [
  {
    id: 'act-1',
    user: 'Academic Dean Admin',
    action: 'Room reassignment override',
    detail: 'Shifted Software Engineering to Seminar Hall 1 for Wednesday 10:00 AM',
    time: '25 mins ago'
  },
  {
    id: 'act-2',
    user: 'Prof. Sneha Patel',
    action: 'Marked class session attendance',
    detail: 'Completed attendance for Java Programming (CS-2B, 54/58 present)',
    time: '50 mins ago'
  },
  {
    id: 'act-3',
    user: 'System Conflict Validator',
    action: 'Conflict prevented',
    detail: 'Blocked overlapping slot for Dr. Arvind Sharma on Tuesday 10:00 AM',
    time: '2 hours ago'
  },
  {
    id: 'act-4',
    user: 'Dr. Rajesh Kulkarni',
    action: 'Marked class session attendance',
    detail: 'Completed attendance for Operating Systems (CS-3A, 56/60 present)',
    time: '3 hours ago'
  }
];
