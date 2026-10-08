'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  CalendarCheck,
  Clock,
  XCircle,
  CalendarDays,
  Search,
  Check,
  X,
  User,
  ChevronRight,
} from 'lucide-react';
import { LeaveRequest } from '../../types/ems';

export function ManagerLeave() {
  const { leaveRequests, reviewLeaveRequest } = useEMS();

  const [activeTab, setActiveTab] = useState<'Pending' | 'Rejected' | 'Approved' | 'All'>('Pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReqId, setSelectedReqId] = useState<string>('LEV-2026-081');
  const [managerNote, setManagerNote] = useState('');

  // Sample leave items matching Figma Page 20
  const sampleRequests = [
    { id: 'LEV-2026-081', name: 'Juan Dela Cruz', dateRange: 'May 20 - May 22, 2026 (3 days)', leaveType: 'Vacation Leave', days: 3, reason: 'Family vacation trip out of town. Please consider my leave request.', dateRequested: 'May 15, 2026 - 09:41 AM', status: 'Pending' },
    { id: 'LEV-2026-082', name: 'Maria Santos', dateRange: 'May 23, 2026 (1 day)', leaveType: 'Sick Leave', days: 1, reason: 'Medical appointment for dental checkup.', dateRequested: 'May 18, 2026 - 10:00 AM', status: 'Pending' },
    { id: 'LEV-2026-083', name: 'Carlo Reyes', dateRange: 'May 20 - May 21, 2026 (2 days)', leaveType: 'Personal Leave', days: 2, reason: 'Personal errands and family commitment.', dateRequested: 'May 14, 2026 - 02:15 PM', status: 'Pending' },
    { id: 'LEV-2026-084', name: 'Liza Ramos', dateRange: 'May 28 - May 30, 2026 (3 days)', leaveType: 'Vacation Leave', days: 3, reason: 'Annual regional holiday trip.', dateRequested: 'May 10, 2026 - 08:30 AM', status: 'Pending' },
    { id: 'LEV-2026-085', name: 'Mark Reyes', dateRange: 'June 2, 2026 (1 day)', leaveType: 'Personal Leave', days: 1, reason: 'Attending relative ceremony.', dateRequested: 'May 12, 2026 - 11:45 AM', status: 'Pending' },
  ];

  const filteredRequests = sampleRequests.filter((req) => {
    const matchesTab = activeTab === 'All' || req.status === activeTab;
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.leaveType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const activeReq = sampleRequests.find((r) => r.id === selectedReqId) || sampleRequests[0];

  const handleApprove = () => {
    reviewLeaveRequest(activeReq.id, 'Approved', managerNote || 'Approved by Department Manager.');
    alert(`Leave request for ${activeReq.name} has been Approved.`);
  };

  const handleReject = () => {
    reviewLeaveRequest(activeReq.id, 'Rejected', managerNote || 'Declined due to work schedule.');
    alert(`Leave request for ${activeReq.name} has been Rejected.`);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top 4 Summary Cards (Figma Page 20) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Pending */}
        <div
          onClick={() => setActiveTab('Pending')}
          className={`bg-white rounded-2xl p-4 shadow-md border cursor-pointer transition-all ${
            activeTab === 'Pending' ? 'border-[#DF8E15] ring-1 ring-[#DF8E15]' : 'border-[#CDE0DA]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF0D5] flex items-center justify-center text-[#DF8E15] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#577B72]">Pending</p>
              <p className="text-xl font-black text-[#DF8E15]">7</p>
              <p className="text-[9px] text-[#7E9F97]">Awaiting Approval</p>
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div
          onClick={() => setActiveTab('Rejected')}
          className={`bg-white rounded-2xl p-4 shadow-md border cursor-pointer transition-all ${
            activeTab === 'Rejected' ? 'border-[#D9381E] ring-1 ring-[#D9381E]' : 'border-[#CDE0DA]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDE2DC] flex items-center justify-center text-[#D9381E] shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#577B72]">Rejected</p>
              <p className="text-xl font-black text-[#D9381E]">5</p>
              <p className="text-[9px] text-[#7E9F97]">This Year</p>
            </div>
          </div>
        </div>

        {/* Approved Leaves */}
        <div
          onClick={() => setActiveTab('Approved')}
          className={`bg-white rounded-2xl p-4 shadow-md border cursor-pointer transition-all ${
            activeTab === 'Approved' ? 'border-[#2A8257] ring-1 ring-[#2A8257]' : 'border-[#CDE0DA]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] flex items-center justify-center text-[#2A8257] shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#577B72]">Approved Leaves</p>
              <p className="text-xl font-black text-[#2A8257]">22</p>
              <p className="text-[9px] text-[#7E9F97]">This year</p>
            </div>
          </div>
        </div>

        {/* All Request */}
        <div
          onClick={() => setActiveTab('All')}
          className={`bg-white rounded-2xl p-4 shadow-md border cursor-pointer transition-all ${
            activeTab === 'All' ? 'border-[#3D6B5F] ring-1 ring-[#3D6B5F]' : 'border-[#CDE0DA]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF3F0] flex items-center justify-center text-[#3D6B5F] shrink-0">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#577B72]">All Request</p>
              <p className="text-xl font-black text-[#1C3630]">7</p>
              <p className="text-[9px] text-[#7E9F97]">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Request List & Right Details Panel (Figma Page 20) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (6 Cols): Request List with Tabs */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-xl border border-[#CDE0DA] space-y-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C9F97]" />
            <input
              type="text"
              placeholder="Search by employee name, leave type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-xs text-[#1E3731] placeholder:text-[#8AA8A1] focus:outline-none"
            />
          </div>

          {/* Tabs: Pending | Rejected | Approved | All */}
          <div className="flex border-b border-[#E7EFEA] gap-4 pb-1 text-xs font-bold">
            {(['Pending', 'Rejected', 'Approved', 'All'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-[#2A8257] text-[#2A8257]'
                    : 'border-transparent text-[#6B8E85] hover:text-[#1C3630]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Requests List */}
          <div className="space-y-2 text-xs">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedReqId(req.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedReqId === req.id
                    ? 'bg-[#EBF3F0] border-[#3D6B5F]'
                    : 'bg-[#F9FBFB] border-[#DCE8E4] hover:bg-[#F2F7F5]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EBF3F0] text-[#3D6B5F] flex items-center justify-center font-bold">
                    {req.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C3630]">{req.name}</h4>
                    <p className="text-[10px] text-[#698E84]">{req.dateRange}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7A9E96]" />
              </div>
            ))}
          </div>

          <div className="text-[11px] text-[#6C8E85] pt-2 border-t border-[#E7EFEA] flex justify-between">
            <span>Showing 1 to 5 of 7 pending requests</span>
            <span>&lt; 1 &gt;</span>
          </div>
        </div>

        {/* Right Column (6 Cols): Leave Request Details Panel (Figma Pages 20 & 21) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-xl border border-[#CDE0DA] flex flex-col justify-between space-y-4">
          {activeTab === 'Approved' ? (
            /* Figma Page 21: Approved Confirmation Card */
            <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-[#E6F4EA] text-[#2A8257] flex items-center justify-center shadow-md">
                <Check className="w-12 h-12 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold text-[#1C3630]">Approved</h3>
              <p className="text-xs text-[#698E84] max-w-xs">
                This leave application has been approved and logged into attendance records.
              </p>
            </div>
          ) : (
            /* Figma Page 20: Leave Request Decision Panel */
            <div className="space-y-4 text-xs">
              <div className="pb-2 border-b border-[#E7EFEA]">
                <h3 className="text-sm font-bold text-[#1C3630]">Leave Request Details</h3>
              </div>

              {/* Employee Header */}
              <div className="flex items-center gap-3 p-3 bg-[#F9FBFB] rounded-xl border border-[#DCE8E4]">
                <div className="w-10 h-10 rounded-full bg-[#EBF3F0] text-[#3D6B5F] flex items-center justify-center font-bold">
                  {activeReq.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-[#1C3630]">{activeReq.name}</h4>
                  <p className="text-[10px] text-[#698E84]">Staff • Employee ID: EMP-001</p>
                  <p className="text-[10px] text-[#698E84]">IT Department</p>
                </div>
              </div>

              <div className="space-y-2 text-[#2E4D46]">
                <div className="flex justify-between py-1 border-b border-[#F0F5F3]">
                  <span className="text-[#6D8F86]">Leave Type:</span>
                  <span className="font-semibold text-[#1C3630]">{activeReq.leaveType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0F5F3]">
                  <span className="text-[#6D8F86]">Date Range:</span>
                  <span className="font-semibold text-[#1C3630]">{activeReq.dateRange}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F0F5F3]">
                  <span className="text-[#6D8F86]">Total Days:</span>
                  <span className="font-bold text-[#1C3630]">{activeReq.days} days</span>
                </div>
                <div className="py-1">
                  <span className="text-[#6D8F86] block mb-1">Reason:</span>
                  <p className="bg-[#F9FBFB] p-2.5 rounded-xl border border-[#DCE8E4] text-[#1C3630]">
                    {activeReq.reason}
                  </p>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#6D8F86]">Date Requested:</span>
                  <span className="font-mono text-[11px] text-[#1C3630]">{activeReq.dateRequested}</span>
                </div>
              </div>

              <div>
                <label className="block text-[#6D8F86] mb-1">Manager Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={managerNote}
                  onChange={(e) => setManagerNote(e.target.value)}
                  placeholder="Add a note..."
                  className="w-full p-2.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                />
              </div>

              {/* Action Buttons (Figma Page 20: X Reject & ✓ Approved) */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleReject}
                  className="py-2.5 px-4 bg-white hover:bg-[#FDE2DC] text-[#D9381E] border border-[#D9381E] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>

                <button
                  type="button"
                  onClick={handleApprove}
                  className="py-2.5 px-4 bg-[#2A8257] hover:bg-[#216B47] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Approved</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
