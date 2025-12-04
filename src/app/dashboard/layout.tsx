'use client';

import { useRouter } from 'next/navigation';
import { getToken, logoutUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = getToken();

  if (!token) {
    router.push('/login');
    return null;
  }

  function handleLogout() {
    logoutUser();
    router.push('/login');
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-red-800 via-red-950 to-black text-white overflow-x-hidden">
      
      <header className="flex justify-between items-center p-5 bg-gray-900/20 shadow-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      {/* Center the welcome box */}
      <div className="flex justify-center items-center min-h-[calc(80vh-80px)] px-6">
        <div className="text-center">
          {children}
        </div>
      </div>

    </div>
  );
}
