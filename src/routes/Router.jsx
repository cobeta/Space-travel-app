import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import Home from '../pages/Home';
import Spacecrafts from '../pages/Spacecrafts';
import NewSpacecraft from '../pages/NewSpacecraft';
import Spacecraft from '../pages/Spacecraft';
import Planets from '../pages/Planets';
import NotFound from '../pages/NotFound'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />

      <Route path="spacecrafts">
        <Route index element={<Spacecrafts />} />
        <Route path="new" element={<NewSpacecraft />} />
        <Route path=":id" element={<Spacecraft />} />
      </Route>

      <Route path="planets" element={<Planets />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
