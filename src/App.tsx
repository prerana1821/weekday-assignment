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

// TODO:
// modal for show job with hook: show tech stack in modal as skills
// add shimmerUi load: fix CSS
