"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  Folder,
  Hash,
  Code2,
  Shield,
  Server,
  Rocket,
  Plus,
  ChevronDown,
  Star,
  FileText
} from "lucide-react"

const collections = [
  { name: "React", slug: "react", icon: Code2 },
  { name: "Security", slug: "security", icon: Shield },
  { name: "DevOps", slug: "devops", icon: Server },
  { name: "Startup", slug: "startup", icon: Rocket },
]

const tags = ["react", "nextjs", "performance", "security"]

export function Sidebar() {
  const pathname = usePathname()

  const [openCollections, setOpenCollections] = useState(true)
  const [openTags, setOpenTags] = useState(true)

  const linkClass = (href: string) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all
     hover:bg-muted/70 hover:translate-x-[2px]
     ${pathname === href
      ? "bg-muted font-medium shadow-sm"
      : "text-muted-foreground"
    }`

  return (
    <aside className="w-64 border-r bg-background h-screen flex flex-col p-4">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500" />
        <span className="font-semibold tracking-tight">DevNotes</span>
      </div>

      {/* Main */}
      <div className="flex flex-col gap-1">

        <Link href="/snippets" className={linkClass("/snippets")}>
          <FileText size={18} />
          All Snippets
        </Link>

        <Link href="/favorites" className={linkClass("/favorites")}>
          <Star size={18} />
          Favorites
        </Link>
      </div>

      {/* Collections */}
      <div className="mt-6 p-3 rounded-xl bg-muted/30 border">

        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setOpenCollections(!openCollections)}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Folder size={14} /> COLLECTIONS
            <ChevronDown
              size={14}
              className={`transition ${openCollections ? "" : "-rotate-90"}`}
            />
          </button>

          <button className="p-1 rounded hover:bg-muted">
            <Plus size={14} />
          </button>
        </div>

        {openCollections && (
          <div className="flex flex-col gap-1">
            {collections.map((c) => {
              const Icon = c.icon
              return (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  className={linkClass(`/collections/${c.slug}`)}
                >
                  <Icon size={16} />
                  {c.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="mt-6 p-3 rounded-xl bg-muted/30 border">

        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setOpenTags(!openTags)}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Hash size={14} /> TAGS
            <ChevronDown
              size={14}
              className={`transition ${openTags ? "" : "-rotate-90"}`}
            />
          </button>

          <button className="p-1 rounded hover:bg-muted">
            <Plus size={14} />
          </button>
        </div>

        {openTags && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-muted/50 hover:bg-muted transition"
              >
                <Hash size={12} />
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom user */}
      <div className="mt-auto pt-4 border-t flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm">
          A
        </div>
        <div className="text-xs">
          <p className="font-medium">Ali</p>
          <p className="text-muted-foreground">admin@devnotes.com</p>
        </div>
      </div>

    </aside>
  )
}
