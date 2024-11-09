'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative bg-primary text-secondary md:pt-6 pt-0 pb-10 flex md:flex-row flex-col justify-between items-center">
        <div className='fixed bg-primary px-6 pb-4 pt-6 md:pt-10 flex md:flex-row flex-col justify-between items-center w-full'>
      <h1 className="text-2xl font-bold mb-4 md:mb-0 text-black">
        <Link href="/home">Eventify ✨</Link>
      </h1>
      <div className="flex space-x-6 text-black">
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
      </div>
    </nav>
  );
}
