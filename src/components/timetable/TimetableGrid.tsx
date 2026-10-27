import React from 'react';
import { TimetableEntry, DayOfWeek, TimeSlot } from '../../types';
import { useApp } from '../../context/AppContext';
import { DEFAULT_TIME_SLOTS } from '../../data/mockData';
import { TimetableClassCard } from './TimetableClassCard';
import { Plus, Coffee, Clock } from 'lucide-react';

interface TimetableGridProps {
  onSelectClass: (entry: TimetableEntry) => void;
  onAddClassAtSlot: (day: DayOfWeek, startTime: string) => void;
}

export const TimetableGrid: React.FC<TimetableGridProps> = ({
  onSelectClass,
  onAddClassAtSlot,
}) => {
  const {
    timetable,
    activeWeek,
    viewMode,
    selectedDay,
    setSelectedDay,
    filters,
    settings
  } = useApp();

  const workingDays: DayOfWeek[] = settings.workingDays;
  const timeSlots: TimeSlot[] = DEFAULT_TIME_SLOTS;

  // Filter logic
  const filteredEntries = timetable.filter((entry) => {
    // 1. If override, check if it belongs to current activeWeek
    if (entry.scheduleType === 'override' && entry.overrideWeek && entry.overrideWeek !== activeWeek) {
      return false;
    }

    // 2. Filter by Faculty
    if (filters.facultyId !== 'all' && entry.facultyId !== filters.facultyId) {
      return false;
    }

    // 3. Filter by Batch
    if (filters.batchId !== 'all' && entry.batchId !== filters.batchId) {
      return false;
    }

    // 4. Filter by Room
    if (filters.roomId !== 'all' && entry.roomId !== filters.roomId) {
      return false;
    }

    // 5. Filter by Search Query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const matchSubject = entry.subjectName.toLowerCase().includes(q);
      const matchFaculty = entry.facultyName.toLowerCase().includes(q);
      const matchRoom = entry.roomName.toLowerCase().includes(q);
      const matchBatch = entry.batchName.toLowerCase().includes(q);
      if (!matchSubject && !matchFaculty && !matchRoom && !matchBatch) {
        return false;
      }
    }

    return true;
  });

  // Helper to find entry for a given day and start time
  const getEntryForSlot = (day: DayOfWeek, startTime: string) => {
    return filteredEntries.find(
      (e) => e.day === day && e.startTime === startTime
    );
  };

  // Day view rendering
  if (viewMode === 'day') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* Day selector tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto">
          {workingDays.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDay(d)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDay === d
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Day Slots List */}
        <div className="divide-y divide-slate-100 p-4 space-y-3">
          {timeSlots.map((slot) => {
            if (slot.isLunch) {
              return (
                <div
                  key={slot.id}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-800 text-xs font-medium"
                >
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span>College Lunch Break & Faculty Recess (12:00 PM - 01:00 PM)</span>
                </div>
              );
            }

            const entry = getEntryForSlot(selectedDay, slot.startTime);

            return (
              <div key={slot.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-3">
                <div className="w-32 shrink-0 flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{slot.label}</span>
                </div>

                <div className="flex-1 w-full min-h-[90px]">
                  {entry ? (
                    <TimetableClassCard entry={entry} onClick={() => onSelectClass(entry)} />
                  ) : (
                    <button
                      onClick={() => onAddClassAtSlot(selectedDay, slot.startTime)}
                      className="w-full h-full min-h-[80px] rounded-xl border border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/40 hover:bg-indigo-50/30 flex items-center justify-center gap-2 text-xs font-medium text-slate-400 hover:text-indigo-600 transition-all group cursor-pointer"
                    >
                      <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span>Available Slot — Click to schedule class</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Week Grid View
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Scrollable Container with sticky headers */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse table-fixed">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              {/* Corner cell: Time */}
              <th className="w-28 p-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider border-r border-slate-200 bg-slate-50 sticky left-0 z-10 shadow-xs">
                Time Slot
              </th>
              {workingDays.map((day) => (
                <th
                  key={day}
                  className="p-3 text-left border-r border-slate-200 last:border-r-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 tracking-tight">{day}</span>
                    <button
                      type="button"
                      onClick={() => onAddClassAtSlot(day, '09:00')}
                      title={`Schedule class on ${day}`}
                      className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-200/60 rounded-md transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, rowIndex) => {
              // Special row for Lunch Break
              if (slot.isLunch) {
                return (
                  <tr key={slot.id} className="bg-amber-50/40 border-b border-slate-200">
                    <td className="p-2.5 text-xs font-mono font-bold text-amber-900 border-r border-slate-200 bg-amber-50/70 sticky left-0 z-10">
                      <div className="flex items-center gap-1.5">
                        <Coffee className="w-3.5 h-3.5 text-amber-600" />
                        <span>12:00–13:00</span>
                      </div>
                    </td>
                    <td
                      colSpan={workingDays.length}
                      className="p-2 text-center text-xs font-medium text-amber-800 tracking-wide"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="h-px bg-amber-200 flex-1 max-w-xs" />
                        <span className="uppercase text-[11px] font-bold tracking-wider text-amber-900/80">
                          College Recess & Lunch Break
                        </span>
                        <span className="h-px bg-amber-200 flex-1 max-w-xs" />
                      </div>
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={slot.id}
                  className={`border-b border-slate-100 ${
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/20'
                  }`}
                >
                  {/* Sticky Time Slot Header */}
                  <td className="p-3 align-top border-r border-slate-200 bg-white sticky left-0 z-10 shadow-xs">
                    <div className="text-xs font-mono font-bold text-slate-700">
                      {slot.startTime}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      to {slot.endTime}
                    </div>
                  </td>

                  {/* Day Columns */}
                  {workingDays.map((day) => {
                    const entry = getEntryForSlot(day, slot.startTime);

                    return (
                      <td
                        key={`${day}-${slot.startTime}`}
                        className="p-1.5 align-top border-r border-slate-100 last:border-r-0 h-28 max-w-[200px]"
                      >
                        {entry ? (
                          <TimetableClassCard
                            entry={entry}
                            onClick={() => onSelectClass(entry)}
                          />
                        ) : (
                          <button
                            type="button"
                            onClick={() => onAddClassAtSlot(day, slot.startTime)}
                            className="w-full h-full min-h-[92px] rounded-xl border border-dashed border-transparent hover:border-slate-300 hover:bg-slate-50/80 flex flex-col items-center justify-center text-slate-300 hover:text-slate-500 transition-all group cursor-pointer"
                            title={`Add class on ${day} at ${slot.startTime}`}
                          >
                            <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity mt-0.5">
                              Add Class
                            </span>
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
