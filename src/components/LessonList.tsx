import React from 'react';
import { Book } from 'lucide-react';

interface LessonListProps {
  lessons: any[];
}

const LessonList: React.FC<LessonListProps> = ({ lessons }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {lessons.map((lesson, index) => (
          <li key={index}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  <Book className="inline-block mr-2" size={18} />
                  {lesson.title}
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {lesson.content.length} elements
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {lesson.content.map((element: any) => element.type).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;