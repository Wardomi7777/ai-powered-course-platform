import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Lesson {
  id: number;
  title: string;
  content: any[];
  systemPrompt: string;
}

interface LessonsContextType {
  lessons: Lesson[];
  addLesson: (lesson: Lesson) => void;
}

const LessonsContext = createContext<LessonsContextType | undefined>(undefined);

export const LessonsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const addLesson = (lesson: Lesson) => {
    setLessons((prevLessons) => [...prevLessons, { ...lesson, id: Date.now() }]);
  };

  return (
    <LessonsContext.Provider value={{ lessons, addLesson }}>
      {children}
    </LessonsContext.Provider>
  );
};

export const useLessons = () => {
  const context = useContext(LessonsContext);
  if (context === undefined) {
    throw new Error('useLessons must be used within a LessonsProvider');
  }
  return context;
};