
import React from 'react';
import { StudyLog } from '../../lib/supabase';

interface AddLogFormProps {
  newLog: Partial<StudyLog>;
  setNewLog: (log: Partial<StudyLog>) => void;
  onSave: () => void;
  onCancel: () => void;
}

const AddLogForm: React.FC<AddLogFormProps> = ({ newLog, setNewLog, onSave, onCancel }) => {
  return (
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
          onClick={onSave}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors dark:bg-primary/80 dark:hover:bg-primary/70"
        >
          Save Log
        </button>
        <button 
          onClick={onCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddLogForm;
