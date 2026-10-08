'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Search,
  Sliders,
  X,
  Plus,
} from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../../types/ems';

export function ManagerTasks() {
  const { currentUser, tasks, employees, createTask, updateTaskByManager } = useEMS();

  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [selectedTask, setSelectedTask] = useState<Task | null>(tasks[0] || null);

  // Create Task Form State (Figma Page 17)
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedEmployeeName, setAssignedEmployeeName] = useState('Juan Dela Cruz');
  const [taskDept, setTaskDept] = useState('IT Department');
  const [dueDate, setDueDate] = useState('2026-07-28');
  const [priority, setPriority] = useState<TaskPriority>('High');
  const [status, setStatus] = useState<TaskStatus>('Pending');

  // Update Progress Form State (Figma Page 19)
  const [progressVal, setProgressVal] = useState(65);
  const [managerNote, setManagerNote] = useState('');

  // Sample employee list matching Figma Page 17
  const employeeSelectList = [
    { name: 'Juan Dela Cruz', position: 'Staff', status: 'Active' },
    { name: 'Maria Santos', position: 'Staff', status: 'Active' },
    { name: 'Carlo Reyes', position: 'Developer', status: 'Active' },
    { name: 'Ana Garcia', position: 'QA Engineer', status: 'Active' },
    { name: 'Paul Mendoza', position: 'System Admin', status: 'Active' },
    { name: 'Liza Ramos', position: 'HR Assistant', status: 'Active' },
    { name: 'Mark Reyes', position: 'Accountant', status: 'On leave' },
    { name: 'Samantha Lee', position: 'Marketing Specialist', status: 'Active' },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    createTask({
      title: taskTitle,
      description: taskDescription,
      assignedToId: 'EMP-001',
      assignedToName: assignedEmployeeName,
      assignedById: currentUser?.id || 'MGR-2026-101',
      assignedByName: 'Sarah Jenkins',
      department: taskDept,
      dueDate,
      priority,
      status,
      category: 'Feature',
      progress: 0,
    });
    setTaskTitle('');
    setTaskDescription('');
    setActiveTab('list');
  };

  const handleUpdateProgress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTask) return;
    updateTaskByManager(selectedTask.id, {
      progress: progressVal,
      status: progressVal === 100 ? 'Completed' : progressVal > 0 ? 'In Progress' : 'Pending',
      managerNotes: managerNote,
    });
    alert('Task progress updated successfully!');
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top 4 Summary Cards (Figma Pages 17, 18, 19) */}
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

      {/* Main Grid: Left Side Forms/Lists & Right Side Employee List/Update Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (6 Cols): Create Task Form / Task List */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-xl border border-[#CDE0DA] space-y-4">
          <div className="flex border-b border-[#E7EFEA] gap-4 pb-1">
            <button
              onClick={() => setActiveTab('create')}
              className={`pb-2 text-xs font-bold transition-all border-b-2 ${
                activeTab === 'create'
                  ? 'border-[#2A8257] text-[#2A8257]'
                  : 'border-transparent text-[#6B8E85] hover:text-[#1C3630]'
              }`}
            >
              Create Tasks
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`pb-2 text-xs font-bold transition-all border-b-2 ${
                activeTab === 'list'
                  ? 'border-[#2A8257] text-[#2A8257]'
                  : 'border-transparent text-[#6B8E85] hover:text-[#1C3630]'
              }`}
            >
              Task List
            </button>
          </div>

          {activeTab === 'create' ? (
            /* Create Tasks Form (Figma Page 17) */
            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#486B62] mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="w-full px-3.5 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#486B62] mb-1">Description</label>
                <textarea
                  rows={2.5}
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Enter task description"
                  className="w-full p-2.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#486B62] mb-1">Assign To</label>
                  <select
                    value={assignedEmployeeName}
                    onChange={(e) => setAssignedEmployeeName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                  >
                    {employeeSelectList.map((emp) => (
                      <option key={emp.name} value={emp.name}>{emp.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#486B62] mb-1">Department</label>
                  <select
                    value={taskDept}
                    onChange={(e) => setTaskDept(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                  >
                    <option value="IT Department">IT Department</option>
                    <option value="HR Department">HR Department</option>
                    <option value="Finance Department">Finance Department</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#486B62] mb-1">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#486B62] mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#486B62] mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E7EFEA]">
                <button
                  type="button"
                  onClick={() => {
                    setTaskTitle('');
                    setTaskDescription('');
                  }}
                  className="px-4 py-2 bg-[#EEF4F2] text-[#41635B] rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2D4E47] hover:bg-[#203B35] text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          ) : (
            /* Task List (Figma Page 18) */
            <div className="space-y-3 text-xs">
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedTask?.id === task.id
                        ? 'bg-[#EBF3F0] border-[#3D6B5F]'
                        : 'bg-[#F9FBFB] border-[#DCE8E4]'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-[#1C3630]">{task.title}</h4>
                      <p className="text-[10px] text-[#698E84]">{task.assignedToName} • {task.dueDate}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask(task);
                      }}
                      className="px-2.5 py-1 bg-[#EEF5F2] hover:bg-[#D5E4DE] text-[#3D6B5F] rounded-lg font-bold text-[11px]"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (6 Cols): Select Employee List OR Update Task Progress Panel (Figma Pages 17 & 19) */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 shadow-xl border border-[#CDE0DA] space-y-4">
          {activeTab === 'create' ? (
            /* Select Employee List (Figma Page 17) */
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E7EFEA]">
                <h3 className="text-xs font-bold text-[#1C3630]">Select Employee</h3>
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#7C9F97]" />
                  <input
                    type="text"
                    placeholder="Search name, position..."
                    className="pl-7 pr-2 py-1 bg-[#F2F7F5] border border-[#D3E5DE] rounded-lg text-[11px] text-[#1E3731] focus:outline-none"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[#6C8E85] text-[10px] border-b border-[#E7EFEA]">
                    <tr>
                      <th className="py-2 px-2">Employee</th>
                      <th className="py-2 px-2">Position</th>
                      <th className="py-2 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0F5F3] text-[#2C4841]">
                    {employeeSelectList.map((emp) => (
                      <tr
                        key={emp.name}
                        onClick={() => setAssignedEmployeeName(emp.name)}
                        className={`hover:bg-[#F7FAF9] cursor-pointer ${
                          assignedEmployeeName === emp.name ? 'bg-[#EBF3F0]' : ''
                        }`}
                      >
                        <td className="py-2.5 px-2 font-semibold text-[#1C3630] flex items-center gap-2">
                          <input
                            type="radio"
                            checked={assignedEmployeeName === emp.name}
                            readOnly
                            className="accent-[#3D6B5F]"
                          />
                          <span>{emp.name}</span>
                        </td>
                        <td className="py-2.5 px-2 text-[#52776E]">{emp.position}</td>
                        <td className="py-2.5 px-2">
                          <span
                            className={`text-[10px] font-bold ${
                              emp.status === 'Active' ? 'text-[#2A8257]' : 'text-[#DF8E15]'
                            }`}
                          >
                            ● {emp.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Update Task Progress Panel (Figma Page 19) */
            selectedTask && (
              <form onSubmit={handleUpdateProgress} className="space-y-4 text-xs">
                <div className="pb-2 border-b border-[#E7EFEA]">
                  <h3 className="text-sm font-bold text-[#1C3630]">Update Task Progress</h3>
                </div>

                <div className="p-3 bg-[#F9FBFB] rounded-xl border border-[#DCE8E4]">
                  <h4 className="font-bold text-[#1C3630]">{selectedTask.title}</h4>
                  <p className="text-[11px] text-[#698E84] mt-0.5">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#6D8F86] text-[11px]">Assigned To:</span>
                    <p className="font-bold text-[#1C3630]">{selectedTask.assignedToName}</p>
                  </div>
                  <div>
                    <span className="text-[#6D8F86] text-[11px]">Department:</span>
                    <p className="font-bold text-[#1C3630]">{selectedTask.department}</p>
                  </div>
                  <div>
                    <span className="text-[#6D8F86] text-[11px]">Due Date:</span>
                    <p className="font-bold text-[#1C3630]">{selectedTask.dueDate}</p>
                  </div>
                  <div>
                    <span className="text-[#6D8F86] text-[11px]">Priority:</span>
                    <span className="inline-block font-bold text-[#D9381E] bg-[#FDE2DC] px-2 py-0.5 rounded text-[10px]">
                      {selectedTask.priority}
                    </span>
                  </div>
                </div>

                {/* Progress bar and % input (Figma Page 19) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-[#1C3630]">
                    <span>Progress</span>
                    <span>{progressVal}%</span>
                  </div>
                  <div className="w-full bg-[#EDF3F0] rounded-full h-2 overflow-hidden">
                    <div className="bg-[#2A8257] h-full rounded-full" style={{ width: `${progressVal}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block font-semibold text-[#486B62] mb-1">Status</label>
                    <select
                      value={selectedTask.status}
                      onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value as TaskStatus })}
                      className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-[#486B62] mb-1">Progress (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={progressVal}
                      onChange={(e) => setProgressVal(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-[#486B62] mb-1">Manager Notes (Optional)</label>
                  <textarea
                    rows={2.5}
                    value={managerNote}
                    onChange={(e) => setManagerNote(e.target.value)}
                    placeholder="Add a note or feedback for the employee..."
                    className="w-full p-2.5 bg-[#F2F7F5] border border-[#D3E5DE] rounded-xl text-[#1E3731] focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-[#E7EFEA]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="px-4 py-2 bg-[#EEF4F2] text-[#41635B] rounded-xl font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2D4E47] hover:bg-[#203B35] text-white rounded-xl font-bold shadow-md cursor-pointer"
                  >
                    Update Progress
                  </button>
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}
