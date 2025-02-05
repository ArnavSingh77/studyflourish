
import { Target, CheckCircle, Circle } from 'lucide-react';

const Goals = () => {
  const goals = [
    {
      id: 1,
      title: 'Complete Calculus Module',
      progress: 75,
      deadline: '2024-03-01',
      completed: false,
    },
    {
      id: 2,
      title: 'Physics Lab Reports',
      progress: 100,
      deadline: '2024-02-28',
      completed: true,
    },
    // Add more mock data as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-poppins font-semibold text-textColor">
          Study Goals
        </h2>
        <button className="btn-primary flex items-center">
          <Target className="h-5 w-5 mr-2" />
          New Goal
        </button>
      </div>

      <div className="grid gap-4">
        {goals.map((goal) => (
          <div key={goal.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {goal.completed ? (
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 mr-2" />
                )}
                <span className="font-poppins font-medium text-lg">
                  {goal.title}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                Due: {goal.deadline}
              </span>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-primary">
                    {goal.progress}% Complete
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
                <div
                  style={{ width: `${goal.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Goals;
