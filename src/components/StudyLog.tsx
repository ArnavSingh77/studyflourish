
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import AddLogForm from './study-log/AddLogForm';
import LogList from './study-log/LogList';
import RecentSessions from './study-log/RecentSessions';
import type { StudyLog, FocusNode } from './study-log/types';

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
        <AddLogForm 
          newLog={newLog}
          setNewLog={setNewLog}
          onSave={addManualStudyLog}
          onCancel={() => setIsAddingLog(false)}
        />
      )}

      {loading ? (
        <div className="text-center py-6 dark:text-gray-300">Loading study logs...</div>
      ) : studyLogs.length === 0 ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No study logs yet. Start tracking your study sessions!
        </div>
      ) : (
        <LogList logs={studyLogs} onDelete={deleteStudyLog} />
      )}

      <RecentSessions 
        focusNodes={focusNodes}
        onAddToLog={addStudyLogFromFocusNode}
      />
    </div>
  );
};

export default StudyLog;
