import * as React from "react";
import Head from "next/head";

import { CustomFooter } from "./footer";
import { CustomHeader } from "./header";

type LayoutProps = {
  children: React.ReactNode;
  post?: any;
};

const MainLayout: React.FC<LayoutProps> = ({ children, post }) => {
  const links = [
    { link: "/", label: "Home" },
    { link: "/a", label: "About" },
    { link: "/n", label: "News" },
  ];
  const data = [{ title: "About", links }];

  return (
    <>
      <Head
      >
        <title>247 Canh giac</title>
        {post && (
          <>
            <title>{post.title}</title>
            <meta name="description" content={post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="article:published_time" content={post.date} />
          </>
        )}
        {/* <meta property="og:url" content={location.href} /> */}
        <meta property="og:type" content="article" />
      </Head>
      <CustomHeader links={links} />
      {children}
      <CustomFooter data={data} />
    </>
  );
};

export default MainLayout;
