import "@styles/global.scss";

import Container from "@components/@core/content";
import Sidebar from "@components/@core/sidebar";
import { BRAND_TITLE } from "@utils/constants";
import NextApp from "next/app";
import Head from "next/head";
import React from "react";
import { DarkThemeProvider } from "@context/DarkThemeContext";

interface Props {
  pageProps: unknown;
}

class App extends NextApp<Props> {
  render() {
    const { pageProps, Component } = this.props;
    return (
      <>
        <DarkThemeProvider>
          <Sidebar />
          <Head>
            <title>{BRAND_TITLE}</title>
          </Head>
          <Container>
            <Component {...pageProps} />
          </Container>
        </DarkThemeProvider>
      </>
    );
  }
}

export default App;
