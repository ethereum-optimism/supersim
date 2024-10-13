
export const truncateAddress = (address: string) => {
  if (!address) return 'Unavailable';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};