import React from 'react';
import { TimetableEntry } from '../../types';
import { useApp } from '../../context/AppContext';
import { Clock, MapPin, User, Users, Sparkles } from 'lucide-react';

interface TimetableClassCardProps {
  entry: TimetableEntry;
  onClick: () => void;
}

export const TimetableClassCard: React.FC<TimetableClassCardProps> = ({ entry, onClick }) => {
  const { subjects } = useApp();

  // Find subject details for color theme
  const subject = subjects.find((s) => s.id === entry.subjectId);
  const colorTheme = subject?.color || {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    text: 'text-indigo-950',
    accent: 'bg-indigo-600',
    badge: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  };

  const isCancelled = entry.status === 'cancelled';
  const isOverride = entry.scheduleType === 'override';

  if (isCancelled) {
    return (
      <div
        onClick={onClick}
        className="group relative p-2.5 rounded-xl border border-dashed border-rose-200 bg-rose-50/50 hover:bg-rose-50 transition-all cursor-pointer opacity-70"
      >
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-[11px] font-semibold text-rose-800 line-through truncate">
            {entry.subjectName}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-sm bg-rose-100 text-rose-700 border border-rose-200">
            Cancelled
          </span>
        </div>
        <div className="text-[10px] text-rose-600 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{entry.startTime} - {entry.endTime}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`group relative p-3 rounded-xl border ${colorTheme.border} ${colorTheme.bg} hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between h-full min-h-[92px]`}
    >
      {/* Accent left indicator line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colorTheme.accent}`} />

      <div>
        {/* Header: Subject & Override Badge */}
        <div className="flex items-start justify-between gap-1.5 mb-1.5">
          <div className="flex-1 min-w-0">
            <h4 className={`text-xs font-bold leading-tight truncate ${colorTheme.text}`} title={entry.subjectName}>
              {entry.subjectName}
            </h4>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] font-medium text-slate-500 font-mono">
                {subject?.code || 'CRS'}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-medium text-slate-600 flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5 text-slate-400" />
                {entry.startTime}–{entry.endTime}
              </span>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            {isOverride && (
              <span className="inline-flex items-center gap-0.5 text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded-sm bg-purple-100 text-purple-800 border border-purple-200 shadow-2xs">
                <Sparkles className="w-2.5 h-2.5 text-purple-600" />
                Override
              </span>
            )}
            {entry.notes && !isOverride && (
              <span className="w-2 h-2 rounded-full bg-amber-400" title="Has notes" />
            )}
          </div>
        </div>

        {/* Metadata: Faculty, Batch, Room */}
        <div className="space-y-0.5 mt-2">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-700 truncate" title={entry.facultyName}>
            <User className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate font-medium">{entry.facultyName}</span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-600 pt-0.5">
            <div className="flex items-center gap-1 font-medium bg-white/70 px-1.5 py-0.5 rounded-md border border-slate-200/50">
              <Users className="w-3 h-3 text-indigo-500 shrink-0" />
              <span>{entry.batchName}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{entry.roomName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
