"use client";

import { getToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
  exp: number;
  iat: number;
}

export default function DashboardHome() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedToken = getToken();
    setToken(storedToken);

    if (!storedToken) return;

    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      if (decoded.username) setUsername(decoded.username);
    } catch (e) {
      console.error("Token decoding failed:", e);
    }
  }, []);

  return (
    <div className="bg-gray-900/60 p-15 rounded-xl shadow-xl w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Welcome, {username}
      </h2>

      {token && (
        <>
          <p className="text-left w-full text-gray-300">Your Bearer Token:</p>
          <pre className="p-3 bg-black/40 text-xs mt-3 break-all rounded border border-red-900/30 overflow-auto max-h-[300px]">
            {token}
          </pre>
        </>
      )}
    </div>
  );
}
