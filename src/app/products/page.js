import Link from 'next/link'
import { BASE_URL } from '../utils/constant'
import ProductsCard from '../components/ProductsCard'

async function fetchProducts() {
  const resp = await fetch(`${BASE_URL}products?limit=20&offset=10`, { caches: "no-store" })
  return resp.json()
}

export default async function Products() {
  const product = await fetchProducts()
  return (
    <main className='gap-x-4 px-16 mt-28'>
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Products </span>
         Listing</h1>
      {
        <article className='flex flex-wrap items-center justify-between'>

          {
            product.map(
              (pro) => (

                <Link key={pro.id} href={`/products/${pro.id}`} className='my-4 w-96 h-2/4'>
                  <ProductsCard
                    images={pro.images}
                    title={pro.title}
                    price={pro.price}
                  />
                </Link>

              )
            )
          }
        </article>

      }
    </main>
  )
}