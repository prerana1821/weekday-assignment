import JobFeed from "./components/JobFeed";
import Filters from "./components/Filters";
import "./App.css";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Filters />
      <JobFeed />
    </Layout>
  );
}

export default App;

// TODO:
// create a layout component
// add scroll to top  of page
// add shimmerUi load
