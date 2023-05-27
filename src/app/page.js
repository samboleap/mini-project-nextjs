"use client"
import Products from './products/page'
import Users from './users/page'
import Categories from './category/page'
import { Suspense } from 'react'
import Loading from './components/Loading'


export const metadata = {
  title: 'Samboleap - Home',
  description: 'Listing All Information',
}


export default function Home() {
  return (
    <>
    <Suspense fallback={<Loading/>}>
    <Products/> 
    <Users/>
    <Categories/>
    </Suspense>
    </>
  )
}