import React, { useState, useEffect } from 'react';
import { Play, Pause, Plus, X, ChevronDown, Check, Clock, Timer as TimerIcon } from 'lucide-react';

type TimerMode = 'pomodoro' | 'stopwatch';

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
  mode: TimerMode;
}

interface PomodoroModuleProps {
  onAddFocusNode: (focusNode: FocusNode) => void;
}

const DEFAULT_SUBJECTS: Subject[] = [
  { id: '1', name: 'Mathematics', color: '#4CAF50' },
  { id: '2', name: 'Physics', color: '#2196F3' },
  { id: '3', name: 'Chemistry', color: '#F44336' },
];

const COLORS = [
  '#4CAF50', '#2196F3', '#F44336', '#FFC107', '#9C27B0',
  '#FF9800', '#795548', '#607D8B', '#E91E63', '#673AB7'
];

const PomodoroModule: React.FC<PomodoroModuleProps> = ({ onAddFocusNode }) => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [time, setTime] = useState(25 * 60);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>(DEFAULT_SUBJECTS);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<string | null>(null);
  const [isStudySessionInProgress, setIsStudySessionInProgress] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      if (!sessionStartTime) {
        setSessionStartTime(new Date().toISOString());
      }

      interval = setInterval(() => {
        if (mode === 'pomodoro') {
          setTime((time) => {
            if (time <= 1) {
              handleSessionEnd();
              return 0;
            }
            return time - 1;
          });
        } else {
          setStopwatchTime((time) => time + 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode]);

  const handleSessionEnd = () => {
    if (!selectedSubject || !sessionStartTime) return;

    const endTime = new Date().toISOString();
    const actualDuration = mode === 'pomodoro' 
      ? (25 * 60) - time  // Calculate actual time spent studying
      : stopwatchTime;

    const newFocusNode: FocusNode = {
      id: `${Date.now()}`,
      subject: selectedSubject,
      startTime: sessionStartTime,
      endTime: endTime,
      duration: actualDuration,
      mode: mode
    };

    onAddFocusNode(newFocusNode);
    setSessionStartTime(null);
    resetTimer();
    setIsStudySessionInProgress(false);
  };

  const toggleTimer = () => {
    if (!selectedSubject) {
      alert('Please select a subject first');
      return;
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'pomodoro') {
      setTime(25 * 60);
    } else {
      setStopwatchTime(0);
    }
    setSessionStartTime(null);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startStudySession = () => {
    if (!selectedSubject) {
      alert('Please select a subject first');
      return;
    }
    setIsStudySessionInProgress(true);
    setIsActive(true);
  };

  const completeStudySession = () => {
    if (!isStudySessionInProgress) {
      alert('No study session in progress');
      return;
    }
    handleSessionEnd();
  };

  const switchMode = (newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === 'pomodoro') {
      setTime(25 * 60);
    } else {
      setStopwatchTime(0);
    }
  };

  const addNewSubject = () => {
    if (!newSubjectName.trim()) return;
    
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: newSubjectName.trim(),
      color: selectedColor,
    };
    
    setSubjects([...subjects, newSubject]);
    setNewSubjectName('');
    setSelectedColor(COLORS[0]);
    setIsAddingSubject(false);
  };

  const deleteSubject = (subjectId: string) => {
    if (subjects.length <= 1) {
      alert('You must keep at least one subject');
      return;
    }
    setSubjects(subjects.filter(s => s.id !== subjectId));
    if (selectedSubject?.id === subjectId) {
      setSelectedSubject(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card mb-8">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-poppins font-semibold text-textColor mb-8">
            {mode === 'pomodoro' ? 'Pomodoro Timer' : 'Focus Stopwatch'}
          </h2>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => switchMode('pomodoro')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                mode === 'pomodoro'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-textColor hover:bg-gray-200'
              }`}
            >
              <TimerIcon className="h-5 w-5 mr-2" />
              Pomodoro
            </button>
            <button
              onClick={() => switchMode('stopwatch')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                mode === 'stopwatch'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-textColor hover:bg-gray-200'
              }`}
            >
              <Clock className="h-5 w-5 mr-2" />
              Stopwatch
            </button>
          </div>
          
          <div className="mb-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-textColor">
                Study Subject
              </label>
              <button
                onClick={() => setIsAddingSubject(true)}
                className="text-sm text-primary hover:text-primary/80 flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Subject
              </button>
            </div>

            {/* Subject Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-3 bg-white border rounded-lg flex items-center justify-between hover:border-primary transition-colors"
              >
                {selectedSubject ? (
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: selectedSubject.color }}
                    />
                    <span className="text-sm font-medium text-textColor">
                      {selectedSubject.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Select a subject</span>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="relative group cursor-pointer p-3 hover:bg-gray-50 flex items-center justify-between"
                      onClick={() => {
                        setSelectedSubject(subject);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: subject.color }}
                        />
                        <span className="text-sm font-medium text-textColor">
                          {subject.name}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSubject(subject.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Subject Modal */}
            {isAddingSubject && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Add New Subject</h3>
                  <input
                    type="text"
                    value={newSubjectName}
                    onChange={(e) => setNewSubjectName(e.target.value)}
                    placeholder="Subject name"
                    className="w-full p-2 border rounded-lg mb-4"
                  />
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-6 h-6 rounded-full ${
                            selectedColor === color ? 'ring-2 ring-offset-2 ring-primary' : ''
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setIsAddingSubject(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addNewSubject}
                      className="btn-primary"
                    >
                      Add Subject
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="timer-display text-6xl font-bold mb-8 text-textColor">
            {mode === 'pomodoro' ? formatTime(time) : formatTime(stopwatchTime)}
          </div>

          <div className="flex space-x-4">
            {!isStudySessionInProgress ? (
              <button
                onClick={startStudySession}
                className="flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                <Play className="mr-2 h-5 w-5" /> Start Study
              </button>
            ) : (
              <>
                <button
                  onClick={toggleTimer}
                  className="flex items-center px-6 py-3 bg-gray-100 text-textColor rounded-md hover:bg-gray-200 transition-colors"
                >
                  {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                  {isActive ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={completeStudySession}
                  className="flex items-center px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <Check className="mr-2 h-5 w-5" /> Complete Study
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-poppins font-semibold text-textColor mb-4">
          Quick Tips
        </h3>
        <ul className="space-y-2 text-textColor">
          <li className="flex items-center">
            <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
            {mode === 'pomodoro' 
              ? 'Take a 5-minute break after each Pomodoro session'
              : 'Set realistic goals for your focus sessions'}
          </li>
          <li className="flex items-center">
            <div className="h-2 w-2 bg-secondary rounded-full mr-2"></div>
            Stay hydrated during your study sessions
          </li>
          <li className="flex items-center">
            <div className="h-2 w-2 bg-accent rounded-full mr-2"></div>
            Review your notes during breaks to reinforce learning
          </li>
        </ul>
      </div>
    </div>
  );
}

export default PomodoroModule;
