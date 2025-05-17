import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { TasksPage } from './pages/TasksPage'
import { TaskFormPage} from './pages/TaskFormPage'
import { Navigation } from './components/Navigation'
import { Presentacion } from './components/Presentasion'
import { Editar } from './components/EditarPage'
import { AuthProvider } from './components/AuthProvider '
import { PrivateRoute } from './components/PrivateRoute'
import { RegisterForm } from './components/RegisterForm'


  function App  () {
  
    
    

  return (
    
      <AuthProvider>
          <BrowserRouter>
            <Navigation/>  
            <Routes>
              
              <Route path="/" element={<Presentacion />} />
              <Route path="/tasks" element={<PrivateRoute element={<TasksPage/>} />}/>
              <Route path="/taskForm" element={<PrivateRoute element={<TaskFormPage/>} />}/>
              <Route path="/task-edit/:id" element={<PrivateRoute element={<Editar/>} />}/>
              <Route path='/register-form' element={<RegisterForm/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    
  )
}

export default App 