import React, { useState, useEffect } from 'react';
import { TimetableEntry, DayOfWeek, ScheduleConflict } from '../../types';
import { useApp } from '../../context/AppContext';
import { ConflictWarningModal } from './ConflictWarningModal';
import {
  X,
  PlusCircle,
  Calendar,
  Clock,
  BookOpen,
  User,
  Users,
  MapPin,
  Sparkles,
  AlertCircle,
  FileText
} from 'lucide-react';

interface ClassFormModalProps {
  isOpen: boolean;
  mode: 'add' | 'edit' | 'reschedule';
  initialData?: TimetableEntry | null;
  defaultDay?: DayOfWeek;
  defaultStartTime?: string;
  onClose: () => void;
}

export const ClassFormModal: React.FC<ClassFormModalProps> = ({
  isOpen,
  mode,
  initialData,
  defaultDay = 'Monday',
  defaultStartTime = '09:00',
  onClose,
}) => {
  const {
    subjects,
    faculty,
    batches,
    rooms,
    addClass,
    updateClass,
    activeWeek
  } = useApp();

  // Form states
  const [subjectId, setSubjectId] = useState<string>('');
  const [facultyId, setFacultyId] = useState<string>('');
  const [batchId, setBatchId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [day, setDay] = useState<DayOfWeek>(defaultDay);
  const [startTime, setStartTime] = useState<string>(defaultStartTime);
  const [endTime, setEndTime] = useState<string>('10:00');
  const [scheduleType, setScheduleType] = useState<'regular' | 'override'>('regular');
  const [notes, setNotes] = useState<string>('');

  // Validation & Conflict states
  const [validationError, setValidationError] = useState<string | null>(null);
  const [activeConflict, setActiveConflict] = useState<ScheduleConflict | null>(null);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState<boolean>(false);

  // Time options
  const timeOptions = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
  ];

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Initialize form when opened or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData && (mode === 'edit' || mode === 'reschedule')) {
        setSubjectId(initialData.subjectId);
        setFacultyId(initialData.facultyId);
        setBatchId(initialData.batchId);
        setRoomId(initialData.roomId);
        setDay(initialData.day);
        setStartTime(initialData.startTime);
        setEndTime(initialData.endTime);
        setScheduleType(mode === 'reschedule' ? 'override' : initialData.scheduleType);
        setNotes(initialData.notes || '');
      } else {
        // Defaults for add mode
        setSubjectId(subjects[0]?.id || '');
        setFacultyId(faculty[0]?.id || '');
        setBatchId(batches[0]?.id || '');
        setRoomId(rooms[0]?.id || '');
        setDay(defaultDay);
        setStartTime(defaultStartTime);

        // Compute sensible end time (+1 hour)
        const sHour = parseInt(defaultStartTime.split(':')[0], 10);
        const nextHour = (sHour + 1).toString().padStart(2, '0') + ':00';
        setEndTime(nextHour);

        setScheduleType('regular');
        setNotes('');
      }
      setValidationError(null);
      setActiveConflict(null);
      setIsConflictModalOpen(false);
    }
  }, [isOpen, initialData, mode, defaultDay, defaultStartTime, subjects, faculty, batches, rooms]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation 1: Required selections
    if (!subjectId || !facultyId || !batchId || !roomId || !day || !startTime || !endTime) {
      setValidationError('Please fill in all required scheduling fields.');
      return;
    }

    // Validation 2: End time must be strictly after start time
    if (startTime >= endTime) {
      setValidationError('End time must be later than start time.');
      return;
    }

    const selectedSubject = subjects.find((s) => s.id === subjectId);
    const selectedFaculty = faculty.find((f) => f.id === facultyId);
    const selectedBatch = batches.find((b) => b.id === batchId);
    const selectedRoom = rooms.find((r) => r.id === roomId);

    const payload = {
      subjectId,
      subjectName: selectedSubject?.name || 'Subject',
      facultyId,
      facultyName: selectedFaculty?.name || 'Faculty',
      batchId,
      batchName: selectedBatch?.name || 'Batch',
      roomId,
      roomName: selectedRoom?.name || 'Room',
      day,
      startTime,
      endTime,
      scheduleType,
      overrideWeek: scheduleType === 'override' ? activeWeek : undefined,
      notes: notes.trim() || undefined,
      status: 'scheduled' as const,
    };

    if (mode === 'add') {
      const result = addClass(payload);
      if (!result.success && result.conflict) {
        setActiveConflict(result.conflict);
        setIsConflictModalOpen(true);
        return;
      }
    } else if (initialData && (mode === 'edit' || mode === 'reschedule')) {
      const result = updateClass(initialData.id, payload);
      if (!result.success && result.conflict) {
        setActiveConflict(result.conflict);
        setIsConflictModalOpen(true);
        return;
      }
    }

    onClose();
  };

  const getModalTitle = () => {
    if (mode === 'add') return 'Schedule New Class';
    if (mode === 'reschedule') return 'Reschedule Class Session';
    return 'Edit Class Details';
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
        <div
          className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{getModalTitle()}</h3>
                <p className="text-xs text-slate-500">
                  {mode === 'reschedule'
                    ? 'Shift slot or venue without breaking master recurring timetable.'
                    : 'Configure subject, teacher, classroom, and timing.'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Inline Validation Error */}
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Subject Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Subject / Course *</span>
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.code} — {sub.name} ({sub.department})
                  </option>
                ))}
              </select>
            </div>

            {/* Faculty & Batch in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Faculty Member *</span>
                </label>
                <select
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                >
                  {faculty.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Student Batch / Section *</span>
                </label>
                <select
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.studentCount} students)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room / Venue */}
            <div>
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Room / Lecture Hall *</span>
              </label>
              <select
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.type} (Cap: {r.capacity}, {r.block})
                  </option>
                ))}
              </select>
            </div>

            {/* Day & Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Day of Week *</span>
                </label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value as DayOfWeek)}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Start Time *</span>
                </label>
                <select
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-mono"
                >
                  {timeOptions.slice(0, -1).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" />
                  <span>End Time *</span>
                </label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-mono"
                >
                  {timeOptions.slice(1).map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Schedule Type Selection (Requirement: Flexible Week-Specific Overrides) */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Scope of Timetable Change</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    scheduleType === 'regular'
                      ? 'border-indigo-500 bg-indigo-50/40 text-indigo-950 ring-1 ring-indigo-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="scheduleType"
                    checked={scheduleType === 'regular'}
                    onChange={() => setScheduleType('regular')}
                    className="mt-1 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-bold block">Regular Master Timetable</span>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Recurs every week across the entire semester.
                    </span>
                  </div>
                </label>

                <label
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    scheduleType === 'override'
                      ? 'border-purple-500 bg-purple-50/40 text-purple-950 ring-1 ring-purple-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="scheduleType"
                    checked={scheduleType === 'override'}
                    onChange={() => setScheduleType('override')}
                    className="mt-1 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold block">Apply to Week {activeWeek} Only</span>
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded-xs bg-purple-100 text-purple-700">
                        Override
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                      Temporary change; does not alter master schedule.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5 mb-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Session Notes / Remarks (Optional)</span>
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Lab demonstration, guest lecture, substitute teacher..."
                className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            {/* Conflict validation note */}
            <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Real-time conflict verification will check for overlapping faculty, room, and batch schedules upon saving.</span>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                {mode === 'add' ? 'Schedule Class' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Schedule Conflict Warning Modal if overlap occurs */}
      <ConflictWarningModal
        isOpen={isConflictModalOpen}
        conflict={activeConflict}
        onReturnToEdit={() => setIsConflictModalOpen(false)}
        onCancel={() => {
          setIsConflictModalOpen(false);
          onClose();
        }}
      />
    </>
  );
};
