import { Metadata } from "next";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings | Admin Dashboard",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-primary/10 p-3">
          <Settings className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure your dashboard settings</p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
        <Settings className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Settings</h3>
        <p className="text-gray-600 mb-6">
          Settings and configuration features coming soon
        </p>
      </div>
    </div>
  );
}
