import React, { useState } from 'react';
import { TimetableEntry } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Clock,
  MapPin,
  User,
  Users,
  Calendar,
  Sparkles,
  Edit3,
  CalendarClock,
  Trash2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { ConfirmationDialog } from '../common/ConfirmationDialog';

interface ClassDetailsDrawerProps {
  entry: TimetableEntry | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (entry: TimetableEntry) => void;
  onReschedule: (entry: TimetableEntry) => void;
}

export const ClassDetailsDrawer: React.FC<ClassDetailsDrawerProps> = ({
  entry,
  isOpen,
  onClose,
  onEdit,
  onReschedule,
}) => {
  const { cancelClass, subjects, rooms, batches, faculty } = useApp();
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  if (!isOpen || !entry) return null;

  const subject = subjects.find((s) => s.id === entry.subjectId);
  const room = rooms.find((r) => r.id === entry.roomId);
  const batch = batches.find((b) => b.id === entry.batchId);
  const teacher = faculty.find((f) => f.id === entry.facultyId);

  const isOverride = entry.scheduleType === 'override';
  const isCancelled = entry.status === 'cancelled';

  const handleConfirmCancel = () => {
    cancelClass(entry.id);
    setIsCancelConfirmOpen(false);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                {subject?.code || 'CRS200'}
              </span>
              {isOverride ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 border border-purple-200">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  Week {entry.overrideWeek || 8} Override
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                  Regular Timetable
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              {entry.subjectName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status banner if cancelled */}
          {isCancelled && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>This class session is marked as cancelled for the selected week.</span>
            </div>
          )}

          {/* Time & Day Card */}
          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Day & Time</span>
                <span className="text-sm font-bold text-slate-900">{entry.day}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 text-sm font-bold text-indigo-900 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs font-mono">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{entry.startTime} – {entry.endTime}</span>
              </div>
            </div>
          </div>

          {/* Assignment Details Grid */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Session Allocation
            </h3>

            {/* Faculty */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
                <User className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-slate-400 font-medium block">Faculty In-Charge</span>
                <span className="text-sm font-semibold text-slate-900 block truncate">{entry.facultyName}</span>
                <span className="text-xs text-slate-500">{teacher?.department || 'Department of Engineering'}</span>
              </div>
            </div>

            {/* Student Batch */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-slate-400 font-medium block">Student Batch</span>
                <span className="text-sm font-semibold text-slate-900 block">{entry.batchName}</span>
                <span className="text-xs text-slate-500">
                  {batch ? `${batch.department} • ${batch.studentCount} students enrolled` : 'Class Batch'}
                </span>
              </div>
            </div>

            {/* Classroom / Location */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
                <MapPin className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-slate-400 font-medium block">Venue & Facilities</span>
                <span className="text-sm font-semibold text-slate-900 block">{entry.roomName}</span>
                <span className="text-xs text-slate-500">
                  {room ? `${room.block} • Capacity: ${room.capacity} seats` : 'Main Campus'}
                </span>
              </div>
            </div>
          </div>

          {/* Schedule Scope Explainer */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <Info className="w-4 h-4 text-indigo-500" />
              <span>Schedule Propagation Rule</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {isOverride
                ? 'This entry is a temporary override for this specific date/week. It does NOT overwrite the master timetable recurrence.'
                : 'This is a regular recurring timetable slot. Edits can be applied as a single-week override or permanently.'}
            </p>
          </div>

          {/* Session Notes if any */}
          {entry.notes && (
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
              <span className="font-semibold block mb-1">Session Remarks:</span>
              <p className="italic">"{entry.notes}"</p>
            </div>
          )}
        </div>

        {/* Drawer Actions */}
        <div className="p-5 border-t border-slate-200/80 bg-slate-50 flex items-center justify-between gap-2">
          {!isCancelled ? (
            <>
              <button
                type="button"
                onClick={() => setIsCancelConfirmOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Cancel Class</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onReschedule(entry);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <CalendarClock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reschedule</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onEdit(entry);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>
              </div>
            </>
          ) : (
            <div className="w-full text-center py-1">
              <span className="text-xs text-slate-500">This class session is cancelled.</span>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation modal before cancellation */}
      <ConfirmationDialog
        isOpen={isCancelConfirmOpen}
        title="Cancel This Class Session?"
        message={`Are you sure you want to cancel ${entry.subjectName} for ${entry.batchName} on ${entry.day} (${entry.startTime} - ${entry.endTime})? The slot will be marked as cancelled in the timetable.`}
        confirmText="Confirm Cancellation"
        cancelText="Keep Class"
        isDestructive={true}
        onConfirm={handleConfirmCancel}
        onCancel={() => setIsCancelConfirmOpen(false)}
      />
    </>
  );
};
