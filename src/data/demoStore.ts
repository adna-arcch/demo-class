import {
  AuthSession,
  CourseItem,
  ExamResult,
  LessonRecord,
  PaperRecord,
  ReviewItem,
  StudentRecord,
  TeacherProfile,
} from '../types';

const STORAGE_KEYS = {
  SESSION: 'ictfromabc_auth_session_v1',
  STUDENTS: 'ictfromabc_students_v1',
  LESSONS: 'ictfromabc_lessons_v1',
  PAPERS: 'ictfromabc_papers_v1',
  COMPLETED_LESSONS: 'ictfromabc_completed_lessons_v1',
} as const;

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'stu-101',
    name: 'Adnan Mohamed',
    grade: 'Grade 12 A/L',
    phone: '077 451 8920',
    fees: 'Paid',
    monthlyAmount: 3000,
    joinedDate: '2026-01-12',
  },
  {
    id: 'stu-102',
    name: 'Kavindu Lakshan',
    grade: 'Grade 11 O/L',
    phone: '071 882 3410',
    fees: 'Paid',
    monthlyAmount: 2000,
    joinedDate: '2026-01-18',
  },
  {
    id: 'stu-103',
    name: 'Fathima Nuzha',
    grade: 'Grade 13 A/L',
    phone: '076 319 6704',
    fees: 'Pending',
    monthlyAmount: 3000,
    joinedDate: '2026-02-03',
  },
  {
    id: 'stu-104',
    name: 'Dinithi Samarasinghe',
    grade: 'Grade 10 O/L',
    phone: '075 904 1182',
    fees: 'Paid',
    monthlyAmount: 2000,
    joinedDate: '2026-02-14',
  },
  {
    id: 'stu-105',
    name: 'Tharindu Bandara',
    grade: 'Grade 12 A/L',
    phone: '077 612 9055',
    fees: 'Pending',
    monthlyAmount: 3000,
    joinedDate: '2026-03-01',
  },
  {
    id: 'stu-106',
    name: 'Ashfaq Ahamed',
    grade: 'Grade 11 O/L',
    phone: '078 245 7731',
    fees: 'Paid',
    monthlyAmount: 2000,
    joinedDate: '2026-03-19',
  },
  {
    id: 'stu-107',
    name: 'Sithumi Wijeratne',
    grade: 'Grade 13 A/L',
    phone: '071 530 4498',
    fees: 'Paid',
    monthlyAmount: 3000,
    joinedDate: '2026-04-02',
  },
  {
    id: 'stu-108',
    name: 'Praveen Kumar',
    grade: 'Grade 10 O/L',
    phone: '076 814 2390',
    fees: 'Pending',
    monthlyAmount: 2000,
    joinedDate: '2026-04-15',
  },
];

export const INITIAL_LESSONS: LessonRecord[] = [
  {
    id: 'les-1',
    title: 'Lesson 1 - Number Systems',
    grade: 'O/L & A/L Foundation',
    videoLink: 'https://www.youtube.com/watch?v=FFDMzZzGSaM',
    duration: '42 min',
    summary:
      'Complete breakdown of Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16) conversions, plus 2s complement signed arithmetic for exam Part I & II.',
    keyTopics: [
      'Positional value weighting across bases',
      'Fast binary-to-hexadecimal 4-bit grouping',
      'Signed magnitude and two’s complement representation',
    ],
    createdAt: '2026-01-10',
  },
  {
    id: 'les-2',
    title: 'Lesson 2 - Logic Gates',
    grade: 'Grade 12 A/L',
    videoLink: 'https://www.youtube.com/watch?v=gI-qXk7XojA',
    duration: '48 min',
    summary:
      'Truth tables, Boolean expressions, SOP/POS simplifications, Karnaugh Maps (K-Maps), and building half-adders from universal NAND and NOR gates.',
    keyTopics: [
      'AND, OR, NOT, NAND, NOR, XOR & XNOR gates',
      'De Morgan’s theorems & algebraic reduction',
      '3-variable and 4-variable K-Map grouping rules',
    ],
    createdAt: '2026-01-24',
  },
  {
    id: 'les-3',
    title: 'Lesson 3 - Python Programming & Flowcharts',
    grade: 'Grade 12 A/L',
    videoLink: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
    duration: '55 min',
    summary:
      'Translating pseudocode and flowcharts into clean Python 3 loops, functions, file handling, and list algorithms tested in A/L structured essays.',
    keyTopics: [
      'While & for loop trace tables',
      'Functions, recursion, and string slicing',
      'File I/O modes (r, w, a) in exam scenarios',
    ],
    createdAt: '2026-02-08',
  },
  {
    id: 'les-4',
    title: 'Lesson 4 - Relational Databases & SQL',
    grade: 'Grade 11 O/L & A/L',
    videoLink: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
    duration: '50 min',
    summary:
      'ER diagrams, 1NF to 3NF normalization steps, primary/foreign key constraints, and writing SELECT, JOIN, and GROUP BY queries accurately.',
    keyTopics: [
      'Entity-Relationship cardinality mapping',
      'Eliminating transitive dependencies (3NF)',
      'SQL DDL & DML query syntax walkthrough',
    ],
    createdAt: '2026-02-22',
  },
  {
    id: 'les-5',
    title: 'Lesson 5 - Computer Networks & IP Subnetting',
    grade: 'Grade 13 A/L',
    videoLink: 'https://www.youtube.com/watch?v=qiQR5rTSshw',
    duration: '58 min',
    summary:
      'OSI 7-layer model, TCP/UDP transport reliability, IPv4 Class A/B/C addressing, and CIDR subnetting calculations step by step.',
    keyTopics: [
      'OSI vs TCP/IP protocol stack comparison',
      'Calculating network ID, broadcast & usable hosts',
      'DNS, DHCP, HTTP & routing protocols',
    ],
    createdAt: '2026-03-09',
  },
];

