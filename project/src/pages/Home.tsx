import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, BookOpen, Users, Award, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: BookOpen,
      title: 'Academic Excellence',
      description: 'Track your grades, assignments, and academic progress across all subjects.'
    },
    {
      icon: Users,
      title: 'Student Directory',
      description: 'Connect with fellow Hogwarts students from all houses and years.'
    },
    {
      icon: Award,
      title: 'House Points',
      description: 'Monitor your house standings and contributions to your house legacy.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Visualize your academic journey and set goals for continuous improvement.'
    }
  ];

  const quickStats = [
    { label: 'Current GPA', value: '3.85', color: 'text-green-600 dark:text-green-400' },
    { label: 'Attendance', value: '92%', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'House Points', value: '450', color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Subjects', value: '8', color: 'text-orange-600 dark:text-orange-400' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Sparkles className="h-16 w-16 text-primary-600 dark:text-primary-400 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Welcome to the Hogwarts Student Portal, where magic meets academics. 
          Manage your academic journey, connect with fellow students, and track your progress 
          through your magical education.
        </p>
        <div className="mt-8 inline-flex items-center space-x-2 px-6 py-3 glass-card">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            House: {user?.house}
          </span>
          <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Year {user?.year}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-slide-up">
        {quickStats.map((stat, index) => (
          <div
            key={stat.label}
            className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`text-3xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="glass-card p-6 group hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="glass-card p-8 text-center animate-slide-up">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to explore your magical dashboard?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Dive deeper into your academic journey. View your detailed progress, 
          connect with classmates, and make the most of your Hogwarts experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="/dashboard"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <TrendingUp className="h-5 w-5" />
            <span>View Dashboard</span>
          </a>
          <a
            href="/users"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <Users className="h-5 w-5" />
            <span>Browse Students</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;