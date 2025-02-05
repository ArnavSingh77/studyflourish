
export interface Subject {
  id: string;
  name: string;
  color: string;
}

export interface StudyLog {
  id?: string;
  user_id: string;
  subject: string;
  duration: number;
  notes?: string;
  created_at?: string;
}

export interface FocusNode {
  id: string;
  subject: Subject;
  startTime: string;
  endTime: string;
  duration: number;
  mode: 'pomodoro' | 'stopwatch';
}
