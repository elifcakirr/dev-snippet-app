"use client"

import { useState, useRef, useEffect } from "react"
import { Star, Code2, Copy, Search, MoreVertical, Trash } from "lucide-react"
import Editor from "@monaco-editor/react"
import TextEditor from "@/app/components/snippets/textEditor"


type Snippet = {
  id: number
  title: string
  description: string
  readme: string
  code: string
  date: string
  tags?: string[]
  favorite: boolean
}

const initialSnippets: Snippet[] = [
  {
    id: 1,
    title: "Debounce Function",
    description: "Limits how often a function runs",
    readme: "Prevents a function from being called too frequently.",
    code: `function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}`,
    date: "11/03/2025",
    tags: ["utils", "performance"],
    favorite: true
  },
  {
    id: 2,
    title: "useEffect Cleanup",
    description: "Cleanup when component unmounts",
    readme: "Runs when component is removed.",
    code: `useEffect(() => {
  return () => console.log("cleanup")
}, [])`,
    date: "10/03/2025",
    tags: ["react"],
    favorite: false
  }
]

export default function SnippetsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const [width, setWidth] = useState(520)
  const [snippets, setSnippets] = useState(initialSnippets)
  const [active, setActive] = useState<Snippet | null>(initialSnippets[0])
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState<"code" | "readme">("code")
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null)

  const editorRef = useRef<any>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      let newWidth = e.clientX - rect.left

      newWidth = Math.max(320, Math.min(newWidth, 900))

      if (leftRef.current) {
        leftRef.current.style.width = `${newWidth}px`
      }
    }

    const handleUp = () => {
      if (!isDragging.current) return

      isDragging.current = false
      document.body.style.cursor = "default"

      if (leftRef.current) {
        setWidth(leftRef.current.offsetWidth)
      }
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleUp)

    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleUp)
    }
  }, [])

  const startDrag = () => {
    isDragging.current = true
    document.body.style.cursor = "col-resize"
  }

  const filtered = snippets.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  )

  const toggleFavorite = (id: number) => {
    setSnippets((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, favorite: !s.favorite } : s
      )
    )
  }

  const deleteSnippet = (id: number) => {
    const updated = snippets.filter((s) => s.id !== id)
    setSnippets(updated)

    if (active?.id === id) {
      setActive(updated.length > 0 ? updated[0] : null)
    }
  }

  // useEffect(() => {
  //   setIsEditing(false)
  // }, [active])
  return (
    <div ref={containerRef} className="flex h-screen overflow-hidden bg-background text-foreground">

      {/* LEFT PANEL */}
      <div
        ref={leftRef}
        style={{ width }}
        className="min-w-[320px] max-w-[900px] border-r flex flex-col bg-background"
      >
        {/* HEADER */}
        <div className="p-4 border-b space-y-3">
          <h2 className="font-semibold text-lg tracking-tight">Snippets</h2>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search snippets..."
              className="w-full pl-8 pr-3 py-2 text-sm rounded-lg bg-muted/40 outline-none focus:bg-muted transition"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.map((s) => (
            <div
              key={s.id}
              onClick={() => setActive(s)}
              className={`group px-3 py-3 rounded-xl border cursor-pointer transition
              hover:bg-muted/40 relative
              ${active?.id === s.id ? "bg-muted ring-1 ring-primary/20" : ""}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium truncate">{s.title}</p>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(s.id)
                    }}
                  >
                    <Star
                      size={14}
                      className={
                        s.favorite
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }
                    />
                  </button>

                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setMenuOpenId(menuOpenId === s.id ? null : s.id)
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>

                    {menuOpenId === s.id && (
                      <div className="absolute right-0 mt-2 w-28 bg-background border rounded-md shadow-md z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteSnippet(s.id)
                            setMenuOpenId(null)
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-muted"
                        >
                          <Trash size={12} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {s.description}
              </p>

              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>{s.date}</span>

                <div className="flex gap-1">
                  {s.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-muted text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SPLITTER */}
      <div
        onMouseDown={startDrag}
        className="w-[6px] bg-border hover:bg-primary/40 cursor-col-resize transition"
      />

      {/* RIGHT PANEL */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 size={16} />
            <h2 className="font-medium tracking-tight">{active?.title}</h2>
          </div>

          <button
            onClick={() => active && navigator.clipboard.writeText(active.code)}
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/70 transition"
          >
            <Copy size={12} /> Copy
          </button>
        </div>

        {/* TABS */}
        <div className="px-6 border-b">
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => setTab("code")}
              className={`py-3 border-b-2 transition ${tab === "code" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Code
            </button>

            <button
              onClick={() => setTab("readme")}
              className={`py-3 border-b-2 transition ${tab === "readme" ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              Readme
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-hidden p-6">
          {tab === "code" && (
            <div className="overflow-hidden rounded-xl border bg-[#0d1117]">
              <div className="p-4">
                <Editor
                  theme="vs-dark"
                  defaultLanguage="typescript"
                  value={active?.code}
                  beforeMount={(monaco) => {
                    monaco.editor.defineTheme("snip-theme", {
                      base: "vs-dark",
                      inherit: true,
                      rules: [],
                      colors: {
                        "editor.background": "#09090b", // 👈 burayı senin bg-background ile aynı yap
                      },
                    });
                  }}
                  onMount={(editor) => {
                    const updateHeight = () => {
                      const h = Math.min(800, editor.getContentHeight())
                      editor.layout({
                        width: editor.getLayoutInfo().width,
                        height: h,
                      })
                    }


                    updateHeight()
                    editor.onDidContentSizeChange(updateHeight)
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineHeight: 22,

                    scrollBeyondLastLine: false,
                    wordWrap: "on",

                    // 👇 en kritik padding
                    padding: {
                      top: 12,
                      bottom: 12,
                    },

                    scrollbar: {
                      vertical: "hidden",
                      horizontal: "auto",
                    },

                    overviewRulerBorder: false,
                  }}
                />
              </div>
            </div>
          )}

          {tab === "readme" && active && (
            <div className=" overflow-auto  rounded-xl p-4">
              {!isEditing ? (
                <>
                  {/* VIEW MODE */}
                  <div className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-lg">
                    {active.readme}
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 px-3 py-1.5 text-xs rounded-lg bg-muted hover:bg-muted/70 transition"
                  >
                    Edit
                  </button>
                </>
              ) : (
                <>
                  {/* EDIT MODE */}
                  <div className="max-height-400">
                    <TextEditor
                      value={active.readme}
                      onChange={(value) =>
                        setActive({ ...active, readme: value })
                      }
                    />
                  </div>


                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-primary text-white"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-muted"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


