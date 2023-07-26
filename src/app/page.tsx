"use client";

import Layout from "./Compontents/Layout";
import Front from "./Tabs/Front";

//Compontents need to be in app for styles to apply, reason UNKNOWN

export default function page() {
  return (
    <Layout>
      <Front />
    </Layout>
  );
}
