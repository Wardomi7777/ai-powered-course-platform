import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from 'lucide-react';
import LessonViewer from './LessonViewer';
import { useLessons } from '../contexts/LessonsContext';

const UserDashboard: React.FC = () => {
  const { lessons } = useLessons();
  const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
  const navigate = useNavigate();

  const handleLessonSelect = (lesson: any) => {
    setSelectedLesson(lesson);
    navigate(`/user/lesson/${lesson.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">User Dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Available Lessons</h2>
                <ul className="divide-y divide-gray-200">
                  {lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className="py-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleLessonSelect(lesson)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Book className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {lesson.title}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {selectedLesson && (
              <div className="mt-6">
                <LessonViewer lesson={selectedLesson} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;