'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  CalendarCheck,
  Clock,
  XCircle,
  CalendarDays,
  Plus,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
} from 'lucide-react';
import { LeaveType, LeaveRequest } from '../../types/ems';

export function EmployeeLeave() {
  const { currentUser, leaveRequests, submitLeaveRequest } = useEMS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveType, setLeaveType] = useState<LeaveType>('Vacation');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [formError, setFormError] = useState('');

  if (!currentUser) return null;

  const myRequests = leaveRequests.filter((r) => r.employeeId === currentUser.id);

  // Sample static table rows matching Figma Page 7
  const displayRequests = [
    { type: 'Vacation', start: 'Jul 20, 2026', end: 'Jul 22, 2026', days: 3, status: 'Pending' },
    { type: 'Sick Leave', start: 'Jun 15, 2026', end: 'Jun 15, 2026', days: 1, status: 'Approved' },
    { type: 'Personal', start: 'May 30, 2026', end: 'May 30, 2026', days: 1, status: 'Approved' },
    { type: 'Vacation', start: 'Apr 10, 2026', end: 'Apr 12, 2026', days: 3, status: 'Approved' },
    { type: 'Sick Leave', start: 'Mar 20, 2026', end: 'Mar 20, 2026', days: 1, status: 'Approved' },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setFormError('Please select both start and end date.');
      return;
    }
    submitLeaveRequest({
      employeeId: currentUser.id,
      leaveType,
      startDate,
      endDate,
      totalDays: 3,
      reason,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top 4 Summary Cards (Figma Page 7) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Approved Leaves */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] flex items-center justify-center text-[#2A8257] shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#577B72]">Approved Leaves</p>
            <p className="text-xl font-black text-[#1C3630]">22</p>
            <p className="text-[9px] text-[#7E9F97]">This year</p>
          </div>
        </div>

        {/* Pending Request */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF0D5] flex items-center justify-center text-[#DF8E15] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#577B72]">Pending Request</p>
            <p className="text-xl font-black text-[#DF8E15]">7</p>
            <p className="text-[9px] text-[#7E9F97]">Awaiting Approval</p>
          </div>
        </div>

        {/* Rejected Request */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDE2DC] flex items-center justify-center text-[#D9381E] shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#577B72]">Rejected Request</p>
            <p className="text-xl font-black text-[#D9381E]">5</p>
            <p className="text-[9px] text-[#7E9F97]">This Year</p>
          </div>
        </div>

        {/* Remaining Leave */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] flex items-center justify-center text-[#2A8257] shrink-0">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#577B72]">Remaining Leave</p>
            <p className="text-xl font-black text-[#2A8257]">7</p>
            <p className="text-[9px] text-[#7E9F97]">Days</p>
          </div>
        </div>
      </div>

      {/* Main Grid: My Leave Requests & Right Sidebars (Figma Page 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: My Leave Requests (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7EFEA]">
            <h2 className="text-sm font-bold text-[#1C3630]">My Leave Requests</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#2A8257] hover:bg-[#216B47] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Request</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[#6C8E85] font-semibold text-[11px] border-b border-[#E7EFEA] pb-2">
                <tr>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Start date</th>
                  <th className="py-2.5 px-3">End date</th>
                  <th className="py-2.5 px-3">Days</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F5F3] text-[#2C4841]">
                {displayRequests.map((req, idx) => (
                  <tr key={idx} className="hover:bg-[#F7FAF9]">
                    <td className="py-3 px-3 font-semibold text-[#1C3630]">{req.type}</td>
                    <td className="py-3 px-3 font-mono">{req.start}</td>
                    <td className="py-3 px-3 font-mono">{req.end}</td>
                    <td className="py-3 px-3 font-mono font-bold">{req.days}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold text-white ${
                          req.status === 'Approved'
                            ? 'bg-[#2A8257]'
                            : req.status === 'Pending'
                            ? 'bg-[#E6931E]'
                            : 'bg-[#D9381E]'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination dots matching Figma */}
          <div className="flex items-center justify-center gap-1.5 pt-3 border-t border-[#E7EFEA]">
            <button className="w-6 h-6 rounded-full bg-[#3D6B5F] text-white text-xs font-bold flex items-center justify-center">
              1
            </button>
            <button className="w-6 h-6 rounded-full bg-[#EBF1EE] text-[#41635B] text-xs font-semibold flex items-center justify-center hover:bg-[#D5E4DE]">
              2
            </button>
            <button className="w-6 h-6 rounded-full bg-[#EBF1EE] text-[#41635B] text-xs font-semibold flex items-center justify-center hover:bg-[#D5E4DE]">
              3
            </button>
            <button className="w-6 h-6 rounded-full bg-[#EBF1EE] text-[#41635B] text-xs font-semibold flex items-center justify-center hover:bg-[#D5E4DE]">
              4
            </button>
          </div>
        </div>

        {/* Right Column: Recent Leave Activity & Leave Balance (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Recent Leave Activity Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-3">
            <h3 className="text-xs font-bold text-[#1C3630] pb-2 border-b border-[#E7EFEA]">
              Recent Leave Activity
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2A8257] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1C3630]">Your leave was approved</p>
                  <p className="text-[10px] text-[#7B9E96]">Jul 5, 2026 - Vacation</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E6931E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1C3630]">Leave request is pending</p>
                  <p className="text-[10px] text-[#7B9E96]">Jul 20, 2026 - Vacation</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-[#D9381E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#1C3630]">Leave request was rejected</p>
                  <p className="text-[10px] text-[#7B9E96]">Jun 20, 2026 - Personal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Balance Card */}
          <div className="bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-3">
            <h3 className="text-xs font-bold text-[#1C3630] pb-2 border-b border-[#E7EFEA]">
              Leave Balance
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F0F5F3]">
                <span className="text-[#4E7269] font-medium">Vacation Leave</span>
                <span className="font-bold text-[#1C3630]">10 Days</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F5F3]">
                <span className="text-[#4E7269] font-medium">Sick Leave</span>
                <span className="font-bold text-[#1C3630]">5 Days</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F5F3]">
                <span className="text-[#4E7269] font-medium">Personal Leave</span>
                <span className="font-bold text-[#1C3630]">2 Days</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#1C3630] font-bold">Remaining Leave</span>
                <span className="font-black text-[#2A8257] text-sm">7 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full border border-[#CDE0DA] space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7EFEA]">
              <h3 className="text-base font-bold text-[#1C3630]">New Leave Application</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#6C8E85] hover:text-[#1C3630]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#486B62] mb-1">Leave Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                  className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                >
                  <option value="Vacation">Vacation Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Personal">Personal Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#486B62] mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#486B62] mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#486B62] mb-1">Reason</label>
                <textarea
                  rows={3}
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide reason for leave..."
                  className="w-full p-2.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E7EFEA]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#EEF4F2] text-[#41635B] rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2A8257] hover:bg-[#216B47] text-white rounded-xl font-bold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
