'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  XCircle,
  Calendar,
  Sparkles,
  ArrowRightCircle,
  UserCheck,
} from 'lucide-react';

export function EmployeeAttendance() {
  const { currentUser, attendanceRecords, clockIn, clockOut, getTodayAttendance } = useEMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  if (!currentUser) return null;

  const todayAtt = getTodayAttendance(currentUser.id);
  const isClockedIn = Boolean(todayAtt && todayAtt.timeIn);
  const isClockedOut = Boolean(todayAtt && todayAtt.timeOut);

  // Mock list matching Figma Page 5
  const sampleHistory = [
    { date: 'Jul 26, 2026', timeIn: '08:05 AM', timeOut: '—', hours: '8h 00m', status: 'Present' },
    { date: 'Jul 25, 2026', timeIn: '07:58 AM', timeOut: '05:02 PM', hours: '9h 04m', status: 'Present' },
    { date: 'Jul 24, 2026', timeIn: '08:25 AM', timeOut: '05:01 PM', hours: '8h 36m', status: 'Late' },
    { date: 'Jul 23, 2026', timeIn: '—', timeOut: '—', hours: '—', status: 'Absent' },
    { date: 'Jul 22, 2026', timeIn: '08:00 AM', timeOut: '05:00 PM', hours: '9h 00m', status: 'Present' },
  ];

  const filteredHistory = sampleHistory.filter((item) => {
    const matchesSearch = item.date.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Row: Today's Attendance & Today's Status (Figma Page 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Today's Attendance Card (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 shadow-md border border-[#CDE0DA] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7EFEA]">
            <h2 className="text-sm font-bold text-[#1C3630]">Today&apos;s Attendance</h2>
            <span className="text-xs font-mono text-[#577B72] font-semibold bg-[#EEF5F2] px-2.5 py-1 rounded-lg">
              7/12/2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Time In */}
            <div className="p-3.5 bg-[#F4FAF6] rounded-xl border border-[#D7ECE1]">
              <p className="text-[11px] font-bold text-[#557B71] uppercase tracking-wider">TIME IN</p>
              <p className="text-xl font-black text-[#1C3630] font-mono mt-0.5">
                {todayAtt?.timeIn || '08:05 AM'}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-[#2A8257] font-semibold mt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Recorded</span>
              </div>
            </div>

            {/* Time Out */}
            <div className="p-3.5 bg-[#F9FBFB] rounded-xl border border-[#DCE8E4]">
              <p className="text-[11px] font-bold text-[#557B71] uppercase tracking-wider">TIME OUT</p>
              <p className="text-xl font-black text-[#1C3630] font-mono mt-0.5">
                {todayAtt?.timeOut || '--:--'}
              </p>
              <span className="text-[10px] text-[#7A9E96]">
                {isClockedOut ? 'Completed' : 'Not yet'}
              </span>
            </div>
          </div>

          {/* Bottom punch action & working hours */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div>
              <p className="text-[11px] font-bold text-[#557B71] uppercase">WORKING HOURS</p>
              <p className="text-sm font-bold text-[#1C3630] font-mono">
                {todayAtt?.workingHours ? `${todayAtt.workingHours}h 00m` : '0h 00m'}
              </p>
            </div>

            <div>
              {!isClockedIn ? (
                <button
                  onClick={() => clockIn(currentUser.id)}
                  className="px-6 py-2.5 bg-[#2A8257] hover:bg-[#216B47] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer uppercase tracking-wider"
                >
                  TIME IN
                </button>
              ) : !isClockedOut ? (
                <button
                  onClick={() => clockOut(currentUser.id)}
                  className="px-6 py-2.5 bg-[#2A8257] hover:bg-[#216B47] text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer uppercase tracking-wider"
                >
                  TIME OUT
                </button>
              ) : (
                <div className="px-4 py-2 bg-[#E6F4EA] text-[#2A8257] text-xs font-bold rounded-xl">
                  Shift Completed
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Today's Status Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-md border border-[#CDE0DA] flex flex-col items-center justify-center text-center space-y-3">
          <h2 className="text-sm font-bold text-[#1C3630] self-start">Today&apos;s Status</h2>

          <div className="w-20 h-20 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#2A8257] shadow-inner my-2">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div>
            <h3 className="text-lg font-black text-[#1C3630]">
              {todayAtt?.status || 'Present'}
            </h3>
            <p className="text-xs text-[#52776E] font-medium mt-0.5">
              Good job! Keep it up!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Attendance History & Monthly Summary (Figma Page 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Attendance History (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7EFEA]">
            <h2 className="text-sm font-bold text-[#1C3630]">Attendance History</h2>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C9F97]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-xs text-[#1E3731] placeholder:text-[#8AA8A1] focus:outline-none"
                />
              </div>

              <button
                onClick={() => setShowFilter(!showFilter)}
                className="px-3 py-1.5 bg-[#F2F7F5] hover:bg-[#E5EFEA] border border-[#D3E5DE] text-[#3D6B5F] rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Table matching Figma Page 5 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[#6C8E85] font-semibold text-[11px] border-b border-[#E7EFEA] pb-2">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Time in</th>
                  <th className="py-2.5 px-3">Time out</th>
                  <th className="py-2.5 px-3">Hours</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F5F3] text-[#2C4841]">
                {filteredHistory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F7FAF9]">
                    <td className="py-3 px-3 font-semibold text-[#1C3630]">{row.date}</td>
                    <td className="py-3 px-3 font-mono">{row.timeIn}</td>
                    <td className="py-3 px-3 font-mono">{row.timeOut}</td>
                    <td className="py-3 px-3 font-mono">{row.hours}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold text-white ${
                          row.status === 'Present'
                            ? 'bg-[#2A8257]'
                            : row.status === 'Late'
                            ? 'bg-[#E6931E]'
                            : 'bg-[#D9381E]'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center pt-2 border-t border-[#E7EFEA]">
            <button className="text-xs font-bold text-[#3D6B5F] hover:underline">
              View More &gt;
            </button>
          </div>
        </div>

        {/* Monthly Summary (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-4">
          <div className="pb-2 border-b border-[#E7EFEA]">
            <h2 className="text-sm font-bold text-[#1C3630]">Monthly Summary</h2>
            <p className="text-[10px] text-[#7A9D95]">July 2026</p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Present */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A8257]" />
                <span className="font-semibold text-[#3B5D55]">Present</span>
              </div>
              <span className="font-bold text-[#1C3630] text-sm">22</span>
            </div>

            {/* Late */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E6931E]" />
                <span className="font-semibold text-[#3B5D55]">Late</span>
              </div>
              <span className="font-bold text-[#1C3630] text-sm">2</span>
            </div>

            {/* Absent */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#D9381E]" />
                <span className="font-semibold text-[#3B5D55]">Absent</span>
              </div>
              <span className="font-bold text-[#1C3630] text-sm">1</span>
            </div>

            {/* Leave */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <ArrowRightCircle className="w-4 h-4 text-[#41635B]" />
                <span className="font-semibold text-[#3B5D55]">Leave</span>
              </div>
              <span className="font-bold text-[#1C3630] text-sm">1</span>
            </div>

            {/* Total Hours */}
            <div className="pt-3 mt-2 border-t border-[#E7EFEA] flex items-center justify-between">
              <span className="font-bold text-[#1C3630]">Total Hours:</span>
              <span className="font-black text-[#2A8257] text-base font-mono">176 hrs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
