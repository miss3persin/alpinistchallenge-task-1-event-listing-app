
# Event Listing App (Eventify ✨)

## Project Overview
Eventify ✨, The Event Listing App is a web application that enables users to view, add, and bookmark events. Users can navigate through an organized list of events, view event details, and bookmark specific events for later reference. This app supports essential CRUD operations like adding new events and removing them from bookmarks. It uses local storage to save events and bookmarks, ensuring data persistence even when the user exits and returns to the site.

### Key Features
- **Event Browsing**: View a list of available events, each displayed with relevant details like title, date, location, and description.
- **Event Details Page**: Click on an event to view more detailed information.
- **Add New Events**: Submit a form to add new events to the listing.
- **Bookmark Events**: Bookmark favorite events for quick access.
- **Unbookmark Functionality**: Unbookmark events directly from the bookmark page.
- **Persistent Storage**: Events and bookmarks are saved in local storage for data persistence.

## Tech Stack
- **Next.js**: React framework for building server-rendered or statically exported applications.
- **React**: JavaScript library for building user interfaces.
- **TailwindCSS**: Styling for a responsive, user-friendly layout.
- **Local Storage**: Persistent storage of events and bookmarks.

## Setup Instructions

### Prerequisites
Make sure you have **Node.js** installed on your machine.

### Installation Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/miss3persin/alpinistchallenge-task-1-event-listing-app.git
   ```
2. **Navigate to the Project Directory**:
   ```bash
   cd alpinistchallenge-task-1-event-listing-app
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Testing
Currently, no automated tests have been implemented in this project.

To add testing:
- **Unit Testing**: Use a framework like **Jest** to create component and utility function tests.
- **End-to-End Testing**: Consider using a framework like **Cypress** to test the complete user flows, such as adding and removing bookmarks.

## Future Improvements
- **Form Validation**: Ensure all required fields are filled before submitting.
- **UI Enhancements**: Refine the UI for an improved user experience.
- **Backend Integration**: Consider replacing local storage with a backend API for more advanced data handling and scalability.

## License
This project is licensed under the MIT License.
