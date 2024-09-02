import MapModule from "./modules/MapModule";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-gray-950 h-screen overflow-hidden">
      <Header />
      <MapModule />
    </div>
  );
}

export default App;
