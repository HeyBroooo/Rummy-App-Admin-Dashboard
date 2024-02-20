"use client";
import React from "react";
import PageTitle from "@/components/PageTitle";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import playstoreImage from "../../public/playstore.png";
import comingsoon from "../../public/coming-soon.png";
import advertisment from "../../public/online-advertising.png";
import Image from "next/image";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue} from "@nextui-org/react";
import Orders from "./orders/page";


const statusColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};





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
        
            <Orders />
         
      </section>
    </div>
  );
}

