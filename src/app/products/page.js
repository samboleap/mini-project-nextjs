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
    <main className='gap-x-4 px-16 mt-24'>
      <h1>Listing All Products</h1>
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