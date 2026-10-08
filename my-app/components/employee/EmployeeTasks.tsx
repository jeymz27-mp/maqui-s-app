'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Tag,
  X,
  Edit3,
} from 'lucide-react';
import { Task, TaskStatus } from '../../types/ems';

export function EmployeeTasks() {
  const { currentUser, tasks, updateTaskByEmployee } = useEMS();

  // Selected task for right Details panel (Figma Page 8)
  const [selectedTaskId, setSelectedTaskId] = useState<string>('TSK-1001');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<TaskStatus>('In Progress');
  const [notes, setNotes] = useState('');

  if (!currentUser) return null;

  // Selected task or fallback
  const activeTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  const pendingTasks = tasks.filter((t) => t.status === 'Pending');
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress');
  const completedTasks = tasks.filter((t) => t.status === 'Completed');
  const overdueTasks = tasks.filter((t) => t.status === 'Overdue');

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTask) {
      updateTaskByEmployee(activeTask.id, newStatus, notes);
      setUpdateModalOpen(false);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top 4 Summary Cards (Figma Page 8) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Pending */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF0D5] flex items-center justify-center text-[#DF8E15] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#577B72]">Pending</p>
            <p className="text-xl font-black text-[#DF8E15]">3</p>
            <p className="text-[9px] text-[#7E9F97]">Tasks to do</p>
          </div>
        </div>

        {/* In progress */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDF5E6] flex items-center justify-center text-[#DFA215] shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#577B72]">In progress</p>
            <p className="text-xl font-black text-[#DFA215]">3</p>
            <p className="text-[9px] text-[#7E9F97]">Task ongoing</p>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E6F4EA] flex items-center justify-center text-[#2A8257] shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#577B72]">Completed</p>
            <p className="text-xl font-black text-[#2A8257]">3</p>
            <p className="text-[9px] text-[#7E9F97]">Task done</p>
          </div>
        </div>

        {/* Overdue */}
        <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FDE2DC] flex items-center justify-center text-[#D9381E] shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#577B72]">Overdue</p>
            <p className="text-xl font-black text-[#D9381E]">1</p>
            <p className="text-[9px] text-[#7E9F97]">Past due tasks</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Task Sections (Left 7) & Task Details (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Task Groups (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Pending Tasks Section */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7EFEA]">
              <h2 className="text-xs font-bold text-[#DFA215]">Pending (3)</h2>
              <span className="text-[11px] font-semibold text-[#486E64] hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-2">
              {pendingTasks.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTaskId(t.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedTaskId === t.id ? 'bg-[#EBF3F0] border-[#3D6B5F]' : 'bg-[#F9FBFB] border-[#DCE8E4] hover:bg-[#F2F7F5]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input type="radio" checked={selectedTaskId === t.id} readOnly className="mt-1 accent-[#3D6B5F]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1C3630]">{t.title}</h4>
                      <p className="text-[10px] text-[#6F938B] line-clamp-1">{t.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#577B72]">{t.dueDate}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#FDF0D5] text-[#DF8E15]">
                      {t.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress Tasks Section */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7EFEA]">
              <h2 className="text-xs font-bold text-[#2A75B8]">In progress (3)</h2>
              <span className="text-[11px] font-semibold text-[#486E64] hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-2">
              {inProgressTasks.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTaskId(t.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedTaskId === t.id ? 'bg-[#EBF3F0] border-[#3D6B5F]' : 'bg-[#F9FBFB] border-[#DCE8E4] hover:bg-[#F2F7F5]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input type="radio" checked={selectedTaskId === t.id} readOnly className="mt-1 accent-[#3D6B5F]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1C3630]">{t.title}</h4>
                      <p className="text-[10px] text-[#6F938B] line-clamp-1">{t.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#577B72]">{t.dueDate}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#EBF3F0] text-[#2A75B8]">
                      {t.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Tasks Section */}
          <div className="bg-white rounded-2xl p-4 shadow-md border border-[#CDE0DA] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7EFEA]">
              <h2 className="text-xs font-bold text-[#2A8257]">Completed (5)</h2>
              <span className="text-[11px] font-semibold text-[#486E64] hover:underline cursor-pointer">View All</span>
            </div>

            <div className="space-y-2">
              {completedTasks.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTaskId(t.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedTaskId === t.id ? 'bg-[#EBF3F0] border-[#3D6B5F]' : 'bg-[#F9FBFB] border-[#DCE8E4] hover:bg-[#F2F7F5]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <input type="radio" checked={selectedTaskId === t.id} readOnly className="mt-1 accent-[#2A8257]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#1C3630] line-through text-[#6F938B]">{t.title}</h4>
                      <p className="text-[10px] text-[#8EAFA7] line-clamp-1">{t.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#577B72]">{t.dueDate}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#E6F4EA] text-[#2A8257]">
                      Done
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Task Details Panel (5 Cols) - Figma Page 8 */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-md border border-[#CDE0DA] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7EFEA]">
              <h2 className="text-sm font-bold text-[#1C3630]">Task Details</h2>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  activeTask?.status === 'Completed'
                    ? 'bg-[#E6F4EA] text-[#2A8257]'
                    : activeTask?.status === 'In Progress'
                    ? 'bg-[#EAF2F8] text-[#2A75B8]'
                    : 'bg-[#FDF0D5] text-[#DF8E15]'
                }`}
              >
                {activeTask?.status || 'Pending'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#1C3630]">{activeTask?.title}</h3>
              <p className="text-xs text-[#52776E] mt-1 leading-relaxed">
                {activeTask?.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#E7EFEA] text-xs">
              <div className="flex items-center gap-3 text-[#4A7268]">
                <User className="w-4 h-4 text-[#3D6B5F]" />
                <div>
                  <span className="text-[10px] text-[#7E9F97] block">Assigned by:</span>
                  <strong className="text-[#1C3630]">{activeTask?.assignedByName || 'HR Department'}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#4A7268]">
                <Calendar className="w-4 h-4 text-[#3D6B5F]" />
                <div>
                  <span className="text-[10px] text-[#7E9F97] block">Due Date:</span>
                  <strong className="text-[#1C3630]">Today, {activeTask?.dueDate}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#4A7268]">
                <Clock className="w-4 h-4 text-[#3D6B5F]" />
                <div>
                  <span className="text-[10px] text-[#7E9F97] block">Priority:</span>
                  <strong className="text-[#1C3630]">{activeTask?.priority} Priority</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[#4A7268]">
                <Tag className="w-4 h-4 text-[#3D6B5F]" />
                <div>
                  <span className="text-[10px] text-[#7E9F97] block">Category:</span>
                  <strong className="text-[#1C3630]">{activeTask?.category}</strong>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (activeTask) {
                setNewStatus(activeTask.status);
                setNotes(activeTask.employeeNotes || '');
                setUpdateModalOpen(true);
              }
            }}
            className="w-full py-2.5 bg-[#2A8257] hover:bg-[#216B47] text-white text-xs font-bold rounded-xl shadow-md transition-all text-center cursor-pointer"
          >
            Update Status
          </button>
        </div>
      </div>

      {/* Update Status Modal */}
      {updateModalOpen && activeTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full border border-[#CDE0DA] space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7EFEA]">
              <h3 className="text-base font-bold text-[#1C3630]">Update Task Status</h3>
              <button onClick={() => setUpdateModalOpen(false)} className="text-[#6C8E85]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-3 text-xs">
              <p className="font-bold text-[#1C3630]">{activeTask.title}</p>

              <div>
                <label className="block font-semibold text-[#486B62] mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as TaskStatus)}
                  className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#486B62] mb-1">Progress Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Note on task deliverables..."
                  className="w-full p-2.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E7EFEA]">
                <button
                  type="button"
                  onClick={() => setUpdateModalOpen(false)}
                  className="px-4 py-2 bg-[#EEF4F2] text-[#41635B] rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2A8257] text-white rounded-xl font-bold"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
