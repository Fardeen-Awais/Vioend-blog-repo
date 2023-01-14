
import '../styles/globals.css'
import Footer from '../components/footer'
import NavBar from '../components/navbar'




function MyApp({ Component, pageProps }) {

  return (
    <>
    
     <NavBar/>
     <Component {...pageProps} />
     <Footer/>
    
    </>
  )
}

export default MyApp
