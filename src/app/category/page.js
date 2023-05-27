import React from 'react'
import { BASE_URL } from '../utils/constant';
import CategoryCard from '../components/CategoryCard';

async function fetchCategories() {
  const items = await fetch(`${BASE_URL}categories?limit=12`, { cache: "no-store" })
  return items.json()
}

export default async function Categories() {
  const cates = await fetchCategories()
  return (

    <main className="gap-x-4 px-16 mt-28">
      <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Categories </span>
        <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">LISTING</span>
        </h1>
      {
        <article className='flex flex-wrap items-center justify-between'>
          {
            cates.map(
              cate => (
                <div key={cate.id} className='my-4 w-96 min-h-full'>
                <CategoryCard
                id={cate.id}
                image={cate.image}
                name={cate.name}
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