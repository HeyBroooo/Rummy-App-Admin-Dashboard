"use client";

import PageTitle from "@/components/PageTitle";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import playstoreImage from "../../public/playstore.png";
import comingsoon from "../../public/coming-soon.png";
import advertisment from "../../public/online-advertising.png";
import Image from "next/image";


export default function Home() {
  return (


    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <div className="grid lg:grid-cols-5 gap-4 p-4">
        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg shadow-inner">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-600">Apps Download</p>
            <p className="text-2xl font-bold mt-2">50</p>
          </div>

          <p className=" flex justify-center items-center p-7 rounded-lg">
            <Image
              src={playstoreImage}
              alt="Playstore"
              width={50}
              height={50}
            />
          </p>
        </div>

        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg shadow-inner">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-600">Category</p>
            <p className="text-2xl font-bold mt-2">Coming Soon</p>
          </div>

          <p className=" flex justify-center items-center p-7 rounded-lg">
            <Image src={comingsoon} alt="Playstore" width={50} height={50} />
          </p>
        </div>

        <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg shadow-inner">
          <div className="flex flex-col w-full pb-4">
            <p className="text-gray-600">ADVERTISEMENT</p>
            <p className="text-2xl text-red-600 font-bold mt-2">INACTIVE</p>
          </div>

          <p className=" flex justify-center items-center p-7 rounded-lg">
            <Image src={advertisment} alt="Playstore" width={50} height={50} />
          </p>
        </div>
      </div>

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
