"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/components/ui/dialog"
import { Command, CommandInput, CommandList, CommandItem } from "@/app/components/ui/command"
import { Plus } from "lucide-react"

export function CreateModal() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm 
                   bg-primary text-primary-foreground hover:opacity-90"
            >
                <Plus size={16} />
                New
            </button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create new</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-2">
                        <button className="w-full text-left p-3 rounded-lg hover:bg-muted">
                            Create Snippet
                        </button>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-muted">
                            Create Note
                        </button>
                        <button className="w-full text-left p-3 rounded-lg hover:bg-muted">
                            Add Resource
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export function CommandPalette() {
    const [open, setOpen] = useState(false)

    // ⌘K shortcut
    useState(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }
        window.addEventListener("keydown", down)
        return () => window.removeEventListener("keydown", down)
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 overflow-hidden">
                <Command>
                    <CommandInput placeholder="Search everything..." />

                    <CommandList>
                        <CommandItem>Create Snippet</CommandItem>
                        <CommandItem>Create Note</CommandItem>
                        <CommandItem>Add Resource</CommandItem>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    )
}
