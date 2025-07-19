import styles from "./App.module.css";

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Router.jsx';
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
export default App;
