'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  Megaphone,
  Wrench,
  Gift,
  Search,
  Plus,
  Trash2,
  Edit2,
  UploadCloud,
  X,
} from 'lucide-react';
import { Announcement } from '../../types/ems';

export function ManagerAnnouncements() {
  const { announcements, createAnnouncement, deleteAnnouncement } = useEMS();

  const [mode, setMode] = useState<'view' | 'create'>('view');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected announcement for viewing
  const [selectedAnn, setSelectedAnn] = useState<Announcement>(announcements[0]);

  // Create form state (Figma Page 23)
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState<Announcement['audience']>('IT');
  const [message, setMessage] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [attachmentName, setAttachmentName] = useState('');

  // Sample list matching Figma Page 22
  const sampleList: Announcement[] = [
    { id: 'ANN-1', title: 'Team Meeting This Friday', message: 'This meeting will include important updates from management, upcoming projects, and an open forum for questions. We look forward to seeing everyone there!', audience: 'IT', postedById: 'MGR-101', postedByName: 'HR Department', postedByRole: 'Manager', postedOn: 'May 15, 2026 10:30 AM', isPinned: true, status: 'Published' },
    { id: 'ANN-2', title: 'System Maintenance Notice', message: 'The server will undergo maintenance on Saturday at 11:00 PM. Production services will be unaffected.', audience: 'All Employees', postedById: 'MGR-101', postedByName: 'IT Department', postedByRole: 'Manager', postedOn: 'May 14, 2026 03:15 PM', isPinned: false, status: 'Published' },
    { id: 'ANN-3', title: 'New Leave Policy', message: 'Updated annual leave accrual terms are now available in the company policy documents.', audience: 'All Employees', postedById: 'MGR-101', postedByName: 'HR Department', postedByRole: 'Manager', postedOn: 'May 10, 2026 09:00 AM', isPinned: false, status: 'Published' },
    { id: 'ANN-4', title: 'IT Security Reminder', message: 'Please ensure 2FA authentication is enabled across all workstations.', audience: 'IT', postedById: 'MGR-101', postedByName: 'IT Department', postedByRole: 'Manager', postedOn: 'May 8, 2026 08:45 AM', isPinned: false, status: 'Published' },
    { id: 'ANN-5', title: 'Work from Home Guidelines', message: 'Updated hybrid work schedules and department approval workflows.', audience: 'All Employees', postedById: 'MGR-101', postedByName: 'HR Department', postedByRole: 'Manager', postedOn: 'May 5, 2026 11:20 AM', isPinned: false, status: 'Published' },
  ];

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;
    createAnnouncement({
      title,
      audience,
      message,
      isPinned,
      status: 'Published',
    });
    setMode('view');
    setTitle('');
    setMessage('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-200">
      {/* Left Column (7 Cols): Announcement List (Figma Page 22) */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xl border border-[#CDE0DA] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7EFEA]">
          <div>
            <h2 className="text-sm font-bold text-[#1C3630]">Announcement List</h2>
            <p className="text-[10px] text-[#698E84]">View and manage all department announcements.</p>
          </div>

          <button
            onClick={() => setMode('create')}
            className="px-3.5 py-1.5 bg-[#2A8257] hover:bg-[#216B47] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Announcement</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C9F97]" />
          <input
            type="text"
            placeholder="Search announcement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-xs text-[#1E3731] placeholder:text-[#8AA8A1] focus:outline-none"
          />
        </div>

        {/* Table matching Figma Page 22 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[#6C8E85] font-semibold text-[10px] border-b border-[#E7EFEA] pb-2">
              <tr>
                <th className="py-2.5 px-3">Announcement</th>
                <th className="py-2.5 px-3">Audience</th>
                <th className="py-2.5 px-3">Date Posted</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F5F3] text-[#2C4841]">
              {sampleList.map((ann) => (
                <tr
                  key={ann.id}
                  onClick={() => {
                    setSelectedAnn(ann);
                    setMode('view');
                  }}
                  className={`hover:bg-[#F7FAF9] cursor-pointer ${
                    selectedAnn.id === ann.id && mode === 'view' ? 'bg-[#EBF3F0]' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#EBF3F0] text-[#3D6B5F] flex items-center justify-center shrink-0">
                        <Megaphone className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1C3630]">{ann.title}</h4>
                        <p className="text-[10px] text-[#698E84] line-clamp-1">{ann.message}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#52776E]">{ann.audience}</td>
                  <td className="py-3 px-3 font-mono text-[10px] text-[#698E84]">{ann.postedOn}</td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold text-[#2A8257] bg-[#E6F4EA] px-2 py-0.5 rounded-full">
                      {ann.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-[#6C8E85] pt-3 border-t border-[#E7EFEA]">
          <span>Showing 1 to 5 of 35+ Announcements</span>
          <div className="flex items-center gap-1">
            <button className="w-6 h-6 rounded bg-[#3D6B5F] text-white font-bold text-xs flex items-center justify-center">
              1
            </button>
          </div>
        </div>
      </div>

      {/* Right Column (5 Cols): Announcement Details OR Create Form (Figma Pages 22 & 23) */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xl border border-[#CDE0DA] space-y-4">
        {mode === 'view' ? (
          /* View Announcement Details (Figma Page 22) */
          <div className="space-y-4 text-xs">
            <div className="pb-2 border-b border-[#E7EFEA]">
              <h3 className="text-sm font-bold text-[#1C3630]">Announcement Details</h3>
            </div>

            <div className="p-3 bg-[#F4FAF7] rounded-xl border border-[#D5EBE0] flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-white text-[#3D6B5F] flex items-center justify-center shadow-sm shrink-0 border border-[#D5EBE0]">
                <Megaphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#1C3630]">{selectedAnn.title}</h4>
                <p className="text-[10px] text-[#698E84] font-medium">{selectedAnn.postedOn}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <h5 className="font-bold text-[#1C3630]">Details</h5>
              <p className="p-3.5 bg-[#F9FBFB] rounded-xl border border-[#DCE8E4] text-[#35574F] leading-relaxed">
                {selectedAnn.message}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E7EFEA] text-[#486E64]">
              <p>Posted by: <strong className="text-[#1C3630]">{selectedAnn.postedByName}</strong></p>
              <p>Posted on: <strong className="text-[#1C3630]">{selectedAnn.postedOn}</strong></p>
            </div>

            {/* Delete & Edit Buttons (Figma Page 22) */}
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => {
                  deleteAnnouncement(selectedAnn.id);
                  alert('Announcement deleted.');
                }}
                className="flex-1 py-2 bg-white hover:bg-[#FDE2DC] text-[#D9381E] border border-[#D9381E] rounded-xl font-bold text-xs transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setTitle(selectedAnn.title);
                  setMessage(selectedAnn.message);
                  setMode('create');
                }}
                className="flex-1 py-2 bg-[#2D4E47] hover:bg-[#203B35] text-white rounded-xl font-bold text-xs transition-colors shadow-md"
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          /* Create New Announcement Form (Figma Page 23) */
          <form onSubmit={handlePost} className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7EFEA]">
              <div>
                <h3 className="text-sm font-bold text-[#1C3630]">Create New Announcement</h3>
                <p className="text-[10px] text-[#698E84]">Fill in the details to post a new announcement.</p>
              </div>
              <button onClick={() => setMode('view')} className="text-[#6C8E85]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block font-semibold text-[#486B62] mb-1">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title..."
                className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#486B62] mb-1">Audience *</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
              >
                <option value="IT">IT Department</option>
                <option value="All Employees">All Employees</option>
                <option value="HR">HR Department</option>
                <option value="Finance">Finance Department</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block font-semibold text-[#486B62]">Message *</label>
                <span className="text-[10px] text-[#698E84] font-mono">{message.length}/255</span>
              </div>
              <textarea
                rows={3}
                required
                maxLength={255}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement here..."
                className="w-full p-2.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
              />
            </div>

            {/* Attachment upload box (Figma Page 23) */}
            <div>
              <label className="block font-semibold text-[#486B62] mb-1">Attachment (Optional)</label>
              <div
                onClick={() => setAttachmentName('Company_Notice.pdf')}
                className="p-3 border border-dashed border-[#B8D1C9] bg-[#F9FBFB] rounded-xl text-center cursor-pointer hover:bg-[#F2F7F5] transition-colors"
              >
                <UploadCloud className="w-5 h-5 text-[#3D6B5F] mx-auto mb-1" />
                <p className="text-[10px] font-semibold text-[#3D6B5F]">
                  {attachmentName ? `Attached: ${attachmentName}` : 'Click to upload or drag and drop'}
                </p>
                <p className="text-[9px] text-[#7A9E96]">(PDF, JPG, PNG - max 5MB)</p>
              </div>
            </div>

            {/* Schedule */}
            <div>
              <label className="block font-semibold text-[#486B62] mb-1">Schedule (Optional)</label>
              <input
                type="datetime-local"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
              />
            </div>

            {/* Pin Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="pin"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="accent-[#2A8257] w-4 h-4"
              />
              <label htmlFor="pin" className="text-[11px] text-[#35574F] font-semibold cursor-pointer">
                Pin this announcement
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#E7EFEA]">
              <button
                type="button"
                onClick={() => setMode('view')}
                className="px-4 py-2 bg-[#EEF4F2] text-[#41635B] rounded-xl font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#2D4E47] hover:bg-[#203B35] text-white rounded-xl font-bold shadow-md cursor-pointer"
              >
                Post Announcement
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
