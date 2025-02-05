import React, { useState, useEffect } from 'react';
import { Clock, Trash2, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface Subject {
  id: string;
  name: string;
  color: string;
}

interface StudyLog {
  id?: string;
  user_id: string;
  subject: string;
  duration: number;
  notes?: string;
  created_at?: string;
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
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);
  const [newLog, setNewLog] = useState<Partial<StudyLog>>({});
  const [isAddingLog, setIsAddingLog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchStudyLogs();
  }, [user?.id]);

  const fetchStudyLogs = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('study_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching study logs:', error);
    } else {
      setStudyLogs(data || []);
    }
    setLoading(false);
  };

  const addStudyLogFromFocusNode = async (focusNode: FocusNode) => {
    if (!user) return;

    const newStudyLog: StudyLog = {
      user_id: user.id,
      subject: focusNode.subject.name,
      duration: focusNode.duration,
      notes: `${focusNode.mode} session`
    };

    const { data, error } = await supabase
      .from('study_logs')
      .insert(newStudyLog)
      .select();

    if (error) {
      console.error('Error adding study log:', error);
    } else if (data) {
      setStudyLogs([...studyLogs, data[0]]);
    }
  };

  const addManualStudyLog = async () => {
    if (!user || !newLog.subject || !newLog.duration) return;

    const studyLog: StudyLog = {
      user_id: user.id,
      subject: newLog.subject,
      duration: newLog.duration,
      notes: newLog.notes
    };

    const { data, error } = await supabase
      .from('study_logs')
      .insert(studyLog)
      .select();

    if (error) {
      console.error('Error adding manual study log:', error);
    } else if (data) {
      setStudyLogs([data[0], ...studyLogs]);
      setNewLog({});
      setIsAddingLog(false);
    }
  };

  const deleteStudyLog = async (logId: string) => {
    const { error } = await supabase
      .from('study_logs')
      .delete()
      .eq('id', logId);

    if (error) {
      console.error('Error deleting study log:', error);
    } else {
      setStudyLogs(studyLogs.filter(log => log.id !== logId));
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
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
    <div className="space-y-6 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-poppins font-semibold text-textColor dark:text-white">
          Study Log
        </h2>
        <button 
          onClick={() => setIsAddingLog(!isAddingLog)}
          className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors dark:bg-primary/80 dark:hover:bg-primary/70"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Entry
        </button>
      </div>

      {isAddingLog && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
            <input
              type="text"
              value={newLog.subject || ''}
              onChange={(e) => setNewLog({...newLog, subject: e.target.value})}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              placeholder="Enter subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Duration (minutes)</label>
            <input
              type="number"
              value={newLog.duration || ''}
              onChange={(e) => setNewLog({...newLog, duration: parseInt(e.target.value)})}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              placeholder="Enter study duration"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes (optional)</label>
            <textarea
              value={newLog.notes || ''}
              onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              placeholder="Add any additional notes"
            />
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={addManualStudyLog}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors dark:bg-primary/80 dark:hover:bg-primary/70"
            >
              Save Log
            </button>
            <button 
              onClick={() => setIsAddingLog(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-6 dark:text-gray-300">Loading study logs...</div>
      ) : studyLogs.length === 0 ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No study logs yet. Start tracking your study sessions!
        </div>
      ) : (
        <div className="space-y-4">
          {studyLogs.map((log) => (
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
                  onClick={() => deleteStudyLog(log.id!)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {focusNodes.length > 0 && (
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
                  onClick={() => addStudyLogFromFocusNode(node)}
                  className="text-primary hover:underline dark:text-primary/80"
                >
                  Add to Study Log
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyLog;
