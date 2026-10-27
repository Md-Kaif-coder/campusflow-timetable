import React from 'react';
import { ScheduleConflict } from '../../types';
import { AlertTriangle, Clock, MapPin, User, Users, X, ArrowLeft } from 'lucide-react';

interface ConflictWarningModalProps {
  isOpen: boolean;
  conflict: ScheduleConflict | null;
  onReturnToEdit: () => void;
  onCancel: () => void;
}

export const ConflictWarningModal: React.FC<ConflictWarningModalProps> = ({
  isOpen,
  conflict,
  onReturnToEdit,
  onCancel,
}) => {
  if (!isOpen || !conflict) return null;

  const getConflictBadge = () => {
    switch (conflict.type) {
      case 'faculty':
        return { label: 'Teacher Overlap Conflict', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'room':
        return { label: 'Room Double-Booking Conflict', color: 'bg-rose-100 text-rose-800 border-rose-200' };
      case 'batch':
        return { label: 'Student Batch Schedule Conflict', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    }
  };

  const badge = getConflictBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-200"
        role="alertdialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 bg-rose-50/70 border-b border-rose-100 flex items-start gap-4">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-xl shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badge.color}`}>
                {badge.label}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">Schedule Collision Detected</h3>
            <p className="mt-1 text-xs text-rose-900 leading-relaxed font-medium">
              CampusFlow prevents scheduling overlaps to maintain timetable integrity.
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conflict Details Body */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800">
            <p className="font-semibold text-slate-900 mb-2">Conflict Cause:</p>
            <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/80 font-mono text-xs text-rose-950 font-medium">
              "{conflict.description}"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2.5">
              Conflicting Timetable Entry
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center justify-between font-semibold text-slate-900 pb-1 border-b border-slate-200">
                <span>{conflict.conflictWith.subjectName}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-slate-200 text-slate-800">
                  {conflict.conflictWith.day}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{conflict.conflictWith.startTime} - {conflict.conflictWith.endTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{conflict.conflictWith.facultyName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{conflict.conflictWith.roomName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{conflict.conflictWith.batchName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-amber-50/70 p-3 rounded-lg border border-amber-200/80">
            <span className="font-semibold text-amber-900">Recommended Resolution:</span> Please adjust the time slot, pick a different lecture room, or assign an available faculty member.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
          >
            Discard Changes
          </button>
          <button
            type="button"
            onClick={onReturnToEdit}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Details & Fix</span>
          </button>
        </div>
      </div>
    </div>
  );
};
