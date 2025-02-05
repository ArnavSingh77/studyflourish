import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { StudyLog } from '../lib/supabase'

export function Profile() {
  const { profile, signOut } = useAuth()
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (profile?.id) {
      fetchStudyLogs()
    }
  }, [profile?.id])

  async function fetchStudyLogs() {
    setLoading(true)
    const { data, error } = await supabase
      .from('study_logs')
      .select('*')
      .eq('user_id', profile?.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching study logs:', error)
    } else {
      setStudyLogs(data || [])
    }
    setLoading(false)
  }

  if (!profile) {
    return null
  }

  const totalHours = studyLogs.reduce((acc, log) => acc + log.duration, 0) / 60
  const subjectCounts = studyLogs.reduce((acc, log) => {
    acc[log.subject] = (acc[log.subject] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  const mostStudiedSubject = Object.entries(subjectCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'No subjects yet'

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Study Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Total Study Sessions</p>
              <p className="text-2xl font-bold">{studyLogs.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold">{totalHours.toFixed(1)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600">Most Studied Subject</p>
              <p className="text-2xl font-bold">{mostStudiedSubject}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Study Logs</h3>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : studyLogs.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No study logs yet. Start studying to see your progress!
            </div>
          ) : (
            <div className="space-y-4">
              {studyLogs.map((log) => (
                <div key={log.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{log.subject}</h4>
                      <p className="text-gray-600">{log.notes}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(log.created_at).toLocaleDateString()}
                      </p>
                      <p className="font-medium">{log.duration} minutes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
