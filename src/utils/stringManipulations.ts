export const titleCase = (str: string) => {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
};

const EXCHANGE_RATE = 83;

export const usdToInrInLakhs = (usdAmount: number) => {
  const inrAmount = usdAmount * 100 * EXCHANGE_RATE;
  const inrInLakhs = inrAmount / 100000;
  return Math.round(inrInLakhs * 10) / 10;
};
