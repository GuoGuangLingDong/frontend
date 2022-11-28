import { List } from "./List";
import { useEffect } from "react";

export const Trending = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [])

  return (
    <main className="mx-auto mb-8 sm:mb-16">
      <List />
    </main >
  );
};