export const getDashboardUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  console.log(process.env);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`;
};
