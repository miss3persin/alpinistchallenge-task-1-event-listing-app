'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary text-secondary p-6 flex md:flex-row flex-col justify-between items-center">
      <h1 className="text-2xl font-bold mb-4 md:mb-0">
        <Link href="/home">Eventify ✨</Link>
      </h1>
      <div className="flex space-x-6">
        <Link 
          href="/home" 
          className={`hover:underline ${pathname === '/home' ? 'underline' : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/add-event" 
          className={`hover:underline ${pathname === '/add-event' ? 'underline' : ''}`}
        >
          Add Event
        </Link>
        <Link 
          href="/bookmarks" 
          className={`hover:underline ${pathname === '/bookmarks' ? 'underline' : ''}`}
        >
          Bookmarks
        </Link>
      </div>
    </nav>
  );
}
