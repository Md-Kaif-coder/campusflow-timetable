import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AttendanceRecord, Faculty, Batch } from '../types';
import { MarkAttendanceModal } from '../components/attendance/MarkAttendanceModal';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { attendance, faculty, batches } = useApp();

  const [selectedDate, setSelectedDate] = useState('2026-10-27');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const [activeRecord, setActiveRecord] = useState<AttendanceRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter attendance records
  const filteredRecords = attendance.filter((rec: AttendanceRecord) => {
    if (selectedDate && rec.date !== selectedDate) return false;
    if (facultyFilter !== 'all' && rec.facultyId !== facultyFilter) return false;
    if (batchFilter !== 'all' && rec.batchName !== batchFilter) return false;
    if (statusFilter !== 'All' && rec.status !== statusFilter) return false;
    return true;
  });

  const totalClasses = filteredRecords.length;
  const completedCount = filteredRecords.filter((r: AttendanceRecord) => r.status === 'Completed').length;
  const pendingCount = filteredRecords.filter((r: AttendanceRecord) => r.status === 'Pending').length;

  const handleOpenMarkModal = (rec: AttendanceRecord) => {
    setActiveRecord(rec);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-5">
      {/* Scope Disclaimer Banner (as explicitly instructed in prompt) */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs text-indigo-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
        <div className="space-y-0.5">
          <p className="font-bold text-indigo-900">
            Faculty Class-Attendance Completion Workflow
          </p>
          <p className="text-indigo-800/90 leading-relaxed text-[11px]">
            This interface tracks whether faculty members have formally completed and submitted attendance for their assigned class sessions today. It is streamlined for administration and does not burden teachers with complex biometric or student-level roll calls.
          </p>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Today's Class Sessions</span>
            <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalClasses}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Completed Submissions</span>
            <span className="text-2xl font-bold text-emerald-600 mt-1 block">{completedCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Pending Submissions</span>
            <span className="text-2xl font-bold text-amber-600 mt-1 block">{pendingCount}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Date Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center gap-3">
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['All', 'Pending', 'Completed'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Faculty filter */}
        <select
          value={facultyFilter}
          onChange={(e) => setFacultyFilter(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Faculty</option>
          {faculty.map((f: Faculty) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>

        {/* Batch filter */}
        <select
          value={batchFilter}
          onChange={(e) => setBatchFilter(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:border-indigo-500"
        >
          <option value="all">All Batches</option>
          {batches.map((b: Batch) => (
            <option key={b.id} value={b.name}>
              Batch {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Class Time</th>
                <th className="py-3 px-4">Subject & Session</th>
                <th className="py-3 px-4">Batch</th>
                <th className="py-3 px-4">Assigned Faculty</th>
                <th className="py-3 px-4">Classroom</th>
                <th className="py-3 px-4">Submission Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No class attendance sessions found for the chosen filters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec: AttendanceRecord) => {
                  const isPending = rec.status === 'Pending';
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Time */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{rec.startTime}–{rec.endTime}</span>
                        </div>
                      </td>

                      {/* Subject */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {rec.subjectName}
                        {rec.remarks && (
                          <span className="block text-[11px] text-slate-400 font-normal italic truncate max-w-xs">
                            "{rec.remarks}"
                          </span>
                        )}
                      </td>

                      {/* Batch */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {rec.batchName}
                        </span>
                      </td>

                      {/* Faculty */}
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {rec.facultyName}
                      </td>

                      {/* Room */}
                      <td className="py-3.5 px-4 text-slate-600">
                        {rec.roomName}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <StatusBadge status={rec.status} />
                        {rec.markedAt && (
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            at {rec.markedAt.split(' ')[1]} {rec.markedAt.split(' ')[2]}
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        {isPending ? (
                          <button
                            type="button"
                            onClick={() => handleOpenMarkModal(rec)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
                          >
                            Mark Attendance
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleOpenMarkModal(rec)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
                          >
                            Update Notes
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mark Attendance Modal */}
      <MarkAttendanceModal
        record={activeRecord}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
