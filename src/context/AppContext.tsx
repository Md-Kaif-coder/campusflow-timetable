import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TimetableEntry,
  Faculty,
  Batch,
  Room,
  Subject,
  AttendanceRecord,
  NotificationItem,
  SettingsState,
  NavPage,
  ScheduleConflict,
  ToastMessage,
  DayOfWeek
} from '../types';
import {
  INITIAL_SUBJECTS,
  INITIAL_FACULTY,
  INITIAL_BATCHES,
  INITIAL_ROOMS,
  INITIAL_TIMETABLE_ENTRIES,
  INITIAL_ATTENDANCE_RECORDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SETTINGS
} from '../data/mockData';

interface FilterState {
  facultyId: string;
  batchId: string;
  roomId: string;
  searchQuery: string;
}

interface AppContextType {
  activePage: NavPage;
  setActivePage: (page: NavPage) => void;
  activeWeek: number;
  setActiveWeek: (week: number) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  viewMode: 'week' | 'day';
  setViewMode: (mode: 'week' | 'day') => void;
  selectedDay: DayOfWeek;
  setSelectedDay: (day: DayOfWeek) => void;

  // Data
  subjects: Subject[];
  faculty: Faculty[];
  batches: Batch[];
  rooms: Room[];
  timetable: TimetableEntry[];
  attendance: AttendanceRecord[];
  notifications: NotificationItem[];
  settings: SettingsState;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Timetable Operations
  checkConflict: (
    candidate: {
      id?: string;
      day: DayOfWeek;
      startTime: string;
      endTime: string;
      facultyId: string;
      roomId: string;
      batchId: string;
      scheduleType?: 'regular' | 'override';
      overrideWeek?: number;
    },
    excludeId?: string
  ) => ScheduleConflict | null;
  addClass: (entry: Omit<TimetableEntry, 'id'>) => { success: boolean; conflict?: ScheduleConflict };
  updateClass: (id: string, entry: Partial<TimetableEntry>) => { success: boolean; conflict?: ScheduleConflict };
  cancelClass: (id: string) => boolean;

  // Faculty Operations
  addFaculty: (newFaculty: Omit<Faculty, 'id' | 'classesToday' | 'pendingAttendance'>) => boolean;

  // Attendance Operations
  markAttendance: (id: string, remarks?: string, presentCount?: number) => boolean;

  // Notifications & Settings
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  resetDemoData: () => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Demo Helpers
  triggerTestConflict: (conflictType: 'faculty' | 'room' | 'batch') => ScheduleConflict | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  TIMETABLE: 'campusflow_timetable_v1',
  FACULTY: 'campusflow_faculty_v1',
  ATTENDANCE: 'campusflow_attendance_v1',
  NOTIFICATIONS: 'campusflow_notifications_v1',
  SETTINGS: 'campusflow_settings_v1',
};

// Helper: convert time string "09:30" to minutes from midnight
const timeToMinutes = (timeStr: string): number => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
};

