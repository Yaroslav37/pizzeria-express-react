import Root from "./pages/Root";
import Layout from "./components/Layout";
import { RouterProvider } from "./lib/Router";
import { UserContextProvider } from "./contexts/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <RouterProvider>
      <UserContextProvider>
        <Layout>
          <Root />
        </Layout>
        <ToastContainer />
      </UserContextProvider>
    </RouterProvider>
  );
}

export default App;
