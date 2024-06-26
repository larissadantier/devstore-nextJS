'use client'

import { FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
    >
      <Search size={20} className="h-5 w-5 text-zinc-500" />

      <input
        name="q"
        placeholder="Buscar produtos..."
        type="text"
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
        required
        defaultValue={query ?? ''}
      />
    </form>
  )
}
