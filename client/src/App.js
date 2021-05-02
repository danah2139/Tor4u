import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header />
          <Main />
        </Router>
        <footer>
          <Footer />
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
