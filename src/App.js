/* This is importing the useEffect and useState hooks from the React library. */
import { useEffect, useState } from 'react';

/* This is importing the Header and Footer components from the components folder. */
import Header from './components/Header/Header'

import Footer from './components/Footer/Footer';

/* This is importing the Login and Dashboard components from the views folder. */
import Login from './views/Login';

import Dashboard from './views/Dashboard'

/* This is importing the App.css file into the App.js file. */
import './App.css';

const App = () => {

  /* this function will be control if the use is auth or not */
  const [isAuth, setIsAuth] = useState(false)

  /* verify is in the local storage exist the variable is Auth */
  const verifyAuth = () => {
    setIsAuth(localStorage.getItem('isAuth') ? true : false)
  }

  /* in the first render call the function verifyAuth */
  useEffect(() => {
    verifyAuth()
  }, [])

  return (
    <div className='app'>
      <Header isAuth={isAuth} verifyAuth={verifyAuth} />

      {isAuth ? <Dashboard /> : <Login verifyAuth={verifyAuth} />}

      <Footer />
    </div>
  )
}

/* Exporting the App component. */
export default App;
