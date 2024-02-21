'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    
  };
  

  return (
    <div className="mt-10 mx-auto w-full max-w-sm p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-1 border-gray-400 outline-none focus:border-blue-600 py-2 text-gray-900 placeholder:text-gray-400 pl-4 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-1 border-gray-400 outline-none focus:border-blue-600 py-2 text-gray-900 placeholder:text-gray-400 pl-4 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <Link href="/rummy/dashboard"
            // type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Page;
