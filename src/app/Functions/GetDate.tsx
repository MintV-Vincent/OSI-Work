import React from "react";

export default function GetDate(): string {
  //Return todays date as a string formated in day/month/year
  //Return: displayTodaysDate
  const showdate: Date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month: string = monthNames[showdate.getMonth()];

  const displayTodaysDate: string =
    month + " " + showdate.getDate() + " " + showdate.getFullYear();

  return displayTodaysDate;
}
