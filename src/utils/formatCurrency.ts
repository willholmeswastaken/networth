export const formatCurrency = (
  amount: string,
  currency = "gbp",
  locale = "en-GB"
) => {
  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount)) {
    throw new Error(`Invalid amount: ${amount}`);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(parsedAmount);
};
