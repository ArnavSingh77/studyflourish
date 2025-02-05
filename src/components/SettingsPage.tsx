import { useState } from 'react'
import { Search, User, Bell, Monitor, Lock, Timer, BookOpen, Target } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const SettingsPage = () => {
  const { user, profile } = useAuth()
  const [activeSection, setActiveSection] = useState('profile')

  const sections = [
    {
      title: 'Personal',
      items: [
        { id: 'profile', label: 'Profile', icon: User, description: 'Manage your personal information' },
        { id: 'studyGoals', label: 'Study Goals', icon: Target, description: 'Set and track your learning objectives' }
      ]
    },
    {
      title: 'Productivity',
      items: [
        { id: 'pomodoroSettings', label: 'Pomodoro Settings', icon: Timer, description: 'Customize your study timer' },
        { id: 'studyLogPreferences', label: 'Study Log', icon: BookOpen, description: 'Configure study tracking' }
      ]
    },
    {
      title: 'Preferences',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Manage notification settings' },
        { id: 'appearance', label: 'Appearance', icon: Monitor, description: 'Customize app look and feel' }
      ]
    },
    {
      title: 'Account',
      items: [
        { id: 'security', label: 'Security', icon: Lock, description: 'Manage account security' }
      ]
    }
  ]

  const renderMainContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="flex-1 px-8 py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Profile Settings</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search profile settings"
                  className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm w-[280px] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Username</div>
                      <div className="text-sm text-gray-500">{profile?.username || 'Not set'}</div>
                    </div>
                    <button className="text-blue-600 hover:underline">Edit</button>
                  </div>
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-500">{user?.email || 'Not set'}</div>
                    </div>
                    <button className="text-blue-600 hover:underline">Change</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'studyGoals':
        return (
          <div className="flex-1 px-8 py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Study Goals</h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Goal Settings</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Daily Study Time Goal</div>
                      <div className="text-sm text-gray-500">Set your target study duration</div>
                    </div>
                    <input 
                      type="number" 
                      placeholder="Hours" 
                      className="w-20 px-2 py-1 border rounded-md text-sm"
                    />
                  </div>
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Weekly Subject Focus</div>
                      <div className="text-sm text-gray-500">Prioritize your study subjects</div>
                    </div>
                    <button className="text-blue-600 hover:underline">Configure</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'pomodoroSettings':
        return (
          <div className="flex-1 px-8 py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Pomodoro Settings</h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Timer Preferences</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Work Session Duration</div>
                      <div className="text-sm text-gray-500">Length of focused work time</div>
                    </div>
                    <input 
                      type="number" 
                      placeholder="Minutes" 
                      className="w-20 px-2 py-1 border rounded-md text-sm"
                    />
                  </div>
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Break Duration</div>
                      <div className="text-sm text-gray-500">Length of rest between sessions</div>
                    </div>
                    <input 
                      type="number" 
                      placeholder="Minutes" 
                      className="w-20 px-2 py-1 border rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'notifications':
        return (
          <div className="flex-1 px-8 py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Notification Settings</h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Study Reminders</div>
                      <div className="text-sm text-gray-500">Get nudges to start your study sessions</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Goal Progress Alerts</div>
                      <div className="text-sm text-gray-500">Notifications about study goal achievements</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'appearance':
        return (
          <div className="flex-1 px-8 py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Appearance</h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Theme Preferences</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Color Mode</div>
                      <div className="text-sm text-gray-500">Choose between light and dark themes</div>
                    </div>
                    <div className="flex space-x-4">
                      <button className="flex flex-col items-center p-2 rounded-lg border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <div className="w-16 h-12 bg-white border rounded-md mb-2"></div>
                        <span className="text-xs">Light</span>
                      </button>
                      <button className="flex flex-col items-center p-2 rounded-lg border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <div className="w-16 h-12 bg-gray-800 rounded-md mb-2"></div>
                        <span className="text-xs">Dark</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 'security':
        return (
          <div className="flex-1 px-8 py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Security</h1>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500 uppercase mb-4">Account Security</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Change Password</div>
                      <div className="text-sm text-gray-500">Update your account password</div>
                    </div>
                    <button className="text-blue-600 hover:underline">Change</button>
                  </div>
                  <div className="bg-white rounded-lg border p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-500">Add an extra layer of security</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          <nav className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-gray-500 text-sm font-medium mb-2">{section.title}</h2>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center ${
                          activeSection === item.id
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                        <div>
                          <div>{item.label}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      {renderMainContent()}
    </div>
  )
}

export default SettingsPage
