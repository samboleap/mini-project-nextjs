import React from 'react'
import { BASE_URL } from '../utils/constant'
import UserCard from '../components/UserCard'

async function fetchUsers() {
  const res = await fetch(`${BASE_URL}users?limit=8`, {cache: "no-store"})
  return res.json()
}

export default async function Users() {
  const users = await fetchUsers()
  return (
    <main className="gap-x-4 px-16 mt-28">
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Users </span>
        <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">LISTING</span>
      </h1>
      {
        <article className='flex flex-wrap items-center justify-between'>
          {
            users.map(
              (user) => (
                <div key={user.id} className='my-4 w-96 min-h-full'>
                <UserCard
                id={user.id}
                avatar={user.avatar}
                name={user.name}
                role={user.role}
                />
                </div>
              )
            )
          }
        </article>
      }
    </main>
  )
}