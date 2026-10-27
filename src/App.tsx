import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { OverviewPage } from './pages/OverviewPage';
import { TimetablePage } from './pages/TimetablePage';
import { FacultyPage } from './pages/FacultyPage';
import { AttendancePage } from './pages/AttendancePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  return (
    <AppLayout>
      {activePage === 'overview' && <OverviewPage />}
      {activePage === 'timetable' && <TimetablePage />}
      {activePage === 'faculty' && <FacultyPage />}
      {activePage === 'attendance' && <AttendancePage />}
      {activePage === 'notifications' && <NotificationsPage />}
      {activePage === 'settings' && <SettingsPage />}
    </AppLayout>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
