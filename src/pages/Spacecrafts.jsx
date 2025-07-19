import { useEffect } from 'react';
import { useAppData } from '../context/useAppData';
import SpaceTravelApi from '../services/SpaceTravelApi';

const Spacecrafts = () => {
  const { spacecrafts, setSpacecrafts } = useAppData();

  useEffect(() => {
    const fetchSpacecrafts = async () => {
      const res = await SpaceTravelApi.getSpacecrafts();
      console.log(res);
      if (res.error) {
        console.error('Error fetching spacecrafts:', res.error);
        return;
      }
      if (res.data) {
        console.log('Spacecrafts fetched successfully:', res.data);
      }
      const data = res.data || [];
      setSpacecrafts(data);
    };

    if (spacecrafts.length === 0) {
      fetchSpacecrafts();
    }
  }, []);

  return (
    <div>
      <h2>Spacecrafts</h2>
      <ul>
        {spacecrafts.map((sc) => (
          <li key={sc.id}>{sc.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Spacecrafts;
