import { useNavigate } from 'react-router-dom';
import { useAppData} from '../context/AppContext'
import SpaceTravelApi from '../services/SpaceTravelApi';
import styles from './SpacecraftCard.module.css';
  
const SpacecraftCard = ({ data }) => {
  const { id, pictureUrl, name, capacity } = data;
  const navigate = useNavigate();
  const { setSpacecrafts } = useAppData();


  const handleDestroy = async (e) => {
    e.stopPropagation(); 
    e.preventDefault();  

    try {
      const res = await SpaceTravelApi.destroySpacecraftById({ id });
      console.log(res);
      setSpacecrafts(prev => prev.filter(craft => craft.id !== id));
    } catch (error) {
      console.error('Failed to destroy spacecraft:', error);
    }
  };


  const handleCardClick = () => {
    navigate(`/spacecrafts/${id}`);
  };

  return (
    <div className={styles.spacecraft} onClick={handleCardClick}>
      {/* Left: image or fallback */}
      <div className={styles.spacecraftLeft}>
        {pictureUrl ? (
          <img
            src={pictureUrl}
            alt={name}
            className={styles.spacecraftImage}
          />
        ) : (
          <div className={styles.spacecraftFallback}>🚀</div>
        )}
      </div>

      {/* Middle: name & capacity */}
      <div className={styles.spacecraftMiddle}>
        <p className={styles.spacecraftName}>{name}</p>
        <p className={styles.spacecraftCapacity}>Capacity: {capacity}</p>
      </div>

      {/* Right: destroy button */}
      <div className={styles.spacecraftAction}>
        <button onClick={handleDestroy} className={styles.destroyButton}>
          Destroy
        </button>
      </div>
    </div>
  );
};

export default SpacecraftCard;
