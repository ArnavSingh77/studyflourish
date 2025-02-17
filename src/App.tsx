
import { useState } from 'react';
import { Timer, BarChart3, Layout, Target, BookOpen, UserCircle } from 'lucide-react';
import PomodoroModule from './components/PomodoroModule';
import StudyLog from './components/StudyLog';
import Analytics from './components/Analytics';
import Goals from './components/Goals';
import { Auth } from './components/Auth';
import { useAuth } from './context/AuthContext';
import SettingsPage from './components/SettingsPage';

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
  mode: 'pomodoro' | 'stopwatch';
}

function App() {
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [focusNodes, setFocusNodes] = useState<FocusNode[]>([]);
  const { user, loading } = useAuth();

  const navigation = [
    { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    { id: 'log', label: 'Study Log', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'goals', label: 'Goals', icon: Target },
  ];

  const handleAddFocusNode = (focusNode: FocusNode) => {
    setFocusNodes(prev => [...prev, focusNode]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-custom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-poppins font-semibold text-textColor">
                StudyFlow
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                    ${activeTab === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-textColor hover:text-primary hover:bg-primary/5'
                    }`}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setActiveTab('settings')}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <UserCircle className="h-6 w-6 text-textColor" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-custom">
        <div className="flex justify-around p-2">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2 rounded-lg ${
                activeTab === item.id ? 'text-primary bg-primary/10' : 'text-textColor'
              }`}
            >
              <item.icon className="h-6 w-6" />
            </button>
          ))}
          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-lg ${
              activeTab === 'settings' ? 'text-primary bg-primary/10' : 'text-textColor'
            }`}
          >
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 md:mb-0">
        {activeTab === 'pomodoro' && (
          <PomodoroModule 
            onAddFocusNode={handleAddFocusNode} 
          />
        )}
        {activeTab === 'log' && (
          <StudyLog focusNodes={focusNodes} />
        )}
        {activeTab === 'analytics' && (
          <Analytics focusNodes={focusNodes} />
        )}
        {activeTab === 'goals' && (
          <Goals />
        )}
        {activeTab === 'settings' && (
          <SettingsPage />
        )}
      </main>
    </div>
  );
}

export default App;
