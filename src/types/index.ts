
export interface Subject {
  id: string;
  name: string;
  color: string;
}

export interface FocusNode {
  id: string;
  subject: Subject;
  startTime: string;
  endTime: string;
  duration: number;
  mode: 'pomodoro' | 'stopwatch';
}

export interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      study_logs: {
        Row: {
          id: string;
          user_id: string;
          subject_name: string;
          subject_color: string;
          start_time: string;
          end_time: string;
          duration: number;
          mode: 'pomodoro' | 'stopwatch';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['study_logs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Omit<Database['public']['Tables']['study_logs']['Row'], 'id' | 'created_at'>>;
      };
    };
  };
}
