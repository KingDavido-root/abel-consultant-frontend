import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function ProductReviewSection({ reviews, onAddReview }) {
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleReviewSubmit = () => {
    if (!newReview.trim() || newRating === 0) return;

    onAddReview({
      author: 'Anonymous', // This should be replaced with the actual user's name
      comment: newReview,
      rating: newRating,
    });

    setNewReview('');
    setNewRating(0);
    setHoverRating(0);
  };

  return (
    <div className="mt-6">
      <h2 className="font-semibold text-lg mb-4">Customer Reviews</h2>

      {reviews?.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  {review.author}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      <div className="mt-6">
        <h3 className="font-semibold text-md mb-2">Write a Review</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={(hoverRating || newRating) > i ? 'text-yellow-400' : 'text-gray-300'}
              onClick={() => setNewRating(i + 1)}
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          rows="4"
          placeholder="Write your review here..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        ></textarea>
        <button
          className="mt-2 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleReviewSubmit}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
