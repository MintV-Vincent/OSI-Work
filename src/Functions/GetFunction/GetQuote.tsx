/**
 *
 * @param quote string[] -> This is the list with all the quote numbers
 * @param setQuote () => void -> This will create a new quote
 */
export default function GetQuote(quote: string[], setQuote: any) {
  const showdate: Date = new Date();
  const lastTwoDigitsYear: number = showdate.getFullYear() - 2000;
  console.log(quote);

  let quoteNumberLength = (quote?.length + 1).toString().length;
  let quoteNumberString = (quote?.length + 1).toString();

  while (quoteNumberLength < 4) {
    quoteNumberString = "0" + quoteNumberString;
    quoteNumberLength += 1;
  }

  const quoteNumber: string = lastTwoDigitsYear + "-" + quoteNumberString;
  if (quote?.length > 0) {
    setQuote([...quote, quoteNumber]);
  }
}
