// "use client"
import React from 'react'

export default function CategoryCard({ name, image }) {
    return (
        <div className="max-w-sm  overflow-hidden rounded-lg shadow bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <img className="w-full h-72"
                src={image ? image : "/images/Ocko.gif"}
                alt="Sunset in the mountains" />
            <div className="px-6 py-4">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {name ? name : "No name"}
                </h5>
            </div>
        </div>
    )
}