export const INITIAL_PAPERS: PaperRecord[] = [
  {
    id: 'pap-1',
    title: 'Past Paper 2024',
    grade: 'Grade 13 A/L',
    year: '2024',
    category: 'G.C.E. A/L ICT — Official & Marking Scheme',
    fileSize: '2.4 MB',
    questionsPreview: [
      '1. Convert the decimal value -45 into 8-bit Two’s Complement binary form.',
      '2. Simplify F(A,B,C) = Sum(0, 2, 4, 5, 6) using a 3-variable Karnaugh Map.',
      '3. Given an IPv4 block 192.168.40.0/26, determine subnet mask and valid host range.',
      '4. Draw an ER diagram for an Online Library Borrowing System with cardinality.',
      '5. Write a Python function reading marks from marks.txt and outputting the class average.',
    ],
    createdAt: '2026-01-15',
  },
  {
    id: 'pap-2',
    title: 'Past Paper 2023 (O/L ICT)',
    grade: 'Grade 11 O/L',
    year: '2023',
    category: 'G.C.E. O/L ICT — Part I & II',
    fileSize: '1.8 MB',
    questionsPreview: [
      '1. Identify input, processing, and output stages in a barcode POS system.',
      '2. Convert 10110110 (base 2) into Octal and Hexadecimal.',
      '3. Write the spreadsheet formula to calculate net salary with 8% EPF deduction.',
      '4. Construct the HTML table structure with colspan and rowspan attributes.',
    ],
    createdAt: '2026-01-29',
  },
  {
    id: 'pap-3',
    title: 'Model Paper 2025 — Logic Gates & Number Systems',
    grade: 'Grade 12 A/L',
    year: '2025',
    category: 'Unit Mastery Revision Pack',
    fileSize: '1.5 MB',
    questionsPreview: [
      '1. Realize an XOR gate using only four 2-input NAND gates and verify with a truth table.',
      '2. Perform hexadecimal subtraction 4A7(16) - 1F9(16) showing intermediate borrows.',
      '3. Explain the role of Program Counter (PC) and MAR inside the Fetch-Execute cycle.',
    ],
    createdAt: '2026-02-19',
  },
  {
    id: 'pap-4',
    title: 'Term 2 Structured Essay Paper 2025',
    grade: 'Grade 10 O/L',
    year: '2025',
    category: 'Provincial Term Assessment',
    fileSize: '1.2 MB',
    questionsPreview: [
      '1. Compare RAM, ROM, and Cache memory by volatility, speed, and capacity.',
      '2. Draw a flowchart to input 10 numbers and display the largest even integer.',
      '3. Describe three cyber-hygiene practices for preventing phishing attacks.',
    ],
    createdAt: '2026-03-11',
  },
];

export const DEMO_RESULTS: ExamResult[] = [
  {
    id: 'res-1',
    assessment: 'Unit 01 Mastery Quiz — Number Systems',
    module: 'Number Systems',
    score: 92,
    maxScore: 100,
    grade: 'A+',
    date: '2026-09-18',
  },
  {
    id: 'res-2',
    assessment: 'Logic Gates & K-Map Lab Assessment',
    module: 'Digital Logic',
    score: 88,
    maxScore: 100,
    grade: 'A',
    date: '2026-10-04',
  },
  {
    id: 'res-3',
    assessment: 'Term 02 Mock Paper — Python & SQL',
    module: 'Programming & DB',
    score: 84,
    maxScore: 100,
    grade: 'A',
    date: '2026-10-27',
  },
];

