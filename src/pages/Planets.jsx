import { useState, useEffect } from 'react';
import { usePlanets } from '../hooks/usePlanets';
import { useSpacecrafts } from '../hooks/useSpacecrafts';
import { useAppData } from '../context/AppContext';
import SpaceTravelApi from '../services/SpaceTravelApi';
import Planet from './Planet';
import Spinner from '../components/Spinner';

const Planets = () => {
  const { planets, loading: pLoad, error: pErr } = usePlanets();
  const { spacecrafts, loading: sLoad, error: sErr } = useSpacecrafts();
  const { setSpacecrafts,  setPlanets } = useAppData();

  const loading = pLoad || sLoad;
  const error   = pErr  || sErr;

  const [selectedPlanetId, setSelectedPlanetId] = useState(null);
  const [selectedShipId,   setSelectedShipId]   = useState(null);

  useEffect(() => {
    if (selectedPlanetId == null || selectedShipId == null) return;

    const planet = planets.find(p => p.id === selectedPlanetId);
    const ship   = spacecrafts.find(s => s.id === selectedShipId);

    if (!planet || !ship) {
      setSelectedPlanetId(null);
      setSelectedShipId(null);
      return;
    }

    // same location?
    if (ship.currentLocation === planet.id) {
      alert(`${ship.name} is already on ${planet.name}.`);
    } else if (window.confirm(`Send ${ship.name} to ${planet.name}?`)) {
      SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId: ship.id,
        targetPlanetId: planet.id
      })
      .then(() => {
        setSpacecrafts(prev =>
          prev.map(s =>
            s.id === ship.id
              ? { ...s, currentLocation: planet.id }
              : s
          )
        );
        setPlanets(prev =>
          prev.map(p =>
            p.id === planet.id
              ? {
                  ...p,
                  currentPopulation:
                    p.currentPopulation +
                    Math.min(
                      spacecrafts.find(s => s.id === ship.id)?.capacity || 0,
                      planets.find(pl => pl.id === ship.currentLocation)?.currentPopulation || 0
                    )
                }
              : p.id === ship.currentLocation
              ? {
                  ...p,
                  currentPopulation:
                    Math.max(
                      0,
                      p.currentPopulation -
                        Math.min(
                          spacecrafts.find(s => s.id === ship.id)?.capacity || 0,
                          p.currentPopulation
                        )
                    )
                }
              : p
          )
        );
      })
      .catch(err => {
        console.error(err);
        alert(`Failed to move ship: ${err.message}`);
      });
    }

    // reset selection either way
    setSelectedPlanetId(null);
    setSelectedShipId(null);
  }, [
    selectedPlanetId,
    selectedShipId,
    planets,
    spacecrafts,
    setSpacecrafts
  ]);

  if (loading) return <Spinner />;
  if (error)   return <p>Error loading data: {error.message}</p>;

  return (
    <ul>
      {planets.map(planet => {
        // ships currently here
        const shipsHere = spacecrafts.filter(
          s => s.currentLocation === planet.id
        );

        return (
          <Planet
            key={planet.id}
            id={planet.id}
            name={planet.name}
            imageUrl={planet.pictureUrl}
            population={planet.currentPopulation}
            ships={shipsHere}

            // pass handlers & selected IDs
            selectedPlanetId={selectedPlanetId}
            selectedShipId={selectedShipId}
            onPlanetClick={() => setSelectedPlanetId(planet.id)}
            onShipClick={(ship) => setSelectedShipId(ship.id)}
          />
        );
      })}
    </ul>
  );
};

export default Planets;
