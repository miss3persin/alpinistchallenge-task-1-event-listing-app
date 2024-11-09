// src/app/event-details/page.js
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EventDetailsRoot() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to a general listing or a 404 page if accessed without an ID
    router.push('/');
  }, [router]);

  return <p>Redirecting...</p>;
}
