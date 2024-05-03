export const generateCompanyName = () => {
  const prefixes = ["ABC", "XYZ", "Tech", "Global", "Innovative"];
  const suffixes = ["Corp", "Ltd", "Inc", "Services", "Solutions"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${randomPrefix} ${randomSuffix}`;
};
