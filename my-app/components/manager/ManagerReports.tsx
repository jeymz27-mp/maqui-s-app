'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  CalendarDays,
  FileText,
  Printer,
  Sparkles,
  PieChart,
} from 'lucide-react';

export function ManagerReports() {
  const { currentUser, employees, attendanceRecords, leaveRequests, tasks } = useEMS();

  const [reportPeriod, setReportPeriod] = useState('October 2026');

  const totalEmps = employees.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const taskCompletionRate = Math.round((completedTasks / (totalTasks || 1)) * 100);

  const totalAttendance = attendanceRecords.length;
  const presentCount = attendanceRecords.filter((r) => r.status === 'Present').length;
  const onTimeRate = Math.round((presentCount / (totalAttendance || 1)) * 100);

  const totalLeaves = leaveRequests.length;
  const approvedLeaves = leaveRequests.filter((l) => l.status === 'Approved').length;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent =
      'Category,Metric,Value\n' +
      `Headcount,Total Staff,${totalEmps}\n` +
      `Attendance,On-Time Rate,${onTimeRate}%\n` +
      `Tasks,Completion Velocity,${taskCompletionRate}%\n` +
      `Leave,Approved Requests,${approvedLeaves}\n` +
      `Reporting Period,Period,${reportPeriod}\n`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EMS_Executive_Report_${reportPeriod.replace(' ', '_')}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Reports & Analytics (Section 5 #8)</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Department Performance Reports</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit department punctuality metrics, milestone velocity, and leave utilization rate
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Analytics CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950/40 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              On-Time Punctuality
            </span>
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-4xl font-extrabold text-white mt-3 font-mono">{onTimeRate}%</p>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${onTimeRate}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Based on 8:00 AM shift + 15m grace window
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Task Velocity Rate
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-4xl font-extrabold text-emerald-400 mt-3 font-mono">
            {taskCompletionRate}%
          </p>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${taskCompletionRate}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {completedTasks} of {totalTasks} deliverables completed
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-purple-950/40 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Leave Approval Index
            </span>
            <CalendarDays className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-4xl font-extrabold text-purple-400 mt-3 font-mono">
            {Math.round((approvedLeaves / (totalLeaves || 1)) * 100)}%
          </p>
          <div className="w-full bg-slate-800 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full"
              style={{ width: `${Math.round((approvedLeaves / (totalLeaves || 1)) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            {approvedLeaves} approved of {totalLeaves} applications
          </p>
        </div>
      </div>

      {/* Breakdown Tables & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Headcount Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Headcount Roster by Department</span>
            </h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
              {totalEmps} total staff
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {['IT', 'Engineering', 'Marketing', 'HR', 'Finance'].map((dept) => {
              const count = employees.filter((e) => e.department === dept).length;
              const pct = Math.round((count / (totalEmps || 1)) * 100);
              return (
                <div key={dept} className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-300">{dept} Division</span>
                    <span className="text-slate-400 font-mono">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leave Utilization Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-400" />
              <span>Leave Quota Distribution</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Monthly Aggregate</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { type: 'Vacation Leave', color: 'bg-blue-500', total: 60, used: 17 },
              { type: 'Sick Leave', color: 'bg-emerald-500', total: 40, used: 6 },
              { type: 'Personal Leave', color: 'bg-amber-500', total: 20, used: 4 },
              { type: 'Emergency Leave', color: 'bg-rose-500', total: 12, used: 1 },
            ].map((cat) => {
              const pct = Math.round((cat.used / cat.total) * 100);
              return (
                <div key={cat.type} className="space-y-1">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-300">{cat.type}</span>
                    <span className="text-slate-400 font-mono">
                      {cat.used} used / {cat.total} total ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
