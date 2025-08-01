import { useEffect, useState } from 'react';
import SpaceTravelApi from '../services/SpaceTravelApi';
import { useAppData } from '../context/AppContext';

export const usePlanets = () => {
  const { planets, setPlanets } = useAppData();
  const [loading, setLoading] = useState(planets.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const res = await SpaceTravelApi.getPlanets();
        if (res.isError) throw new Error('Error fetching planets');
        setPlanets(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [setPlanets]);

  return { planets, loading, error };
};
