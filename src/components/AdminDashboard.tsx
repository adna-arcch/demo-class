import React, { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Video,
  FileText,
  CreditCard,
  LogOut,
  Plus,
  Search,
  Pencil,
  Trash2,
  FileDown,
  Menu,
  X,
  Check,
  Home,
} from 'lucide-react';
import {
  AdminSection,
  LessonRecord,
  PaperRecord,
  StudentRecord,
} from '../types';
import {
  INITIAL_LESSONS,
  INITIAL_PAPERS,
  INITIAL_STUDENTS,
} from '../data/demoStore';
import { downloadGeneratedPdf } from '../utils/pdfDownload';

interface AdminDashboardProps {
  students: StudentRecord[];
  lessons: LessonRecord[];
  papers: PaperRecord[];
  onAddStudent: (student: Omit<StudentRecord, 'id' | 'joinedDate'>) => void;
  onToggleStudentFee: (studentId: string) => void;
  onDeleteStudent: (studentId: string) => void;
  onAddLesson: (lesson: Omit<LessonRecord, 'id' | 'createdAt'>) => void;
  onUpdateLesson: (lesson: LessonRecord) => void;
  onDeleteLesson: (lessonId: string) => void;
  onAddPaper: (paper: Omit<PaperRecord, 'id' | 'createdAt'>) => void;
  onDeletePaper: (paperId: string) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  lessons,
  papers,
  onAddStudent,
  onToggleStudentFee,
  onDeleteStudent,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  onAddPaper,
  onDeletePaper,
  onLogout,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<AdminSection>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Students filter + Add modal state
  const [studentSearch, setStudentSearch] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('Grade 12 A/L');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentFees, setNewStudentFees] = useState<'Paid' | 'Pending'>('Paid');

  // Lessons form + Edit state
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonGrade, setLessonGrade] = useState('Grade 12 A/L');
  const [lessonVideoLink, setLessonVideoLink] = useState('');
  const [editingLesson, setEditingLesson] = useState<LessonRecord | null>(null);

  // Papers upload form state
  const [paperTitle, setPaperTitle] = useState('');
  const [paperGrade, setPaperGrade] = useState('Grade 13 A/L');
  const [paperYear, setPaperYear] = useState('2025');
  const [paperCategory, setPaperCategory] = useState('G.C.E. A/L ICT — Past Paper PDF');

  // Base KPI alignment: starts at exact requested demo metrics
  // (120 Students, 45 Lessons, 30 Papers, Rs. 85,000 Monthly Income)
  // and reacts immediately as Admin adds records or toggles Paid/Unpaid.
  const kpis = useMemo(() => {
    const initialPaidTotal = INITIAL_STUDENTS.filter((s) => s.fees === 'Paid').reduce(
      (sum, s) => sum + s.monthlyAmount,
      0
    );
    const currentPaidTotal = students
      .filter((s) => s.fees === 'Paid')
      .reduce((sum, s) => sum + s.monthlyAmount, 0);

    const totalStudents = Math.max(0, 120 + (students.length - INITIAL_STUDENTS.length));
    const totalLessons = Math.max(0, 45 + (lessons.length - INITIAL_LESSONS.length));
    const totalPapers = Math.max(0, 30 + (papers.length - INITIAL_PAPERS.length));
    const monthlyIncome = Math.max(0, 85000 + (currentPaidTotal - initialPaidTotal));

    return { totalStudents, totalLessons, totalPapers, monthlyIncome };
  }, [students, lessons, papers]);

  const filteredStudents = useMemo(() => {
    const q = studentSearch.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.grade.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        s.fees.toLowerCase().includes(q)
    );
  }, [students, studentSearch]);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentPhone.trim()) return;
    const monthlyAmount = newStudentGrade.includes('A/L') ? 3000 : 2000;
    onAddStudent({
      name: newStudentName.trim(),
      grade: newStudentGrade,
      phone: newStudentPhone.trim(),
      fees: newStudentFees,
      monthlyAmount,
    });
    setNewStudentName('');
    setNewStudentPhone('');
    setNewStudentFees('Paid');
    setShowAddStudentModal(false);
  };

  const handleLessonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !lessonVideoLink.trim()) return;

    if (editingLesson) {
      onUpdateLesson({
        ...editingLesson,
        title: lessonTitle.trim(),
        grade: lessonGrade,
        videoLink: lessonVideoLink.trim(),
      });
      setEditingLesson(null);
    } else {
      onAddLesson({
        title: lessonTitle.trim(),
        grade: lessonGrade,
        videoLink: lessonVideoLink.trim(),
        duration: '45 min',
        summary: `Uploaded module for ${lessonGrade} syllabus coverage.`,
        keyTopics: ['Core theory breakdown', 'Worked past paper examples'],
      });
    }
    setLessonTitle('');
    setLessonVideoLink('');
  };

  const startEditLesson = (lesson: LessonRecord) => {
    setEditingLesson(lesson);
    setLessonTitle(lesson.title);
    setLessonGrade(lesson.grade);
    setLessonVideoLink(lesson.videoLink);
  };

  const handlePaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperTitle.trim()) return;
    onAddPaper({
      title: paperTitle.trim(),
      grade: paperGrade,
      year: paperYear,
      category: paperCategory,
      fileSize: '1.6 MB',
      questionsPreview: [
        `${paperTitle.trim()} (${paperGrade} - ${paperYear})`,
        'Part I: 40 Multiple Choice Questions covering syllabus fundamentals.',
        'Part II: Structured Essay Questions with step-by-step marking scheme.',
      ],
    });
    setPaperTitle('');
  };

  const menuItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'students', label: 'Manage Students', icon: <Users className="h-4 w-4" /> },
    { id: 'lessons', label: 'Manage Lessons', icon: <Video className="h-4 w-4" /> },
    { id: 'papers', label: 'Manage Papers', icon: <FileText className="h-4 w-4" /> },
    { id: 'payments', label: 'Manage Payments', icon: <CreditCard className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#060919] text-slate-100 flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-indigo-500/20 bg-[#080D22] flex flex-col justify-between transition-transform duration-200 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-indigo-500/20 px-5 py-4">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-display text-lg font-bold text-white whitespace-nowrap"
            >
              ICT From ABC
            </button>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="lg:hidden rounded-md p-1 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="p-3 space-y-1" aria-label="Admin navigation">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`flex w-full min-h-[42px] items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-indigo-400/40'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="border-t border-indigo-500/20 p-3 space-y-1.5">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex w-full min-h-[40px] items-center gap-3 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span>View Public Site</span>
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full min-h-[40px] items-center gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3.5 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/20"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-indigo-500/20 bg-[#080D23]/95 px-4 py-3.5 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open admin menu"
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-[#0D1433] text-slate-200"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-display text-lg font-bold text-white sm:text-xl truncate">
                  Admin Panel — Welcome Sir
                </h1>
                <p className="text-xs text-slate-400">
                  {menuItems.find((m) => m.id === activeTab)?.label}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex min-h-[38px] items-center gap-2 rounded-lg border border-rose-500/35 bg-rose-500/10 px-3.5 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-500/20 transition-colors whitespace-nowrap"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8">
          {/* STATS CARDS (Always visible on Dashboard overview & top summary) */}
          <section aria-label="Academy KPI overview">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border border-indigo-500/25 bg-gradient-to-br from-[#0E1535] to-[#0B1028] p-5">
                <p className="text-xs font-medium text-slate-400">Total Students</p>
                <p className="font-display mt-2 text-3xl font-bold text-white tabular-nums">
                  {kpis.totalStudents}
                </p>
                <p className="mt-1 text-xs text-indigo-300">Active O/L & A/L roster</p>
              </div>

              <div className="rounded-xl border border-indigo-500/25 bg-gradient-to-br from-[#0E1535] to-[#0B1028] p-5">
                <p className="text-xs font-medium text-slate-400">Total Lessons</p>
                <p className="font-display mt-2 text-3xl font-bold text-white tabular-nums">
                  {kpis.totalLessons}
                </p>
                <p className="mt-1 text-xs text-purple-300">Published video modules</p>
              </div>

              <div className="rounded-xl border border-indigo-500/25 bg-gradient-to-br from-[#0E1535] to-[#0B1028] p-5">
                <p className="text-xs font-medium text-slate-400">Total Papers</p>
                <p className="font-display mt-2 text-3xl font-bold text-white tabular-nums">
                  {kpis.totalPapers}
                </p>
                <p className="mt-1 text-xs text-blue-300">Past & model PDFs</p>
              </div>

              <div className="rounded-xl border border-indigo-500/25 bg-gradient-to-br from-[#0E1535] to-[#19133C] p-5">
                <p className="text-xs font-medium text-slate-400">Monthly Income</p>
                <p className="font-mono mt-2 text-3xl font-bold text-emerald-300 tabular-nums">
                  Rs. {kpis.monthlyIncome.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-slate-400">Updates with fee status</p>
              </div>
            </div>
          </section>

          {/* DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-indigo-500/25 bg-[#0C122E] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-base font-bold text-white">
                    Recent Student Registrations
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('students')}
                    className="text-xs font-semibold text-indigo-300 hover:text-white"
                  >
                    Manage All →
                  </button>
                </div>
                <div className="divide-y divide-indigo-500/15">
                  {students.slice(0, 4).map((s) => (
                    <div key={s.id} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <p className="font-medium text-white">{s.name}</p>
                        <p className="text-xs text-slate-400">
                          {s.grade} · {s.phone}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold ${
                          s.fees === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {s.fees}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-indigo-500/25 bg-[#0C122E] p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-base font-bold text-white">
                    Published Video Lessons
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('lessons')}
                    className="text-xs font-semibold text-indigo-300 hover:text-white"
                  >
                    Manage Lessons →
                  </button>
                </div>
                <div className="divide-y divide-indigo-500/15">
                  {lessons.slice(0, 4).map((l) => (
                    <div key={l.id} className="flex items-center justify-between py-3 text-sm">
                      <div className="min-w-0 pr-3">
                        <p className="font-medium text-white truncate">{l.title}</p>
                        <p className="text-xs text-slate-400">{l.grade}</p>
                      </div>
                      <span className="font-mono text-xs text-indigo-300 shrink-0 tabular-nums">
                        {l.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MANAGE STUDENTS */}
          {activeTab === 'students' && (
            <section className="rounded-xl border border-indigo-500/25 bg-[#0C122E] overflow-hidden">
              <div className="flex flex-col gap-4 border-b border-indigo-500/20 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search name, grade, or phone..."
                    className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(true)}
                  className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white hover:from-blue-500 hover:to-purple-500 whitespace-nowrap"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Student</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-indigo-500/20 bg-[#080D22] text-xs text-slate-400">
                    <tr>
                      <th className="px-5 py-3 font-medium">Name</th>
                      <th className="px-5 py-3 font-medium">Grade</th>
                      <th className="px-5 py-3 font-medium">Phone</th>
                      <th className="px-5 py-3 font-medium">Fees</th>
                      <th className="px-5 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-500/15">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-8 text-center text-sm text-slate-400">
                          No students match "{studentSearch}".
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-white/[0.02]">
                          <td className="px-5 py-3.5 font-medium text-white">
                            {student.name}
                          </td>
                          <td className="px-5 py-3.5 text-slate-300">{student.grade}</td>
                          <td className="px-5 py-3.5 font-mono text-xs text-slate-300 tabular-nums">
                            {student.phone}
                          </td>
                          <td className="px-5 py-3.5">
                            <button
                              type="button"
                              onClick={() => onToggleStudentFee(student.id)}
                              title="Click to toggle Paid / Pending"
                              className={`text-xs font-semibold underline-offset-2 hover:underline ${
                                student.fees === 'Paid' ? 'text-emerald-400' : 'text-amber-400'
                              }`}
                            >
                              {student.fees}
                            </button>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => onDeleteStudent(student.id)}
                              aria-label={`Remove ${student.name}`}
                              className="rounded-md p-1.5 text-slate-400 hover:bg-rose-500/15 hover:text-rose-300 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* MANAGE LESSONS */}
          {activeTab === 'lessons' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <form
                onSubmit={handleLessonSubmit}
                className="lg:col-span-4 rounded-xl border border-indigo-500/25 bg-[#0C122E] p-5 space-y-4 h-fit"
              >
                <h2 className="font-display text-base font-bold text-white">
                  {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
                </h2>

                <div>
                  <label htmlFor="lesson-title" className="block text-xs font-medium text-slate-300 mb-1">
                    Lesson Title
                  </label>
                  <input
                    id="lesson-title"
                    type="text"
                    required
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="e.g. Lesson 6 - Operating Systems"
                    className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="lesson-grade" className="block text-xs font-medium text-slate-300 mb-1">
                    Grade
                  </label>
                  <select
                    id="lesson-grade"
                    value={lessonGrade}
                    onChange={(e) => setLessonGrade(e.target.value)}
                    className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
                  >
                    <option value="Grade 10 O/L">Grade 10 O/L</option>
                    <option value="Grade 11 O/L">Grade 11 O/L</option>
                    <option value="Grade 12 A/L">Grade 12 A/L</option>
                    <option value="Grade 13 A/L">Grade 13 A/L</option>
                    <option value="O/L & A/L Foundation">O/L & A/L Foundation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="lesson-video" className="block text-xs font-medium text-slate-300 mb-1">
                    Video Link
                  </label>
                  <input
                    id="lesson-video"
                    type="url"
                    required
                    value={lessonVideoLink}
                    onChange={(e) => setLessonVideoLink(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 min-h-[42px] rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white hover:from-blue-500 hover:to-purple-500"
                  >
                    {editingLesson ? 'Save Changes' : 'Upload'}
                  </button>
                  {editingLesson && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLesson(null);
                        setLessonTitle('');
                        setLessonVideoLink('');
                      }}
                      className="rounded-lg border border-indigo-500/30 px-3 py-2 text-xs text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              <div className="lg:col-span-8 rounded-xl border border-indigo-500/25 bg-[#0C122E] overflow-hidden">
                <div className="border-b border-indigo-500/20 px-5 py-4 flex items-center justify-between">
                  <h2 className="font-display text-base font-bold text-white">Lessons List</h2>
                  <span className="text-xs text-slate-400 tabular-nums">{lessons.length} items</span>
                </div>
                <div className="divide-y divide-indigo-500/15">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-xs text-indigo-300">{lesson.grade}</p>
                        <h3 className="font-display text-sm font-semibold text-white">
                          {lesson.title}
                        </h3>
                        <p className="mt-0.5 font-mono text-xs text-slate-400 truncate max-w-md">
                          {lesson.videoLink}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => startEditLesson(lesson)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/25"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteLesson(lesson.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-500/25"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MANAGE PAPERS */}
          {activeTab === 'papers' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <form
                onSubmit={handlePaperSubmit}
                className="lg:col-span-4 rounded-xl border border-indigo-500/25 bg-[#0C122E] p-5 space-y-4 h-fit"
              >
                <h2 className="font-display text-base font-bold text-white">Upload Paper</h2>

                <div>
                  <label htmlFor="paper-title" className="block text-xs font-medium text-slate-300 mb-1">
                    Paper Title
                  </label>
                  <input
                    id="paper-title"
                    type="text"
                    required
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    placeholder="e.g. Past Paper 2025 — Part II"
                    className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="paper-grade" className="block text-xs font-medium text-slate-300 mb-1">
                      Grade
                    </label>
                    <select
                      id="paper-grade"
                      value={paperGrade}
                      onChange={(e) => setPaperGrade(e.target.value)}
                      className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
                    >
                      <option value="Grade 10 O/L">Grade 10 O/L</option>
                      <option value="Grade 11 O/L">Grade 11 O/L</option>
                      <option value="Grade 12 A/L">Grade 12 A/L</option>
                      <option value="Grade 13 A/L">Grade 13 A/L</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="paper-year" className="block text-xs font-medium text-slate-300 mb-1">
                      Year
                    </label>
                    <input
                      id="paper-year"
                      type="text"
                      value={paperYear}
                      onChange={(e) => setPaperYear(e.target.value)}
                      className="font-mono w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="paper-category" className="block text-xs font-medium text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    id="paper-category"
                    type="text"
                    value={paperCategory}
                    onChange={(e) => setPaperCategory(e.target.value)}
                    className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[42px] rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white hover:from-blue-500 hover:to-purple-500"
                >
                  Upload Paper
                </button>
              </form>

              <div className="lg:col-span-8 rounded-xl border border-indigo-500/25 bg-[#0C122E] overflow-hidden">
                <div className="border-b border-indigo-500/20 px-5 py-4 flex items-center justify-between">
                  <h2 className="font-display text-base font-bold text-white">Papers List</h2>
                  <span className="text-xs text-slate-400 tabular-nums">{papers.length} PDFs</span>
                </div>
                <div className="divide-y divide-indigo-500/15">
                  {papers.map((paper) => (
                    <div
                      key={paper.id}
                      className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-xs text-purple-300">
                          {paper.grade} · {paper.year}
                        </p>
                        <h3 className="font-display text-sm font-semibold text-white">
                          {paper.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-400">{paper.category}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            downloadGeneratedPdf(
                              `${paper.title.replace(/\s+/g, '_')}.pdf`,
                              paper.title,
                              `${paper.grade} · ${paper.category}`,
                              paper.questionsPreview
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-200 hover:bg-indigo-500/25"
                        >
                          <FileDown className="h-3.5 w-3.5" />
                          <span>PDF</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeletePaper(paper.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-200 hover:bg-rose-500/25"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MANAGE PAYMENTS */}
          {activeTab === 'payments' && (
            <section className="rounded-xl border border-indigo-500/25 bg-[#0C122E] overflow-hidden">
              <div className="border-b border-indigo-500/20 px-6 py-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-display text-base font-bold text-white">
                    Student Fee Payments
                  </h2>
                  <p className="text-xs text-slate-400">
                    Toggle Paid / Unpaid status to update monthly tuition records.
                  </p>
                </div>
                <span className="font-mono text-sm font-semibold text-emerald-300 tabular-nums">
                  Monthly Total: Rs. {kpis.monthlyIncome.toLocaleString()}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-indigo-500/20 bg-[#080D22] text-xs text-slate-400">
                    <tr>
                      <th className="px-6 py-3 font-medium">Student Name</th>
                      <th className="px-6 py-3 font-medium">Grade</th>
                      <th className="px-6 py-3 font-medium text-right">Amount</th>
                      <th className="px-6 py-3 font-medium text-right">Status Toggle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-500/15">
                    {students.map((student) => {
                      const isPaid = student.fees === 'Paid';
                      return (
                        <tr key={student.id} className="hover:bg-white/[0.02]">
                          <td className="px-6 py-4 font-medium text-white">
                            {student.name}
                          </td>
                          <td className="px-6 py-4 text-slate-300">{student.grade}</td>
                          <td className="px-6 py-4 font-mono text-right text-slate-200 tabular-nums">
                            Rs. {student.monthlyAmount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              type="button"
                              onClick={() => onToggleStudentFee(student.id)}
                              className={`inline-flex min-w-[96px] items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                                isPaid
                                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25'
                                  : 'border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                              }`}
                            >
                              {isPaid && <Check className="h-3.5 w-3.5" />}
                              <span>{isPaid ? 'Paid' : 'Unpaid'}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* ADD NEW STUDENT MODAL */}
      {showAddStudentModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add New Student"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <form
            onSubmit={handleCreateStudent}
            className="w-full max-w-md rounded-2xl border border-indigo-500/35 bg-[#0B1028] p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-white">Add New Student</h3>
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                aria-label="Close add student modal"
                className="rounded-md p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <label htmlFor="stu-name" className="block text-xs font-medium text-slate-300 mb-1">
                Student Name
              </label>
              <input
                id="stu-name"
                type="text"
                required
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="e.g. Nimal Perera"
                className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="stu-grade" className="block text-xs font-medium text-slate-300 mb-1">
                Grade
              </label>
              <select
                id="stu-grade"
                value={newStudentGrade}
                onChange={(e) => setNewStudentGrade(e.target.value)}
                className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
              >
                <option value="Grade 10 O/L">Grade 10 O/L</option>
                <option value="Grade 11 O/L">Grade 11 O/L</option>
                <option value="Grade 12 A/L">Grade 12 A/L</option>
                <option value="Grade 13 A/L">Grade 13 A/L</option>
              </select>
            </div>

            <div>
              <label htmlFor="stu-phone" className="block text-xs font-medium text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                id="stu-phone"
                type="tel"
                required
                value={newStudentPhone}
                onChange={(e) => setNewStudentPhone(e.target.value)}
                placeholder="077 123 4567"
                className="font-mono w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="stu-fees" className="block text-xs font-medium text-slate-300 mb-1">
                Fee Status
              </label>
              <select
                id="stu-fees"
                value={newStudentFees}
                onChange={(e) => setNewStudentFees(e.target.value as 'Paid' | 'Pending')}
                className="w-full rounded-lg border border-indigo-500/30 bg-[#060919] px-3 py-2 text-sm text-white focus:border-indigo-400 focus:outline-none"
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="rounded-lg border border-indigo-500/30 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-xs font-semibold text-white hover:from-blue-500 hover:to-purple-500"
              >
                Save Student
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
