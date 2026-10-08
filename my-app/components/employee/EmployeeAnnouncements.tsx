'use client';

import React, { useState } from 'react';
import { useEMS } from '../../context/EMSContext';
import {
  Megaphone,
  Wrench,
  Gift,
  Filter,
  ArrowLeft,
  Calendar,
  User,
  Search,
} from 'lucide-react';
import { Announcement } from '../../types/ems';

export function EmployeeAnnouncements() {
  const { announcements } = useEMS();

  // Selected announcement for right details panel
  const [selectedAnn, setSelectedAnn] = useState<Announcement>(announcements[0]);

  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('maintenance') || title.toLowerCase().includes('server')) {
      return <Wrench className="w-5 h-5 text-[#3D6B5F]" />;
    }
    if (title.toLowerCase().includes('holiday')) {
      return <Gift className="w-5 h-5 text-[#3D6B5F]" />;
    }
    return <Megaphone className="w-5 h-5 text-[#3D6B5F]" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-200">
      {/* Left Column: All Announcements List (7 Cols) - Figma Page 6 */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-5 shadow-md border border-[#CDE0DA] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7EFEA]">
          <h2 className="text-sm font-bold text-[#1C3630]">All Announcements</h2>
          <button className="px-3 py-1.5 bg-[#F2F7F5] hover:bg-[#E5EFEA] border border-[#D3E5DE] text-[#3D6B5F] rounded-xl text-xs font-semibold flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Announcement Cards */}
        <div className="space-y-3">
          {announcements.map((ann) => {
            const isSelected = selectedAnn.id === ann.id;
            return (
              <div
                key={ann.id}
                onClick={() => setSelectedAnn(ann)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#EBF3F0] border-[#3D6B5F] shadow-sm'
                    : 'bg-[#F9FBFB] border-[#DCE8E4] hover:bg-[#F2F7F5]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 border border-[#DCE8E4]">
                    {getIcon(ann.title)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-[#1C3630]">{ann.title}</h3>
                    <p className="text-[10px] text-[#698E84] font-medium">{ann.postedOn.split('at')[0]}</p>
                    <p className="text-[11px] text-[#416158] mt-1 line-clamp-2 leading-relaxed">
                      {ann.message}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedAnn(ann);
                      }}
                      className="text-[11px] font-bold text-[#3D6B5F] hover:underline mt-2 inline-block"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Announcement Details Panel (5 Cols) - Figma Page 6 */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-md border border-[#CDE0DA] flex flex-col justify-between space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E7EFEA]">
            <ArrowLeft className="w-4 h-4 text-[#3D6B5F]" />
            <h2 className="text-sm font-bold text-[#1C3630]">Announcement Details</h2>
          </div>

          <div className="flex items-start gap-3 p-3 bg-[#F4FAF7] rounded-xl border border-[#D5EBE0]">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#3D6B5F] shrink-0 border border-[#D5EBE0]">
              {getIcon(selectedAnn.title)}
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1C3630]">{selectedAnn.title}</h3>
              <p className="text-[10px] text-[#698E84] font-medium">{selectedAnn.postedOn.split('at')[0]}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#1C3630]">Details</h4>
            <div className="p-3.5 bg-[#F9FBFB] rounded-xl border border-[#DCE8E4] text-xs text-[#35574F] leading-relaxed whitespace-pre-line">
              {selectedAnn.message}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#E7EFEA] text-xs">
            <div className="flex items-center gap-2 text-[#486E64]">
              <User className="w-4 h-4 text-[#3D6B5F]" />
              <span>Posted by: <strong className="text-[#1C3630]">{selectedAnn.postedByName}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[#486E64]">
              <Calendar className="w-4 h-4 text-[#3D6B5F]" />
              <span>Posted on: <strong className="text-[#1C3630]">{selectedAnn.postedOn}</strong></span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const first = announcements[0];
            setSelectedAnn(first);
          }}
          className="w-full py-2.5 bg-[#3D6B5F] hover:bg-[#2F554B] text-white text-xs font-bold rounded-xl transition-colors text-center"
        >
          Back to Announcement
        </button>
      </div>
    </div>
  );
}
