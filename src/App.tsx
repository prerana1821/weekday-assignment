import JobFeed from "./pages/JobFeed";
import Header from "./components/Header";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Filters />
      <JobFeed />
    </>
  );
}

export default App;

// TODO:
// create a layout component
// add scroll to top  of page
// add shimmerUi load
