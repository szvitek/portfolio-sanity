import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/swytech-dev-logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var themes = ['tron','ares','clu','athena','aphrodite','poseidon'];
    var intensities = ['none','light','medium','heavy'];
    var theme = localStorage.getItem('tron-theme');
    var glow = localStorage.getItem('tron-intensity');
    theme = themes.indexOf(theme) > -1 ? theme : 'tron';
    glow = intensities.indexOf(glow) > -1 ? glow : 'medium';
    document.documentElement.setAttribute('data-theme', theme);
    if (glow !== 'none') {
      document.documentElement.setAttribute('data-tron-intensity', glow);
    }
  } catch(e) {}
})();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
