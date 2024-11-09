'use client';
import EventCard from './EventCard';
import eventsData from '../data/events.json';
import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import { Loader } from '../components/Loader';
import { getStoredEvents } from '../utils/localStorage';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    date: '',
    location: '',
    searchTerm: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedEvents = getStoredEvents();
      const combinedEvents = [...eventsData, ...storedEvents];
      setEvents(combinedEvents);
      setFilteredEvents(combinedEvents);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = (query) => {
    setFilters(prev => ({ ...prev, searchTerm: query }));
  };

  const handleApplyFilters = () => {
    let filtered = events;

    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(event => event.category === filters.category);
    }

    if (filters.date) {
      filtered = filtered.filter(event => event.date === filters.date);
    }

    if (filters.location) {
      filtered = filtered.filter(event => event.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(event => event.title.toLowerCase().includes(filters.searchTerm.toLowerCase()));
    }

    setFilteredEvents(filtered);
  };

  return (
    <main className="bg-[#F4EEE0] min-h-screen">
      <FilterBar 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onSearch={handleSearch} 
        onApplyFilters={handleApplyFilters} 
      />
      
      {loading ? (
        <Loader />
      ) : (
        <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No events found.</p>
          )}
        </div>
      )}
    </main>
  );
}
