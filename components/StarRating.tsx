import React from 'react';

interface StarRatingProps {
  value: number;
}

export default function StarRating({ value }: StarRatingProps) {
  const fullStars = Math.floor(value);
  const halfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center" aria-label={`Rating: ${value} out of 5 stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-amber-400">★</span>
      ))}
      {halfStar && <span className="text-amber-400">★</span>} 
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-slate-600">★</span>
      ))}
    </div>
  );
}