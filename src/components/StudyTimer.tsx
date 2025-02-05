import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, Play, Pause, Square } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const StudyTimer = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [subject, setSubject] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!subject) {
      toast({
        title: "Subject Required",
        description: "Please enter a subject before starting the timer",
        variant: "destructive",
      });
      return;
    }
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
    if (time > 0) {
      toast({
        title: "Session Completed",
        description: `You studied ${subject} for ${formatTime(time)}`,
      });
    }
    setTime(0);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  return (
    <Card className="p-6 max-w-md mx-auto bg-white shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Timer className="w-8 h-8 text-primary mr-2" />
        <h2 className="text-2xl font-semibold text-textColor">Study Timer</h2>
      </div>

      <input
        type="text"
        placeholder="Enter subject..."
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        disabled={isActive}
      />

      <div className="text-4xl font-mono text-center mb-6 text-textColor">
        {formatTime(time)}
      </div>

      <div className="flex justify-center space-x-4">
        {!isActive ? (
          <Button
            onClick={handleStart}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Start
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            className="bg-secondary hover:bg-secondary/90 text-white"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        )}
        <Button
          onClick={handleStop}
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
        >
          <Square className="w-4 h-4 mr-2" />
          Stop
        </Button>
      </div>
    </Card>
  );
};

export default StudyTimer;