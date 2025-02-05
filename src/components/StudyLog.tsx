import React from 'react';
import { Clock, Book } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  color: string;
}

interface FocusNode {
  id: string;
  subject: Subject;
  startTime: string;
  endTime: string;
  duration: number;
  mode: 'pomodoro' | 'stopwatch';
}

interface StudyLogProps {
  focusNodes: FocusNode[];
}

const StudyLog: React.FC<StudyLogProps> = ({ focusNodes }) => {
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-poppins font-semibold text-textColor">
          Study Log
        </h2>
        <button className="btn-primary">
          Add Entry
        </button>
      </div>
      
      <div className="space-y-4">
        {focusNodes.length === 0 ? (
          <div className="text-center text-gray-500">
            No study sessions logged yet
          </div>
        ) : (
          // Sort focus nodes by startTime in descending order (latest first)
          [...focusNodes]
            .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
            .map((node) => (
            <div 
              key={node.id} 
              className="bg-white shadow-custom rounded-lg p-4 flex items-center space-x-4"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: node.subject.color + '20', color: node.subject.color }}
              >
                <Book className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-textColor">{node.subject.name}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(node.startTime)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(node.duration)}</span>
                    <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs">
                      {node.mode === 'pomodoro' ? 'Pomodoro' : 'Stopwatch'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyLog;
