"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { GetAllGames } from "../firebase/function";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import trophyImage from '../../../public/Rank1.jpg';
import medalImage from '../../../public/Rank2.jpg';
import starImage from '../../../public/Rank3.jpg';


export default function Ranking() {
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAllGames();
        setGamesData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const collectionNames = [
    "Best-For-All-collection",
    "Best-App-collection",
    "New-App-collection",
    "All-App-collection",
  ];

  const updateRank = async (gameId, rank) => {
    try {
      const gameIdString = String(gameId);

      for (const collectionName of collectionNames) {
        const docRef = doc(db, collectionName, gameIdString);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          await updateDoc(docRef, { isRanked: rank });
          console.log(
            `Game with ID ${gameIdString} in collection ${collectionName} ranked successfully!`
          );
        } else {
          console.log(
            `Game with ID ${gameIdString} in collection ${collectionName} created and ranked successfully!`
          );
        }
      }
    } catch (error) {
      console.error(`Error updating game with ID ${gameId}:`, error);
    }
  };

  const resetRank = async (gameId) => {
    await updateRank(gameId, 0);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto max-w-screen-xl">
      {gamesData.map((value, index) => (
        <div
          key={index}
          className="bg-gray-500 p-4 rounded-lg shadow-md relative transition duration-300 transform hover:scale-105"
        >
          <div className="mb-2 mt-1 text-center">
            <img
              src={value.Image}
              alt={value.uid}
              height={100}
              width={100}
              className="w-20 h-20 rounded-full mx-auto object-cover"
            />
            <p className="text-lg font-semibold mt-2">{value.Bonus}</p>
          </div>
  
          <div className="mb-2 text-center">
            <p className="text-lg font-semibold">{value.Name}</p>
            {value.id && (
              <p className="text-sm text-gray-500">ID: {value.id}</p>
            )}
          </div>
  
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              color="success"
              variant="bordered"
              onClick={() => updateRank(value.id, 1)}
            >
              Rank 1
            </Button>
  
            <Button
              color="primary"
              variant="bordered"
              onClick={() => updateRank(value.id, 2)}
            >
              Rank 2
            </Button>
  
            <Button
              color="warning"
              variant="bordered"
              onClick={() => updateRank(value.id, 3)}
            >
              Rank 3
            </Button>
  
            <Button
              color="danger"
              variant="bordered"
              onClick={() => resetRank(value.id)}
            >
              Reset
            </Button>
          </div>
  
          <div className="flex items-center justify-between mt-2 text-center">
            {value.isRanked === 1 && (
              <Image src={trophyImage} alt="Trophy" className="w-8 h-8 mx-auto" />
            )}
            {value.isRanked === 2 && (
              <Image src={medalImage} alt="Medal" className="w-8 h-8 mx-auto" />
            )}
            {value.isRanked === 3 && (
              <Image src={starImage} alt="Star" className="w-8 h-8 mx-auto" />
            )}
            {value.isRanked === 0 && <p className="text-sm">Not Ranked</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
