"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { SendToFirebase } from "../firebase/function";
import { addDoc, collection } from "firebase/firestore";

export default function SettingsPage() {

  const [formData, setFormData] = useState({
    Name: "",
    Title: "",
    Image: null,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a collection reference
      const adsCollection = collection(db, "advertisements");

      // Upload the image to storage and get the URL
      const imageUrl = await uploadImageToStorage();

      // Add document with form data and image URL
      await addDoc(adsCollection, {
        Name: formData.Name,
        Title: formData.Title,
        Image: imageUrl,
      });

      console.log("Data sent to Firebase successfully!");
      // Clear the form after successful submission
      setFormData({ Name: "", Title: "", Image: null });
    } catch (error) {
      console.error("Error sending data to Firebase:", error.message);
    }
  };

  const uploadImageToStorage = async () => {
    try {
      if (!formData.Image) {
        throw new Error("No image selected");
      }

      const storageRef = ref(storage, `Images/${formData.Image.name}`);
      await uploadBytes(storageRef, formData.Image);

      // Get the download URL
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file (Image input), update Image in state
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      // If the input is not a file, update other fields in state
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Add Advertisement</h2>

      <div className="border rounded-lg border-gray-400">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
          placeholder="Name"
          required
        />
      </div>

      <div className="border rounded-lg border-gray-400">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="Title"
          value={formData.Title}
          onChange={handleInputChange}
          className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
          placeholder="Title"
          required
        />
      </div>

      <div className="border rounded-lg border-gray-400">
        <label htmlFor="image" className="sr-only">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="Image"
          onChange={handleInputChange}
          accept="image/*"
          className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
          required
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
        >
          Add Advertisement
        </button>
      </div>
    </form>
  );
}