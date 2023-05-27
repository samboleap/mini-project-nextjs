"use client"
import Products from './products/page'
import Users from './users/page'
import Categories from './category/page'
import { Suspense } from 'react'
import Loading from './components/Loading'
import Heading from './components/Heading'

export default function Home() {
  return (
    <>
    <Suspense fallback={<Loading/>}>
    <Heading/>
    <Products/> 
    <Users/>
    <Categories/>
    </Suspense>
    </>
  )
}