import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TimetableEntry, DayOfWeek } from '../types';
import { TimetableGrid } from '../components/timetable/TimetableGrid';
import { ClassFormModal } from '../components/timetable/ClassFormModal';
import { ClassDetailsDrawer } from '../components/timetable/ClassDetailsDrawer';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const TimetablePage: React.FC = () => {
  const {
    activeWeek,
    setActiveWeek,
    viewMode,
    setViewMode,
    filters,
    setFilters,
    resetFilters,
    faculty,
    batches,
    rooms,
    timetable,
  } = useApp();

  // Modals & drawers state
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit' | 'reschedule'>('add');
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [slotDay, setSlotDay] = useState<DayOfWeek>('Monday');
  const [slotStartTime, setSlotStartTime] = useState<string>('09:00');

  // Week navigation calculation
  const getWeekDateRange = (week: number) => {
    // Week 8 corresponds to Oct 26 - Oct 31, 2026
    const baseOct = 26 + (week - 8) * 7;
    const startDay = Math.max(1, baseOct);
    const endDay = startDay + 5;
    return `Oct ${startDay} – Oct ${endDay}, 2026`;
  };

  const handlePrevWeek = () => {
    if (activeWeek > 1) setActiveWeek(activeWeek - 1);
  };

  const handleNextWeek = () => {
    if (activeWeek < 16) setActiveWeek(activeWeek + 1);
  };

  const handleTodayWeek = () => {
    setActiveWeek(8);
  };

  const handleOpenAddModal = (day: DayOfWeek = 'Monday', startTime: string = '09:00') => {
    setFormMode('add');
    setEditingEntry(null);
    setSlotDay(day);
    setSlotStartTime(startTime);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (entry: TimetableEntry) => {
    setFormMode('edit');
    setEditingEntry(entry);
    setIsFormModalOpen(true);
  };

  const handleOpenRescheduleModal = (entry: TimetableEntry) => {
    setFormMode('reschedule');
    setEditingEntry(entry);
    setIsFormModalOpen(true);
  };

  const handleSelectClass = (entry: TimetableEntry) => {
    setSelectedEntry(entry);
    setIsDetailsDrawerOpen(true);
  };

  const activeOverridesCount = timetable.filter(
    (t: TimetableEntry) => t.scheduleType === 'override' && t.overrideWeek === activeWeek && t.status !== 'cancelled'
  ).length;

  const totalActiveClasses = timetable.filter((t: TimetableEntry) => t.status !== 'cancelled').length;

  const hasActiveFilters =
    filters.facultyId !== 'all' ||
    filters.batchId !== 'all' ||
    filters.roomId !== 'all' ||
    filters.searchQuery !== '';

  return (
    <div className="space-y-5">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Week Navigator */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
              <button
                type="button"
                onClick={handlePrevWeek}
                disabled={activeWeek <= 1}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all disabled:opacity-30 cursor-pointer"
                title="Previous Week"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleTodayWeek}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeWeek === 8
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Current Week
              </button>
              <button
                type="button"
                onClick={handleNextWeek}
                disabled={activeWeek >= 16}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition-all disabled:opacity-30 cursor-pointer"
                title="Next Week"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-2 pl-2">
              <h2 className="text-base font-bold text-slate-900">
                Week {activeWeek}
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                ({getWeekDateRange(activeWeek)})
              </span>
            </div>

            {/* Overrides badge */}
            {activeOverridesCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                <Sparkles className="w-3 h-3 text-purple-600" />
                {activeOverridesCount} Override Active
              </span>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            {/* View Switcher: Week vs Day */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('week')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'week'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Week</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('day')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'day'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Day</span>
              </button>
            </div>

            {/* Add Class Button */}
            <button
              type="button"
              onClick={() => handleOpenAddModal('Monday', '09:00')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Class</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter By:</span>
          </div>

          {/* Faculty filter */}
          <select
            value={filters.facultyId}
            onChange={(e) => setFilters((prev) => ({ ...prev, facultyId: e.target.value }))}
            className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Faculty</option>
            {faculty.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          {/* Batch filter */}
          <select
            value={filters.batchId}
            onChange={(e) => setFilters((prev) => ({ ...prev, batchId: e.target.value }))}
            className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Batches</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                Batch {b.name}
              </option>
            ))}
          </select>

          {/* Room filter */}
          <select
            value={filters.roomId}
            onChange={(e) => setFilters((prev) => ({ ...prev, roomId: e.target.value }))}
            className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Rooms</option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>

          {/* Reset Filters button if any active */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}

          {/* Stats on the right */}
          <div className="ml-auto text-xs text-slate-500 hidden sm:flex items-center gap-2">
            <span className="font-medium text-slate-700">{totalActiveClasses}</span> total classes in database
          </div>
        </div>
      </div>

      {/* Timetable Grid Component */}
      <TimetableGrid
        onSelectClass={handleSelectClass}
        onAddClassAtSlot={(day: DayOfWeek, startTime: string) => handleOpenAddModal(day, startTime)}
      />

      {/* Class Details Drawer */}
      <ClassDetailsDrawer
        entry={selectedEntry}
        isOpen={isDetailsDrawerOpen}
        onClose={() => setIsDetailsDrawerOpen(false)}
        onEdit={handleOpenEditModal}
        onReschedule={handleOpenRescheduleModal}
      />

      {/* Add / Edit / Reschedule Modal */}
      <ClassFormModal
        isOpen={isFormModalOpen}
        mode={formMode}
        initialData={editingEntry}
        defaultDay={slotDay}
        defaultStartTime={slotStartTime}
        onClose={() => setIsFormModalOpen(false)}
      />
    </div>
  );
};
