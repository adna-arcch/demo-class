import { useEffect, useState } from 'react';
import {
  AppView,
  AuthSession,
  LessonRecord,
  PaperRecord,
  StudentRecord,
  UserRole,
} from './types';
import {
  loadCompletedLessons,
  loadLessons,
  loadPapers,
  loadSession,
  loadStudents,
  saveCompletedLessons,
  saveLessons,
  savePapers,
  saveSession,
  saveStudents,
} from './data/demoStore';
import { Navbar } from './components/Navbar';
import { PublicHome } from './components/PublicHome';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { LoginPage } from './components/LoginPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [session, setSession] = useState<AuthSession | null>(() => loadSession());
  const [view, setView] = useState<AppView>(() => {
    const existing = loadSession();
    if (!existing) return 'home';
    return existing.role === 'admin' ? 'admin-dashboard' : 'student-dashboard';
  });
  const [preferredLoginRole, setPreferredLoginRole] = useState<UserRole>('student');

  const [students, setStudents] = useState<StudentRecord[]>(() => loadStudents());
  const [lessons, setLessons] = useState<LessonRecord[]>(() => loadLessons());
  const [papers, setPapers] = useState<PaperRecord[]>(() => loadPapers());
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() =>
    loadCompletedLessons()
  );

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  useEffect(() => {
    saveLessons(lessons);
  }, [lessons]);

  useEffect(() => {
    savePapers(papers);
  }, [papers]);

  useEffect(() => {
    saveCompletedLessons(completedLessonIds);
  }, [completedLessonIds]);

  const handleNavigateLogin = (role: UserRole = 'student') => {
    setPreferredLoginRole(role);
    setView('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (newSession: AuthSession) => {
    saveSession(newSession);
    setSession(newSession);
    setView(newSession.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    saveSession(null);
    setSession(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateDashboard = () => {
    if (!session) {
      handleNavigateLogin('student');
      return;
    }
    setView(session.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student lesson completion toggle
  const handleToggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  // Admin Student CRUD
  const handleAddStudent = (data: Omit<StudentRecord, 'id' | 'joinedDate'>) => {
    const newStudent: StudentRecord = {
      ...data,
      id: `stu-${Date.now()}`,
      joinedDate: new Date().toISOString().slice(0, 10),
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleToggleStudentFee = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, fees: s.fees === 'Paid' ? 'Pending' : 'Paid' }
          : s
      )
    );
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  // Admin Lesson CRUD
  const handleAddLesson = (data: Omit<LessonRecord, 'id' | 'createdAt'>) => {
    const newLesson: LessonRecord = {
      ...data,
      id: `les-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setLessons((prev) => [...prev, newLesson]);
  };

  const handleUpdateLesson = (updated: LessonRecord) => {
    setLessons((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
  };

  const handleDeleteLesson = (lessonId: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    setCompletedLessonIds((prev) => prev.filter((id) => id !== lessonId));
  };

  // Admin Paper CRUD
  const handleAddPaper = (data: Omit<PaperRecord, 'id' | 'createdAt'>) => {
    const newPaper: PaperRecord = {
      ...data,
      id: `pap-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setPapers((prev) => [newPaper, ...prev]);
  };

  const handleDeletePaper = (paperId: string) => {
    setPapers((prev) => prev.filter((p) => p.id !== paperId));
  };

  if (view === 'login') {
    return (
      <LoginPage
        key={preferredLoginRole}
        initialRole={preferredLoginRole}
        onLoginSuccess={handleLoginSuccess}
        onBackHome={handleNavigateHome}
      />
    );
  }

  if (view === 'student-dashboard' && session?.role === 'student') {
    return (
      <StudentDashboard
        lessons={lessons}
        papers={papers}
        completedLessonIds={completedLessonIds}
        onToggleLessonComplete={handleToggleLessonComplete}
        onLogout={handleLogout}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  if (view === 'admin-dashboard' && session?.role === 'admin') {
    return (
      <AdminDashboard
        students={students}
        lessons={lessons}
        papers={papers}
        onAddStudent={handleAddStudent}
        onToggleStudentFee={handleToggleStudentFee}
        onDeleteStudent={handleDeleteStudent}
        onAddLesson={handleAddLesson}
        onUpdateLesson={handleUpdateLesson}
        onDeleteLesson={handleDeleteLesson}
        onAddPaper={handleAddPaper}
        onDeletePaper={handleDeletePaper}
        onLogout={handleLogout}
        onNavigateHome={handleNavigateHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#060919] text-slate-100">
      <Navbar
        session={session}
        onNavigateLogin={() => handleNavigateLogin('student')}
        onNavigateDashboard={handleNavigateDashboard}
        onNavigateHome={handleNavigateHome}
      />
      <PublicHome onNavigateLogin={handleNavigateLogin} />
      <WhatsAppWidget />
    </div>
  );
}
