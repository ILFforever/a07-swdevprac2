'use client';

import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { useState } from 'react';
import { Rating } from '@mui/material';

type CardProps = {
  venueName: string;
  imgSrc: string;
  venueId: string;
  onRatingChange?: (rating: number) => void;
};

export default function Card({ venueName, imgSrc, venueId, onRatingChange }: CardProps) {
  const [rating, setRating] = useState<number>(0);

  const handleRatingChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    const newRating = newValue || 0;
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <InteractiveCard>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image 
          src={imgSrc}
          alt={`${venueName} Image`}
          fill={true}
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="w-full h-[30%] p-[10px]">
        <div className="mb-1 text-black">{venueName}</div>
        <Rating 
          value={rating} 
          onChange={handleRatingChange}
          id={`${venueName} Rating`}
          name={`${venueName} Rating`}
          data-testid={`${venueName} Rating`}
          precision={1}
          onClick={(e) => e.stopPropagation()} // Prevent link navigation when rating
        />
      </div>
    </InteractiveCard>
  );
}