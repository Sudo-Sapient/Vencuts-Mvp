import "./App.css";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ShowreelPage from "./pages/ShowreelPage";
import TeamPage from "./pages/TeamPage";

function App() {
  const { pathname } = window.location;

  if (pathname === "/showreel") return <ShowreelPage />;
  if (pathname === "/contact") return <ContactPage />;
  if (["/team", "/about", "/about-us"].includes(pathname)) {
    return <TeamPage />;
  }

  return <HomePage />;
}

export default App;
