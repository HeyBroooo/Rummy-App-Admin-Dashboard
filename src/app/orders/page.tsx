"use client";
import React, { useEffect, useState } from "react";
import { GetAllGames,  updateGame } from "../firebase/function";

export default function Orders() {
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllGames().then((data) => {
      setGamesData(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  const handleMakeBestApp = async (gameId) => {
    try {
      // Update locally
      const updatedGames = gamesData.map((game) =>
        game.id === gameId ? { ...game, isBest: true } : game
      );
      setGamesData(updatedGames);
  
      // Update in Firestore
      await updateGame(String(gameId), { isBest: true });
  
      console.log("Game updated successfully");
    } catch (error) {
      console.error("Error making best app:", error);
    }
  };

  const RemoveBest = async (gameId) => {
    try {
      // Update locally
      const updatedGames = gamesData.map((game) =>
        game.id === gameId ? { ...game, isBest: false } : game
      );
      setGamesData(updatedGames);
  
      // Update in Firestore
      await updateGame(String(gameId), { isBest: false });
  
      console.log("Game updated successfully");
    } catch (error) {
      console.error("Error making best app:", error);
    }
  };

  return (
    <main className="w-full px-4 pb-8 pt-16 bg-white md:px-8 rounded-lg shadow-md">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Modify-Your-App</h1>
        <div className="overflow-x-auto">
          <div className="max-w-full overflow-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-md">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="border border-gray-300 p-2">#</th>
                  <th className="border border-gray-300 p-2">Game Name</th>
                  <th className="border border-gray-300 p-2">Image</th>
                  <th className="border border-gray-300 p-2">Ranked</th>
                  <th className="border border-gray-300 p-2">Best Game</th>
                  <th className="border border-gray-300 p-2">Downloads</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {gamesData.map((value, index) => (
                  <tr key={index} className={(index % 2 === 0) ? "bg-blue-100" : "bg-white"}>
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{value.Name}</td>
                    <td className="border border-gray-300 p-2">
                      <img src={value.Image} alt={value.Name} className="w-8 h-8 object-cover rounded-full" />
                    </td>
                    <td className="border border-gray-300 p-2">{value.isRanked}</td>
                    <td className="border border-gray-300 p-2">{value.isBest.toString()}</td>
                    <td className="border border-gray-300 p-2">{value.Downloads}</td>
                    <td className="border border-gray-300 p-2">
                      <button onClick={() => handleMakeBestApp(value.id)} className="text-white bg-green-500 hover:bg-green-700 rounded-md px-3 py-1">
                        Make Best App
                      </button>
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button onClick={() => RemoveBest(value.id)} className="text-white bg-red-500 hover:bg-red-700 rounded-md px-3 py-1">
                        Undo Best App
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
