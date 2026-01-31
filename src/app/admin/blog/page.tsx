import { FileText, PlusCircle, FileClock, CheckCircle } from "lucide-react";

export default async function BlogManagementPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Section */}
      <section>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#151A4A]">Blog Management</h2>
          <p className="text-sm sm:text-base text-[#4A4A4A] mt-1">Manage blog posts, create new content, and publish</p>
        </div>
      </section>

      {/* Placeholder Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* All Posts Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8] opacity-50 cursor-not-allowed">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-[#151A4A]/10 p-3">
              <FileText className="h-6 w-6 text-[#151A4A]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#151A4A] mb-2">All Posts</h3>
              <p className="text-sm text-[#4A4A4A]">Coming soon: View and edit all blog posts</p>
            </div>
          </div>
        </div>

        {/* Create New Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8] opacity-50 cursor-not-allowed">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-[#C9A961]/10 p-3">
              <PlusCircle className="h-6 w-6 text-[#C9A961]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#151A4A] mb-2">Create New</h3>
              <p className="text-sm text-[#4A4A4A]">Coming soon: Create new blog posts with AI assistance</p>
            </div>
          </div>
        </div>

        {/* Drafts Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8] opacity-50 cursor-not-allowed">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-[#151A4A]/10 p-3">
              <FileClock className="h-6 w-6 text-[#151A4A]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#151A4A] mb-2">Drafts</h3>
              <p className="text-sm text-[#4A4A4A]">Coming soon: Manage unpublished drafts</p>
            </div>
          </div>
        </div>

        {/* Published Card */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8] opacity-50 cursor-not-allowed">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-[#C9A961]/10 p-3">
              <CheckCircle className="h-6 w-6 text-[#C9A961]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#151A4A] mb-2">Published</h3>
              <p className="text-sm text-[#4A4A4A]">Coming soon: View all published posts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
