import { createContext, useState, useCallback, useContext } from "react";

const RouterContext = createContext();

const RouterProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const onNavigate = useCallback((pathName) => {
    window.history.pushState({}, "", pathName);
    setCurrentPath(pathName);
  }, []);

  const onLinkClick = useCallback(
    (event) => {
      event.preventDefault();
      onNavigate(new URL(event.target.href).pathname);
    },
    [onNavigate]
  );

  return (
    <RouterContext.Provider value={{ currentPath, onNavigate, onLinkClick }}>
      {children}
    </RouterContext.Provider>
  );
};

export { RouterProvider, RouterContext };
