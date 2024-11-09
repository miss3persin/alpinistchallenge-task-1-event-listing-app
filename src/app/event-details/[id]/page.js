// src/app/event-details/[id]/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStoredEvents, isBookmarked, toggleBookmark } from '../../utils/localStorage';
import eventsData from '../../data/events.json'; // Import the default events data
import Link from 'next/link';
import { Loader } from '@/app/components/Loader';

export default function EventDetails({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedEvents = getStoredEvents();
    let foundEvent = storedEvents.find(event => event.id === parseInt(id, 10));

    // Check in eventsData if not found in localStorage
    if (!foundEvent) {
      foundEvent = eventsData.find(event => event.id === parseInt(id, 10));
    }

    if (!foundEvent) {
      router.push('/404'); // Redirect to a 404 if not found
    } else {
      setEvent(foundEvent);
      setBookmarked(isBookmarked(foundEvent.id)); // Check if the event is bookmarked
    }
  }, [id, router]);

  const handleBookmarkToggle = () => {
    if (event) {
      toggleBookmark(event);
      setBookmarked(prev => !prev); // Toggle the bookmarked state
    }
  };

  if (!event) return <Loader />;

  return (
    <main className="bg-primary min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-md" />
        <h1 className="text-2xl font-bold mt-4 mb-2 text-center md:text-left">{event.title}</h1>
        <p className="text-gray-700 font-medium text-lg text-center md:text-left">{event.category}</p>
        <p className="text-gray-500 text-center md:text-left">{event.date} | {event.time} | {event.location}</p>
        <p className="text-gray-700 mt-4 break-words text-center md:text-left">{event.description}</p>

        <div className='flex flex-col md:flex-row items-center justify-between'>
          <button className="mt-6 text-secondary underline">
            <Link href='/home'>
              Back to events
            </Link>
          </button>
          <button
            onClick={handleBookmarkToggle}
            className={`mt-6 p-2 rounded-lg ${bookmarked ? 'bg-black text-primary' : 'bg-black text-primary'}`}
          >
            {bookmarked ? 'Remove bookmark' : 'Bookmark'}
          </button>
        </div>
      </div>
    </main>
  );
}
