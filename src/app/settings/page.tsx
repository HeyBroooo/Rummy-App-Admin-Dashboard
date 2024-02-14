"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { SendToFirebase } from "../firebase/function";
import { addDoc, collection } from "firebase/firestore";

export default function SettingsPage() {

  const [formdata, setFormData] = useState({
    Name: "",
    Tittle: "",
    Image: null,
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const adsCollection = collection(db, "advertisment");

      // Upload the image to storage and get the URL
      const imageRef = await uploadImageToStorage();

      // Add document with form data and image URL
      await addDoc(adsCollection, {
        Name: formdata.Name,
        Tittle: formdata.Tittle,
        Image: imageRef,
      });

      console.log("Data sent to Firebase successfully!");
    } catch (error) {
      console.error("Error sending data to Firebase:", error);
    }
  };

  const uploadImageToStorage = async () => {
    try {
      if (!formdata.Image) {
        throw new Error("No image selected");
      }
  
      const storageRef = ref(storage, `Images/${formdata.Image.name}`);
      await uploadBytes(storageRef, formdata.Image);
  
      // Get the download URL
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
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
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Main</h2>
      <div className="border rounded-lg border-gray-400">
        <label className="sr-only">App-Name</label>
        <input
                      onChange={handleInputChange}

          className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
          placeholder="Name"
          type="text"
          id="name"
        />
      </div>

      <div className="border rounded-lg border-gray-400">
        <label className="sr-only">App-Title</label>
        <input
           onChange={handleInputChange}
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
          onChange={handleInputChange}        />
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
          Add Advertisment
        </button>
      </div>
    </form>
  );
}
