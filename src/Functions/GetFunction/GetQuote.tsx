export default function GetQuote(): string {
  //Return The current quote number as YY-####
  //Return: Current Quote Number
  const quoteDatabase = ["2", "3"];
  const showdate: Date = new Date();
  const lastTwoDigitsYear: number = showdate.getFullYear() - 2000;

  let quoteNumberLength = quoteDatabase.length.toString().length;
  let quoteNumberString = quoteDatabase.length.toString();

  while (quoteNumberLength < 4) {
    quoteNumberString = "0" + quoteNumberString;
    quoteNumberLength += 1;
  }

  const quoteNumber: string = lastTwoDigitsYear + "-" + quoteNumberString;

  return quoteNumber;
}
