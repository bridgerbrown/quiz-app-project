import React from 'react';
import '../styles/styles.css'

export default function App({ Component, pageProps }) {
  return (  
    <div>
      <Component {...pageProps} />
    </div>
    )
}
