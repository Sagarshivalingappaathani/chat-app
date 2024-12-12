export const generateUsername = (): string => {
  return `User-${Math.floor(Math.random() * 1000)}`;
};