import { useEffect } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    
    if (!user) {
      window.location.href = "/login";
    }
  }, [])

  return (
    <div>
      Hi
    </div>
  );
}
