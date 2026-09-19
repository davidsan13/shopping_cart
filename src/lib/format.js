const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (dollars) => currency.format(dollars);
export const formatCents = (cents) => currency.format(cents / 100);
