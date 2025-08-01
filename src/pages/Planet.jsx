import styles from './Planet.module.css';

const Planet = ({
  id,
  imageUrl,
  name,
  population,
  ships,
  selectedPlanetId,
  selectedShipId,
  onPlanetClick,
  onShipClick
}) => {
  const isPlanetSelected = id === selectedPlanetId;

  return (
    <li
      className={`${styles.planet} ${isPlanetSelected ? styles.selectedPlanet : ''}`}
      onClick={onPlanetClick}
    >
      <div className={styles.planetLeft}>
        <img src={imageUrl} alt={name} />
        <p className={styles.planetSubtitle}>
          {name}: {population}
        </p>
      </div>

      <div className={styles.planetRight}>
        {ships.map(ship => {
          const isShipSelected = ship.id === selectedShipId;
          return (
            <div
              key={ship.id}
              className={`${styles.ship} ${isShipSelected ? styles.selectedShip : ''}`}
              onClick={e => {
                e.stopPropagation();
                onShipClick(ship);
              }}
            >
              {ship.pictureUrl ? (
                <img
                  src={ship.pictureUrl}
                  alt={ship.name}
                  className={styles.shipImage}
                />
              ) : (
                <div className={styles.shipFallback}>🚀</div>
              )}
              <span className={styles.shipName}>{ship.name}</span>
            </div>
          );
        })}
      </div>
    </li>
  );
};

export default Planet;
