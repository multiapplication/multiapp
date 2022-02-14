import '../styles/globals.css'
import {RecoilRoot,} from 'recoil';


function MultiApp({ Component, pageProps }) {
  return (

    <>
      <RecoilRoot>
        <Component {...pageProps}/>
      </RecoilRoot>
    </>
  )
}

export default MultiApp;
