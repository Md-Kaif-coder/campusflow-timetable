import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DayOfWeek } from '../types';
import { ConfirmationDialog } from '../components/common/ConfirmationDialog';
import {
  Building2,
  Calendar,
  RotateCcw,
  Save,
  Info
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, resetDemoData } = useApp();

  const [institutionName, setInstitutionName] = useState(settings.institutionName);
  const [academicYear, setAcademicYear] = useState(settings.academicYear);
  const [semester, setSemester] = useState(settings.semester);
  const [workingDays, setWorkingDays] = useState<DayOfWeek[]>(settings.workingDays);
  const [defaultDuration, setDefaultDuration] = useState(settings.defaultClassDuration);
  const [dayStartTime, setDayStartTime] = useState(settings.dayStartTime);
  const [dayEndTime, setDayEndTime] = useState(settings.dayEndTime);
  const [eveningTime] = useState(settings.eveningReminderTime);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const allDays: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleDay = (day: DayOfWeek) => {
    if (workingDays.includes(day)) {
      if (workingDays.length > 1) {
        setWorkingDays(workingDays.filter((d) => d !== day));
      }
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      institutionName: institutionName.trim(),
      academicYear: academicYear.trim(),
      semester: semester.trim(),
      workingDays,
      defaultClassDuration: Number(defaultDuration),
      dayStartTime,
      dayEndTime,
      eveningReminderTime: eveningTime,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Intro Header */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs text-indigo-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
        <div className="space-y-0.5">
          <p className="font-bold text-indigo-900">
            College Academic Parameters & Scheduling Configuration
          </p>
          <p className="text-indigo-800 leading-relaxed text-[11px]">
            Adjust basic timetable defaults, active instructional days, and reminder schedules. Changes are immediately persisted in browser memory.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institutional Identity Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Institution & Academic Term</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                College / Institution Name
              </label>
              <input
                type="text"
                required
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Academic Year
              </label>
              <input
                type="text"
                required
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Current Semester
              </label>
              <input
                type="text"
                required
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Schedule & Working Days Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900">Working Days & Session Timings</h3>
          </div>

          {/* Working Days Checkboxes */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Active College Instructional Days
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {allDays.map((d) => {
                const isSelected = workingDays.includes(d);
                return (
                  <label
                    key={d}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/50 text-indigo-900'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleDay(d)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>{d}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Timings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Day Start Time
              </label>
              <input
                type="time"
                value={dayStartTime}
                onChange={(e) => setDayStartTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Day End Time
              </label>
              <input
                type="time"
                value={dayEndTime}
                onChange={(e) => setDayEndTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Standard Slot Duration
              </label>
              <select
                value={defaultDuration}
                onChange={(e) => setDefaultDuration(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              >
                <option value={50}>50 Minutes</option>
                <option value={60}>60 Minutes (Standard)</option>
                <option value={90}>90 Minutes (Block Lecture)</option>
                <option value={120}>120 Minutes (Laboratory)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

      {/* Danger Zone / Factory Reset */}
      <div className="bg-white rounded-2xl border border-rose-200 p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2 text-rose-700 font-bold text-sm">
          <RotateCcw className="w-4 h-4 text-rose-600" />
          <span>Demo Data Management</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Reset all local timetable changes, added faculty members, and attendance modifications back to the original demonstration baseline.
        </p>
        <button
          type="button"
          onClick={() => setIsResetConfirmOpen(true)}
          className="px-4 py-2 text-xs font-semibold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 rounded-xl transition-all cursor-pointer"
        >
          Reset Demo Data to Initial State
        </button>
      </div>

      <ConfirmationDialog
        isOpen={isResetConfirmOpen}
        title="Restore Default Mock Dataset?"
        message="This action will clear all modifications stored in your browser's LocalStorage and reset the timetable, faculty records, and attendance records back to pristine initial state."
        confirmText="Confirm Reset"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={() => {
          resetDemoData();
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
};
