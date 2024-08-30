
import React from 'react'
import type { Metadata } from 'next'

import FeaturedBooks from '../Components/FeaturedBooks'
export const metadata: Metadata = {
  title: 'Search Books',
  description: 'Explore any books of your choice',
}
const Search = () => {
  return (
    <div><FeaturedBooks/></div>
  )
}

export default Search