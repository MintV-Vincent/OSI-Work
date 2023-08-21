/**
 * todays date as a string formated in day/month/year
 * @returns: string -> As todays date
 */
export default function GetDate(): string {
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
    month + " " + showdate.getDate() + ", " + showdate.getFullYear();

  return displayTodaysDate;
}
