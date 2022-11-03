import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import "../lib/firebase";
import "../styles/globals.scss";
import { NotificationsProvider } from "@mantine/notifications";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <MantineProvider
        withCSSVariables
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <NotificationsProvider position="top-right">
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}
