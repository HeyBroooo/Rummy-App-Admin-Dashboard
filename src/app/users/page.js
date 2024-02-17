"use client";
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { SendToFirebase } from "../firebase/function";
import {Button} from "@nextui-org/react";

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
    isRanked: 0,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log("Image:", formdata.Image);

    try {
      if (formdata.Image) {
        const storageRef = ref(storage, `Images/All-Apps/${formdata.Image.name}`);
        const uploadedImageSnapshot = await uploadBytes(storageRef, formdata.Image);
        const ImageUrl = await getDownloadURL(uploadedImageSnapshot.ref);

        const id = Date.now();

        const istTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });



        const newData = {
          id: id,
          Date: istTime,
          Name: formdata.Name,
          Tittle: formdata.Tittle,
          Description: formdata.Description,
          Keywords: formdata.Keywords,
          Image: ImageUrl,
          Bonus: formdata.Bonus,
          Withdrawal: formdata.Withdrawal,
          Downloads: formdata.Downloads,
          isRanked: 0,
          isBest: true,  
        };

        console.log("New Data:", newData);
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
      
        <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold text-xl">Game Name</label>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Name: e.target.value })
              }
              type="text"
              placeholder="Enter Game Name"
              className="p-2 rounded-md border-2 border-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Tittle: e.target.value })
              }
              type="text"
              placeholder="Enter Game Tittle"
              className="p-2 mt-2 rounded-md border-2 border-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Description: e.target.value })
              }
              type="text"
              placeholder="Enter Game Description"
              className="p-2 mt-2 rounded-md border-2 border-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Keywords: e.target.value })
              }
              type="text"
              placeholder="Enter Game Keywords"
              className="p-2 mt-2 rounded-md border-2 border-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold text-xl">Extra Data</label>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Bonus: e.target.value })
              }
              type="text"
              placeholder="Enter Bonus Amount"
              className="p-2 rounded-md border-2 border-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Withdrawal: e.target.value })
              }
              type="text"
              placeholder="Enter Withdrawal Amount" 
              className="p-2 mt-2 rounded-md border-2 border-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Downloads: e.target.value })
              }
              type="text"
              placeholder="Enter Total Downloads"
              className="p-2 mt-2 rounded-md border-2 border-gray-200"
            />
          </div>

          <div className="flex flex-col">
        <label className="text-gray-800 font-semibold text-xl">Game Image</label>
        <input
          type="file"
          accept="image/*"
          className="p-2 rounded-md border-2 border-gray-200 outline-none appearance-none  transition-all duration-300 ease-in-out mt-2"
          onChange={(e) => setformdata({ ...formdata, Image: e.target.files[0] })}
        />
      </div>

         
          <div className="flex flex-col">
          <Button
           type='submit' 
          color="success">
        Success
      </Button> 
          </div>
        </form>
  );
};

export default UsersPage;
