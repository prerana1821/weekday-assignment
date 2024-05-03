import JobFeed from "./components/JobFeed";
import Filters from "./components/Filters";
import Layout from "./components/Layout";
import useScrollToTop from "./hooks/useScrollToTop";
import ScrollToTopButton from "./components/ui/ScrollToTopButton";

function App() {
  const { showButton, scrollToTop } = useScrollToTop();

  return (
    <Layout>
      <Filters />
      <JobFeed />
      {showButton && <ScrollToTopButton scrollToTop={scrollToTop} />}
    </Layout>
  );
}

export default App;
