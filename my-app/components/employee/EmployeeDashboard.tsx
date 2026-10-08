'use client';

import React from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  Users,
  CalendarCheck,
  XCircle,
  Clock,
  Megaphone,
  CheckCircle2,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';

export function EmployeeDashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { currentUser, employees, attendanceRecords, announcements, leaveRequests } = useEMS();

  if (!currentUser) return null;

  const totalEmployees = employees.length;
  const presentCount = 29;
  const absentCount = 6;
  const lateCount = 6;
  const onLeaveCount = 3;

  const approvedLeaves = 22;
  const pendingLeaves = 7;
  const rejectedLeaves = 5;
  const remainingLeaves = 7;

  const latestAnnouncement = announcements[0];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top 3 Summary Cards (Figma Page 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total employees */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E6F4EA] flex items-center justify-center text-[#2A8257] shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#577B72]">Total employees</p>
            <p className="text-2xl font-black text-[#1C3630] leading-tight">35</p>
            <p className="text-[10px] text-[#7E9F97]">This year</p>
          </div>
        </div>

        {/* Present Today */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E6F4EA] flex items-center justify-center text-[#2A8257] shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#577B72]">Present Today</p>
            <p className="text-2xl font-black text-[#1C3630] leading-tight">29</p>
            <p className="text-[10px] text-[#2A8257] font-semibold">93.55% of Total</p>
          </div>
        </div>

        {/* Absent Today */}
        <div className="bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FDECE8] flex items-center justify-center text-[#D9381E] shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#577B72]">Absent Today</p>
            <p className="text-2xl font-black text-[#D9381E] leading-tight">6</p>
            <p className="text-[10px] text-[#D9381E]">17.14% of Total</p>
          </div>
        </div>
      </div>

      {/* Middle Row: Attendance Summary & Latest Announcement (Figma Page 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Attendance Summary (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E7EFEA]">
            <h2 className="text-sm font-bold text-[#1C3630]">Attendance Summary</h2>
            <button
              onClick={() => setActiveTab('attendance')}
              className="text-xs font-semibold text-[#3D6B5F] hover:underline cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Present Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="w-20 font-medium text-[#486B62]">Present</span>
              <div className="flex-1 bg-[#EDF3F0] rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#2A8257] h-full rounded-full" style={{ width: '80%' }} />
              </div>
              <span className="w-6 font-bold text-right text-[#1C3630]">29</span>
            </div>

            {/* Late Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="w-20 font-medium text-[#486B62]">Late</span>
              <div className="flex-1 bg-[#EDF3F0] rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#E6931E] h-full rounded-full" style={{ width: '20%' }} />
              </div>
              <span className="w-6 font-bold text-right text-[#1C3630]">6</span>
            </div>

            {/* Absent Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="w-20 font-medium text-[#486B62]">Absent</span>
              <div className="flex-1 bg-[#EDF3F0] rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#D9381E] h-full rounded-full" style={{ width: '12%' }} />
              </div>
              <span className="w-6 font-bold text-right text-[#1C3630]">3</span>
            </div>

            {/* On Leave Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="w-20 font-medium text-[#486B62]">On leave</span>
              <div className="flex-1 bg-[#EDF3F0] rounded-full h-2.5 overflow-hidden">
                <div className="bg-[#41635B] h-full rounded-full" style={{ width: '12%' }} />
              </div>
              <span className="w-6 font-bold text-right text-[#1C3630]">3</span>
            </div>
          </div>
        </div>

        {/* Latest Announcement (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-[#E7EFEA]">
              <h2 className="text-sm font-bold text-[#1C3630]">Latest Announcement</h2>
              <button
                onClick={() => setActiveTab('announcements')}
                className="text-xs font-semibold text-[#3D6B5F] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="mt-3 flex items-start gap-3 p-3 bg-[#F2F8F5] rounded-xl border border-[#D5E6E0]">
              <div className="w-9 h-9 rounded-lg bg-[#3D6B5F] flex items-center justify-center text-white shrink-0">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#1B3630]">Company All-Hands Meeting</h3>
                <p className="text-[10px] text-[#698E84] font-medium">July 24, 2026</p>
                <p className="text-[11px] text-[#416158] mt-1 line-clamp-2 leading-relaxed">
                  All employees are invited to join the all-hands meeting at 10:00 AM in the main conference room.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('announcements')}
            className="w-full py-2 bg-[#3D6B5F] hover:bg-[#2F554B] text-white text-xs font-bold rounded-xl transition-colors text-center"
          >
            Read Full Announcement
          </button>
        </div>
      </div>

      {/* Bottom Section: Leave Overview (Figma Page 4) */}
      <div className="bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E7EFEA]">
          <h2 className="text-sm font-bold text-[#1C3630]">Leave Overview</h2>
          <button
            onClick={() => setActiveTab('leave')}
            className="text-xs font-semibold text-[#3D6B5F] hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Approved Leaves */}
          <div className="p-3.5 bg-[#F4FAF6] rounded-xl border border-[#D5EBE0] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3F6EC] flex items-center justify-center text-[#2A8257] shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#4F736A]">Approved Leaves</p>
              <p className="text-xl font-bold text-[#1C3630]">{approvedLeaves}</p>
              <p className="text-[9px] text-[#7A9C93]">This year</p>
            </div>
          </div>

          {/* Pending Request */}
          <div className="p-3.5 bg-[#FDF8EE] rounded-xl border border-[#F6E6C5] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FDF0D5] flex items-center justify-center text-[#DF8E15] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#4F736A]">Pending Request</p>
              <p className="text-xl font-bold text-[#DF8E15]">{pendingLeaves}</p>
              <p className="text-[9px] text-[#7A9C93]">Awaiting Approval</p>
            </div>
          </div>

          {/* Rejected Request */}
          <div className="p-3.5 bg-[#FDF2EF] rounded-xl border border-[#F8D2C9] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FDE2DC] flex items-center justify-center text-[#D9381E] shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#4F736A]">Rejected Request</p>
              <p className="text-xl font-bold text-[#D9381E]">{rejectedLeaves}</p>
              <p className="text-[9px] text-[#7A9C93]">This Year</p>
            </div>
          </div>

          {/* Remaining Leave */}
          <div className="p-3.5 bg-[#F4FAF6] rounded-xl border border-[#D5EBE0] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E3F6EC] flex items-center justify-center text-[#2A8257] shrink-0">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#4F736A]">Remaining Leave</p>
              <p className="text-xl font-bold text-[#2A8257]">{remainingLeaves}</p>
              <p className="text-[9px] text-[#7A9C93]">Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
