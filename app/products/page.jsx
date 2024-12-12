'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../../context/CartContext'
import { useRouter } from 'next/navigation'
import { RedirectToSignIn, SignedOut, useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Wine from './../../public/wine-bg.svg'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Navbar from '@/components/shared/Navbar'
import { toast } from 'sonner'

export default function ProductsPage () {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [quantityMap, setQuantityMap] = useState({})

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6 // Number of products per page

  const { addToCart, cartItems } = useCart()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function fetchData () {
      const res = await fetch('http://127.0.0.1:8000/api/products/')
      const data = await res.json()
      setProducts(data)
    }
    fetchData()
  }, [])

  // Filtered and sorted products
  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => {
      if (!categoryFilter) return true
      return p.category === categoryFilter
    })
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price
      if (sortOrder === 'price-desc') return b.price - a.price
      return 0
    })

  // Calculate pagination details
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / pageSize)

  // Ensure current page is within bounds if filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [totalPages, currentPage])

  // Get products for current page
  const startIndex = (currentPage - 1) * pageSize
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  )

  const handleAddToCart = product => {
    const qty = quantityMap[product.id] || 1
    addToCart(product, qty)
  }

  const handleQuantityChange = (productId, qty) => {
    setQuantityMap(prev => ({ ...prev, [productId]: Number(qty) }))
  }

  if (!isSignedIn) {
    // If not signed in, redirect to login
    router.push('/sign-in')
    return null
  }

  return (
    <div className=' h-full flex flex-col items-center'>
      <Navbar />
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <div className='mt-48 max-w-full lg:min-w-[80vw] sm:px-4 lg:px-0 min-w-full lg:max-w-[75vw]  py-4'>
        <h1 className='text-3xl text-left w-full'>Products</h1>
        <div className='my-3 w-full'>
          <Input
            type='text'
            placeholder='Search Products...'
            className=' border-gray-300'
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) // Reset to first page on filter change
            }}
          />
        </div>
        <div className='mb-3 d-flex gap-2 w-full'>
          <select
            className='w-full px-2 py-2 rounded-xl focus:outline-none outline-none bg-transparent border-gray-300 border-[0.5px] shadow-sm'
            value={categoryFilter}
            onChange={e => {
              setCategoryFilter(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option className='bg-transparent' value=''>
              All Categories
            </option>
            <option className='bg-transparent' value='wine'>
              Wine
            </option>
            <option className='bg-transparent' value='liquor'>
              Liquor
            </option>
          </select>
          <select
            className='w-full border-gray-300 px-2 py-2 rounded-xl focus:outline-none outline-none bg-transparent border-[0.5px] shadow-sm '
            value={sortOrder}
            onChange={e => {
              setSortOrder(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value=''>No Sort</option>
            <option value='price-asc'>Price Low to High</option>
            <option value='price-desc'>Price High to Low</option>
          </select>
        </div>
        <div className='grid sm:grid-cols-1 lg:grid-cols-2  ` w-full gap-8'>
          {paginatedProducts.map(product => (
            <div className=' animate-fadeInUpDelay2' key={product.id}>
              <div className='gap-2 border-gray-300 border-[0.5px] rounded-2xl shadow-md p-3 bg-transparent flex justify-between items-center w-full'>
                <img
                  src={product.image}
                  className='rounded-xl max-h-[225px] max-w-[225px] aspect-square  w-full h-[250px] object-fill'
                  alt={product.name}
                />
                <div className='font-light flex flex-col w-full justify-between h-full gap-2'>
                  <h5 className='text-lg font-bold text-wrap'>
                    {product.name}
                  </h5>
                  <p className='text-sm'>
                    Category:{' '}
                    <span className='capitalize'>{product.category}</span>
                  </p>
                  <p className='text-sm'>
                    Price:{' '}
                    <span className='font-semibold'>${product.price}</span>
                  </p>
                  <div className='d-flex align-items-center mb-2'>
                    <Label className='text-sm'>Qty:</Label>
                    <Input
                      className='w-max max-w-16  px-3 py-2'
                      min='1'
                      value={quantityMap[product.id] || 1}
                      onChange={e =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                    />
                  </div>
                  <Button
                    variant='outline'
                    className=' bg-black text-white px-4 w-max py-2 flex *:justify-center items-center'
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='size-6'
                    >
                      <path
                        fillRule='evenodd'
                        d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='flex justify-center items-center mt-4'>
            <Button
              variant='outline'
              className=' mr-2 bg-transparent border-black border-[0.5px]  transition-all duration-200'
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6'
              >
                <path
                  fillRule='evenodd'
                  d='M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z'
                  clipRule='evenodd'
                />
              </svg>
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant='outline'
              className=' ml-2 bg-transparent border-black border-[0.5px] transition-all duration-200'
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='size-6'
              >
                <path
                  fillRule='evenodd'
                  d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                  clipRule='evenodd'
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
