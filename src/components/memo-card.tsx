import React from 'react';
import { Badge } from './ui/badge';

interface MemoCardProps {
  title: string;
  userLabel: string;
  content: string;
}

const MemoCard: React.FC<MemoCardProps> = ({ title, userLabel, content }) => {
  const colorUserBadge = userLabel === "admin" ? "bg-red-400" : "bg-blue-400"
  return (
    <div className="bg-white rounded-[10px] shadow py-[20px] px-[15px] flex gap-4 items-start w-[347px] h-[198px] border border-blue-100">
      <div className="flex flex-col items-start min-w-[80px] uppercase">
        <span className="text-[15px] font-bold text-gray-400 mb-2">{title}</span>
        <Badge className={`${colorUserBadge} text-[12px] text-white font-bold rounded-2xl border-none`} variant="outline">{userLabel}</Badge>
      </div>
      <div className="text-gray-800 text-left text-[10px] leading-[20px]">
        {content}
      </div>
    </div>
  );
};




export default MemoCard;
