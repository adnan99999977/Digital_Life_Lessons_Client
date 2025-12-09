// hooks/useCurrentUser.js
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import axiosApi from "../api/axiosInstansce";

const useCurrentUser = () => {
  const { currentUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.email) return setLoading(false);

      try {
       
        const userRes = await axiosApi.get("/users", {
          params: { email: currentUser.email },
        });
        setUser(userRes.data);

        // Fetch lessons for this user
        const lessonsRes = await axiosApi.get("/lessons", {
          params: { email: currentUser.email },
        });
        setLessons(lessonsRes.data);
      } catch (err) {
        console.error("Failed to fetch user or lessons:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  return { user, lessons, loading, error };
};

export default useCurrentUser;
