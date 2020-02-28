import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';

import theme from '../static/theme';

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const styledComponentSheet = new ServerStyleSheet();
    const muiStyleSheet = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => 
            styledComponentSheet.collectStyles(
              muiStyleSheet.collect(<App {...props} />)
            )
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <React.Fragment key='styles'>
            {initialProps.styles}
            {muiStyleSheet.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>
        )
      }
    } finally {
      styledComponentSheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
          />
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons'
          />
          <style>
            {`
              html,
              body {
                height: 100%;
                width: 100%;
              }
              *,
              *:after,
              *:before {
                box-sizing: border-box;
              }
              body {
                font-family: Roboto, Helvetica, Arial, sans-serif;
                font-size: 1rem;
                margin: 0;
                background-color: rgb(245, 245, 245);
                position: fixed;
              }
              #__next {
                height: 100%;
                overflow: auto;
              }
              ::-webkit-scrollbar {
                width: 0px;
                background: transparent;
              }
            `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
