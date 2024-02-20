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
import {EditIcon} from "./EditIcon";
import {DeleteIcon} from "./DeleteIcon";
import {EyeIcon} from "./EyeIcon";
import {columns, users} from "./data";
import {Button} from "@nextui-org/react";
import Orders from "./orders/page";


const statusColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


type User = typeof users[0];



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

function AppList() {
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.avatar}}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
  <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
