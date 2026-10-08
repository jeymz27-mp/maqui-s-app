'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Employee,
  Task,
  AttendanceRecord,
  LeaveRequest,
  Announcement,
  ActivityFeedItem,
  UserRole,
  TaskStatus,
  LeaveStatus,
  AttendanceStatus,
} from '../types/ems';
import {
  INITIAL_EMPLOYEES,
  INITIAL_TASKS,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVE_REQUESTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ACTIVITIES,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface EMSContextType {
  currentUser: Employee | null;
  employees: Employee[];
  tasks: Task[];
  attendanceRecords: AttendanceRecord[];
  leaveRequests: LeaveRequest[];
  announcements: Announcement[];
  activities: ActivityFeedItem[];
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Auth
  login: (emailOrId: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  activateAccount: (empId: string, email: string, username: string, newPassword: string) => { success: boolean; error?: string };
  forgotPassword: (emailOrId: string, newPassword: string) => { success: boolean; error?: string };
  switchUser: (employeeId: string) => void;

  // Attendance
  clockIn: (employeeId: string) => { success: boolean; message: string };
  clockOut: (employeeId: string) => { success: boolean; message: string };
  getTodayAttendance: (employeeId: string) => AttendanceRecord | undefined;

  // Tasks
  updateTaskByEmployee: (taskId: string, status: TaskStatus, notes?: string) => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'progress'> & { progress?: number }) => void;
  updateTaskByManager: (taskId: string, updates: Partial<Task>) => void;

  // Leave
  submitLeaveRequest: (data: Omit<LeaveRequest, 'id' | 'status' | 'dateRequested' | 'employeeName' | 'department'>) => { success: boolean; message: string };
  reviewLeaveRequest: (requestId: string, status: 'Approved' | 'Rejected', managerNotes?: string) => void;

  // Announcements
  createAnnouncement: (data: Omit<Announcement, 'id' | 'postedOn' | 'postedById' | 'postedByName' | 'postedByRole'>) => void;
  updateAnnouncement: (id: string, data: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  togglePinAnnouncement: (id: string) => void;

  // User Profile & Settings
  updateUserProfile: (userId: string, data: Partial<Employee>) => void;
  changePassword: (userId: string, currentPass: string, newPass: string) => { success: boolean; error?: string };
  toggle2FA: (userId: string) => void;
  updateSMSPhone: (userId: string, phone: string) => void;
  addManagerNote: (employeeId: string, note: string) => void;

  // Reset
  resetAllData: () => void;
}

const EMSContext = createContext<EMSContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'ems_current_user_id_v3',
  EMPLOYEES: 'ems_employees_v3',
  TASKS: 'ems_tasks_v3',
  ATTENDANCE: 'ems_attendance_v3',
  LEAVE_REQUESTS: 'ems_leave_requests_v3',
  ANNOUNCEMENTS: 'ems_announcements_v3',
  ACTIVITIES: 'ems_activities_v3',
};

export function EMSProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [activities, setActivities] = useState<ActivityFeedItem[]>(INITIAL_ACTIVITIES);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null); // starts on login screen first
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedEmployees = localStorage.getItem(STORAGE_KEYS.EMPLOYEES);
      const storedTasks = localStorage.getItem(STORAGE_KEYS.TASKS);
      const storedAttendance = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      const storedLeave = localStorage.getItem(STORAGE_KEYS.LEAVE_REQUESTS);
      const storedAnnouncements = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      const storedActivities = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      const storedUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);

      const emps: Employee[] = storedEmployees ? JSON.parse(storedEmployees) : INITIAL_EMPLOYEES;
      setEmployees(emps);

      if (storedTasks) setTasks(JSON.parse(storedTasks));
      if (storedAttendance) setAttendanceRecords(JSON.parse(storedAttendance));
      if (storedLeave) setLeaveRequests(JSON.parse(storedLeave));
      if (storedAnnouncements) setAnnouncements(JSON.parse(storedAnnouncements));
      if (storedActivities) setActivities(JSON.parse(storedActivities));

      if (storedUserId) {
        const found = emps.find((e) => e.id === storedUserId);
        if (found) {
          setCurrentUser(found);
        }
      }
    } catch (err) {
      console.error('Error loading EMS local data:', err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
      localStorage.setItem(STORAGE_KEYS.LEAVE_REQUESTS, JSON.stringify(leaveRequests));
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
      localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUser.id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
      }
    } catch (err) {
      console.error('Error saving EMS local data:', err);
    }
  }, [employees, tasks, attendanceRecords, leaveRequests, announcements, activities, currentUser, isHydrated]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addActivity = (type: ActivityFeedItem['type'], title: string, description: string, actorName: string) => {
    const newAct: ActivityFeedItem = {
      id: 'act-' + Date.now(),
      type,
      title,
      description,
      timestamp: 'Just now',
      actor: actorName,
    };
    setActivities((prev) => [newAct, ...prev]);
  };

  // Auth functions
  const login = (emailOrId: string, password: string): { success: boolean; error?: string } => {
    const trimmed = emailOrId.trim().toLowerCase();
    const user = employees.find(
      (e) => e.email.toLowerCase() === trimmed || e.id.toLowerCase() === trimmed || e.username.toLowerCase() === trimmed
    );

    if (!user) {
      return { success: false, error: 'No account found with this Email or Employee ID.' };
    }

    if (!user.isActivated) {
      return {
        success: false,
        error: 'This account has not been activated yet. Please switch to "Activate Account" tab to set your username and password.',
      };
    }

    if (user.password && user.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again or use Forgot Password.' };
    }

    setCurrentUser(user);
    addToast('success', 'Welcome Back!', `Logged in as ${user.firstName} ${user.lastName} (${user.role === 'manager' ? 'Department Manager' : 'Employee'}).`);
    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      addToast('info', 'Logged Out', 'You have been safely signed out.');
    }
    setCurrentUser(null);
  };

  const activateAccount = (empId: string, email: string, username: string, newPassword: string) => {
    const trimmedId = empId.trim().toUpperCase();
    const trimmedEmail = email.trim().toLowerCase();

    const employeeIndex = employees.findIndex(
      (e) => (e.id.toUpperCase() === trimmedId || e.email.toLowerCase() === trimmedEmail)
    );

    if (employeeIndex === -1) {
      return { success: false, error: 'Employee ID and Company Email combination not found in company roster.' };
    }

    const employee = employees[employeeIndex];
    if (employee.isActivated) {
      return { success: false, error: 'This account is already activated. Please use regular login.' };
    }

    const updated: Employee = {
      ...employee,
      username: username.trim() || employee.email.split('@')[0],
      password: newPassword,
      isActivated: true,
    };

    const newEmployees = [...employees];
    newEmployees[employeeIndex] = updated;
    setEmployees(newEmployees);
    setCurrentUser(updated);

    addActivity('security', 'Account Activated', `${updated.firstName} ${updated.lastName} completed first-time activation.`, `${updated.firstName} ${updated.lastName}`);
    addToast('success', 'Account Activated!', `Welcome aboard, ${updated.firstName}! Your EMS credentials have been saved.`);

    return { success: true };
  };

  const forgotPassword = (emailOrId: string, newPassword: string) => {
    const trimmed = emailOrId.trim().toLowerCase();
    const employeeIndex = employees.findIndex(
      (e) => e.email.toLowerCase() === trimmed || e.id.toLowerCase() === trimmed || e.username.toLowerCase() === trimmed
    );

    if (employeeIndex === -1) {
      return { success: false, error: 'No account found matching this identifier.' };
    }

    const newEmployees = [...employees];
    newEmployees[employeeIndex] = {
      ...newEmployees[employeeIndex],
      password: newPassword,
    };
    setEmployees(newEmployees);

    if (currentUser && currentUser.id === newEmployees[employeeIndex].id) {
      setCurrentUser(newEmployees[employeeIndex]);
    }

    addToast('success', 'Password Reset Successful', 'You can now log in with your updated password.');
    return { success: true };
  };

  const switchUser = (employeeId: string) => {
    const target = employees.find((e) => e.id === employeeId);
    if (target) {
      setCurrentUser(target);
      addToast('info', 'Switched User Profile', `Now previewing EMS as ${target.firstName} ${target.lastName} (${target.role}).`);
    }
  };

  // Attendance
  const getTodayAttendance = (employeeId: string) => {
    const todayStr = '2026-10-08'; // System reference date
    return attendanceRecords.find((a) => a.employeeId === employeeId && a.date === todayStr);
  };

  const clockIn = (employeeId: string) => {
    const todayStr = '2026-10-08';
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return { success: false, message: 'Employee not found.' };

    const existing = attendanceRecords.find((a) => a.employeeId === employeeId && a.date === todayStr);
    if (existing && existing.timeIn) {
      return { success: false, message: 'You have already clocked in today at ' + existing.timeIn };
    }

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = Number(hours) >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    // Lateness logic: Official shift 8:00 AM + 15 min grace period (8:15 AM)
    const isLate = Number(hours) > 8 || (Number(hours) === 8 && Number(minutes) > 15);
    const status: AttendanceStatus = isLate ? 'Late' : 'Present';

    let updatedAttendance: AttendanceRecord[];
    if (existing) {
      updatedAttendance = attendanceRecords.map((a) =>
        a.id === existing.id
          ? { ...a, timeIn: formattedTime, status, notes: isLate ? 'Clocked in after 8:15 AM grace window' : 'Clocked in on time' }
          : a
      );
    } else {
      const newRec: AttendanceRecord = {
        id: 'att-' + Date.now(),
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        date: todayStr,
        timeIn: formattedTime,
        timeOut: null,
        workingHours: 8.0,
        status,
        notes: isLate ? 'Clocked in after 8:15 AM grace window' : 'Clocked in on time',
      };
      updatedAttendance = [newRec, ...attendanceRecords];
    }

    setAttendanceRecords(updatedAttendance);
    addActivity('attendance', 'Daily Time In', `${emp.firstName} recorded Time In at ${formattedTime} (${status})`, `${emp.firstName} ${emp.lastName}`);
    addToast('success', 'Time In Recorded!', `Successfully punched in at ${formattedTime}. Status: ${status}`);
    return { success: true, message: 'Time in recorded successfully.' };
  };

  const clockOut = (employeeId: string) => {
    const todayStr = '2026-10-08';
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return { success: false, message: 'Employee not found.' };

    const existing = attendanceRecords.find((a) => a.employeeId === employeeId && a.date === todayStr);
    if (!existing || !existing.timeIn) {
      return { success: false, message: 'Please record Time In first before clocking out.' };
    }

    if (existing.timeOut) {
      return { success: false, message: 'You have already clocked out today at ' + existing.timeOut };
    }

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = Number(hours) >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    const updated = attendanceRecords.map((a) =>
      a.id === existing.id
        ? {
          ...a,
          timeOut: formattedTime,
          workingHours: 8.5,
        }
        : a
    );

    setAttendanceRecords(updated);
    addActivity('attendance', 'Daily Time Out', `${emp.firstName} recorded Time Out at ${formattedTime}`, `${emp.firstName} ${emp.lastName}`);
    addToast('success', 'Time Out Recorded!', `Punched out at ${formattedTime}. Thank you for your hard work today!`);
    return { success: true, message: 'Time out recorded successfully.' };
  };

  // Tasks
  const updateTaskByEmployee = (taskId: string, status: TaskStatus, notes?: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    let progress = task.progress;
    if (status === 'Completed') progress = 100;
    else if (status === 'In Progress' && progress === 0) progress = 25;
    else if (status === 'Pending') progress = 0;

    const updated = tasks.map((t) =>
      t.id === taskId
        ? {
          ...t,
          status,
          progress,
          employeeNotes: notes !== undefined ? notes : t.employeeNotes,
          completedAt: status === 'Completed' ? new Date().toISOString().split('T')[0] : undefined,
        }
        : t
    );

    setTasks(updated);
    addActivity('task', 'Task Status Updated', `Status changed to "${status}" for "${task.title}"`, currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Employee');
    addToast('success', 'Task Updated', `Task status marked as ${status}.`);
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'progress'> & { progress?: number }) => {
    const newTask: Task = {
      ...taskData,
      id: 'TSK-' + Math.floor(1000 + Math.random() * 9000),
      progress: taskData.progress ?? 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTasks((prev) => [newTask, ...prev]);
    addActivity('task', 'New Task Assigned', `Assigned "${newTask.title}" to ${newTask.assignedToName}`, currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Manager');
    addToast('success', 'Task Created', `Assigned to ${newTask.assignedToName} successfully.`);
  };

  const updateTaskByManager = (taskId: string, updates: Partial<Task>) => {
    const target = tasks.find((t) => t.id === taskId);
    if (!target) return;

    const updatedTasks = tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t));
    setTasks(updatedTasks);
    addActivity('task', 'Task Modified by Manager', `Manager updated progress/details on "${target.title}"`, currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Manager');
    addToast('success', 'Task Updated', `Task modifications saved.`);
  };

  // Leave
  const submitLeaveRequest = (data: Omit<LeaveRequest, 'id' | 'status' | 'dateRequested' | 'employeeName' | 'department'>) => {
    if (!currentUser) return { success: false, message: 'Not authenticated.' };

    const newReq: LeaveRequest = {
      ...data,
      id: 'LEV-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
      employeeId: currentUser.id,
      employeeName: `${currentUser.firstName} ${currentUser.lastName}`,
      department: currentUser.department,
      status: 'Pending',
      dateRequested: '2026-10-08',
    };

    setLeaveRequests((prev) => [newReq, ...prev]);
    addActivity('leave', 'Leave Application Filed', `${currentUser.firstName} submitted a ${data.leaveType} leave request for ${data.totalDays} day(s).`, `${currentUser.firstName} ${currentUser.lastName}`);
    addToast('success', 'Leave Request Submitted', `Your request for ${data.totalDays} day(s) of ${data.leaveType} leave has been sent for manager review.`);
    return { success: true, message: 'Request submitted.' };
  };

  const reviewLeaveRequest = (requestId: string, status: 'Approved' | 'Rejected', managerNotes?: string) => {
    const req = leaveRequests.find((r) => r.id === requestId);
    if (!req) return;

    const reviewerName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Sarah Jenkins';

    const updatedList = leaveRequests.map((r) =>
      r.id === requestId
        ? {
          ...r,
          status,
          reviewedBy: reviewerName,
          reviewedAt: '2026-10-08',
          managerNotes: managerNotes || r.managerNotes,
        }
        : r
    );
    setLeaveRequests(updatedList);

    // If approved, update employee leave balance used
    if (status === 'Approved') {
      const typeKey = req.leaveType.toLowerCase() as keyof Employee['leaveBalance'];
      setEmployees((prev) =>
        prev.map((emp) => {
          if (emp.id === req.employeeId && emp.leaveBalance && emp.leaveBalance[typeKey]) {
            const currentBalance = emp.leaveBalance[typeKey];
            return {
              ...emp,
              leaveBalance: {
                ...emp.leaveBalance,
                [typeKey]: {
                  ...currentBalance,
                  used: Math.min(currentBalance.total, currentBalance.used + req.totalDays),
                },
              },
            };
          }
          return emp;
        })
      );
    }

    addActivity('leave', `Leave Request ${status}`, `Leave request for ${req.employeeName} (${req.leaveType}) was ${status.toLowerCase()}`, reviewerName);
    addToast(status === 'Approved' ? 'success' : 'warning', `Leave Request ${status}`, `Leave application for ${req.employeeName} has been ${status.toLowerCase()}.`);
  };

  // Announcements
  const createAnnouncement = (data: Omit<Announcement, 'id' | 'postedOn' | 'postedById' | 'postedByName' | 'postedByRole'>) => {
    const poster = currentUser || INITIAL_EMPLOYEES[1];
    const newAnn: Announcement = {
      ...data,
      id: 'ANN-' + Math.floor(100 + Math.random() * 900),
      postedById: poster.id,
      postedByName: `${poster.firstName} ${poster.lastName}`,
      postedByRole: poster.position,
      postedOn: 'October 08, 2026 at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    addActivity('announcement', 'New Announcement', `"${newAnn.title}" published for ${newAnn.audience}`, `${poster.firstName} ${poster.lastName}`);
    addToast('success', 'Announcement Posted', `Successfully broadcasted to ${newAnn.audience}.`);
  };

  const updateAnnouncement = (id: string, data: Partial<Announcement>) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)));
    addToast('success', 'Announcement Updated', 'Changes have been published.');
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    addToast('info', 'Announcement Removed', 'The announcement has been deleted.');
  };

  const togglePinAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isPinned: !a.isPinned } : a))
    );
    addToast('info', 'Pin Status Changed', 'Announcement priority updated.');
  };

  // User Profile & Settings
  const updateUserProfile = (userId: string, data: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === userId) {
          const updated = { ...emp, ...data };
          if (currentUser && currentUser.id === userId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return emp;
      })
    );
    addToast('success', 'Profile Updated', 'Your personal details have been saved.');
  };

  const changePassword = (userId: string, currentPass: string, newPass: string) => {
    const emp = employees.find((e) => e.id === userId);
    if (!emp) return { success: false, error: 'User not found.' };

    if (emp.password && emp.password !== currentPass) {
      return { success: false, error: 'Current password does not match.' };
    }

    setEmployees((prev) =>
      prev.map((e) => (e.id === userId ? { ...e, password: newPass } : e))
    );

    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, password: newPass });
    }

    addToast('success', 'Password Changed', 'Your security credentials have been updated.');
    return { success: true };
  };

  const toggle2FA = (userId: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === userId) {
          const updated = { ...emp, twoFactorEnabled: !emp.twoFactorEnabled };
          if (currentUser && currentUser.id === userId) {
            setCurrentUser(updated);
          }
          addToast('info', '2FA Status', `Two-factor authentication is now ${updated.twoFactorEnabled ? 'ENABLED' : 'DISABLED'}.`);
          return updated;
        }
        return emp;
      })
    );
  };

  const updateSMSPhone = (userId: string, phone: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === userId) {
          const updated = { ...emp, smsRecoveryPhone: phone };
          if (currentUser && currentUser.id === userId) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return emp;
      })
    );
    addToast('success', 'SMS Recovery Configured', `Backup recovery number set to ${phone}.`);
  };

  const addManagerNote = (employeeId: string, note: string) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === employeeId) {
          const existingNotes = emp.managerNotes || [];
          return {
            ...emp,
            managerNotes: [note, ...existingNotes],
          };
        }
        return emp;
      })
    );
    addToast('success', 'Manager Note Added', 'Saved private note to employee profile.');
  };

  const resetAllData = () => {
    localStorage.clear();
    setEmployees(INITIAL_EMPLOYEES);
    setTasks(INITIAL_TASKS);
    setAttendanceRecords(INITIAL_ATTENDANCE);
    setLeaveRequests(INITIAL_LEAVE_REQUESTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setActivities(INITIAL_ACTIVITIES);
    setCurrentUser(INITIAL_EMPLOYEES[0]);
    addToast('info', 'Reset Complete', 'EMS demo database has been restored to factory defaults.');
  };

  return (
    <EMSContext.Provider
      value={{
        currentUser,
        employees,
        tasks,
        attendanceRecords,
        leaveRequests,
        announcements,
        activities,
        toasts,
        addToast,
        removeToast,
        login,
        logout,
        activateAccount,
        forgotPassword,
        switchUser,
        clockIn,
        clockOut,
        getTodayAttendance,
        updateTaskByEmployee,
        createTask,
        updateTaskByManager,
        submitLeaveRequest,
        reviewLeaveRequest,
        createAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        togglePinAnnouncement,
        updateUserProfile,
        changePassword,
        toggle2FA,
        updateSMSPhone,
        addManagerNote,
        resetAllData,
      }}
    >
      {children}
    </EMSContext.Provider>
  );
}

export function useEMS() {
  const context = useContext(EMSContext);
  if (!context) {
    throw new Error('useEMS must be used within an EMSProvider');
  }
  return context;
}
