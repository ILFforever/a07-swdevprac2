'use client';

import Link from 'next/link';
import Card from './Card';
import { useReducer } from 'react';

export default function CardPanel() {
  // Mock Data for Demonstration Only
  const mockVenueRepo = [
    {vid:"001", name:"The Bloom Pavilion", image:"/img/bloom.jpg"},
    {vid:"002", name:"Spark Space", image:"/img/sparkspace.jpg"},
    {vid:"003", name:"The Grand Table", image:"/img/grandtable.jpg"}
  ];

  // Define the reducer function for managing ratings
  type RatingState = Map<string, number>;
  type RatingAction = 
    | { type: 'add', venueName: string, rating: number }
    | { type: 'remove', venueName: string };

  const ratingReducer = (state: RatingState, action: RatingAction): RatingState => {
    switch (action.type) {
      case 'add':
        return new Map(state).set(action.venueName, action.rating);
      case 'remove':
        const newState = new Map(state);
        newState.delete(action.venueName);
        return newState;
      default:
        return state;
    }
  };

  // Initialize ratings Map
  const initialRatings = new Map<string, number>(
    mockVenueRepo.map(venue => [venue.name, 0])
  );
  
  const [ratings, dispatchRating] = useReducer(ratingReducer, initialRatings);

  const handleRatingChange = (venueName: string, rating: number) => {
    dispatchRating({ type: 'add', venueName, rating });
  };

  return (
    <div style={{margin:"20px", display:"flex", flexDirection:"row", alignContent:"space-around", flexWrap:"wrap", padding:"10px"}}>
      {
        mockVenueRepo.map((venueItem)=>(
          <Link href={`/venue/${venueItem.vid}`} className="w-1/5" key={venueItem.vid}>
            <Card 
              venueName={venueItem.name} 
              imgSrc={venueItem.image}
              venueId={venueItem.vid}
              onRatingChange={(rating) => handleRatingChange(venueItem.name, rating)}
            />
          </Link>
        ))
      }
    </div>
  );
}