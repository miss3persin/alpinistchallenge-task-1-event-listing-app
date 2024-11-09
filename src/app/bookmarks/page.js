'use client';
import { useEffect, useState } from 'react';
import EventCard from '../home/EventCard';

export default function Bookmarks() {
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarkedEvents(bookmarks);
    }, []);

    const unbookmarkEvent = (id) => {
        const updatedBookmarks = bookmarkedEvents.filter(event => event.id !== id);
        setBookmarkedEvents(updatedBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    };

    return (
        <main className="bg-[#F4EEE0] min-h-screen p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Bookmarked Events</h2>
            {bookmarkedEvents.length === 0 ? (
                <p className="text-center text-gray-500">No bookmarks found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {bookmarkedEvents.map(event => (
                        <EventCard 
                            key={event.id} 
                            event={event} 
                            onUnbookmark={() => unbookmarkEvent(event.id)} // Pass unbookmark handler
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
