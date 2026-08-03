import "./App.css";
import ClientWorkPage from "./pages/ClientWorkPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ShowreelPage from "./pages/ShowreelPage";
import TeamPage from "./pages/TeamPage";
import WorkPage from "./pages/WorkPage";

function App() {
  const { pathname } = window.location;
  const workMatch = pathname.match(/^\/work\/([^/]+)\/?$/);

  if (pathname === "/showreel") return <ShowreelPage />;
  if (workMatch) return <ClientWorkPage slug={workMatch[1]} />;
  if (pathname === "/work") return <WorkPage />;
  if (pathname === "/contact") return <ContactPage />;
  if (["/team", "/about", "/about-us"].includes(pathname)) {
    return <TeamPage />;
  }

  return <HomePage />;
}

export default App;
