import Header from "./components/Header";
import MapModule from "./modules/MapModule";
import LandingPage from "./pages/landingPage";

function App() {
  return (
    <div className="bg-gray-950 h-screen overflow-hidden">
      {/* <LandingPage/> */}
      <Header />
      <MapModule />
    </div>
  );
}

export default App;
