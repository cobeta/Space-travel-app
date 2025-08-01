import { useEffect, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { useAppData } from '../context/AppContext';

export const useSpacecrafts = () => {
  const { spacecrafts, setSpacecrafts } = useAppData();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpacecrafts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await SpaceTravelApi.getSpacecrafts();
        if (res.isError) throw new Error('Error fetching spacecrafts');
        setSpacecrafts(res.data);      
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpacecrafts();
  }, [setSpacecrafts]);

  return { spacecrafts, loading, error };
};
