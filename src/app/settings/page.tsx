import React from "react";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <form action="#" className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Main</h2>
      <div className="border rounded-lg border-gray-400">
        <label className="sr-only">App-Name</label>
        <input
          className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
          placeholder="Name"
          type="text"
          id="name"
        />
      </div>

      <div className="border rounded-lg border-gray-400">
        <label className="sr-only">App-Title</label>
        <input
          className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
          placeholder="Title"
          type="text"
          id="title"
        />
      </div>

      <div className="border rounded-lg border-gray-400">
        <label className="sr-only">Image 1</label>
        <input
          className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
          type="file"
          id="image1"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="AD-Active" />
        <label htmlFor="AD-Active">AD Active</label>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
        >
          Add App
        </button>
      </div>
    </form>
  );
}
