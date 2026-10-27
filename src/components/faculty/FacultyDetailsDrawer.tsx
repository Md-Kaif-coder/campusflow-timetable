import React from 'react';
import { Faculty } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Mail,
  Phone,
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

interface FacultyDetailsDrawerProps {
  faculty: Faculty | null;
  isOpen: boolean;
  onClose: () => void;
  onViewInTimetable: (facultyId: string) => void;
}

export const FacultyDetailsDrawer: React.FC<FacultyDetailsDrawerProps> = ({
  faculty,
  isOpen,
  onClose,
  onViewInTimetable,
}) => {
  const { timetable, activeWeek } = useApp();

  if (!isOpen || !faculty) return null;

  // Find all classes assigned to this faculty
  const facultyClasses = timetable.filter(
    (t) =>
      t.facultyId === faculty.id &&
      t.status !== 'cancelled' &&
      (t.scheduleType === 'regular' || t.overrideWeek === activeWeek)
  );

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/60">
          <div className="flex items-center gap-3.5">
            <img
              src={faculty.avatar}
              alt={faculty.name}
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-2xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {faculty.name}
                </h3>
                <StatusBadge status={faculty.status} />
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{faculty.title}</p>
              <p className="text-xs font-semibold text-indigo-600">{faculty.department}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Contact Details */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{faculty.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{faculty.phone}</span>
            </div>
          </div>

          {/* Workload Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[11px] font-medium text-slate-500 block">Assigned Sessions</span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">
                {facultyClasses.length} hrs / week
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-[11px] font-medium text-slate-500 block">Pending Attendance</span>
              <span className={`text-xl font-bold mt-1 block ${faculty.pendingAttendance > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {faculty.pendingAttendance} classes
              </span>
            </div>
          </div>

          {/* Subjects Taught */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Teaching Subjects
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {faculty.subjects.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Assigned Classes Weekly Schedule */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Weekly Class Schedule
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">Week {activeWeek}</span>
            </div>

            {facultyClasses.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl border border-slate-200">
                No active classes currently allocated in timetable.
              </p>
            ) : (
              <div className="space-y-2.5">
                {facultyClasses.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{item.subjectName}</span>
                      <span className="font-mono text-[11px] text-indigo-600">{item.day}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <div className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item.startTime} - {item.endTime}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{item.roomName}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>{item.batchName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              onViewInTimetable(faculty.id);
              onClose();
            }}
            className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
          >
            Filter Timetable for {faculty.name}
          </button>
        </div>
      </div>
    </>
  );
};
