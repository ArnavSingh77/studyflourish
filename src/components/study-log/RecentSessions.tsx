
import React from 'react';
import { FocusNode } from './types';
import { formatDuration } from './utils';

interface RecentSessionsProps {
  focusNodes: FocusNode[];
  onAddToLog: (node: FocusNode) => void;
}

const RecentSessions: React.FC<RecentSessionsProps> = ({ focusNodes, onAddToLog }) => {
  if (focusNodes.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Recent Pomodoro Sessions</h3>
      <div className="space-y-2">
        {focusNodes.map((node) => (
          <div 
            key={node.id} 
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 flex justify-between items-center"
          >
            <div>
              <span className="font-medium dark:text-white">{node.subject.name}</span>
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                {formatDuration(node.duration)}
              </span>
            </div>
            <button
              onClick={() => onAddToLog(node)}
              className="text-primary hover:underline dark:text-primary/80"
            >
              Add to Study Log
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSessions;
