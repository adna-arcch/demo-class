import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Download,
  Check,
  PlayCircle,
  Quote,
  Binary,
  GraduationCap,
} from 'lucide-react';
import {
  FREE_RESOURCES,
  PUBLIC_COURSES,
  PUBLIC_REVIEWS,
  PUBLIC_TEACHERS,
} from '../data/demoStore';
import { downloadGeneratedPdf } from '../utils/pdfDownload';

interface PublicHomeProps {
  onNavigateLogin: (preferredRole?: 'student' | 'admin') => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({ onNavigateLogin }) => {
  const [decimalInput, setDecimalInput] = useState<string>('45');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [heroImgError, setHeroImgError] = useState(false);
  const [courseImgError, setCourseImgError] = useState(false);
  const [teacherImgErrors, setTeacherImgErrors] = useState<Record<string, boolean>>({});

  const parsedDecimal = (() => {
    const n = Number.parseInt(decimalInput, 10);
    if (Number.isNaN(n) || n < 0) return null;
    return Math.min(n, 65535);
  })();

  const handleDownloadFreeResource = (res: (typeof FREE_RESOURCES)[number]) => {
    downloadGeneratedPdf(res.filename, res.title, res.meta, res.lines);
    setDownloadedId(res.id);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-indigo-500/20 bg-gradient-to-br from-[#070B1E] via-[#111942] to-[#1E1344]">
        {/* Architectural grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(129, 140, 248, 0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(129, 140, 248, 0.14) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-medium text-indigo-300 mb-3">
                G.C.E. O/L & A/L ICT Online Academy · English & Sinhala Medium
              </p>
              <h1 className="font-display text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                Learn ICT From ABC To Pro Level
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Structured video modules, interactive past paper clinics, and weekly live sessions designed to take beginners from core binary fundamentals to top island examination results.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigateLogin('student')}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/50 hover:from-blue-500 hover:to-purple-500 transition-all duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                >
                  <span>Start Learning Now</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href="#courses"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-lg border border-indigo-400/35 bg-[#0D1433]/80 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-indigo-500/15 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                >
                  <BookOpen className="h-4 w-4 text-indigo-300" />
                  <span>Explore O/L & A/L Tracks</span>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
                <span>Weekly Live Zoom Classes</span>
                <span aria-hidden="true">·</span>
                <span>10-Year Past Paper Bank</span>
                <span aria-hidden="true">·</span>
                <span>24/7 Recorded Replay Access</span>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6 flex">
              <div className="relative w-full overflow-hidden rounded-xl border border-indigo-400/25 bg-[#0C122D] shadow-2xl">
                {!heroImgError ? (
                  <img
                    src="/src/assets/images/hero_ict_workspace_1795187132638.jpg"
                    alt="ICT student workstation displaying logic diagrams and Python code"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="h-64 w-full object-cover sm:h-80 lg:h-full"
                  />
                ) : (
                  <div className="flex h-64 w-full flex-col items-center justify-center bg-gradient-to-br from-blue-950 to-purple-950 p-8 text-center lg:h-full">
                    <Binary className="h-12 w-12 text-indigo-300 mb-3" />
                    <p className="font-display text-lg font-semibold text-white">
                      Interactive Computing & Logic Studio
                    </p>
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070B1E]/85 via-transparent to-transparent"
                />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-[#080D24]/85 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="text-xs text-indigo-300">Featured Module</p>
                    <p className="font-display text-sm font-semibold text-white">
                      Lesson 01 — Number Systems & Logic Circuits
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateLogin('student')}
                    className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/25 px-3 py-1.5 text-xs font-semibold text-indigo-100 hover:bg-indigo-500/40 transition-colors whitespace-nowrap"
                  >
                    <PlayCircle className="h-3.5 w-3.5" />
                    <span>Preview in Portal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section aria-label="Academy performance metrics" className="border-b border-indigo-500/20 bg-[#080D22]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 divide-y divide-indigo-500/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="py-7 sm:pr-8">
              <p className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
                30K+
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Students mentored across Sri Lanka
              </p>
            </div>
            <div className="py-7 sm:px-8">
              <p className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
                500+
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Structured video lessons & revision clinics
              </p>
            </div>
            <div className="py-7 sm:pl-8">
              <p className="font-display text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
                98%
              </p>
              <p className="mt-1 text-sm text-slate-300">
                National exam pass rate (2022–2025 cohorts)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION (O/L ICT & A/L ICT) */}
      <section id="courses" className="py-16 sm:py-20 bg-[#060919]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-purple-300">Structured Academic Tracks</p>
              <h2 className="font-display mt-1 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
                O/L ICT & A/L ICT Courses
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-400">
              Every syllabus unit is taught from first principles with worked past paper breakdowns and live doubt-clearing.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {PUBLIC_COURSES.map((course, idx) => (
              <div
                key={course.id}
                className={`rounded-xl border border-indigo-500/25 bg-gradient-to-b from-[#0E1535] to-[#0A0F26] p-6 sm:p-8 flex flex-col justify-between ${
                  idx === 1 ? 'lg:col-span-7' : 'lg:col-span-5'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-300">
                    <span>{course.level}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.mediums}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{course.modulesCount} Modules</span>
                  </div>

                  <h3 className="font-display mt-3 text-2xl font-bold text-white">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-300">{course.subtitle}</p>

                  {idx === 1 && (
                    <div className="mt-5 overflow-hidden rounded-lg border border-indigo-500/20 bg-[#070B1E]">
                      {!courseImgError ? (
                        <img
                          src="/src/assets/images/course_hardware_circuit_1795187132244.jpg"
                          alt="Microprocessor architecture and digital logic hardware module visual"
                          referrerPolicy="no-referrer"
                          onError={() => setCourseImgError(true)}
                          className="h-44 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-44 items-center justify-center bg-gradient-to-r from-blue-950 to-purple-950">
                          <GraduationCap className="h-10 w-10 text-indigo-300" />
                        </div>
                      )}
                    </div>
                  )}

                  <ul className="mt-6 space-y-3 border-t border-indigo-500/20 pt-5">
                    {course.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-indigo-500/20 pt-5">
                  <div>
                    <p className="text-xs text-slate-400">{course.schedule}</p>
                    <p className="font-mono mt-0.5 text-lg font-semibold text-white tabular-nums">
                      {course.monthlyFee}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateLogin('student')}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white hover:from-blue-500 hover:to-purple-500 transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <span>Join Class Portal</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE RESOURCES + INTERACTIVE NUMBER SYSTEM CONVERTER */}
      <section id="resources" className="border-y border-indigo-500/20 bg-gradient-to-b from-[#0A0F28] to-[#080C20] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* Left: Free PDF Resource Bank */}
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-blue-300">Open Study Library</p>
              <h2 className="font-display mt-1 text-balance text-3xl font-bold tracking-tight text-white">
                Free ICT Resources & Study Guides
              </h2>
              <p className="mt-2 text-sm text-slate-300 max-w-2xl">
                Download printable exam summary sheets and 2024 past paper starter packs prepared by our faculty.
              </p>

              <div className="mt-7 divide-y divide-indigo-500/20 rounded-xl border border-indigo-500/25 bg-[#0D1433]/90">
                {FREE_RESOURCES.map((res) => (
                  <div
                    key={res.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">
                        {res.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">{res.meta}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadFreeResource(res)}
                      className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg border border-indigo-400/35 bg-indigo-500/15 px-4 py-2 text-xs font-semibold text-indigo-100 hover:bg-indigo-500/30 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    >
                      {downloadedId === res.id ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span>PDF Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Interactive Number System Sandbox */}
            <div className="lg:col-span-5 rounded-xl border border-purple-500/30 bg-[#0E1538] p-6">
              <p className="text-xs font-medium text-purple-300">Interactive Lab Preview</p>
              <h3 className="font-display mt-1 text-xl font-bold text-white">
                Number Systems Converter
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Enter any decimal integer (0 – 65535) to verify Binary, Octal, and Hexadecimal conversions instantly.
              </p>

              <div className="mt-5">
                <label htmlFor="decimal-sandbox" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Decimal Value (Base 10)
                </label>
                <input
                  id="decimal-sandbox"
                  type="number"
                  min={0}
                  max={65535}
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  className="font-mono w-full rounded-lg border border-indigo-400/30 bg-[#070B1E] px-3.5 py-2.5 text-base font-semibold text-white tabular-nums focus:border-purple-400 focus:outline-none"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between rounded-lg border border-indigo-500/20 bg-[#070B1E] px-4 py-3">
                  <span className="text-xs text-slate-400">Binary (Base 2)</span>
                  <span className="font-mono text-sm font-semibold text-blue-300 tabular-nums">
                    {parsedDecimal !== null ? parsedDecimal.toString(2).padStart(8, '0') : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-indigo-500/20 bg-[#070B1E] px-4 py-3">
                  <span className="text-xs text-slate-400">Octal (Base 8)</span>
                  <span className="font-mono text-sm font-semibold text-indigo-300 tabular-nums">
                    {parsedDecimal !== null ? parsedDecimal.toString(8) : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-indigo-500/20 bg-[#070B1E] px-4 py-3">
                  <span className="text-xs text-slate-400">Hexadecimal (Base 16)</span>
                  <span className="font-mono text-sm font-semibold text-purple-300 tabular-nums">
                    {parsedDecimal !== null ? parsedDecimal.toString(16).toUpperCase() : '—'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHERS SECTION */}
      <section id="teachers" className="py-16 sm:py-20 bg-[#060919]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-medium text-indigo-300">Academic Faculty</p>
            <h2 className="font-display mt-1 text-balance text-3xl font-bold tracking-tight text-white">
              Learn With Experienced ICT Lecturers
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {PUBLIC_TEACHERS.map((teacher) => (
              <div
                key={teacher.id}
                className="flex flex-col sm:flex-row gap-6 rounded-xl border border-indigo-500/25 bg-[#0C122E] p-6"
              >
                <div className="h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-lg border border-indigo-400/25 bg-[#12193E]">
                  {!teacherImgErrors[teacher.id] ? (
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setTeacherImgErrors((prev) => ({ ...prev, [teacher.id]: true }))
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-indigo-200">
                      {teacher.name
                        .split(' ')
                        .map((p) => p[0])
                        .join('')}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-purple-300">{teacher.role}</p>
                  <h3 className="font-display mt-1 text-xl font-bold text-white">
                    {teacher.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {teacher.credentials} · {teacher.experience}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {teacher.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section id="reviews" className="border-t border-indigo-500/20 bg-[#080C21] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-medium text-purple-300">Student Outcomes</p>
            <h2 className="font-display mt-1 text-balance text-3xl font-bold tracking-tight text-white">
              Verified Results & Student Reviews
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PUBLIC_REVIEWS.map((review) => (
              <blockquote
                key={review.id}
                className="flex flex-col justify-between rounded-xl border border-indigo-500/25 bg-[#0D1433] p-6"
              >
                <div>
                  <Quote className="h-5 w-5 text-indigo-400 mb-3" />
                  <p className="text-sm leading-relaxed text-slate-200">
                    "{review.quote}"
                  </p>
                </div>
                <footer className="mt-6 border-t border-indigo-500/20 pt-4">
                  <p className="font-display text-sm font-semibold text-white">
                    {review.studentName}
                  </p>
                  <p className="mt-0.5 text-xs text-indigo-300">
                    {review.achievement} · {review.district}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-indigo-500/20 bg-[#050816] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="font-display text-lg font-bold text-white">ICT From ABC</p>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                Structured O/L and A/L Information & Communication Technology academy serving students across Sri Lanka.
              </p>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-white">Navigation</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li><a href="#courses" className="hover:text-white transition-colors">O/L & A/L Courses</a></li>
                <li><a href="#resources" className="hover:text-white transition-colors">Free Resources</a></li>
                <li><a href="#teachers" className="hover:text-white transition-colors">Faculty</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Student Reviews</a></li>
              </ul>
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-white">Academy Portals</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateLogin('student')}
                    className="hover:text-white transition-colors"
                  >
                    Student Login
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateLogin('admin')}
                    className="hover:text-white transition-colors"
                  >
                    Admin Login
                  </button>
                </li>
                <li className="text-xs text-slate-500 pt-1">
                  Hotline: +94 77 450 8820
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-indigo-500/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 ICT From ABC Academy. All rights reserved.</p>
            <p>Colombo · Kandy · Islandwide Online</p>
          </div>
        </div>
      </footer>
    </main>
  );
};
