"use client";

import PageTitle from "@/components/PageTitle";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import { TbCategory2 } from "react-icons/tb";
import { FaAdversal } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa";

const cardData = [
  {
    label: "Apps",
    amount: "50",
    icon: FaGooglePlay,
  },
  {
    label: "CATEGORIES",
    discription: "COMING SOON",
    icon: TbCategory2,
  },
  {
    label: "ADVETISEMENTS",
    discription: "Inactive",
    icon: FaAdversal,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
      {cardData.map((d, i) => ( 
          <Card
            key={i}
            amount={d.amount || "N/A"}
            discription={d.discription || ""}
            icon
            label={d.label}
          />
        ))}
      </section>
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>

          <BarChart />
        </CardContent>
        <CardContent className="flex justify-between gap-2">
          <section className="w-full gap-4 gap-x-8">
            <AppList />
          </section>
        </CardContent>
      </section>
    </div>
  );
}

function AppList() {
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
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
                <td className="p-2 border">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
                <td className="p-2 border">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
                <td className="p-2 border">
                  <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded">
                    View
                  </button>
                </td>
                <td className="p-2 border">
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
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
