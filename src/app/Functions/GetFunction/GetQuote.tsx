export default function GetQuote(): string {
  //Return The current quote number as YY-####
  //Return: Current Quote Number
  const showdate: Date = new Date();
  const lastTwoDigitsYear: number = showdate.getFullYear() - 2000;

  const quoteNumber: string = lastTwoDigitsYear + "-0001";

  return quoteNumber;
}
