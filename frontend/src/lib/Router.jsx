import { createContext, useState, useCallback } from "react";

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
      onNavigate(event.target.href);
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
