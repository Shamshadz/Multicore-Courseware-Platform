import Course from "../../components/Course";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const HomeScreen = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Check if access token exists
        if (!accessToken) {
          console.error("Access token not found in local storage");
          return;
        }

        // Set the authorization header with the access token
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        // Make the HTTP request with the authorization header
        const response = await axios.get(`${baseUrl}/courses/course-list/`, {
          headers,
        });
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [baseUrl]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        // Check if access token exists
        if (!accessToken) {
          console.error("Access token not found in local storage");
          return;
        }

        // Set the authorization header with the access token
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        // Make the HTTP request with the authorization header
        const response = await axios.get(
          `${baseUrl}/courses/enrollments-list-detail/`,
          { headers }
        );
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchEnrolledCourses();
  }, [baseUrl]);

  const isCourseEnrolled = (courseId) => {
    return enrolledCourses.some((course) => course.course === courseId);
  };

  return (
    <div className=" flex flex-wrap  gap-x-5 gap-y-5  mt-6">
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Course course={course} isEnrolled={isCourseEnrolled(course.id)} />
        </motion.div>
      ))}
    </div>
  );
};
export default HomeScreen;
