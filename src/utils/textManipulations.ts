export const titleCase = (str: string) => {
  return str.toLowerCase().replace(/\b\w{1,}\b/g, function (match) {
    return match.length > 3
      ? match.charAt(0).toUpperCase() + match.slice(1)
      : match.toUpperCase();
  });
};

const EXCHANGE_RATE = 83;

export const usdToInrInLakhs = (usdAmount: number) => {
  const inrAmount = usdAmount * 100 * EXCHANGE_RATE;
  const inrInLakhs = inrAmount / 100000;
  return Math.round(inrInLakhs * 10) / 10;
};