export const PUBLIC_COURSES: CourseItem[] = [
  {
    id: 'course-ol',
    title: 'G.C.E. O/L ICT Complete Track',
    level: 'Grade 10 & 11',
    subtitle: 'Foundations from zero to A-grade exam mastery',
    schedule: 'Saturdays · 4:00 PM – 6:30 PM',
    monthlyFee: 'Rs. 2,000 / month',
    modulesCount: 28,
    mediums: 'English & Sinhala Medium',
    highlights: [
      'Number Systems, Logic Gates & Computer Architecture from scratch',
      'HTML5, CSS, Spreadsheets & Database practical labs',
      '10 years of O/L Past Paper discussions with marking schemes',
    ],
  },
  {
    id: 'course-al',
    title: 'G.C.E. A/L ICT Pro Syllabus',
    level: 'Grade 12 & 13',
    subtitle: 'Deep technical mastery for top Island Z-Scores',
    schedule: 'Sundays · 8:30 AM – 12:00 PM',
    monthlyFee: 'Rs. 3,000 / month',
    modulesCount: 45,
    mediums: 'English & Sinhala Medium',
    highlights: [
      'Boolean Algebra, K-Maps, Operating Systems & IPv4 Subnetting',
      'Full-stack SQL Normalization (1NF–3NF) & Python Algorithms',
      'Timed weekly MCQ drills & structured essay evaluation',
    ],
  },
];

export const PUBLIC_TEACHERS: TeacherProfile[] = [
  {
    id: 't-1',
    name: 'Kasun Perera',
    role: 'Founder & Lead ICT Lecturer',
    credentials: 'B.Sc. (Hons) Computer Science · University of Colombo',
    experience: '11 Years Teaching Experience',
    specialty: 'A/L ICT Theory, Logic Circuits & Python Programming',
    image: '/src/assets/images/teacher_lead_sir_1795187160753.jpg',
    bio: 'Guided over 30,000 O/L and A/L candidates islandwide with simplified visual explanations that turn complex computing concepts into intuitive mental models.',
  },
  {
    id: 't-2',
    name: 'Nethmi Jayasinghe',
    role: 'Senior ICT & Database Instructor',
    credentials: 'B.Sc. Software Engineering · SLIIT',
    experience: '7 Years Teaching Experience',
    specialty: 'O/L ICT, Relational Databases, SQL & Web Technologies',
    image: '/src/assets/images/teacher_al_miss_1795187132094.jpg',
    bio: 'Specializes in step-by-step practical paper clinics, helping beginners build confidence in SQL queries, flowcharts, and web markup before exam day.',
  },
];

export const PUBLIC_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    studentName: 'Tharushi Senanayake',
    achievement: 'A/L 2024 · A Pass (District Rank 04)',
    district: 'Colombo',
    quote:
      'I joined in Grade 12 struggling with K-Maps and subnetting. Breaking every topic down from ABC made Part II structured essays my highest-scoring section.',
  },
  {
    id: 'rev-2',
    studentName: 'Mohamed Rizwan',
    achievement: 'O/L 2024 · A Pass (94/100)',
    district: 'Kandy',
    quote:
      'The recorded lessons and downloadable past paper packs saved me months of guesswork. Every Python and flowchart question in the exam felt familiar.',
  },
  {
    id: 'rev-3',
    studentName: 'Kavishka Dilshan',
    achievement: 'A/L 2024 · A Pass (Z-Score 1.94)',
    district: 'Galle',
    quote:
      'Live revision clinics and instant marking feedback kept me consistent every week. Best structured ICT platform I have used.',
  },
];

