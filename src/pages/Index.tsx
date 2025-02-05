import StudyTimer from '@/components/StudyTimer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-textColor">
          Study Time Tracker
        </h1>
        <StudyTimer />
      </div>
    </div>
  );
};

export default Index;