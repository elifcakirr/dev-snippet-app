"use client"

import { Search, Plus } from "lucide-react"
import { CreateModal } from "../snippets/createModal"

export function Navbar() {
  return (
    <header className="h-14 border-b bg-background flex items-center px-6">

      {/* Left */}
      <div className="font-semibold tracking-tight">
        DevNotes
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-3">

        {/* Search */}
        <div className="relative w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg 
                       bg-muted/50 border outline-none
                       focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* New Button */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm 
                           bg-primary text-primary-foreground hover:opacity-90 transition">
          <CreateModal />

        </button>

      </div>

    </header>
  )
}