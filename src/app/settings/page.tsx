"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import {Switch} from "@nextui-org/react";

interface FormData {
  Name: string;
  Title: string;
  Image: File | null;
}

export default function SettingsPage() {
  const [formData, setFormData] = useState<FormData>({
    Name: "",
    Title: "",
    Image: null,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const adsCollection = collection(db, "advertisements");

      const id = Date.now();

      const imageUrl = await uploadImageToStorage();

      
      await addDoc(adsCollection, {
        id: id,
        Date: Date.now(),
        Name: formData.Name,
        Title: formData.Title,
        Image: imageUrl,
      });

      console.log("Data sent to Firebase successfully!");
      setFormData({ Name: "", Title: "", Image: null });
    } catch (error) {
      console.error("Error sending data to Firebase:", error);
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
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <div className="md::container mx-auto max-w-2xl p-4">
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
      <Switch defaultSelected aria-label="Active"/>

      <div className="mt-4">
        <button
          type="submit"
          className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
        >
          Add Advertisement
        </button>
      </div>
    </form>
  </div>
  );
}
