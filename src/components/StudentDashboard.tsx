import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  FileDown,
  Award,
  Video,
  LogOut,
  CheckCircle2,
  X,
  Clock,
  ExternalLink,
  Home,
} from 'lucide-react';
import {
  ExamResult,
  LessonRecord,
  PaperRecord,
  StudentSection,
} from '../types';
import { DEMO_RESULTS, PUBLIC_COURSES } from '../data/demoStore';
import { downloadGeneratedPdf } from '../utils/pdfDownload';

interface StudentDashboardProps {
  lessons: LessonRecord[];
  papers: PaperRecord[];
  completedLessonIds: string[];
  onToggleLessonComplete: (lessonId: string) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
}

function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com')) {
      const v = parsed.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.replace('/', '');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  lessons,
  papers,
  completedLessonIds,
  onToggleLessonComplete,
  onLogout,
  onNavigateHome,
}) => {
  const [activeSection, setActiveSection] = useState<StudentSection>('overview');
  const [watchingLesson, setWatchingLesson] = useState<LessonRecord | null>(null);
  const [liveClassOpen, setLiveClassOpen] = useState(false);
  const [joinedLiveRoom, setJoinedLiveRoom] = useState(false);
  const [downloadedPaperId, setDownloadedPaperId] = useState<string | null>(null);

  // Keep default progress at 65% on first login (when initial 3 of 5 lessons are checked),
  // and update dynamically if Adnan completes more or fewer lessons.
  const progressPercent = (() => {
    if (lessons.length === 0) return 0;
    if (completedLessonIds.length === 3 && lessons.length === 5) return 65;
    return Math.min(100, Math.round((completedLessonIds.length / lessons.length) * 100));
  })();

  const handleDownloadPaper = (paper: PaperRecord) => {
    downloadGeneratedPdf(
      `${paper.title.replace(/\s+/g, '_')}.pdf`,
      paper.title,
      `${paper.grade} · ${paper.category}`,
      paper.questionsPreview
    );
    setDownloadedPaperId(paper.id);
    setTimeout(() => setDownloadedPaperId(null), 2200);
  };

  const resultsList: ExamResult[] = DEMO_RESULTS;

  return (
    <div className="min-h-screen bg-[#060919] text-slate-100">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-indigo-500/20 bg-[#080D23]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={onNavigateHome}
              className="font-display text-lg font-bold text-white whitespace-nowrap shrink-0 hover:text-indigo-300 transition-colors"
            >
              ICT From ABC
            </button>
            <span className="hidden sm:inline text-slate-600" aria-hidden="true">
              /
            </span>
            <span className="hidden sm:inline text-sm text-indigo-300 truncate">
              Student Learning Portal
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/25 bg-[#0D1433] px-3 py-2 text-xs font-medium text-slate-200 hover:text-white transition-colors whitespace-nowrap"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Public Site</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-rose-500/35 bg-rose-500/10 px-4 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/20 transition-colors whitespace-nowrap"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        {/* Top Welcome & Progress Banner */}
        <section className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-[#0F173B] via-[#151A48] to-[#23154A] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-medium text-indigo-300">
                Grade 12 A/L ICT · Student ID #ICT-2026-101
              </p>
              <h1 className="font-display mt-1.5 text-2xl font-bold text-white sm:text-3xl">
                Hello, Adnan 👋
              </h1>
              <p className="mt-1.5 text-sm text-slate-300">
                Continue your ICT syllabus modules, download 2024 past papers, or join tonight’s live revision clinic.
              </p>
            </div>

            <div className="w-full lg:w-80 rounded-xl border border-indigo-400/25 bg-[#070B1E]/85 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-200">Your Progress</span>
                <span className="font-mono font-bold text-indigo-300 tabular-nums">
                  {progressPercent}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Course completion progress"
                className="mt-2.5 h-2.5 w-full overflow-hidden rounded-full bg-[#151D42]"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-400 tabular-nums">
                {completedLessonIds.length} of {lessons.length} core lessons completed
              </p>
            </div>
          </div>
        </section>

        {/* 5 Action Cards */}
        <section aria-label="Student quick actions">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <button
              type="button"
              onClick={() => setActiveSection('courses')}
              className={`flex flex-col items-start justify-between rounded-xl border p-5 text-left transition-all ${
                activeSection === 'courses'
                  ? 'border-indigo-400 bg-[#141C44]'
                  : 'border-indigo-500/25 bg-[#0C122E] hover:border-indigo-400/50'
              }`}
            >
              <BookOpen className="h-5 w-5 text-blue-400" />
              <div className="mt-4">
                <p className="font-display text-base font-semibold text-white">My Courses</p>
                <p className="mt-0.5 text-xs text-slate-400">O/L & A/L Tracks</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('lessons')}
              className={`flex flex-col items-start justify-between rounded-xl border p-5 text-left transition-all ${
                activeSection === 'lessons' || activeSection === 'overview'
                  ? 'border-indigo-400 bg-[#141C44]'
                  : 'border-indigo-500/25 bg-[#0C122E] hover:border-indigo-400/50'
              }`}
            >
              <Play className="h-5 w-5 text-purple-400" />
              <div className="mt-4">
                <p className="font-display text-base font-semibold text-white">My Lessons</p>
                <p className="mt-0.5 text-xs text-slate-400 tabular-nums">
                  {lessons.length} Video Modules
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('papers')}
              className={`flex flex-col items-start justify-between rounded-xl border p-5 text-left transition-all ${
                activeSection === 'papers'
                  ? 'border-indigo-400 bg-[#141C44]'
                  : 'border-indigo-500/25 bg-[#0C122E] hover:border-indigo-400/50'
              }`}
            >
              <FileDown className="h-5 w-5 text-indigo-400" />
              <div className="mt-4">
                <p className="font-display text-base font-semibold text-white">
                  Past Papers Download
                </p>
                <p className="mt-0.5 text-xs text-slate-400 tabular-nums">
                  {papers.length} Exam PDFs
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('results')}
              className={`flex flex-col items-start justify-between rounded-xl border p-5 text-left transition-all ${
                activeSection === 'results'
                  ? 'border-indigo-400 bg-[#141C44]'
                  : 'border-indigo-500/25 bg-[#0C122E] hover:border-indigo-400/50'
              }`}
            >
              <Award className="h-5 w-5 text-emerald-400" />
              <div className="mt-4">
                <p className="font-display text-base font-semibold text-white">My Results</p>
                <p className="mt-0.5 text-xs text-slate-400 tabular-nums">Avg Score: 88%</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setLiveClassOpen(true);
                setJoinedLiveRoom(false);
              }}
              className="flex flex-col items-start justify-between rounded-xl border border-purple-400/40 bg-gradient-to-br from-blue-600/25 to-purple-600/35 p-5 text-left hover:from-blue-600/35 hover:to-purple-600/45 transition-all"
            >
              <Video className="h-5 w-5 text-white" />
              <div className="mt-4">
                <p className="font-display text-base font-semibold text-white">
                  Join Live Class
                </p>
                <p className="mt-0.5 text-xs text-indigo-200">
                  Today · 7:30 PM Zoom
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Sub-navigation bar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-indigo-500/20 pb-3">
          {(
            [
              { id: 'overview', label: 'All Lessons & Papers' },
              { id: 'lessons', label: 'Video Lessons' },
              { id: 'papers', label: 'Past Papers' },
              { id: 'courses', label: 'Enrolled Courses' },
              { id: 'results', label: 'My Results' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                activeSection === tab.id
                  ? 'bg-indigo-500/25 text-white border border-indigo-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW / LESSONS + PAPERS COMBINED VIEW */}
        {(activeSection === 'overview' || activeSection === 'lessons') && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">
                {activeSection === 'overview' ? 'Quick Study List & Modules' : 'My Video Lessons'}
              </h2>
              <span className="text-xs text-slate-400 tabular-nums">
                {lessons.length} Lessons Available
              </span>
            </div>

            <div className="divide-y divide-indigo-500/20 rounded-xl border border-indigo-500/25 bg-[#0C122E]">
              {lessons.map((lesson) => {
                const isDone = completedLessonIds.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="text-indigo-300 font-medium">{lesson.grade}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{lesson.duration}</span>
                        {isDone && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Completed
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-display mt-1 text-base font-semibold text-white">
                        {lesson.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400 line-clamp-1">
                        {lesson.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setWatchingLesson(lesson)}
                        className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white hover:from-blue-500 hover:to-purple-500 transition-all whitespace-nowrap"
                      >
                        <Play className="h-3.5 w-3.5" />
                        <span>Watch</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* PAST PAPERS LIST (Also shown in Overview) */}
        {(activeSection === 'overview' || activeSection === 'papers') && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">
                Past Papers & Marking Schemes
              </h2>
              <span className="text-xs text-slate-400 tabular-nums">
                {papers.length} PDF Files
              </span>
            </div>

            <div className="divide-y divide-indigo-500/20 rounded-xl border border-indigo-500/25 bg-[#0C122E]">
              {papers.map((paper) => (
                <div
                  key={paper.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="text-purple-300 font-medium">{paper.grade}</span>
                      <span aria-hidden="true">·</span>
                      <span>{paper.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{paper.fileSize}</span>
                    </div>
                    <h3 className="font-display mt-1 text-base font-semibold text-white">
                      {paper.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadPaper(paper)}
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-indigo-400/40 bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-100 hover:bg-indigo-500/30 transition-colors whitespace-nowrap shrink-0"
                  >
                    {downloadedPaperId === paper.id ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span>Downloaded</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="h-4 w-4" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* MY COURSES VIEW */}
        {activeSection === 'courses' && (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {PUBLIC_COURSES.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-indigo-500/25 bg-[#0C122E] p-6"
              >
                <p className="text-xs text-indigo-300">{course.level} · Enrolled Track</p>
                <h3 className="font-display mt-1 text-xl font-bold text-white">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{course.subtitle}</p>
                <p className="mt-4 text-xs text-slate-400">
                  Schedule: {course.schedule}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveSection('lessons')}
                  className="mt-5 inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-xs font-semibold text-white hover:from-blue-500 hover:to-purple-500"
                >
                  <span>Open Course Lessons</span>
                </button>
              </div>
            ))}
          </section>
        )}

        {/* MY RESULTS VIEW */}
        {activeSection === 'results' && (
          <section className="rounded-xl border border-indigo-500/25 bg-[#0C122E] overflow-hidden">
            <div className="border-b border-indigo-500/20 px-6 py-4">
              <h2 className="font-display text-lg font-bold text-white">
                My Assessment & Term Test Results
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-indigo-500/20 bg-[#080D22] text-xs text-slate-400">
                  <tr>
                    <th className="px-6 py-3 font-medium">Assessment</th>
                    <th className="px-6 py-3 font-medium">Module</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium text-right">Score</th>
                    <th className="px-6 py-3 font-medium text-right">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-500/15">
                  {resultsList.map((res) => (
                    <tr key={res.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-medium text-white">{res.assessment}</td>
                      <td className="px-6 py-4 text-slate-300">{res.module}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-400 tabular-nums">
                        {res.date}
                      </td>
                      <td className="px-6 py-4 font-mono text-right font-semibold text-indigo-300 tabular-nums">
                        {res.score}/{res.maxScore}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-emerald-400">
                        {res.grade}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>

      {/* LESSON VIDEO PLAYER MODAL */}
      {watchingLesson && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={watchingLesson.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-indigo-500/35 bg-[#0B1028] shadow-2xl">
            <div className="flex items-center justify-between border-b border-indigo-500/20 px-6 py-4">
              <div>
                <p className="text-xs text-indigo-300">
                  {watchingLesson.grade} · {watchingLesson.duration}
                </p>
                <h3 className="font-display text-lg font-bold text-white">
                  {watchingLesson.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setWatchingLesson(null)}
                aria-label="Close lesson player"
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Video Embed or Interactive Lecture Stage */}
              {toEmbedUrl(watchingLesson.videoLink) ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-indigo-500/25 bg-black">
                  <iframe
                    src={toEmbedUrl(watchingLesson.videoLink)!}
                    title={watchingLesson.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border border-indigo-500/25 bg-gradient-to-br from-[#0D1438] to-[#1D1242] p-6 text-center">
                  <Play className="h-12 w-12 text-indigo-300 mb-3" />
                  <p className="font-display text-base font-semibold text-white">
                    Recorded Lesson Stream Ready
                  </p>
                  <p className="mt-1 font-mono text-xs text-slate-400 break-all max-w-md">
                    Source: {watchingLesson.videoLink}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {watchingLesson.summary}
                </p>
                {watchingLesson.keyTopics.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-400">
                    {watchingLesson.keyTopics.map((topic) => (
                      <li key={topic}>• {topic}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-indigo-500/20 pt-4">
                <button
                  type="button"
                  onClick={() => onToggleLessonComplete(watchingLesson.id)}
                  className={`inline-flex min-h-[40px] items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
                    completedLessonIds.includes(watchingLesson.id)
                      ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    {completedLessonIds.includes(watchingLesson.id)
                      ? 'Completed (Click to Undo)'
                      : 'Mark Lesson Completed'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setWatchingLesson(null)}
                  className="rounded-lg border border-indigo-500/30 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/5"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIVE CLASS MODAL */}
      {liveClassOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Live ICT Class Room"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg rounded-2xl border border-indigo-500/35 bg-[#0B1028] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-purple-300">Live Zoom Session</p>
                <h3 className="font-display mt-1 text-xl font-bold text-white">
                  A/L ICT — K-Map & Logic Circuits Clinic
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLiveClassOpen(false)}
                aria-label="Close live class dialog"
                className="rounded-lg p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-xl border border-indigo-500/20 bg-[#070B1E] p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Instructor</span>
                <span className="font-medium text-white">Kasun Perera</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Time</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-indigo-300">
                  <Clock className="h-3.5 w-3.5" />
                  7:30 PM – 9:30 PM (IST)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Meeting ID</span>
                <span className="font-mono text-xs text-white tabular-nums">842 9104 3319</span>
              </div>
            </div>

            {joinedLiveRoom ? (
              <div className="mt-5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                <p className="font-semibold">Connected to Waiting Room</p>
                <p className="mt-1 text-xs text-emerald-300/90">
                  Your attendance for Adnan Mohamed has been recorded for tonight’s live session.
                </p>
              </div>
            ) : (
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLiveClassOpen(false)}
                  className="rounded-lg border border-indigo-500/30 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setJoinedLiveRoom(true)}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-xs font-semibold text-white hover:from-blue-500 hover:to-purple-500"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Enter Live Classroom</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
