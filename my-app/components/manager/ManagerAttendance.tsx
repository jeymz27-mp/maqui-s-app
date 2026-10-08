'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  Users,
  CalendarCheck,
  Clock,
  XCircle,
  Search,
  Calendar,
  Download,
} from 'lucide-react';

export function ManagerAttendance() {
  const [dateRange, setDateRange] = useState('Aug 22, 2026 - Aug 22, 2026');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data matching Figma Page 16
  const sampleRecords = [
    { name: 'Juan Dela Cruz', dept: 'IT Department', date: 'Aug 22, 2026', timeIn: '8:02 AM', timeOut: '5:00 PM', status: 'Present' },
    { name: 'Maria Santos', dept: 'IT Department', date: 'Aug 22, 2026', timeIn: '8:18 AM', timeOut: '5:00 PM', status: 'Late' },
    { name: 'Carlo Reyes', dept: 'IT Department', date: 'Aug 22, 2026', timeIn: '—', timeOut: '—', status: 'Absent' },
    { name: 'Ana Garcia', dept: 'IT Department', date: 'Aug 22, 2026', timeIn: '8:05 AM', timeOut: '5:01 PM', status: 'Present' },
    { name: 'Paul Mendoza', dept: 'IT Department', date: 'Aug 22, 2026', timeIn: '8:20 AM', timeOut: '5:00 PM', status: 'Late' },
    { name: 'Liza Ramos', dept: 'HR Department', date: 'Aug 22, 2026', timeIn: '8:01 AM', timeOut: '5:00 PM', status: 'Present' },
    { name: 'Mark Reyes', dept: 'Finance Department', date: 'Aug 22, 2026', timeIn: '—', timeOut: '—', status: 'Absent' },
  ];

  const filtered = sampleRecords.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#CDE0DA] space-y-5 animate-in fade-in duration-200">
      {/* Header & Date Range Picker matching Figma Page 16 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E7EFEA]">
        <div>
          <h2 className="text-sm font-bold text-[#1C3630]">Attendance Records</h2>
          <p className="text-[10px] text-[#698E84]">Review and monitor employee attendance records</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-xs text-[#1E3731] font-mono font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#3D6B5F]" />
            <span>{dateRange}</span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C9F97]" />
            <input
              type="text"
              placeholder="Search Something..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-xs text-[#1E3731] placeholder:text-[#8AA8A1] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Top 4 Summary Cards (Figma Page 16) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total employees */}
        <div className="p-3.5 bg-[#F4FAF6] rounded-xl border border-[#D5EBE0] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3F6EC] flex items-center justify-center text-[#2A8257] shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#577B72]">Total employees</p>
            <p className="text-xl font-bold text-[#1C3630]">35</p>
          </div>
        </div>

        {/* Present */}
        <div className="p-3.5 bg-[#F4FAF6] rounded-xl border border-[#D5EBE0] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E3F6EC] flex items-center justify-center text-[#2A8257] shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#577B72]">Present</p>
            <p className="text-xl font-bold text-[#2A8257]">26</p>
          </div>
        </div>

        {/* Late */}
        <div className="p-3.5 bg-[#FDF8EE] rounded-xl border border-[#F6E6C5] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FDF0D5] flex items-center justify-center text-[#DF8E15] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#577B72]">Late</p>
            <p className="text-xl font-bold text-[#DF8E15]">6</p>
          </div>
        </div>

        {/* Absent */}
        <div className="p-3.5 bg-[#FDF2EF] rounded-xl border border-[#F8D2C9] flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FDE2DC] flex items-center justify-center text-[#D9381E] shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-[#577B72]">Absent</p>
            <p className="text-xl font-bold text-[#D9381E]">3</p>
          </div>
        </div>
      </div>

      {/* Attendance Table (Figma Page 16) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="text-[#6C8E85] font-semibold text-[11px] border-b border-[#E7EFEA] pb-2">
            <tr>
              <th className="py-2.5 px-3">Employee</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Time in</th>
              <th className="py-2.5 px-3">Time out</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F5F3] text-[#2C4841]">
            {filtered.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#F7FAF9]">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#EBF3F0] text-[#3D6B5F] flex items-center justify-center font-bold">
                      {row.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-[#1C3630]">{row.name}</p>
                      <p className="text-[10px] text-[#7A9E96]">{row.dept}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-mono text-[#4F736A]">{row.date}</td>
                <td className="py-3 px-3 font-mono">{row.timeIn}</td>
                <td className="py-3 px-3 font-mono">{row.timeOut}</td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                      row.status === 'Present'
                        ? 'text-[#2A8257]'
                        : row.status === 'Late'
                        ? 'text-[#DF8E15]'
                        : 'text-[#D9381E]'
                    }`}
                  >
                    ● {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-[#6C8E85] pt-3 border-t border-[#E7EFEA]">
        <span>Showing 1 to 7 of 35 records</span>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded bg-[#3D6B5F] text-white font-bold text-xs flex items-center justify-center">
            1
          </button>
        </div>
      </div>
    </div>
  );
}
