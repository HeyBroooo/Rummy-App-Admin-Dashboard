"use client";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { SendToFirebase } from "../../firebase/function";
import { Button, Switch } from "@nextui-org/react";

const UsersPage = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Title: "",
    Image: null,
    Description: "",
    Keywords: "",
    Bonus: "",
    Withdrawal: "",
    Downloads: "",
    BannerImage: null,
    isRanked: 0,
  });

  const [otherApps, setOtherApps] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      if (formData.Image) {
        const storageRef = ref(
          storage,
          `Images/All-Apps/${formData.Image.name}`
        );
        const uploadedImageSnapshot = await uploadBytes(
          storageRef,
          formData.Image
        );
        const imageUrl = await getDownloadURL(uploadedImageSnapshot.ref);

        let bannerImageUrl = "";
        if (formData.BannerImage) {
          const bannerStorageRef = ref(
            storage,
            `Images/All-Apps/Banners/${formData.BannerImage.name}`
          );
          const uploadedBannerSnapshot = await uploadBytes(
            bannerStorageRef,
            formData.BannerImage
          );
          bannerImageUrl = await getDownloadURL(uploadedBannerSnapshot.ref);
        }

        const id = Date.now();

        const istTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });

        const newData = {
          id: id,
          Date: istTime,
          Name: formData.Name,
          Title: formData.Title,
          Description: formData.Description,
          Keywords: formData.Keywords,
          Image: imageUrl,
          BannerImage: bannerImageUrl,
          Bonus: formData.Bonus,
          Withdrawal: formData.Withdrawal,
          Downloads: formData.Downloads,
          isRanked: 0,
        };

        console.log("New Data:", newData);

        if (otherApps) {
          newData.OtherApps = true;
        }

        await SendToFirebase("All-Apps", newData, id);
        console.log("Sent to Firebase successfully!");
      } else {
        console.log("No Image selected");
      }
    } catch (error) {
      console.error("Error processing form data:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4 md:mt-0 mt-10">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold text-xl">Game Name</label>
          <input
            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
            className="mt-1 p-3 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Game Name"
            type="text"
            id="name"
          />
          {/* Repeat similar structure for other input fields */}
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold text-xl">Extra Data</label>
          <input
            onChange={(e) => setFormData({ ...formData, Bonus: e.target.value })}
            className="mt-1 p-3 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Bonus Amount"
            type="text"
            id="bonus"
          />
          {/* Repeat similar structure for other input fields */}
        </div>

        <label className="text-gray-800 font-semibold text-xl">Game Image</label>
        <input
          onChange={(e) => setFormData({ ...formData, Image: e.target.files[0] })}
          className="mt-1 p-3 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          type="file"
          accept="image/*"
        />

        <label className="text-gray-800 font-semibold text-xl">Game Banner Image</label>
        <input
          onChange={(e) => setFormData({ ...formData, BannerImage: e.target.files[0] })}
          className="mt-1 p-3 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          type="file"
          accept="image/*"
        />

        <div className="flex items-center">
          <Switch checked={otherApps} onChange={(e) => setOtherApps(e.target.checked)} />
          <label className="ml-2 text-gray-800 font-thin text-sm">Other Apps</label>
        </div>

        <Button type="submit" color="success" variant="bordered" className="w-full">
          Add Advertisement
        </Button>
      </form>
    </div>
  );
};

export default UsersPage;