export const FREE_RESOURCES = [
  {
    id: 'free-1',
    title: 'Number Systems Conversion Cheat Sheet',
    meta: 'O/L & A/L · PDF · 12 Worked Examples',
    filename: 'ICT_From_ABC_Number_Systems_Guide.pdf',
    lines: [
      '1. Positional Number Systems Overview',
      '   - Binary (Base 2): Digits 0, 1',
      '   - Octal (Base 8): Digits 0 - 7 (3-bit binary groups)',
      '   - Decimal (Base 10): Digits 0 - 9',
      '   - Hexadecimal (Base 16): Digits 0 - 9, A(10) - F(15) (4-bit groups)',
      '',
      '2. Quick Decimal -> Binary (Repeated Division by 2)',
      '   Example: Convert 45(10) to Binary:',
      '   45 / 2 = 22 R 1 | 22 / 2 = 11 R 0 | 11 / 2 = 5 R 1',
      '   5 / 2 = 2 R 1   | 2 / 2 = 1 R 0   | 1 / 2 = 0 R 1',
      '   Result (bottom-to-top): 101101(2)',
      '',
      '3. Binary <-> Hexadecimal Fast Grouping',
      '   Split binary into 4-bit nibbles from right to left:',
      '   1101 1010 -> D A -> DA(16)',
    ],
  },
  {
    id: 'free-2',
    title: 'Boolean Algebra & Logic Gates Handbook',
    meta: 'Grade 12 & 13 A/L · PDF · Truth Tables + K-Map Rules',
    filename: 'ICT_From_ABC_Logic_Gates_Handbook.pdf',
    lines: [
      '1. Fundamental Gates',
      '   - AND (A . B): Output 1 only if all inputs are 1',
      '   - OR  (A + B): Output 1 if at least one input is 1',
      '   - NOT (A bar): Inverts the input state',
      '',
      '2. Universal Gates (NAND & NOR)',
      '   Any combinational logic circuit can be constructed using only NAND or NOR.',
      '',
      '3. De Morgan Theorems',
      '   - (A . B) bar = A bar + B bar',
      '   - (A + B) bar = A bar . B bar',
      '',
      '4. K-Map Grouping Checklist',
      '   Always form largest powers of 2 (16, 8, 4, 2, 1) including wrap-around edges.',
    ],
  },
  {
    id: 'free-3',
    title: '2024 G.C.E. A/L & O/L ICT Past Paper Starter Pack',
    meta: 'Exam Prep · PDF · Model Answers Included',
    filename: 'ICT_From_ABC_Past_Paper_Starter_2024.pdf',
    lines: [
      'G.C.E. ICT 2024 Starter Practice Questions',
      'Q1. Explain the difference between system software and utility software with 2 examples.',
      'Q2. Write an SQL command to retrieve all students in Grade 12 ordered by name.',
      '    Answer: SELECT * FROM students WHERE grade = "Grade 12" ORDER BY name ASC;',
      'Q3. Trace the output of Python loop: for x in range(2, 10, 3): print(x)',
      '    Answer: 2, 5, 8',
      'Q4. What is the maximum number of usable hosts in a /26 IPv4 subnet?',
      '    Answer: 2^(32-26) - 2 = 64 - 2 = 62 usable hosts.',
    ],
  },
];

function safeReadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors in restricted sandboxes
  }
}

export function loadSession(): AuthSession | null {
  return safeReadJson<AuthSession | null>(STORAGE_KEYS.SESSION, null);
}

export function saveSession(session: AuthSession | null): void {
  if (!session) {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch {
      // ignore
    }
    return;
  }
  safeWriteJson(STORAGE_KEYS.SESSION, session);
}

export function loadStudents(): StudentRecord[] {
  const existing = safeReadJson<StudentRecord[] | null>(STORAGE_KEYS.STUDENTS, null);
  if (!existing) {
    safeWriteJson(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
    return INITIAL_STUDENTS;
  }
  return existing;
}

export function saveStudents(students: StudentRecord[]): void {
  safeWriteJson(STORAGE_KEYS.STUDENTS, students);
}

export function loadLessons(): LessonRecord[] {
  const existing = safeReadJson<LessonRecord[] | null>(STORAGE_KEYS.LESSONS, null);
  if (!existing) {
    safeWriteJson(STORAGE_KEYS.LESSONS, INITIAL_LESSONS);
    return INITIAL_LESSONS;
  }
  return existing;
}

export function saveLessons(lessons: LessonRecord[]): void {
  safeWriteJson(STORAGE_KEYS.LESSONS, lessons);
}

export function loadPapers(): PaperRecord[] {
  const existing = safeReadJson<PaperRecord[] | null>(STORAGE_KEYS.PAPERS, null);
  if (!existing) {
    safeWriteJson(STORAGE_KEYS.PAPERS, INITIAL_PAPERS);
    return INITIAL_PAPERS;
  }
  return existing;
}

export function savePapers(papers: PaperRecord[]): void {
  safeWriteJson(STORAGE_KEYS.PAPERS, papers);
}

export function loadCompletedLessons(): string[] {
  const existing = safeReadJson<string[] | null>(STORAGE_KEYS.COMPLETED_LESSONS, null);
  if (!existing) {
    // Default so Adnan's initial progress starts right at 65%
    const seed = ['les-1', 'les-3', 'les-4'];
    safeWriteJson(STORAGE_KEYS.COMPLETED_LESSONS, seed);
    return seed;
  }
  return existing;
}

export function saveCompletedLessons(ids: string[]): void {
  safeWriteJson(STORAGE_KEYS.COMPLETED_LESSONS, ids);
}
