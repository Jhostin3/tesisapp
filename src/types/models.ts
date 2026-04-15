export type RoleName = 'guardia' | 'estudiante';

export type AppProfile = {
  id: string;
  role: RoleName;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  status: string;
  cedula?: string;
  course?: string;
  campus?: string;
  personId?: string;
  studentId?: string;
};

export type GuardProfile = AppProfile & {
  role: 'guardia';
  campus: string;
};

export type StudentProfile = AppProfile & {
  role: 'estudiante';
  course: string;
  studentId?: string;
};

export type SessionUser = GuardProfile | StudentProfile;

export type Session = {
  token: string;
  user: SessionUser;
};

export type Student = {
  id: string;
  name: string;
  idNumber: string;
  status: string;
  course: string;
};

export type AttendanceLog = {
  id: string;
  name: string;
  date?: string;
  time: string;
  status: string;
  code: string;
  type?: 'entrada' | 'salida';
};

export type AttendanceResult = AttendanceLog & {
  message: string;
};

export type StudentAttendance = {
  id: string;
  date: string;
  time: string;
  type: 'entrada' | 'salida';
  status: string;
};

export type ScheduleBlock = {
  id: string;
  day: string;
  subject: string;
  startTime: string;
  endTime: string;
  place?: string;
};

export type CourseSummary = {
  label: string;
  activeStudents?: number;
  shift?: string;
};
