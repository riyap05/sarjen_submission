import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useContext, createContext } from "react";
import "./App.css";
import InputForm from "./InputForm";
import Counter from "./Counter";
import Stopwatch from "./Stopwatch";
import MiniCalculator from "./MiniCalculator";
import TodoClass from "./TodoClass";
import TodoClassLocalStorage from "./TodoClassLocalStorage";
import TodoFunction from "./TodoFunction";
import TodoFunctionLocalStorage from "./TodoFunctionLocalStorage";
import CRUDApp from "./Crud";
import CrudAPI from "./Crud_with_API";
import NewsAPI from "./NewsAPI";
import CurrencyConverterAPI from "./CurrencyAPI";
import RecipeAPI from "./RecipeAPI";

const ThemeContext = createContext();

function Home() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("");

  const pages = [
    { path: "/counter", name: "Counter" },
    { path: "/input-form", name: "Input Form" },
    { path: "/stopwatch", name: "Stopwatch" },
    { path: "/minicalc", name: "MiniCalculator" },
    { path: "/todo-class", name: "Todo (Class)" },
    { path: "/todo-class-ls", name: "Todo (Class + LocalStorage)" },
    { path: "/todo-function", name: "Todo (Function)" },
    { path: "/todo-function-ls", name: "Todo (Function + LocalStorage)" },
    { path: "/crud", name: "CRUD App" },
    { path: "/crudwithapi", name: "CRUD App with API" },
    { path: "/newsapi", name: "News API" },
    { path: "/currencyapi", name: "Currency API" },
    { path: "/recipeapi", name: "Recipe API" },
  ];

  const handleNavigate = () => {
    if (selectedPage) {
      navigate(selectedPage);
    }
  };

  return (
    <div className={`home-container ${darkMode ? "dark-theme" : "light-theme"}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <h1>React JS Tasks</h1>
      <div className="dropdown-container">
        <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
          <option value="">Select a project</option>
          {pages.map((page, index) => (
            <option key={index} value={page.path}>
              {page.name}
            </option>
          ))}
        </select>
        <button onClick={handleNavigate} disabled={!selectedPage}>
          Go
        </button>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/input-form" element={<InputForm />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/minicalc" element={<MiniCalculator />} />
          <Route path="/todo-class" element={<TodoClass />} />
          <Route path="/todo-class-ls" element={<TodoClassLocalStorage />} />
          <Route path="/todo-function" element={<TodoFunction />} />
          <Route path="/todo-function-ls" element={<TodoFunctionLocalStorage />} />
          <Route path="/crud" element={<CRUDApp />} />
          <Route path="/crudwithapi" element={<CrudAPI />} />
          <Route path="/newsapi" element={<NewsAPI />} />
          <Route path="/currencyapi" element={<CurrencyConverterAPI />} />
          <Route path="/recipeapi" element={<RecipeAPI />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;