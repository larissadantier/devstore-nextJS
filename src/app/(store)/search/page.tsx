import { api } from '@/data/api'
import { IProduct } from '@/data/types/products'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<IProduct[]> {
  const response = await api(`/products/search?q=${query}`, {
    cache: 'no-cache',
  })

  const products = await response.json()

  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) redirect('/')

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultados para: {query}
        <span className="font-semibold"></span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/product/${item.slug}`}
            className="group relative flex items-end justify-center overflow-hidden rounded-lg bg-zinc-900"
          >
            <Image
              className="transition-transform duration-500 group-hover:scale-105"
              src={item.image}
              width={480}
              height={480}
              quality={100}
              alt={item.description}
            />

            <div className="absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
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
    </div>
  )
}
