import { useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "@/components/styles/GlobalStyles";
import { basic } from "@/components/styles/Theme.styled";
import Header from "@/components/header/Header";
import Calculator from "@/components/calculator/Calculator";


function App() {
  const [selectedTheme, setSelectedTheme] = useState(basic);

  // function to handle user theme selection on click and save it to local storage
  const HandleThemeChange = (theme) => {
    setSelectedTheme(theme);
    toggleActiveTheme(theme);
    localStorage.setItem("current-theme", JSON.stringify(theme));
  };
  function toggleActiveTheme(theme) {
    const themeBtns = document.querySelectorAll(".theme-btn");
    themeBtns.forEach((themeBtn) => {
      if (themeBtn.classList.contains(theme.name)) {
        themeBtn.classList.add("active");
      } else {
        themeBtn.classList.remove("active");
      }
    });
  }
  // react hook to get the theme selected by the user that is saved in local storage
  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));

    if (currentTheme) {
      setSelectedTheme(currentTheme);
      toggleActiveTheme(currentTheme);
    }
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Header HandleThemeChange={HandleThemeChange} />
        <Routes>
          <Route path="/calculator/" exact element={<Calculator />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
