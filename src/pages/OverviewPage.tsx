import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SummaryCard } from '../components/common/SummaryCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { RECENT_ACTIVITIES } from '../data/mockData';
import { ClassDetailsDrawer } from '../components/timetable/ClassDetailsDrawer';
import { ClassFormModal } from '../components/timetable/ClassFormModal';
import { TimetableEntry } from '../types';
import {
  CalendarDays,
  Users,
  Building,
  Plus,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  History,
  Zap,
  CheckSquare
} from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const {
    timetable,
    faculty,
    rooms,
    attendance,
    setActivePage,
    activeWeek,
    selectedDay
  } = useApp();

  const [selectedClass, setSelectedClass] = useState<TimetableEntry | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Computations for today (Tuesday in demo context)
  const todayClasses = timetable.filter(
    (t: TimetableEntry) => t.day === selectedDay && t.status !== 'cancelled'
  );

  const pendingAttendanceCount = attendance.filter((a) => a.status === 'Pending').length;
  const activeFacultyCount = faculty.filter((f) => f.status === 'Active').length;
  const roomsOccupiedCount = new Set(todayClasses.map((t: TimetableEntry) => t.roomId)).size;

  const handleSelectClass = (entry: TimetableEntry) => {
    setSelectedClass(entry);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome / Status Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 shadow-lg border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Fall Semester 2026 • Week {activeWeek}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Academic Scheduling Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Timetable generated with automated conflict prevention. Today is {selectedDay}, with {todayClasses.length} lecture and lab sessions scheduled.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Class</span>
            </button>
            <button
              type="button"
              onClick={() => setActivePage('timetable')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-all cursor-pointer"
            >
              <span>Weekly Timetable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          title="Classes Scheduled Today"
          value={todayClasses.length}
          subtext={`${selectedDay} active sessions`}
          icon={CalendarDays}
          badge="In Progress"
          badgeType="info"
          colorClass="text-blue-600 bg-blue-50 border-blue-200"
          onClick={() => setActivePage('timetable')}
        />

        <SummaryCard
          title="Faculty Members"
          value={activeFacultyCount}
          subtext="Full-time professors on duty"
          icon={Users}
          badge="100% Active"
          badgeType="success"
          colorClass="text-emerald-600 bg-emerald-50 border-emerald-200"
          onClick={() => setActivePage('faculty')}
        />

        <SummaryCard
          title="Rooms in Use"
          value={`${roomsOccupiedCount} / ${rooms.length}`}
          subtext="Lecture halls and labs"
          icon={Building}
          badge="Optimal"
          badgeType="neutral"
          colorClass="text-indigo-600 bg-indigo-50 border-indigo-200"
          onClick={() => setActivePage('timetable')}
        />

        <SummaryCard
          title="Attendance Pending"
          value={pendingAttendanceCount}
          subtext="Class submissions awaiting faculty"
          icon={CheckSquare}
          badge={pendingAttendanceCount > 0 ? 'Requires Action' : 'Cleared'}
          badgeType={pendingAttendanceCount > 0 ? 'warning' : 'success'}
          colorClass="text-amber-600 bg-amber-50 border-amber-200"
          onClick={() => setActivePage('attendance')}
        />
      </div>

      {/* Main Grid: Today's Schedule & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule (2 cols on large screen) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Today's Schedule</h3>
                <p className="text-xs text-slate-500">Upcoming classes for {selectedDay}</p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('timetable')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Week</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of Today's Classes */}
            <div className="space-y-3">
              {todayClasses.map((item: TimetableEntry) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectClass(item)}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50/60 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono text-xs font-bold shrink-0">
                      <Clock className="w-3 h-3 inline mr-1 text-indigo-500" />
                      {item.startTime}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {item.subjectName}
                        </h4>
                        {item.scheduleType === 'override' && (
                          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded-xs border border-purple-200">
                            Override
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.facultyName} • Batch {item.batchName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1 text-xs text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded-md">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.roomName}</span>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing all active class slots for {selectedDay}</span>
            <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Zero Collisions Detected
            </span>
          </div>
        </div>

        {/* Right Column: Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Quick Actions</span>
            </h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 block">
                    Add New Class
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Schedule a single lecture or lab session
                  </span>
                </div>
                <Plus className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                type="button"
                onClick={() => setActivePage('timetable')}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 block">
                    View Weekly Timetable
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Full master grid across Mon - Sat
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                type="button"
                onClick={() => setActivePage('attendance')}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 block">
                    Review Daily Attendance
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {pendingAttendanceCount} pending submissions to mark
                  </span>
                </div>
                <CheckSquare className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>

              <button
                type="button"
                onClick={() => setActivePage('faculty')}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-700 block">
                    Manage Faculty Workloads
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Review assigned subject hours
                  </span>
                </div>
                <Users className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-500" />
                <span>Recent Activity</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">Audit Trail</span>
            </div>

            <div className="space-y-3.5">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="flex items-start gap-2.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 leading-snug">
                      {act.action}
                    </p>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {act.detail}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {act.time} by {act.user}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Class Details Drawer */}
      <ClassDetailsDrawer
        entry={selectedClass}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onEdit={() => {}}
        onReschedule={() => {}}
      />

      {/* Add Class Modal */}
      <ClassFormModal
        isOpen={isAddModalOpen}
        mode="add"
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
