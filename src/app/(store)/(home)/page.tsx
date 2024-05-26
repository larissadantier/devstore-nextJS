import Image from 'next/image'
import Link from 'next/link'

import { api } from '@/data/api'

import { IProduct } from '@/data/types/products'

async function getFeaturedProducts(): Promise<IProduct[]> {
  const response = await api('/products/featured', {
    cache: 'no-cache',
  })

  const products = await response.json()

  return products
}

export default async function Home() {
  const [highlightedProduct, ...otherProducts] = await getFeaturedProducts()

  return (
    <div className="grid-rows-6 grid max-h-[860px] grid-cols-9 gap-6">
      <Link
        href={`/product/${highlightedProduct.slug}`}
        className="group relative col-span-6 row-span-6 flex items-start justify-center overflow-hidden rounded-lg bg-zinc-900"
      >
        <Image
          className="transition-transform duration-500 group-hover:scale-105"
          src={highlightedProduct.image}
          width={920}
          height={920}
          quality={100}
          priority={false}
          alt=""
        />

        <div className="absolute bottom-28 right-28 flex h-12 max-w-[240px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
          <span className="truncate text-sm">{highlightedProduct.title}</span>

          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {highlightedProduct.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>

      {otherProducts.map((item) => (
        <Link
          key={item.id}
          href={`/product/${item.slug}`}
          className="group relative col-span-3 row-span-3 flex items-center justify-center overflow-hidden rounded-lg bg-zinc-900"
        >
          <Image
            className="transition-transform duration-500 group-hover:scale-105"
            src={item.image}
            width={345}
            height={345}
            quality={100}
            alt=""
          />

          <div className="absolute bottom-10 right-10 flex h-12 max-w-[240px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
            <span className="truncate text-sm">{item.title}</span>

            <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
              {item.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
