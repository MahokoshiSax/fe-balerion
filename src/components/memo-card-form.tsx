import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { MemoCardDataType } from '@/pages/HomePage';

interface MemoCardFormProps {
  title: string;
  userLabel: string;
  loading?: boolean;
  onSave: (data: MemoCardDataType) => void;
}

const MemoCardForm: React.FC<MemoCardFormProps> = ({ title, userLabel, loading, onSave }) => {
  const [description, setDescription] = useState('');
  const colorUserBadge = userLabel === "admin" ? "bg-red-400" : "bg-blue-400"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSave({
        title,
        role: userLabel,
        description,
      });
      setDescription('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-[10px] shadow py-[20px] px-[15px] flex gap-4 items-start w-[347px] h-[198px] border border-blue-100"
    >
      <div className="flex flex-col items-start min-w-[80px] justify-between h-full">
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-gray-400 mb-2 uppercase">{title}</span>
          <Badge className={`${colorUserBadge} text-[12px] rounded-2xl text-white font-bold uppercase`}>{userLabel}</Badge>
        </div>
        <button
          type="submit"
          className="font-bold text-center w-full text-gray-700 underline hover:text-black focus:outline-none border-none bg-transparent shadow-none px-0 py-0"
          disabled={loading || !description.trim()}
        >
          SAVE
        </button>
      </div>
      <div className="flex-1">
        <textarea
          className="w-full h-[150px] bg-gray-100 rounded-[10px] p-2 focus:outline-none resize-none"
          placeholder="Type something ..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

export default MemoCardForm; 