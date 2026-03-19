"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import Link from "@tiptap/extension-link"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { useEffect } from "react"
import { createLowlight } from "lowlight"
import javascript from "highlight.js/lib/languages/javascript"
import typescript from "highlight.js/lib/languages/typescript"

const lowlight = createLowlight()
lowlight.register("javascript", javascript)
lowlight.register("typescript", typescript)

export default function TextEditor({
    value,
    onChange,
}: {
    value: string
    onChange: (val: string) => void
}) {
    const editor = useEditor({
        immediatelyRender: false,

        extensions: [
            StarterKit.configure({ codeBlock: false }),
            Underline,
            Highlight,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder: "Start writing something awesome... ✨" }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            CodeBlockLowlight.configure({ lowlight }),
        ],

        content: value,

        editorProps: {
            attributes: {
                class: "prose prose-invert max-w-none focus:outline-none max-h-[400px]",
            },
        },

        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [value, editor])

    if (!editor) return null

    return (
        <div className="flex flex-col gap-3 max-height-400">

            {/* 🔥 TOOLBAR */}
            <div className="flex flex-wrap gap-2 border rounded-xl p-3 bg-muted/30 text-sm shadow-sm">

                <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>B</ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>I</ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}>U</ToolbarButton>

                <Divider />

                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}>•</ToolbarButton>

                <Divider />

                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()}>L</ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()}>C</ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()}>R</ToolbarButton>

                <Divider />

                <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()}>🖍</ToolbarButton>
                <ToolbarButton onClick={() => {
                    const url = prompt("Enter URL")
                    if (url) editor.chain().focus().setLink({ href: url }).run()
                }}>🔗</ToolbarButton>

                <Divider />

                <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{"</>"}</ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>↺</ToolbarButton>
                <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>↻</ToolbarButton>
            </div>

            {/* 🔥 EDITOR */}
            <div className="flex-1 overflow-auto border rounded-2xl p-5 bg-background shadow-inner">
                <EditorContent editor={editor} />
            </div>

            {/* 🔥 STYLE */}
            <style jsx global>{`
        pre {
          position: relative;
          background: #0d1117;
          padding: 16px;
          border-radius: 12px;
          overflow-x: auto;
        }

        pre code {
          font-size: 13px;
        }

        pre::after {
          content: "Copy";
          position: absolute;
          top: 8px;
          right: 10px;
          font-size: 11px;
          cursor: pointer;
          color: #aaa;
        }

        pre:hover::after {
          color: white;
        }
      `}</style>
        </div>
    )
}

function ToolbarButton({
    children,
    onClick,
    active,
}: {
    children: React.ReactNode
    onClick: () => void
    active?: boolean
}) {
    return (
        <button
            onClick={onClick}
            className={`px-2 py-1 rounded-md transition ${active ? "bg-primary text-white" : "hover:bg-muted"}`}
        >
            {children}
        </button>
    )
}

function Divider() {
    return <div className="w-px h-5 bg-border mx-1" />
}