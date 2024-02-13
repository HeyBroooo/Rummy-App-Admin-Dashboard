"use client";
import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import { SendToFirebase } from "../firebase/function";

const UsersPage = () => {
  const [formdata, setformdata] = useState({
    Name: "",
    Tittle: "",
    Image: null,
    gameType: "contest-game",
    Description: "",
    Keywords: "",
    Link1: "",
    Link2: "",
    Keywords2: "",
    Tittle1: "",
    Tittle2: "",
    Tittle3: ""
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Image:", formdata.Image);
    if (formdata.Image) {
      const storageRef = ref(
        storage,
        `Images/${formdata.gameType}/${formdata.Image.name}`
      );
      uploadBytes(storageRef, formdata.Image)
        .then(() => getDownloadURL(storageRef))
        .then((ImageUrl) => {
          const id = Date.now();
          const newData = {
            id: id,
            Date: Date.now(),
            Name: formdata.Name,
            Tittle: formdata.Tittle,
            Description: formdata.Description,
            Keywords: formdata.Keywords,
            Image: ImageUrl,
            Link1: formdata.Link1,
            Link2: formdata.Link2,
            Keywords2: formdata.Keywords2,
            Tittle1: formdata.Tittle1,
            Tittle2: formdata.Tittle2,
            Tittle3: formdata.Tittle3
          };

          console.log("New Data:", newData);
          SendToFirebase(formdata.gameType, newData, id)
            .then((res) => {
              console.log("Sent to Firebase:", res);
            })
            .catch((error) => {
              console.log("Error sending data to Firebase:", error);
            });
        })
        .catch((error) => {
          console.log("Error uploading Image:", error);
        });
    } else {
      console.log("No Image selected");
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
              className="p-2 rounded-md bg-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Tittle: e.target.value })
              }
              type="text"
              placeholder="Enter Game Tittle"
              className="p-2 mt-2 rounded-md bg-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Description: e.target.value })
              }
              type="text"
              placeholder="Enter Game Description"
              className="p-2 mt-2 rounded-md bg-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Keywords: e.target.value })
              }
              type="text"
              placeholder="Enter Game Keywords"
              className="p-2 mt-2 rounded-md bg-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold text-xl">Links</label>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Link1: e.target.value })
              }
              type="text"
              placeholder="Enter Link 1"
              className="p-2 rounded-md bg-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Link2: e.target.value })
              }
              type="text"
              placeholder="Enter Link 2"
              className="p-2 mt-2 rounded-md bg-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Keywords2: e.target.value })
              }
              type="text"
              placeholder="Enter Game Keywords"
              className="p-2 mt-2 rounded-md bg-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold text-xl">Other Tittle</label>
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Tittle1: e.target.value })
              }
              type="text"
              placeholder="Tittle 1"
              className="p-2 rounded-md bg-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Tittle2: e.target.value })
              }
              type="text"
              placeholder="Tittle 2"
              className="p-2 mt-2 rounded-md bg-gray-200"
            />
            <input
              onChange={(e) =>
                setformdata({ ...formdata, Tittle3: e.target.value })
              }
              type="text"
              placeholder="Tittle 3"
              className="p-2 mt-2 rounded-md bg-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-800 font-semibold text-xl">Game Type</label>
            <select
              id="gameType"
              value={formdata.gameType}
              onChange={(e) =>
                setformdata({ ...formdata, gameType: e.target.value })
              }
              className="p-2 rounded-md bg-gray-200"
            >
              <option value="Best-For-All">Best-For-All</option>
              <option value="New-App">New-App</option>
              <option value="Fraud-App">Fraud-App</option>
            </select>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 cursor-pointer"
            >
              Add Contest
            </button>
          </div>
        </form>
  );
};

export default UsersPage;
