"use client";
import MainWebsite from "./MainWebsite";
import { QueryClientProvider, QueryClient } from "react-query";

const queryCleint = new QueryClient();

export default function Home() {
  return (
    <div>
      <QueryClientProvider client={queryCleint}>
        <MainWebsite />
      </QueryClientProvider>
    </div>
  );
}
