const basePath =
  process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_REPO_NAME
    ? `/${process.env.NEXT_PUBLIC_REPO_NAME}`
    : "";

export default basePath;
