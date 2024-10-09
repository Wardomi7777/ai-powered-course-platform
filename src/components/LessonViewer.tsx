import React, { useState } from 'react';
import { HelpCircle, Globe, Baby, Book, Brain, UserX } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useUser } from '../contexts/UserContext';

interface LessonViewerProps {
  lesson: any;
}

const LessonViewer: React.FC<LessonViewerProps> = ({ lesson }) => {
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const { apiKey } = useUser();

  const handleQuestionSubmit = async (elementIndex: number, question: string) => {
    setLoading({ ...loading, [elementIndex]: true });

    try {
      if (!apiKey) {
        throw new Error('API key is missing. Please make sure you have entered a valid OpenAI API key.');
      }

      const element = lesson.content[elementIndex];
      const isImage = element.type === 'image';
      const model = isImage ? 'gpt-4o' : 'gpt-4o';

      let messages = [
        { role: 'system', content: lesson.systemPrompt || 'You are a helpful assistant.' },
        { role: 'user', content: `Context: ${element.value}\n\nQuestion: ${question}` },
      ];

      if (isImage) {
        messages = [
          { role: 'system', content: lesson.systemPrompt || 'You are a helpful assistant.' },
          {
            role: 'user',
            content: [
              { type: 'text', text: question },
              { type: 'image_url', image_url: { url: element.value } }
            ],
          },
        ];
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        throw new Error('Unexpected API response format');
      }
      const answer = data.choices[0].message.content;

      setComments({ ...comments, [elementIndex]: answer });
    } catch (error) {
      console.error('Error fetching answer:', error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      setComments({ 
        ...comments, 
        [elementIndex]: `Error: ${errorMessage}`
      });
    }

    setLoading({ ...loading, [elementIndex]: false });
  };

  const handleQuickAction = (elementIndex: number, action: string) => {
    let question = '';
    switch (action) {
      case 'translate':
        question = 'Translate this content to the language I specified during login.';
        break;
      case 'explain':
        question = 'Explain this content as if I were a 5-year-old.';
        break;
      case 'sources':
        question = 'Can you provide a few other sources on this topic?';
        break;
      case 'exercise':
        question = 'Give me a question or exercise to reinforce this knowledge.';
        break;
      case 'challenge':
        question = 'Act as an expert trying to challenge this thesis.';
        break;
      default:
        question = 'Can you explain this further?';
    }
    handleQuestionSubmit(elementIndex, question);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{lesson.title}</h2>
        {lesson.content.map((element: any, index: number) => (
          <div key={index} className="mb-6">
            {element.type === 'text' && (
              <div className="prose max-w-none">
                <ReactMarkdown>{element.value}</ReactMarkdown>
              </div>
            )}
            {element.type === 'video' && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={element.value}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
            {element.type === 'audio' && (
              <audio controls className="w-full">
                <source src={element.value} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            {element.type === 'image' && (
              <img src={element.value} alt="Lesson content" className="max-w-full h-auto" />
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const question = prompt('What is your question about this section?');
                  if (question) {
                    handleQuestionSubmit(index, question);
                  }
                }}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HelpCircle className="mr-1" size={16} />
                Ask a question
              </button>
              <button onClick={() => handleQuickAction(index, 'translate')} title="Translate" className="p-1 rounded-full text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Globe size={20} />
              </button>
              <button onClick={() => handleQuickAction(index, 'explain')} title="Explain like I'm 5" className="p-1 rounded-full text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Baby size={20} />
              </button>
              <button onClick={() => handleQuickAction(index, 'sources')} title="Other sources" className="p-1 rounded-full text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Book size={20} />
              </button>
              <button onClick={() => handleQuickAction(index, 'exercise')} title="Give me an exercise" className="p-1 rounded-full text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Brain size={20} />
              </button>
              <button onClick={() => handleQuickAction(index, 'challenge')} title="Challenge this thesis" className="p-1 rounded-full text-gray-400 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <UserX size={20} />
              </button>
            </div>
            {loading[index] && <p className="mt-2 text-sm text-gray-500">Loading answer...</p>}
            {comments[index] && (
              <div className="mt-2 p-3 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-700">{comments[index]}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonViewer;