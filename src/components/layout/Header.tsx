import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Bell,
  Search,
  Calendar,
  Sparkles,
  ChevronDown,
  User,
  ShieldCheck,
  Building2,
  X
} from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    activePage,
    setActivePage,
    activeWeek,
    filters,
    setFilters,
    notifications,
    settings
  } = useApp();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const unreadNotifications = notifications.filter((n) => !n.read);

  const getPageInfo = () => {
    switch (activePage) {
      case 'overview':
        return { title: 'Overview', subtitle: 'Manage your college timetable with less manual effort.' };
      case 'timetable':
        return { title: 'Timetable', subtitle: 'View and manage classes across the selected week.' };
      case 'faculty':
        return { title: 'Faculty Directory', subtitle: 'Departmental faculty profiles, workloads & schedules.' };
      case 'attendance':
        return { title: 'Attendance', subtitle: 'Track class attendance completion and pending entries.' };
      case 'notifications':
        return { title: 'Notification Automation', subtitle: 'Simulate 5-minute pre-class and daily attendance alerts.' };
      case 'settings':
        return { title: 'Settings', subtitle: 'Configure institutional parameters and reminder timings.' };
      default:
        return { title: 'CampusFlow', subtitle: 'Smart Timetable Management' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & breadcrumb/page title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400 capitalize hidden sm:inline">
                {settings.institutionName.split(' ')[0]} /
              </span>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">{pageInfo.title}</h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Demo
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block truncate max-w-md">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Center/Right: Quick Search, Week Badge, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search box (updates global filter) */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
              placeholder="Search subject, faculty, room..."
              className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, searchQuery: '' }))}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Academic Week Context Pill */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-lg border border-slate-200 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span className="font-semibold text-slate-900">Week {activeWeek}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">{settings.semester}</span>
          </div>

          {/* Notifications Trigger */}
          <button
            type="button"
            onClick={() => setActivePage('notifications')}
            className="relative p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
            )}
          </button>

          {/* User Profile / Dean Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                SJ
              </div>
              <div className="text-left hidden lg:block">
                <span className="text-xs font-semibold text-slate-900 block leading-tight">
                  Dr. Sarah Jenkins
                </span>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  Academic Dean / HOD Admin
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Dr. Sarah Jenkins</p>
                    <p className="text-[11px] text-slate-500">dean.academic@campusflow.edu</p>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-indigo-600 font-medium">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Full Academic Admin Privileges</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActivePage('overview');
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Institute Overview</span>
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('settings');
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>System Settings</span>
                    </button>
                  </div>

                  <div className="pt-2 px-3 border-t border-slate-100">
                    <div className="p-2 bg-slate-50 rounded-lg text-[10px] text-slate-500 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>College Leadership Demo Environment</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
