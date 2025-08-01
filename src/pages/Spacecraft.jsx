import { useParams } from 'react-router-dom';
import { useAppData } from '../context/AppContext';
import styles from './Spacecraft.module.css';
import Spinner from '../components/Spinner';

const Spacecraft = () => {
  // 1. Grab the :id param from the URL
  const { id } = useParams();

  // 2. Pull in your global state
  const { spacecrafts, loading, error } = useAppData();

  // 3. Handle loading / error states
  if (loading) return <Spinner />;
  if (error)   return <p>Error: {error.message}</p>;

  // 4. Find the single craft by its id
  const data = spacecrafts.find(sc => sc.id === id);
  if (!data) return <p>Spacecraft not found.</p>;

  // 5. Destructure the fields you need
  const { pictureUrl, name, description } = data;

  // 6. Render the UI all in one component
  return (
    <div className={styles.spacecraft}>
      <div className={styles.spacecraftLeft}>
        {pictureUrl
          ? <img src={pictureUrl} alt={name} />
          : <div className={styles.spacecraftFallback}>🚀</div>
        }
      </div>
      <div className={styles.spacecraftRight}>
        <h1 className={styles.spacecraftName}>{name}</h1>
        <p className={styles.spacecraftDescription}>{description}</p>
      </div>
    </div>
  );
};

export default Spacecraft;
