import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';
import {
  Bell,
  Clock,
  Smartphone,
  Mail,
  MessageSquare,
  Send,
  Calendar,
  Settings,
  Info
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const {
    notifications,
    settings,
    updateSettings,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addToast
  } = useApp();

  // Local settings form state
  const [enableFiveMin, setEnableFiveMin] = useState(settings.enableFiveMinReminder);
  const [enableEvening, setEnableEvening] = useState(settings.enableEveningAttendanceReminder);
  const [eveningTime, setEveningTime] = useState(settings.eveningReminderTime);
  const [channel, setChannel] = useState(settings.reminderChannel);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      enableFiveMinReminder: enableFiveMin,
      enableEveningAttendanceReminder: enableEvening,
      eveningReminderTime: eveningTime,
      reminderChannel: channel,
    });
  };

  const handleSimulateDispatch = (type: 'five_min' | 'evening') => {
    if (type === 'five_min') {
      addToast(
        'info',
        'Simulated 5-Min Reminder Dispatched',
        `Dispatched preview alert to Dr. Arvind Sharma via ${channel}: "Data Structures starts at 10:00 AM in Lab 302"`
      );
    } else {
      addToast(
        'info',
        'Simulated Evening Attendance Reminder Dispatched',
        `Dispatched preview alert to Prof. Priya Menon via ${channel}: "2 pending attendance submissions for today."`
      );
    }
  };

  const getChannelIcon = (ch: string) => {
    switch (ch) {
      case 'WhatsApp':
        return <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />;
      case 'SMS':
        return <Smartphone className="w-3.5 h-3.5 text-blue-600" />;
      case 'Email':
        return <Mail className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Required Prototype Automation Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div className="space-y-0.5">
          <p className="font-bold text-amber-900">
            Automation Preview & Channel Configuration
          </p>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            Automation preview — actual delivery will be connected during backend development. This interactive mockup demonstrates the notification rules, timing triggers, and channel preferences designed for college staff.
          </p>
        </div>
      </div>

      {/* Two Required Automation Workflows Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Workflow A: Five-Minute Class Reminder */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 block">
                  Workflow A
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  5-Minute Pre-Class Alert
                </h3>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Active Trigger
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Automatically notifies instructors five minutes before their scheduled lecture or lab session to reduce delayed starts.
          </p>

          {/* Interactive Mock Preview Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                {getChannelIcon(channel)}
                <span>Channel: {channel} Delivery</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">T - 5 Mins</span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Your Data Structures class starts in 5 minutes
                </span>
                <span className="text-[10px] text-slate-400 font-mono">09:55 AM</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Scheduled in <span className="font-semibold text-slate-800">Lab 302</span> with Batch <span className="font-semibold text-slate-800">IT-3B</span> from 10:00 to 11:00 AM.
              </p>
              <div className="pt-1.5 flex items-center gap-3 text-[10px] text-slate-500 border-t border-slate-100">
                <span>Recipient: Dr. Arvind Sharma</span>
                <span>•</span>
                <span>Room: Computing Center Lab 302</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSimulateDispatch('five_min')}
            className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate Pre-Class Notification</span>
          </button>
        </div>

        {/* Workflow B: Evening Attendance Reminder */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 block">
                  Workflow B
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Evening Attendance Reminder
                </h3>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Daily at {eveningTime}
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Sends an automated reminder at the end of the day to teachers who have not yet submitted class session attendance.
          </p>

          {/* Interactive Mock Preview Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <span className="flex items-center gap-1.5">
                {getChannelIcon(channel)}
                <span>Channel: {channel} Delivery</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400">Daily Trigger</span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-slate-200/80 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Please submit attendance for your pending classes today
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{eveningTime}</span>
              </div>
              <p className="text-[11px] text-slate-600">
                You have <span className="font-semibold text-amber-600">2 pending class attendance entries</span> (Database Management Systems, Software Engineering) awaiting sign-off.
              </p>
              <div className="pt-1.5 flex items-center gap-3 text-[10px] text-slate-500 border-t border-slate-100">
                <span>Recipient: Prof. Priya Menon</span>
                <span>•</span>
                <span>Action: Submit via Web Portal</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSimulateDispatch('evening')}
            className="w-full py-2 px-3 text-xs font-semibold rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Simulate Evening Reminder</span>
          </button>
        </div>
      </div>

      {/* Settings & Recent Notification Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Automation Settings Form */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <Settings className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-900">Automation Settings</h3>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            {/* 5-Min Toggle */}
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={enableFiveMin}
                onChange={(e) => setEnableFiveMin(e.target.checked)}
                className="mt-1 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-900 block">5-Minute Class Alerts</span>
                <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                  Send reminder to teacher right before lecture starts.
                </span>
              </div>
            </label>

            {/* Evening Toggle */}
            <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={enableEvening}
                onChange={(e) => setEnableEvening(e.target.checked)}
                className="mt-1 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-900 block">Daily Evening Attendance Check</span>
                <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                  Remind faculty with pending submissions before office closing.
                </span>
              </div>
            </label>

            {/* Evening Reminder Time */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Evening Reminder Time
              </label>
              <input
                type="time"
                value={eveningTime}
                onChange={(e) => setEveningTime(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none font-mono"
              />
            </div>

            {/* Delivery Channel */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Demonstration Delivery Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-white text-slate-800 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none"
              >
                <option value="WhatsApp">WhatsApp Gateway</option>
                <option value="Email">Institutional Email (SMTP)</option>
                <option value="SMS">SMS Gateway</option>
                <option value="In-App">In-App Banner Only</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Save Notification Preferences
            </button>
          </form>
        </div>

        {/* Notification History Log (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Notification History</h3>
                <p className="text-xs text-slate-500">Audit of system-generated reminders & alerts</p>
              </div>
              <button
                type="button"
                onClick={markAllNotificationsAsRead}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
              >
                Mark All Read
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((n: NotificationItem) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    !n.read
                      ? 'bg-indigo-50/40 border-indigo-200'
                      : 'bg-white border-slate-200/70 hover:bg-slate-50'
                  }`}
                >
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 shrink-0 shadow-2xs">
                    {getChannelIcon(n.channel)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 truncate">
                        {n.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                    </div>

                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {n.message}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-600">{n.channel}</span>
                      <span>•</span>
                      <span>{n.read ? 'Delivered & Seen' : 'Pending Read'}</span>
                    </div>
                  </div>

                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-400 text-right">
            <span>Logged in local demo audit trail</span>
          </div>
        </div>
      </div>
    </div>
  );
};
