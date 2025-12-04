'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { saveToken } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { API_BASE } from '@/lib/config';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ← NEW

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true); // ← Start loading

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setError(data.message || 'Login failed');
        setLoading(false); // ← Stop loading
        return;
      }

      const token = data.token || data.accessToken || data.access_token;

      if (!token) {
        setError("No token returned from server.");
        console.error("Server did not return a token:", data);
        setLoading(false); // ← Stop loading
        return;
      }

      saveToken(token);
      router.push('/dashboard');

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false); // ← Stop loading on error
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-800 via-red-950 to-black">
      <Card className="w-full max-w-md p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-white rounded-xl shadow-2xl">
        <CardContent>
          <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
            WELCOME BACK
          </h2>

          <h1 className="text-xl font-bold mb-4 text-white">Login</h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              className="
                w-full bg-black transition 
                hover:bg-gray-930 
                shadow-md
                hover:shadow-red-500/20 hover:shadow-lg
              "
              type="submit"
              disabled={loading} // ← Disable while logging in
            >
              {loading ? "Logging in..." : "Login"} {/* ← Change text */}
            </Button>
          </form>

          {/* Go to register */}
          <Button
            variant="link"
            className="mt-2 w-full font-medium text-white hover:underline"
            onClick={() => router.push('/register')}
          >
            Create an account
          </Button>

          {/* Back to Home */}
          <Button
            variant="link"
            className="mt-1 w-full font-medium text-white hover:underline"
            onClick={() => router.push('/')}
          >
            ← Back to Home
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}
