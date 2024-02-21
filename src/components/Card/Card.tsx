import Image from 'next/image';
import React, { useState } from 'react';

interface CardProps {
  data: {
    Name: string;
    Bonus: string;
    Image: string;
  };
}

function Card({ data }: CardProps) {
  const [selectedRank, setSelectedRank] = useState<string | null>(null);

  const handleRankClick = (rank: string) => {
    setSelectedRank(rank);
  };

  return (
    <div className="bg-white rounded-lg mt-2 overflow-hidden shadow-md p-4">
      <div className="image-container mb-4 flex w-full items-center justify-center">
        <img src={data.Image} alt={data.Name} width={100} height={100} className='aspect-square object-cover rounded-lg' />
      </div>
      <div className="content-container text-center">
        <div className="text-container mb-4">
          <h1 className="text-xl font-semibold">{data.Name}</h1>
          <p className="text-gray-600">Bonus: {data.Bonus}</p>
        </div>
        <div className=" space-x-2">
          <button
            className={`rank-button text-xs ${selectedRank === 'Rank1' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleRankClick('Rank1')}
            disabled={selectedRank !== null && selectedRank !== 'Rank1'}
          >
            Rank 1
          </button>
          <button
            className={`rank-button text-xs ${selectedRank === 'Rank2' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleRankClick('Rank2')}
            disabled={selectedRank !== null && selectedRank !== 'Rank2'}
          >
            Rank 2
          </button>
          <button
            className={`rank-button text-xs ${selectedRank === 'Rank3' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleRankClick('Rank3')}
            disabled={selectedRank !== null && selectedRank !== 'Rank3'}
          >
            Rank 3
          </button>
          <button
            className="reset-button text-xs bg-red-500 mt-3 text-white"
            onClick={() => setSelectedRank(null)}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Tailwind CSS styles */}
      <style jsx>{`
        .card-container {
          border: 1px solid #e2e8f0;
        }

        .image-container {
          margin-bottom: 1.5rem;
        }

        .text-container {
          margin-bottom: 1rem;
        }

        .rank-button, .reset-button {
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }

        .rank-button:disabled {
          cursor: not-allowed;
        }

        .rank-button:hover, .reset-button:hover {
          filter: brightness(90%);
        }
      `}</style>
    </div>
  );
}

export default Card;
