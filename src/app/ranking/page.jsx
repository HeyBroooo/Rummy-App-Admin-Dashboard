"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Image from 'next/image';
import { GetAllGames } from '../firebase/function';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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

  const collectionNames = ["Best-For-All-collection", "Best-App-collection", "New-App-collection", "All-App-collection"];


  const updateRank = async (gameId, rank) => {
    try {
      const gameIdString = String(gameId);
  
      for (const collectionName of collectionNames) {
        const docRef = doc(db, collectionName, gameIdString);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          await updateDoc(docRef, { isRanked: rank });
          console.log(`Game with ID ${gameIdString} in collection ${collectionName} ranked successfully!`);
        } else {
          console.log(`Game with ID ${gameIdString} in collection ${collectionName} created and ranked successfully!`);
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
    <>
      {gamesData.map((value, index) => (
        <div className="bg-white p-6 rounded-lg shadow-md relative" key={index}>
          <div className="mb-4">
            <img
              src={value.Image}
              alt={value.uid}
              className="w-16 h-16 rounded-full"
            />
            <p className="text-xl font-semibold">Bonus{value.Bonus}</p>
          </div>

          <div className="mb-4">
            <p className="text-xl font-semibold">{value.Name}</p>
            {value.id && (
              <p className="text-sm text-gray-500">ID: {value.id}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 text-black rounded border-2"
              onClick={() => updateRank(value.id, 1)}
            >
              {" "}
              Rank 1
            </button>

            <button
              className="px-4 py-2 text-black rounded border-2"
              onClick={() => updateRank(value.id, 2)}
            >
              {" "}
              Rank 2
            </button>

            <button
              className="px-4 py-2 text-black rounded border-2"
              onClick={() => updateRank(value.id, 3)}
            >
              {" "}
              Rank 3
            </button>

            <button
              className="px-4 py-2 text-black rounded border-2"
              onClick={() => resetRank(value.id)}
            >
              {" "}
              Reset
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
