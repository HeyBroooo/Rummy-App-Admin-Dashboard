"use client";
import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { SendToFirebase } from "../firebase/function";
import { Button, Switch } from "@nextui-org/react";

const UsersPage = () => {
  const [formdata, setformdata] = useState({
    Name: "",
    Tittle: "",
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
    console.log("Image:", formdata.Image);
    console.log("BannerImage:", formdata.BannerImage);

    try {
      if (formdata.Image) {
        const storageRef = ref(
          storage,
          `Images/All-Apps/${formdata.Image.name}`
        );
        const uploadedImageSnapshot = await uploadBytes(
          storageRef,
          formdata.Image
        );
        const ImageUrl = await getDownloadURL(uploadedImageSnapshot.ref);

        let BannerImageUrl = "";
        if (formdata.BannerImage) {
          const bannerStorageRef = ref(
            storage,
            `Images/All-Apps/Banners/${formdata.BannerImage.name}`
          );
          const uploadedBannerSnapshot = await uploadBytes(
            bannerStorageRef,
            formdata.BannerImage
          );
          BannerImageUrl = await getDownloadURL(uploadedBannerSnapshot.ref);
        }

        const id = Date.now();

        const istTime = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });

        const newData = {
          id: id,
          Date: istTime,
          Name: formdata.Name,
          Tittle: formdata.Tittle,
          Description: formdata.Description,
          Keywords: formdata.Keywords,
          Image: ImageUrl,
          BannerImage: BannerImageUrl,
          Bonus: formdata.Bonus,
          Withdrawal: formdata.Withdrawal,
          Downloads: formdata.Downloads,
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
    <div className="md::container mx-auto max-w-2xl p-4">
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold text-xl">
            Game Name
          </label>
          <div className="border rounded-lg border-gray-400 mt-2">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Name: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
              placeholder="Game-Name"
              type="text"
              id="name"
            />
          </div>

          <div className="border rounded-lg border-gray-400 mt-2">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Tittle: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
              placeholder="Game-Tittle"
              type="text"
              id="name"
            />
          </div>

          <div className="border rounded-lg border-gray-400 mt-2">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Description: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
              placeholder="Game-Description"
              type="text"
              id="name"
            />
          </div>

          <div className="border rounded-lg border-gray-400 mt-2">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Keywords: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 p-2 text-sm focus:outline-none focus:border-black"
              placeholder="Game-Keywords"
              type="text"
              id="name"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-800 font-semibold text-xl">
            Extra Data
          </label>

          <div className="border rounded-lg border-gray-400 mt-2">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Bonus: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
              placeholder="Bonus-Amount"
              type="text"
              id="name"
            />
          </div>

          <div className="border rounded-lg border-gray-400 mt-2">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Withdrawal: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
              placeholder="Withdrawal-Amount"
              type="text"
              id="name"
            />
          </div>

          <div className="border rounded-lg border-gray-400 mt-2">
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Downloads: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
              placeholder="Total-Downloads"
              type="text"
              id="name"
            />
          </div>
        </div>

        <label className="text-gray-800 font-semibold text-xl">
          Game Image
        </label>

        <div className="border rounded-lg border-gray-400 mt-1">
          <input
            onChange={(e) =>
              setformdata({ ...formdata, Image: e.target.files[0] })
            }
            className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
            type="file"
            accept="image/*"
          />
        </div>

        <label className="text-gray-800 font-semibold text-xl">
          Game Banner Image
        </label>
        <div className="border rounded-lg border-gray-400 mt-1">
          <input
            onChange={(e) =>
              setformdata({ ...formdata, BannerImage: e.target.files[0] })
            }
            className="w-full rounded-lg border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
            type="file"
            accept="image/*"
          />
        </div>

        <div className="flex items-center">
          <Switch
            checked={otherApps}
            onChange={(e) => setOtherApps(e.target.checked)}
          />
          <label className="ml-2 text-gray-800 font-thin text-sm">
            Other Apps
          </label>
        </div>

        <div className="flex flex-col">
          <Button
            type="submit"
            color="success"
            variant="bordered"
            className="w-full"
          >
            Success
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UsersPage;
