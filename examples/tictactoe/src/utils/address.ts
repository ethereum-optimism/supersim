
export const truncateAddress = (address: string) => {
  if (!address) return 'Unavailable';
  return `${address.slice(0, 5)}...${address.slice(-3)}`;
};