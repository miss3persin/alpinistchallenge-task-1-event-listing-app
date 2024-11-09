export const getStoredEvents = () => {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
};

export const saveEvent = (event) => {
    const events = getStoredEvents();
    const updatedEvents = [...events, { ...event, id: Date.now() }];
    localStorage.setItem('events', JSON.stringify(updatedEvents));
};

export const deleteEvent = (id) => {
    const events = getStoredEvents().filter((event) => event.id !== id);
    localStorage.setItem('events', JSON.stringify(events));
};

export const getBookmarks = () => {
    const bookmarks = localStorage.getItem('bookmarks');
    return bookmarks ? JSON.parse(bookmarks) : [];
};

export const saveBookmark = (event) => {
    const bookmarks = getBookmarks();
    bookmarks.push(event);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

export const removeBookmark = (id) => {
    const bookmarks = getBookmarks().filter((event) => event.id !== id);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

export const isBookmarked = (id) => {
    const bookmarks = getBookmarks();
    return bookmarks.some(event => event.id === id);
};

export const toggleBookmark = (event) => {
    const isEventBookmarked = isBookmarked(event.id);
    isEventBookmarked ? removeBookmark(event.id) : saveBookmark(event);
};
