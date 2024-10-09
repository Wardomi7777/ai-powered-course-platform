import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { PlusCircle, List } from 'lucide-react';
import LessonEditor from './LessonEditor';
import LessonList from './LessonList';
import { useLessons } from '../contexts/LessonsContext';

const AdminDashboard: React.FC = () => {
  const { lessons, addLesson } = useLessons();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">Admin Dashboard</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/admin" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <PlusCircle className="mr-1" size={18} /> Add Lesson
                </Link>
                <Link to="/admin/lessons" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <List className="mr-1" size={18} /> Lesson List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<LessonEditor onSave={addLesson} />} />
              <Route path="/lessons" element={<LessonList lessons={lessons} />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;