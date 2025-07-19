import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import Home from '../pages/Home';
import Spacecrafts from '../pages/Spacecrafts';
import Spacecraft from '../pages/Spacecraft';
import Planets from '../pages/Planets';
import Planet from '../pages/Planet';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="spacecrafts" element={<Spacecrafts />} >
        <Route index element={<Spacecrafts />} />
        <Route path=":id" element={<Spacecraft />} />
      </Route>
      <Route path="planets" element={<Planets />} >
        <Route index element={<Planets />} />
        <Route path=":id" element={<Planet />} />
      </Route>      
    </Route>
  )
);
