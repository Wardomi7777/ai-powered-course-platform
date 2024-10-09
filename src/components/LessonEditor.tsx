import React, { useState, useRef } from 'react';
import { PlusCircle, X, Upload } from 'lucide-react';

interface LessonEditorProps {
  onSave: (lesson: any) => void;
}

const LessonEditor: React.FC<LessonEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<any[]>([]);
  const [systemPrompt, setSystemPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addElement = (type: string) => {
    setContent([...content, { type, value: '' }]);
  };

  const updateElement = (index: number, value: string) => {
    const newContent = [...content];
    newContent[index].value = value;
    setContent(newContent);
  };

  const removeElement = (index: number) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
  };

  const handleSave = () => {
    onSave({ title, content, systemPrompt });
    setTitle('');
    setContent([]);
    setSystemPrompt('');
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newContent = [...content];
      newContent[index].value = e.target?.result as string;
      setContent(newContent);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Lesson</h3>
        <div className="mt-5">
          <input
            type="text"
            placeholder="Lesson Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mt-5">
          <textarea
            placeholder="System Prompt for Assistant"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
          />
        </div>
        <div className="mt-5">
          {content.map((element, index) => (
            <div key={index} className="mb-4 flex items-center">
              {element.type === 'text' && (
                <textarea
                  value={element.value}
                  onChange={(e) => updateElement(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                />
              )}
              {element.type === 'video' && (
                <input
                  type="text"
                  value={element.value}
                  onChange={(e) => updateElement(index, e.target.value)}
                  placeholder="Video URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
              {element.type === 'audio' && (
                <input
                  type="text"
                  value={element.value}
                  onChange={(e) => updateElement(index, e.target.value)}
                  placeholder="Audio URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              )}
              {element.type === 'image' && (
                <div className="w-full">
                  <input
                    type="text"
                    value={element.value}
                    onChange={(e) => updateElement(index, e.target.value)}
                    placeholder="Image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="mt-2 flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(index, file);
                        }
                      }}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </button>
                    {element.value && (
                      <img src={element.value} alt="Uploaded" className="ml-2 h-10 w-10 object-cover rounded-md" />
                    )}
                  </div>
                </div>
              )}
              <button
                onClick={() => removeElement(index)}
                className="ml-2 p-2 text-red-600 hover:text-red-800"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-5 flex space-x-2">
          <button
            onClick={() => addElement('text')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="mr-2" size={18} /> Text
          </button>
          <button
            onClick={() => addElement('video')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="mr-2" size={18} /> Video
          </button>
          <button
            onClick={() => addElement('audio')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="mr-2" size={18} /> Audio
          </button>
          <button
            onClick={() => addElement('image')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="mr-2" size={18} /> Image
          </button>
        </div>
        <div className="mt-5">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonEditor;