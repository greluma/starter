import Gallery from "./components/Gallery";
import SearchForm from "./components/SearchForm";
import ThemeToggle from "./components/ThemeToggle";
import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
    <main>
      <ToastContainer position='top-center' />
      <ThemeToggle></ThemeToggle>
      <SearchForm></SearchForm>
      <Gallery></Gallery>
    </main>
  )
};
export default App;
