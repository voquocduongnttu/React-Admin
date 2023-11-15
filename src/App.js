import AppRoutes from './routes/AppRoutes';
import './App.scss';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
function App() {
const { user, loginContext } = useContext(UserContext)

  useEffect(()=>{

    if (localStorage.getItem("token")){

      loginContext(localStorage.getItem("email"),localStorage.getItem("token") )
    }

},[])

  return (
    <>
    <div className='app-container'>
      <Container>
        <Header />
        <AppRoutes/>
      </Container>
     
    </div>

    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />

    </>
  );
}

export default App;
