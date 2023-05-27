import Link from 'next/link';
import React from 'react';

export default function Heading() {
  return (
    <section className="mt-28">
      <div className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill" style={{ backgroundImage: `url(../images/products.jpg)` }}>
        <div className="md:w-1/2">
          <p className="font-bold text-sm uppercase">Services</p>
          <p className="text-3xl font-bold">Multimedia products</p>
          <p className="text-2xl mb-10 leading-none">Attractive designs for your brand</p>
          <Link href="/">
            <button className="bg-purple-800 py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800">Contact us</button>
          </Link>
        </div>
      </div>
    </section>
  );
}