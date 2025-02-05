import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, BookOpen } from 'lucide-react';

const TimerModule = () => {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [subject, setSubject] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card mb-8">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-poppins font-semibold text-textColor mb-8">
            Focus Timer
          </h2>
          
          <div className="mb-8 w-full max-w-xs">
            <label className="block text-sm font-medium text-textColor mb-2">
              Study Subject
            </label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What are you studying?"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="timer-display text-6xl font-bold mb-8 text-textColor">
            {formatTime(time)}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={toggleTimer}
              className="btn-primary flex items-center"
            >
              {isActive ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetTimer}
              className="btn-secondary flex items-center"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </button>
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
            Take a 5-minute break after each session
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

export default TimerModule;
