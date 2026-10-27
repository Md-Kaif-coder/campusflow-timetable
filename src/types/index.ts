export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export interface SubjectColor {
  bg: string;
  border: string;
  text: string;
  accent: string;
  badge: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  color: SubjectColor;
}

export interface Faculty {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  subjects: string[]; // Subject IDs or names
  classesToday: number;
  pendingAttendance: number;
  status: 'Active' | 'On Leave';
  avatar?: string;
}

export interface Batch {
  id: string;
  name: string;
  department: string;
  semester: number;
  section: string;
  studentCount: number;
}

export interface Room {
  id: string;
  name: string;
  block: string;
  capacity: number;
  type: 'Lecture Hall' | 'Computer Lab' | 'Seminar Hall' | 'Classroom';
  isAvailable?: boolean;
}

export interface TimeSlot {
  id: string;
  label: string;
  startTime: string; // "09:00"
  endTime: string;   // "10:00"
  isLunch?: boolean;
}

export interface TimetableEntry {
  id: string;
  day: DayOfWeek;
  startTime: string; // "09:00"
  endTime: string;   // "10:00"
  subjectId: string;
  subjectName: string;
  facultyId: string;
  facultyName: string;
  batchId: string;
  batchName: string;
  roomId: string;
  roomName: string;
  scheduleType: 'regular' | 'override';
  overrideWeek?: number; // e.g. Week 8
  overrideDate?: string; // "2026-10-27"
  notes?: string;
  status: 'scheduled' | 'rescheduled' | 'cancelled';
}

export interface AttendanceRecord {
  id: string;
  timetableEntryId: string;
  date: string; // YYYY-MM-DD
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  subjectName: string;
  batchName: string;
  facultyId: string;
  facultyName: string;
  roomName: string;
  status: 'Pending' | 'Completed';
  markedAt?: string;
  submittedBy?: string;
  remarks?: string;
  presentCount?: number;
  totalStudents?: number;
}

export interface NotificationItem {
  id: string;
  type: 'class_reminder' | 'evening_attendance' | 'schedule_change' | 'conflict_alert';
  title: string;
  message: string;
  time: string;
  timestamp: string;
  read: boolean;
  channel: 'In-App' | 'Email' | 'SMS' | 'WhatsApp';
  metadata?: {
    facultyName?: string;
    subjectName?: string;
    roomName?: string;
    batchName?: string;
    startTime?: string;
    pendingCount?: number;
  };
}

export interface SettingsState {
  institutionName: string;
  academicYear: string;
  semester: string;
  workingDays: DayOfWeek[];
  defaultClassDuration: number; // in minutes
  dayStartTime: string;
  dayEndTime: string;
  enableFiveMinReminder: boolean;
  enableEveningAttendanceReminder: boolean;
  eveningReminderTime: string;
  reminderChannel: 'Email' | 'SMS' | 'WhatsApp' | 'In-App';
}

export type NavPage = 'overview' | 'timetable' | 'faculty' | 'attendance' | 'notifications' | 'settings';

export interface ScheduleConflict {
  type: 'faculty' | 'room' | 'batch';
  conflictWith: TimetableEntry;
  description: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
