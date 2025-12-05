'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';

export default function RegisterPage() {
  const router = useRouter();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name,
          last_name,
          username,
          password,
          email
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Register failed');
        return;
      }

      router.push('/login');
    } catch (err: any) {
      setError('Network error. Cannot connect to server.');
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-800 via-red-950 to-black">
      <Card className="w-full max-w-sm p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white rounded-xl shadow-2xl">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Register</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              type="text"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />

            <Input
              type="text"
              placeholder="Username (8-20 characters)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              className="
                w-full bg-black transition 
                hover:bg-gray-900 
                shadow-md
                hover:shadow-red-500/20 hover:shadow-lg
              "
              type="submit"
            >
              Register
            </Button>
          </form>

          <Button
            variant="link"
            className="mt-2 w-full font-medium text-white hover:underline"
            onClick={() => router.push('/login')}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
