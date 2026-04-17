export const getSteamAppIdFromPathname = (pathname: string): number | null => {
  const match = pathname.match(/^\/app\/(\d+)\//);

  if (!match) {
    return null;
  }

  return Number(match[1]);
};
