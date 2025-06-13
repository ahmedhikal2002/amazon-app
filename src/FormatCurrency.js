const currency = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});
export const FormatCurrency = (num) => {
  return currency.format(num);
};
