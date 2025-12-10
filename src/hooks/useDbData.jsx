import { useContext, useEffect, useState } from "react";
import axiosApi from "../api/axiosInstansce";
import { AuthContext } from "../auth/AuthContext";

const useDbData = () => {
  const { currentUser } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.email) return setLoading(true);
      try {
        // fetching user
        const userRes = await axiosApi.get("/users");
        setDbUser(userRes.data);

        // Fetch lessons for this user
        const lessonsRes = await axiosApi.get("/lessons");
        setLessons(lessonsRes.data);

        // fetching reported lessons
        const reportedLessonRes = await axiosApi.get("/lessonsReports");
        setReports(reportedLessonRes.data);

        // get contributors by email 


      } catch (err) {
        console.error("Failed to fetch user or lessons:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  return { dbUser, lessons, reports, loading };
};

export default useDbData;
