export const getDashboardUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  if (process.env.NEXT_PUBLIC_ENV === "staging") {
    return `https://${process.env.NEXT_PUBLIC_STAGING_DOMAIN}`;
  }

  return `https://${process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN}`;
};
