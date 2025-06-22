import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Mail, Phone, Globe, Search, Filter } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  house?: string;
  year?: number;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');

  // Hogwarts student data to replace API data
  const hogwartsStudents = [
    { name: 'Harry Potter', house: 'Gryffindor', year: 7 },
    { name: 'Hermione Granger', house: 'Gryffindor', year: 7 },
    { name: 'Ron Weasley', house: 'Gryffindor', year: 7 },
    { name: 'Draco Malfoy', house: 'Slytherin', year: 7 },
    { name: 'Luna Lovegood', house: 'Ravenclaw', year: 6 },
    { name: 'Neville Longbottom', house: 'Gryffindor', year: 7 },
    { name: 'Ginny Weasley', house: 'Gryffindor', year: 6 },
    { name: 'Cedric Diggory', house: 'Hufflepuff', year: 7 },
    { name: 'Cho Chang', house: 'Ravenclaw', year: 7 },
    { name: 'Seamus Finnigan', house: 'Gryffindor', year: 7 },
    { name: 'Dean Thomas', house: 'Gryffindor', year: 7 }
  ];

  const houses = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

  const getHouseColors = (house: string) => {
    switch (house) {
      case 'Gryffindor':
        return 'from-red-500 to-yellow-500';
      case 'Slytherin':
        return 'from-green-500 to-gray-600';
      case 'Ravenclaw':
        return 'from-blue-500 to-purple-500';
      case 'Hufflepuff':
        return 'from-yellow-500 to-gray-700';
      default:
        return 'from-primary-500 to-secondary-500';
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Fetch from API
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        
        // Transform API data to include Hogwarts information
        const transformedUsers = response.data.slice(0, hogwartsStudents.length).map((user: any, index: number) => ({
          ...user,
          name: hogwartsStudents[index].name,
          email: `${hogwartsStudents[index].name.toLowerCase().replace(' ', '.')}@hogwarts.edu`,
          house: hogwartsStudents[index].house,
          year: hogwartsStudents[index].year,
          phone: `+44 ${Math.floor(Math.random() * 900000000) + 100000000}`,
          website: `${hogwartsStudents[index].name.toLowerCase().replace(' ', '')}.hogwarts.org`
        }));
        
        setUsers(transformedUsers);
      } catch (err) {
        setError('Failed to fetch student data. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.house?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHouse = selectedHouse === '' || user.house === selectedHouse;
    return matchesSearch && matchesHouse;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading Hogwarts students...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card p-8 text-center">
          <div className="text-red-500 dark:text-red-400 text-lg font-semibold mb-2">
            Error Loading Students
          </div>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary mt-4"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
          Hogwarts Student Directory
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Connect with fellow students from all four houses
        </p>
      </div>

      {/* Search and Filter */}
      <div className="glass-card p-6 mb-8 animate-slide-up">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name, email, or house..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedHouse}
              onChange={(e) => setSelectedHouse(e.target.value)}
              className="pl-10 pr-8 py-3 glass rounded-lg border border-white/20 dark:border-white/10 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white bg-transparent appearance-none cursor-pointer"
            >
              <option value="">All Houses</option>
              {houses.map(house => (
                <option key={house} value={house} className="bg-white dark:bg-gray-800">
                  {house}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredUsers.length} of {users.length} students
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => (
          <div
            key={user.id}
            className="glass-card p-6 group hover:scale-105 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getHouseColors(user.house || '')} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {user.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${getHouseColors(user.house || '')}`}></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {user.house} • Year {user.year}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{user.phone}</span>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                <Globe className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{user.website}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/10 dark:border-white/5">
              <button className="w-full btn-secondary text-sm py-2">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 text-lg">
            No students found matching your criteria
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Try adjusting your search or filter options
          </p>
        </div>
      )}
    </div>
  );
};

export default Users;