// Helper: check interval overlap
const doIntervalsOverlap = (startA: string, endA: string, startB: string, endB: string): boolean => {
  const aStart = timeToMinutes(startA);
  const aEnd = timeToMinutes(endA);
  const bStart = timeToMinutes(startB);
  const bEnd = timeToMinutes(endB);
  return Math.max(aStart, bStart) < Math.min(aEnd, bEnd);
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<NavPage>('overview');
  const [activeWeek, setActiveWeek] = useState<number>(8); // Academic Week 8
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-27');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Tuesday');
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  const [subjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [batches] = useState<Batch[]>(INITIAL_BATCHES);
  const [rooms] = useState<Room[]>(INITIAL_ROOMS);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    facultyId: 'all',
    batchId: 'all',
    roomId: 'all',
    searchQuery: '',
  });

  const resetFilters = () => {
    setFilters({
      facultyId: 'all',
      batchId: 'all',
      roomId: 'all',
      searchQuery: '',
    });
  };

  // State with LocalStorage initialization
  const [timetable, setTimetable] = useState<TimetableEntry[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.TIMETABLE);
      return saved ? JSON.parse(saved) : INITIAL_TIMETABLE_ENTRIES;
    } catch {
      return INITIAL_TIMETABLE_ENTRIES;
    }
  });

  const [faculty, setFaculty] = useState<Faculty[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.FACULTY);
      return saved ? JSON.parse(saved) : INITIAL_FACULTY;
    } catch {
      return INITIAL_FACULTY;
    }
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.ATTENDANCE);
      return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_RECORDS;
    } catch {
      return INITIAL_ATTENDANCE_RECORDS;
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [settings, setSettings] = useState<SettingsState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TIMETABLE, JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FACULTY, JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Conflict Detection Engine
  const checkConflict = (
    candidate: {
      id?: string;
      day: DayOfWeek;
      startTime: string;
      endTime: string;
      facultyId: string;
      roomId: string;
      batchId: string;
      scheduleType?: 'regular' | 'override';
      overrideWeek?: number;
    },
    excludeId?: string
  ): ScheduleConflict | null => {
    // Look for active classes on the same day
    for (const entry of timetable) {
      if (entry.status === 'cancelled') continue;
      if (excludeId && entry.id === excludeId) continue;
      if (candidate.id && entry.id === candidate.id) continue;

      // Day must match
      if (entry.day !== candidate.day) continue;

      // If one is an override for a different week, they do not collide
      if (candidate.scheduleType === 'override' && entry.scheduleType === 'override') {
        if (candidate.overrideWeek && entry.overrideWeek && candidate.overrideWeek !== entry.overrideWeek) {
          continue;
        }
      }

      // Check time overlap
      const overlaps = doIntervalsOverlap(candidate.startTime, candidate.endTime, entry.startTime, entry.endTime);
      if (!overlaps) continue;

      // 1. Faculty Conflict Check
      if (candidate.facultyId === entry.facultyId) {
        return {
          type: 'faculty',
          conflictWith: entry,
          description: `${entry.facultyName} is already assigned to "${entry.subjectName}" (${entry.batchName}) in ${entry.roomName} from ${entry.startTime} to ${entry.endTime}.`
        };
      }

      // 2. Room Conflict Check
      if (candidate.roomId === entry.roomId) {
        return {
          type: 'room',
          conflictWith: entry,
          description: `Room ${entry.roomName} is already booked for "${entry.subjectName}" (${entry.batchName}) by ${entry.facultyName} from ${entry.startTime} to ${entry.endTime}.`
        };
      }

      // 3. Batch Conflict Check
      if (candidate.batchId === entry.batchId) {
        return {
          type: 'batch',
          conflictWith: entry,
          description: `Batch ${entry.batchName} is already scheduled for "${entry.subjectName}" in ${entry.roomName} from ${entry.startTime} to ${entry.endTime}.`
        };
      }
    }

    return null;
  };

  // Add Class
  const addClass = (entry: Omit<TimetableEntry, 'id'>): { success: boolean; conflict?: ScheduleConflict } => {
    const conflict = checkConflict(entry);
    if (conflict) {
      return { success: false, conflict };
    }

    const newId = 'tt-' + Date.now();
    const newEntry: TimetableEntry = {
      ...entry,
      id: newId
    };

    setTimetable((prev) => [...prev, newEntry]);
    addToast('success', 'Class Scheduled', `Successfully scheduled ${entry.subjectName} for ${entry.batchName}.`);
    return { success: true };
  };

  // Update Class
  const updateClass = (id: string, entry: Partial<TimetableEntry>): { success: boolean; conflict?: ScheduleConflict } => {
    const existing = timetable.find((e) => e.id === id);
    if (!existing) return { success: false };

    const merged = { ...existing, ...entry };
    const conflict = checkConflict(merged, id);
    if (conflict) {
      return { success: false, conflict };
    }

    setTimetable((prev) => prev.map((item) => (item.id === id ? merged : item)));
    addToast('success', 'Class Updated', `Schedule updated for ${merged.subjectName}.`);
    return { success: true };
  };

  // Cancel Class
  const cancelClass = (id: string): boolean => {
    const existing = timetable.find((e) => e.id === id);
    if (!existing) return false;

    setTimetable((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'cancelled' as const } : item))
    );
    addToast('info', 'Class Cancelled', `${existing.subjectName} on ${existing.day} has been removed from the active schedule.`);
    return true;
  };

  // Add Faculty
  const addFaculty = (newFaculty: Omit<Faculty, 'id' | 'classesToday' | 'pendingAttendance'>): boolean => {
    const id = 'fac-' + Date.now();
    const created: Faculty = {
      ...newFaculty,
      id,
      classesToday: 0,
      pendingAttendance: 0,
      status: 'Active',
      avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80`
    };

    setFaculty((prev) => [created, ...prev]);
    addToast('success', 'Faculty Added', `${created.name} was successfully registered.`);
    return true;
  };

  // Mark Attendance
  const markAttendance = (id: string, remarks?: string, presentCount?: number): boolean => {
    const record = attendance.find((a) => a.id === id);
    if (!record) return false;

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const markedAt = `${record.date} ${timeFormatted}`;

    setAttendance((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'Completed',
              markedAt,
              submittedBy: a.facultyName,
              remarks: remarks || a.remarks || 'Attendance submitted via faculty portal.',
              presentCount: presentCount ?? a.presentCount ?? 58
            }
          : a
      )
    );

    // Update faculty pending count
    setFaculty((prev) =>
      prev.map((f) => {
        if (f.id === record.facultyId && f.pendingAttendance > 0) {
          return { ...f, pendingAttendance: f.pendingAttendance - 1 };
        }
        return f;
      })
    );

    addToast('success', 'Attendance Marked', `Attendance for ${record.subjectName} (${record.batchName}) marked as completed.`);
    return true;
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('info', 'Notifications Updated', 'All notifications marked as read.');
  };

  // Settings
  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('success', 'Settings Saved', 'System configuration has been updated.');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setTimetable(INITIAL_TIMETABLE_ENTRIES);
    setFaculty(INITIAL_FACULTY);
    setAttendance(INITIAL_ATTENDANCE_RECORDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSettings(INITIAL_SETTINGS);
    setActiveWeek(8);
    setSelectedDate('2026-10-27');
    setSelectedDay('Tuesday');
    resetFilters();

    localStorage.removeItem(LOCAL_STORAGE_KEYS.TIMETABLE);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.FACULTY);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ATTENDANCE);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SETTINGS);

    addToast('info', 'Demo Data Reset', 'Original prototype records restored successfully.');
  };

  // Trigger test conflict for testing/presentation
  const triggerTestConflict = (type: 'faculty' | 'room' | 'batch'): ScheduleConflict | null => {
    const existing = timetable.find((t) => t.day === 'Monday' && t.startTime === '09:00' && t.status !== 'cancelled');
    if (!existing) return null;

    let candidate;
    if (type === 'room') {
      candidate = {
        day: existing.day,
        startTime: existing.startTime,
        endTime: existing.endTime,
        facultyId: 'fac-2', // different faculty
        roomId: existing.roomId, // SAME ROOM!
        batchId: 'b-2' // different batch
      };
    } else if (type === 'faculty') {
      candidate = {
        day: existing.day,
        startTime: existing.startTime,
        endTime: existing.endTime,
        facultyId: existing.facultyId, // SAME FACULTY!
        roomId: 'r-3', // different room
        batchId: 'b-3' // different batch
      };
    } else {
      candidate = {
        day: existing.day,
        startTime: existing.startTime,
        endTime: existing.endTime,
        facultyId: 'fac-5', // different faculty
        roomId: 'r-4', // different room
        batchId: existing.batchId // SAME BATCH!
      };
    }

    return checkConflict(candidate);
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        activeWeek,
        setActiveWeek,
        selectedDate,
        setSelectedDate,
        viewMode,
        setViewMode,
        selectedDay,
        setSelectedDay,
        subjects,
        faculty,
        batches,
        rooms,
        timetable,
        attendance,
        notifications,
        settings,
        filters,
        setFilters,
        resetFilters,
        checkConflict,
        addClass,
        updateClass,
        cancelClass,
        addFaculty,
        markAttendance,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        updateSettings,
        resetDemoData,
        toasts,
        addToast,
        removeToast,
        triggerTestConflict,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
