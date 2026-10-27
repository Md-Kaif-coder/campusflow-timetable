import React, { useState } from 'react';
import { AttendanceRecord } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckSquare,
  Clock,
  User,
  MapPin,
  Calendar
} from 'lucide-react';

interface MarkAttendanceModalProps {
  record: AttendanceRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MarkAttendanceModal: React.FC<MarkAttendanceModalProps> = ({
  record,
  isOpen,
  onClose,
}) => {
  const { markAttendance } = useApp();

  const [remarks, setRemarks] = useState('');
  const [presentCount, setPresentCount] = useState<number>(58);

  if (!isOpen || !record) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markAttendance(
      record.id,
      remarks.trim() || 'Session conducted according to syllabus. Attendance verified.',
      presentCount
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Mark Class Attendance</h3>
              <p className="text-xs text-slate-500">Record instructor completion for scheduled lecture session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Class Summary Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900 text-sm">
              <span>{record.subjectName}</span>
              <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                {record.batchName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{record.startTime} - {record.endTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{record.day}, {record.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>{record.facultyName}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{record.roomName}</span>
              </div>
            </div>
          </div>

          {/* Student Headcount */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Students Present in Session
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={0}
                max={120}
                value={presentCount}
                onChange={(e) => setPresentCount(Number(e.target.value))}
                className="w-32 px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-bold"
              />
              <span className="text-xs text-slate-500">
                out of {record.totalStudents || 60} enrolled students in batch
              </span>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Lecture Topic & Session Remarks (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Completed module 3 discussion on Dijkstra's algorithm. Normal laboratory conductance."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none resize-none"
            />
          </div>

          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
            <span className="font-semibold">Workflow Clarification:</span> This records the teacher's session verification for administrative compliance and clears the pending attendance reminder queue.
          </div>

          {/* Footer Actions */}
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
              className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              Submit Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
