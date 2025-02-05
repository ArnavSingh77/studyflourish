
import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { StudyLog } from '../../lib/supabase';
import { formatDate, formatDuration } from './utils';

interface LogListProps {
  logs: StudyLog[];
  onDelete: (id: string) => void;
}

const LogList: React.FC<LogListProps> = ({ logs, onDelete }) => {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div 
          key={log.id} 
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold text-lg dark:text-white">{log.subject}</h3>
            <p className="text-gray-600 dark:text-gray-300">{log.notes}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(log.created_at || new Date().toISOString())}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <Clock className="mr-2 h-5 w-5" />
              {formatDuration(log.duration)}
            </div>
            <button 
              onClick={() => onDelete(log.id!)}
              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogList;
