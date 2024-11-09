'use client'
import { useState, useEffect } from 'react';

export default function FilterBar({ filters, onFilterChange, onSearch, onApplyFilters }) {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className='relative mt-[21rem] md:mt-64 lg:mt-20 p-0 flex items-center justify-center'>
        <div className="fixed top-28 md:top-16 flex lg:flex-row flex-col gap-2 lg:gap-0 justify-between items-center bg-primary w-11/12 p-4 rounded-lg shadow-md">
            {/* Filter by Category */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-0 space-x-4 text-sm md:text-base lg:text-sm xl:text-base mb-5 lg:mb-0">
                {['All', 'Music', 'Food', 'Sports', 'Networking', 'Anime'].map(category => (
                    <button
                        key={category}
                        onClick={() => onFilterChange('category', category)}
                        className={`text-black ${localFilters.category === category ? 'underline' : ''} hover:underline`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Filter by Date */}
            <input
                type="date"
                name="date"
                value={localFilters.date}
                onChange={handleFilterChange}
                placeholder="Select Date"
                className="p-2 rounded-md outline-none w-full lg:w-32 xl:w-auto text-sm md:text-base lg:text-sm xl:text-base"
            />

            {/* Filter by Location */}
            <input
                type="text"
                name="location"
                value={localFilters.location}
                onChange={handleFilterChange}
                placeholder="Location"
                className="p-2 rounded-md outline-none w-full lg:w-32 xl:w-auto text-sm md:text-base lg:text-sm xl:text-base"
            />

            {/* Search bar */}
            <input
                type="text"
                name="searchTerm"
                value={localFilters.searchTerm || ''}
                onChange={handleSearch}
                placeholder="Search events..."
                className="p-2 rounded-md outline-none w-full lg:w-32 xl:w-auto text-sm md:text-base lg:text-sm xl:text-base"
            />

            {/* Apply Filters Button */}
            <button
                onClick={onApplyFilters}
                className="bg-black text-primary p-2 rounded-md mt-2 md:mt-0 text-sm md:text-base lg:text-sm xl:text-base"
            >
                Apply Filters
            </button>
        </div>
        </div>
    );
}
