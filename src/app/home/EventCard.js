'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function EventCard({ event, onUnbookmark }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setIsBookmarked(bookmarks.some(b => b.id === event.id));
  }, [event.id]);

  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (isBookmarked) {
      bookmarks = bookmarks.filter(b => b.id !== event.id);
      if (onUnbookmark) onUnbookmark(event.id); // Call unbookmark function in parent
    } else {
      bookmarks.push(event);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Link href={`/event-details/${event.id}`}>
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold">{event.title}</h2>
        <p className="text-gray-500">{event.date} | {event.location} | {event.category}</p>
        <p className="text-gray-700 mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{event.description}</p>
      </div>
      </Link>
        <div className="flex p-4 justify-between items-center gap-3 lg:gap-0 flex-col lg:flex-row">
          <Link href={`/event-details/${event.id}`} className="text-secondary underline">View Details</Link>
          <button onClick={handleBookmark} className={`p-2 text-sm rounded-lg ${isBookmarked ? 'bg-black text-primary' : 'bg-black text-primary'}`}>
            {isBookmarked ? 'Remove bookmark' : 'Bookmark'}
          </button>
        </div>
    </div>
  );
}
