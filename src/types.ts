export type UserRole = 'student' | 'admin';

export type AppView = 'home' | 'login' | 'student-dashboard' | 'admin-dashboard';

export interface AuthSession {
  role: UserRole;
  username: string;
  displayName: string;
  loggedInAt: string;
}

export type FeeStatus = 'Paid' | 'Pending';

export interface StudentRecord {
  id: string;
  name: string;
  grade: string;
  phone: string;
  fees: FeeStatus;
  monthlyAmount: number;
  joinedDate: string;
}

export interface LessonRecord {
  id: string;
  title: string;
  grade: string;
  videoLink: string;
  duration: string;
  summary: string;
  keyTopics: string[];
  createdAt: string;
}

export interface PaperRecord {
  id: string;
  title: string;
  grade: string;
  year: string;
  category: string;
  fileSize: string;
  questionsPreview: string[];
  createdAt: string;
}

export interface ExamResult {
  id: string;
  assessment: string;
  module: string;
  score: number;
  maxScore: number;
  grade: string;
  date: string;
}

export interface CourseItem {
  id: string;
  title: string;
  level: string;
  subtitle: string;
  schedule: string;
  monthlyFee: string;
  modulesCount: number;
  highlights: string[];
  mediums: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  role: string;
  credentials: string;
  experience: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface ReviewItem {
  id: string;
  studentName: string;
  achievement: string;
  district: string;
  quote: string;
}

export type AdminSection =
  | 'dashboard'
  | 'students'
  | 'lessons'
  | 'papers'
  | 'payments';

export type StudentSection =
  | 'overview'
  | 'courses'
  | 'lessons'
  | 'papers'
  | 'results';
