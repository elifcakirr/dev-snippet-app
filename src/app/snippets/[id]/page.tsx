"use client"

import { Star, Copy, MoreHorizontal, Code2, ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export default function SnippetDetailPage() {
    const params = useParams()
    const router = useRouter()

    // mock data (later fetch by id)
    const snippet = {
        id: params.id,
        title: "useEffect example",
        description: "Runs side effects in React components with optional cleanup.",
        code: `useEffect(() => {
  return () => console.log("cleanup")
}, [])`,
        date: "2 days ago",
        language: "React",
        tags: ["react", "hooks"]
    }

    return (
        <div className="max-w-3xl mx-auto py-8 space-y-6">

            {/* Back */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:-translate-x-[2px] transition"
            >
                <ArrowLeft size={16} />
                Back
            </button>

            {/* Header */}
            <div className="flex items-start justify-between gap-4">

                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs px-2 py-1 rounded border bg-blue-500/10 text-blue-600 border-blue-500/20">
                            <Code2 size={12} />
                            Snippet
                        </span>

                        <span className="text-xs px-2 py-0.5 rounded bg-muted">
                            {snippet.language}
                        </span>
                    </div>

                    <h1 className="text-lg font-semibold tracking-tight">
                        {snippet.title}
                    </h1>

                    <p className="text-sm text-muted-foreground max-w-xl">
                        {snippet.description}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 pt-1">
                        {snippet.tags.map((t) => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded bg-muted/60">
                                #{t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                    <button className="p-2 rounded-lg hover:bg-muted transition">
                        <Star size={16} />
                    </button>

                    <button
                        onClick={() => navigator.clipboard.writeText(snippet.code)}
                        className="p-2 rounded-lg hover:bg-muted transition"
                    >
                        <Copy size={16} />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-muted transition">
                        <MoreHorizontal size={16} />
                    </button>
                </div>

            </div>

            {/* Code Preview */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Preview</span>
                </div>

                <div className="relative group">
                    <pre className="bg-muted/50 p-4 rounded-xl text-sm overflow-x-auto leading-relaxed border">
                        {snippet.code}
                    </pre>

                    {/* Floating copy */}
                    <button
                        onClick={() => navigator.clipboard.writeText(snippet.code)}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-background border rounded-md p-1 hover:bg-muted"
                    >
                        <Copy size={14} />
                    </button>
                </div>
            </div>

            {/* Editor (simple) */}
            <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Edit</span>

                <textarea
                    defaultValue={snippet.code}
                    className="w-full min-h-[160px] font-mono text-sm bg-muted/40 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/30"
                />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>Created {snippet.date}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded bg-muted">
                    {snippet.language}
                </span>
            </div>

        </div>
    )
}
