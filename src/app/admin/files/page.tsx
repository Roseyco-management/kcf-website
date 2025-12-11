import { Metadata } from "next";
import { Folder } from "lucide-react";

export const metadata: Metadata = {
  title: "File Manager | Admin Dashboard",
};

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-primary/10 p-3">
          <Folder className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">File Manager</h1>
          <p className="text-gray-600">Manage property photos and documents</p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
        <Folder className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">File Manager</h3>
        <p className="text-gray-600 mb-6">
          Property photo and document management features coming soon
        </p>
        <p className="text-sm text-gray-500">
          Will integrate with Supabase Storage and Dropbox sync
        </p>
      </div>
    </div>
  );
}
