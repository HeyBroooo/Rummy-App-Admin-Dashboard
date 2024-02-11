import React from 'react';

export default function OrdersPage() {

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 3, name: "John Smith", email: "jay@gmail.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 1, name: "John Doe", email: "john@example.com" },
  
  ];



  return (
     <div className="rounded shadow-transparent">
        <h1 className="text-2xl font-bold mb-2">Top Apps</h1>
        <div className="overflow-x-auto rounded ">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Logo, Title & Description</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Download</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Top1</th>
                <th className="p-2 border">Top2</th>
                <th className="p-2 border">Top3</th>
                <th className="p-2 border">Delete</th>
                <th className="p-2 border">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="p-2 border">{user.id}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      View
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   
  );
}
