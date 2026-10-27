import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavPage } from '../../types';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  CheckSquare,
  Bell,
  Settings,
  Sparkles,
  RotateCcw,
  GraduationCap,
  ChevronRight,
  AlertOctagon,
  X
} from 'lucide-react';
import { ConfirmationDialog } from '../common/ConfirmationDialog';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    activePage,
    setActivePage,
    notifications,
    resetDemoData,
    triggerTestConflict,
    addToast
  } = useApp();

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: { id: NavPage; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'timetable', label: 'Timetable', icon: CalendarDays },
    { id: 'faculty', label: 'Faculty', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CheckSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (pageId: NavPage) => {
    setActivePage(pageId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleTestConflictDemo = (type: 'faculty' | 'room' | 'batch') => {
    const conflict = triggerTestConflict(type);
    if (conflict) {
      addToast(
        'warning',
        `Sample ${type.toUpperCase()} Conflict Detected`,
        conflict.description
      );
      setActivePage('timetable');
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">CampusFlow</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Smart Timetable Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype preview indicator */}
        <div className="mx-4 mt-4 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-[11px] text-indigo-200/90 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-indigo-300">Prototype Mode:</span> Demonstrating next-gen scheduling without desktop software bloat.
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Main Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-indigo-700' : 'bg-indigo-500/30 text-indigo-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && !item.badge && <ChevronRight className="w-4 h-4 text-indigo-300" />}
              </button>
            );
          })}

          {/* Quick Presentation Conflict Demos */}
          <div className="pt-5 px-3">
            <div className="flex items-center justify-between pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              <span>Test Conflict Logic</span>
              <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="space-y-1">
              <button
                onClick={() => handleTestConflictDemo('faculty')}
                className="w-full text-left text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>Trigger Teacher Conflict</span>
                <span className="text-[10px] text-amber-400/90 font-mono">Simulate</span>
              </button>
              <button
                onClick={() => handleTestConflictDemo('room')}
                className="w-full text-left text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>Trigger Room Overlap</span>
                <span className="text-[10px] text-rose-400/90 font-mono">Simulate</span>
              </button>
              <button
                onClick={() => handleTestConflictDemo('batch')}
                className="w-full text-left text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>Trigger Batch Overlap</span>
                <span className="text-[10px] text-blue-400/90 font-mono">Simulate</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Footer / Reset Data */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg border border-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>
          <div className="mt-3 text-center">
            <span className="text-[10px] text-slate-400 block font-mono">CampusFlow UI v1.0.4</span>
            <span className="text-[10px] text-slate-400">Department of Computer & IT</span>
          </div>
        </div>
      </aside>

      {/* Confirmation modal for reset */}
      <ConfirmationDialog
        isOpen={isResetConfirmOpen}
        title="Reset Demo Dataset?"
        message="This will restore all timetable entries, faculty records, attendance states, and notifications back to their pristine mock values. Any scheduled classes or changes will be replaced."
        confirmText="Reset All Data"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={() => {
          resetDemoData();
          setIsResetConfirmOpen(false);
        }}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </>
  );
};
