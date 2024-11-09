'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EventDetailsRoot() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, [router]);

  return <p>Redirecting...</p>;
}
