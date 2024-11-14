import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from "./pages/Login"
import Signup from './pages/Signup';
import Quiz from './pages/Quiz';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { DataProvider } from './context/DataContext';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import Contact from './pages/Contact';
import Messages from './pages/Messages';

function App() {
  return (
    <DataProvider>
    <BrowserRouter>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/leaderboard" element={<Leaderboard/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/message" element={<Messages/>}/>
      </Routes>
    </div>
    </BrowserRouter>
    </DataProvider>
  );
}

export default App;
