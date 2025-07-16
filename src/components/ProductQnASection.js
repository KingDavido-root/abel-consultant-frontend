import React, { useState } from 'react';

export default function ProductQnASection({ questions, onAddQuestion }) {
  const [newQuestion, setNewQuestion] = useState('');

  const handleQuestionSubmit = () => {
    if (!newQuestion.trim()) return;

    onAddQuestion({
      author: 'Anonymous', // This should be replaced with the actual user's name
      question: newQuestion,
    });

    setNewQuestion('');
  };

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-4">Customer Q&A</h2>

      {questions?.length > 0 ? (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="border-b pb-4">
              <p className="text-gray-800 font-medium">{q.question}</p>
              <p className="text-sm text-gray-500">— {q.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No questions yet.
    </p>
      )}

      <div className="mt-6">
        <h3 className="font-semibold text-md mb-2">Ask a Question</h3>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows="4"
          placeholder="Ask your question here..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        ></textarea>
        <button
          className="mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleQuestionSubmit}
        >
          Submit Question
        </button>
      </div>
    </div>
  );
}
