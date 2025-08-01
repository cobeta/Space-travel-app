import { usePlanets } from '../hooks/usePlanets';
import { useSpacecrafts } from '../hooks/useSpacecrafts';

import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import SpacecraftCard from './SpacecraftCard';

import styles from './Spacecrafts.module.css';

const Spacecrafts = () => {
  const { planets, loading: planetsLoading, error: planetsError } = usePlanets();
  const { spacecrafts, loading: spacecraftsLoading, error: spacecraftsError } = useSpacecrafts();

  if (planetsLoading || spacecraftsLoading) return <Spinner />;
  if (planetsError || spacecraftsError) {
    return <p>Error loading data: {(planetsError || spacecraftsError).message}</p>;
  }

  return (
    <>
      <Link to="/spacecrafts/new" className={styles.newSpacecraft}>
        Create Spacecraft
      </Link>
      <div className={styles.spacecraftList}>
        {spacecrafts.map((craft) => {
          const locationName = planets.find((p) => p.id === craft.currentLocation);
          return (
            <SpacecraftCard
              key={craft.id}
              data={craft}
              homePlanetName={locationName ? locationName.name : 'Unknown'}
            />
          );
        })}
      </div>
    </>
  );
};

export default Spacecrafts;
