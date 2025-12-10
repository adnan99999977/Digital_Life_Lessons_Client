// hooks/useCurrentUserFav.js
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import axiosApi from "../api/axiosInstansce";

const useCurrentUserFav = () => {
  const { currentUser } = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser?.email) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await axiosApi.get("/favorites", {
          params: { email: currentUser.email },
        });
        setFavorites(res.data || []);
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser]);

  return { favorites, loading, error };
};

export default useCurrentUserFav;
