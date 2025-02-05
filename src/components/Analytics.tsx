import React from 'react';
import { Clock, BookOpen, Target, TrendingUp } from 'lucide-react';

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

interface AnalyticsProps {
  focusNodes: FocusNode[];
}

const Analytics: React.FC<AnalyticsProps> = ({ focusNodes }) => {
  const calculateTotalStudyTime = () => {
    return focusNodes.reduce((total, node) => total + node.duration, 0);
  };

  const calculateSubjectBreakdown = () => {
    const breakdown: Record<string, number> = {};
    focusNodes.forEach(node => {
      if (breakdown[node.subject.name]) {
        breakdown[node.subject.name] += node.duration;
      } else {
        breakdown[node.subject.name] = node.duration;
      }
    });
    return breakdown;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const totalStudyTime = calculateTotalStudyTime();
  const subjectBreakdown = calculateSubjectBreakdown();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-poppins font-semibold text-textColor">
        Analytics Dashboard
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Study Time</p>
              <p className="text-2xl font-poppins font-semibold text-textColor">
                {formatTime(totalStudyTime)}
              </p>
            </div>
            <Clock className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Subjects Covered</p>
              <p className="text-2xl font-poppins font-semibold text-textColor">
                {Object.keys(subjectBreakdown).length}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Most Studied Subject</p>
              <p className="text-2xl font-poppins font-semibold text-textColor">
                {Object.keys(subjectBreakdown).length > 0 
                  ? Object.entries(subjectBreakdown).reduce((a, b) => a[1] > b[1] ? a : b)[0]
                  : 'N/A'
                }
              </p>
            </div>
            <Target className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Study Streak</p>
              <p className="text-2xl font-poppins font-semibold text-textColor">
                {focusNodes.length} Sessions
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-poppins font-semibold text-textColor mb-4">
          Subject Study Time Breakdown
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(subjectBreakdown).map(([subject, duration]) => (
            <div key={subject} className="bg-white shadow-custom rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-textColor">{subject}</span>
                <span className="text-sm text-gray-500">{formatTime(duration)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{
                    width: `${(duration / totalStudyTime) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;