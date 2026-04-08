export type GuardProfile = {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  campus: string;
};

export type Session = {
  token: string;
  user: GuardProfile;
};

export type Student = {
  id: string;
  name: string;
  idNumber: string;
  course: string;
  status: string;
};

export type AttendanceLog = {
  id: string;
  name: string;
  time: string;
  status: string;
  code: string;
};

export type AttendanceResult = AttendanceLog & {
  message: string;
};
