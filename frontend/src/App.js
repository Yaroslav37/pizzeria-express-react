import Root from "./pages/Root";
import Layout from "./components/Layout";
import { RouterProvider } from "./lib/Router";

function App() {
  return (
    <RouterProvider>
      <Layout>
        <Root />
      </Layout>
    </RouterProvider>
  );
}

export default App;
