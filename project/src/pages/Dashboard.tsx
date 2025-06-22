import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock,
  Target,
  Users,
  Star,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const summaryCards = [
    {
      title: 'Current GPA',
      value: '3.85',
      subtitle: 'Out of 4.0',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-300',
      change: '+0.15 from last term'
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      subtitle: '138 of 150 classes',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300',
      change: '+5% from last month'
    },
    {
      title: 'Active Subjects',
      value: '8',
      subtitle: 'Current semester',
      icon: BookOpen,
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-300',
      change: '2 advanced courses'
    },
    {
      title: 'House Points',
      value: '450',
      subtitle: `${user?.house} contribution`,
      icon: Award,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-700 dark:text-orange-300',
      change: '+75 this week'
    }
  ];

  const recentActivities = [
    {
      icon: CheckCircle,
      title: 'Completed Potions Assignment',
      description: 'Successfully brewed Felix Felicis',
      time: '2 hours ago',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Star,
      title: 'Earned 25 House Points',
      description: 'Outstanding performance in Defense Against the Dark Arts',
      time: '1 day ago',
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: BookOpen,
      title: 'New Course Material',
      description: 'Advanced Transfiguration chapters available',
      time: '2 days ago',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Users,
      title: 'Study Group Invitation',
      description: 'Hermione invited you to join Arithmancy study group',
      time: '3 days ago',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Transfiguration Exam',
      date: 'Tomorrow, 9:00 AM',
      location: 'Classroom 1F',
      type: 'Exam'
    },
    {
      title: 'Quidditch Practice',
      date: 'Friday, 4:00 PM',
      location: 'Quidditch Pitch',
      type: 'Activity'
    },
    {
      title: 'Potions Essay Due',
      date: 'Monday, 11:59 PM',
      location: 'Online Submission',
      type: 'Assignment'
    },
    {
      title: 'Career Counseling',
      date: 'Next Week',
      location: 'Guidance Office',
      type: 'Meeting'
    }
  ];

  const subjects = [
    { name: 'Defense Against the Dark Arts', grade: 'O', progress: 95 },
    { name: 'Transfiguration', grade: 'E', progress: 88 },
    { name: 'Potions', grade: 'E', progress: 85 },
    { name: 'Charms', grade: 'O', progress: 92 },
    { name: 'Herbology', grade: 'A', progress: 78 },
    { name: 'Care of Magical Creatures', grade: 'E', progress: 89 },
    { name: 'Divination', grade: 'A', progress: 75 },
    { name: 'Arithmancy', grade: 'O', progress: 94 }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'O': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'E': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'A': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Exam': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      case 'Activity': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'Assignment': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'Meeting': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
          Student Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back, {user?.name}! Here's your academic overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="glass-card p-6 hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">
                    {card.value.charAt(0)}
                  </span>
                </div>
              </div>
              
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                {card.subtitle}
              </p>
              
              <div className={`text-xs ${card.textColor} font-medium`}>
                {card.change}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activities
              </h2>
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-4 glass rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">
                    <div className={`p-2 rounded-full ${activity.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-').replace('-600', '-100').replace('-400', '-900/30')}`}>
                      <Icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Upcoming Events
              </h2>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 glass rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    {event.date}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {event.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="mt-8">
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Subject Progress
            </h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {subjects.map((subject, index) => (
              <div key={subject.name} className="p-4 glass rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {subject.name}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getGradeColor(subject.grade)}`}>
                    {subject.grade}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;