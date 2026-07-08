import { Route,Routes } from 'react-router-dom';


import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainLayout from './layouts/MainLayout';
import TransactionsPage from './pages/TransactionsPage';
import AddTransactionPage from './pages/AddTransactionPage';
function App() {
  console.log("App çalıştı");
  return (
  <Routes>



   <Route element={<MainLayout/>} >
   <Route  path='/' element={<DashboardPage/>}/>
   <Route  path='/transactions' element={<TransactionsPage/>}/>
      <Route  path='/add-transactions' element={<AddTransactionPage/>}/>


   </Route>

   <Route  path='/login' element={<LoginPage/>}/>  
   <Route  path='/register' element={<RegisterPage/>}/>


    </Routes>
    
  )
}

export default App