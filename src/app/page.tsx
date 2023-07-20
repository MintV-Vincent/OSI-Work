"use client";
import MainWebsite from "./MainWebsite";
import Logo from "Images/Logo.svg";

/*
            <tr key={row.custom? row.custom + row.label + "label" : row.label + "label"}>
*/

export default function Home() {
  return (
    <div>
      <MainWebsite />
    </div>
  );
}
