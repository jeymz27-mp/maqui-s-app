export type UserRole = 'employee' | 'manager';

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskCategory = 'Feature' | 'Bugfix' | 'Documentation' | 'Review' | 'Operations' | 'General';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedToId: string;
  assignedToName: string;
  assignedById: string;
  assignedByName: string;
  department: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  progress: number; // 0 to 100
  managerNotes?: string;
  employeeNotes?: string;
  createdAt: string;
  completedAt?: string;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'On Leave' | 'Half Day';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string; // YYYY-MM-DD
  timeIn: string | null; // e.g. "08:14 AM"
  timeOut: string | null; // e.g. "05:02 PM"
  workingHours: number; // e.g. 8.5
  status: AttendanceStatus;
  notes?: string;
}

export type LeaveType = 'Vacation' | 'Sick' | 'Personal' | 'Emergency' | 'Maternity/Paternity';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  dateRequested: string;
  reviewedBy?: string;
  reviewedAt?: string;
  managerNotes?: string;
}

export interface LeaveBalance {
  vacation: { total: number; used: number };
  sick: { total: number; used: number };
  personal: { total: number; used: number };
  emergency: { total: number; used: number };
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string; // 'PDF' | 'DOCX' | 'IMAGE' | 'CERT'
  fileSize: string;
  uploadedOn: string;
  downloadUrl?: string;
}

export interface PerformanceReview {
  period: string;
  rating: number; // 1-5
  feedback: string;
  goalsAchieved: string;
  reviewer: string;
}

export interface Employee {
  id: string; // Employee ID e.g. "EMP-2026-001"
  email: string;
  username: string;
  password?: string;
  isActivated: boolean;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatar: string;
  position: string;
  department: 'IT' | 'Engineering' | 'Marketing' | 'HR' | 'Finance' | 'Operations';
  status: 'Active' | 'On Leave' | 'Inactive';
  phone: string;
  bio: string;
  dateJoined: string;
  birthday: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  employmentDetails: {
    employmentType: 'Full-Time' | 'Part-Time' | 'Contract';
    workSchedule: string; // "8:00 AM - 5:00 PM"
    officeLocation: string; // "Building A, Floor 4, Suite 402"
    salary: string; // "$78,500 / yr"
    reportsTo: string;
  };
  twoFactorEnabled: boolean;
  smsRecoveryPhone?: string;
  documents: DocumentFile[];
  leaveBalance: LeaveBalance;
  performance: PerformanceReview[];
  managerNotes?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: 'All Employees' | 'IT' | 'Engineering' | 'Marketing' | 'HR' | 'Finance' | 'Operations';
  postedById: string;
  postedByName: string;
  postedByRole: string;
  postedOn: string; // formatted date string
  isPinned: boolean;
  scheduledDate?: string;
  status: 'Published' | 'Scheduled' | 'Draft';
  attachment?: {
    name: string;
    size: string;
    type: string;
  };
}

export interface ActivityFeedItem {
  id: string;
  type: 'leave' | 'task' | 'attendance' | 'announcement' | 'security';
  title: string;
  description: string;
  timestamp: string;
  actor: string;
}
