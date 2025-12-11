"use client";

import { useState } from "react";
import { Plus, Send } from "lucide-react";

interface Note {
  id: string;
  note: string;
  created_at: string;
  created_by: string;
  agents?: {
    full_name: string;
  };
}

interface DealNotesProps {
  dealId: string;
  initialNotes: Note[];
}

export function DealNotes({ dealId, initialNotes }: DealNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  }

  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!newNote.trim()) return;

    setLoading(true);

    try {
      // TODO: Implement API call to save note
      // For now, just add to local state
      const tempNote: Note = {
        id: Date.now().toString(),
        note: newNote,
        created_at: new Date().toISOString(),
        created_by: "current-user",
        agents: {
          full_name: "You",
        },
      };

      setNotes([tempNote, ...notes]);
      setNewNote("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Add Note Button/Form */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium"
        >
          <Plus className="h-4 w-4" />
          Add Note
        </button>
      ) : (
        <form onSubmit={handleAddNote} className="space-y-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note about this deal..."
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            rows={3}
            autoFocus
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={loading || !newNote.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <Send className="h-4 w-4" />
              {loading ? "Adding..." : "Add Note"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewNote("");
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Notes List */}
      <div className="space-y-4 mt-6">
        {notes.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            No notes yet. Add the first note to start tracking activity.
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">
                  {note.agents?.full_name || "Unknown"}
                </p>
                <time className="text-xs text-gray-500">
                  {formatTimeAgo(note.created_at)}
                </time>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{note.note}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
