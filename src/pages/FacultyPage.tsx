import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Faculty } from '../types';
import { AddFacultyModal } from '../components/faculty/AddFacultyModal';
import { FacultyDetailsDrawer } from '../components/faculty/FacultyDetailsDrawer';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  UserPlus,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';

export const FacultyPage: React.FC = () => {
  const { faculty, setFilters, setActivePage } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const departments = ['all', 'Computer Science', 'Information Tech', 'Mathematics', 'Electronics'];

  // Filter faculty
  const filteredFaculty = faculty.filter((f: Faculty) => {
    if (selectedDept !== 'all' && f.department !== selectedDept) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = f.name.toLowerCase().includes(q);
      const matchEmail = f.email.toLowerCase().includes(q);
      const matchSubject = f.subjects.some((s: string) => s.toLowerCase().includes(q));
      if (!matchName && !matchEmail && !matchSubject) return false;
    }
    return true;
  });

  const handleRowClick = (f: Faculty) => {
    setSelectedFaculty(f);
    setIsDrawerOpen(true);
  };

  const handleFilterTimetable = (facultyId: string) => {
    setFilters((prev) => ({ ...prev, facultyId }));
    setActivePage('timetable');
  };

  return (
    <div className="space-y-5">
      {/* Top Action Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search & Department Filter */}
        <div className="flex flex-1 flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty by name, email, or subject..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Departments</option>
              {departments.filter((d) => d !== 'all').map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Faculty Button */}
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Faculty</span>
        </button>
      </div>

      {/* Faculty Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Faculty Member</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Teaching Subjects</th>
                <th className="py-3 px-4 text-center">Classes Today</th>
                <th className="py-3 px-4 text-center">Pending Attendance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Schedule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredFaculty.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No faculty members found matching your search.
                  </td>
                </tr>
              ) : (
                filteredFaculty.map((f: Faculty) => (
                  <tr
                    key={f.id}
                    onClick={() => handleRowClick(f)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    {/* Faculty Profile */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={f.avatar}
                          alt={f.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                            {f.name}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">{f.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-slate-700">{f.department}</span>
                    </td>

                    {/* Subjects */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {f.subjects.slice(0, 2).map((sub: string, i: number) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/80 truncate"
                          >
                            {sub}
                          </span>
                        ))}
                        {f.subjects.length > 2 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold text-slate-400 bg-slate-50">
                            +{f.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Classes Today */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-xs">
                        {f.classesToday} sessions
                      </span>
                    </td>

                    {/* Pending Attendance */}
                    <td className="py-3.5 px-4 text-center">
                      {f.pendingAttendance > 0 ? (
                        <span className="inline-flex items-center justify-center font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs">
                          {f.pendingAttendance} pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center font-medium px-2 py-0.5 rounded-md text-emerald-700 text-xs">
                          All submitted
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={f.status} />
                    </td>

                    {/* View Schedule */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFilterTimetable(f.id);
                        }}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Timetable</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Showing {filteredFaculty.length} registered faculty members</span>
          <span className="text-slate-400">Click any row to inspect workload breakdown</span>
        </div>
      </div>

      {/* Add Faculty Modal */}
      <AddFacultyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* Faculty Workload Drawer */}
      <FacultyDetailsDrawer
        faculty={selectedFaculty}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onViewInTimetable={handleFilterTimetable}
      />
    </div>
  );
};
