import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  username: string
  email: string
  created_at: string
  updated_at: string
  study_logs?: StudyLog[]
}

export type StudyLog = {
  id: string
  user_id: string
  subject: string
  duration: number
  notes: string
  created_at: string
}
