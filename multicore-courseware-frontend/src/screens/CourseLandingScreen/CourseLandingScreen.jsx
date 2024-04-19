import React from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

const CourseLandingScreen = () => {
  const [loading, setLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const jhubBaseUrl = process.env.REACT_APP_API_BASE_JHUB_URL;
  const jhubAdminToken = process.env.REACT_APP_API_JHUB_ADMIN_TOKEN;

  const { courseId } = useParams();
  const [course, setCourse] = useState([]);
  const [courseContent, setCourseContent] = useState([]);
  const [courseCompleted, setCourseCompleted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [isTokenFetched, setIsTokenFetched] = useState(false);
  const [jhubToken, setJhubToken] = useState("");

  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [courseCertificate, setCourseCertificate] = useState([]);

  const [expanded, setExpanded] = useState(false);
  const maxLength = 250; // Adjust the maximum length of the description to show initially
  const truncatedDescription =
    course.description && course.description.length > maxLength
      ? course.description.substring(0, maxLength) + "..."
      : course.description;

  const [visitedButtons, setVisitedButtons] = useState([]);

  const navigate = useNavigate();

  const handleViewCertificate = () => {
    setShowCertificateModal(true);
    toast.success("Certificate Generated Successfully!!!");
  };

  const { accessToken } = useSelector((state) => state.auth);

  /// Get Token For JHUB server
  useEffect(() => {
    const fetch = async () => {
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
          `${baseUrl}/notebook-utlis/get-jhub-user-token/`,
          { headers }
        );

        setJhubToken(response.data.token);
        setFirstName(response.data.first_name);
        setIsTokenFetched(true);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Call fetch function
    fetch();
  }, [baseUrl]);

  /// Get Course Detail
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
        const response = await axios.get(
          `${baseUrl}/courses/course/detail/${courseId}/`,
          { headers }
        );

        setCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [baseUrl]);

  /// get course-content and progress
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
        // const response = await axios.get(`${baseUrl}/courses/${courseId}/content/`, { headers });
        const response = await axios.get(
          `${baseUrl}/courses/get-course/${courseId}/contents/progress/`,
          { headers }
        );

        console.log(response.data.course_content_progress);
        setCourseContent(response.data.course_content_progress);

        const courseCompleted = response.data.course_completed;
        if (courseCompleted) {
          setCourseCompleted(courseCompleted);
          handleCheckCourseProgress();
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [baseUrl]);

  const markContentProgress = async (contentId) => {
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

      const body = {};

      // Make the HTTP request with the authorization header
      const response = await axios.post(
        `${baseUrl}/courses/post-course/${courseId}/contents/${contentId}/progress/`,
        body,
        { headers }
      );
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Function to handle button click and mark it as visited mark the content visited or completed
  const handleButtonClick = (contentId, notebookName, contentType) => {
    // Check if the button is already marked as visited
    if (!visitedButtons.includes(contentId) && contentType !== "ASSESSMENT") {
      // If not visited, add it to the visitedButtons state
      setVisitedButtons([...visitedButtons, contentId]);
    }

    if (isTokenFetched) {
      const url = `${jhubBaseUrl}/user/${firstName.toLowerCase()}/notebooks/${notebookName}?token=${jhubToken}`;
      window.open(url, "_blank"); // Open the URL in a new tab
    }

    if (contentType !== "ASSESSMENT") {
      markContentProgress(contentId);
      window.location.reload();
    }
  };

  const handleCheckCourseProgress = () => {
    // check is certificate is completed
    const markCourseCompleted = async () => {
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

        const body = {};

        // Make the HTTP request with the authorization header
        const response = await axios.post(
          `${baseUrl}/courses/course-progress/${courseId}/`,
          body,
          { headers }
        );

        // try {
        //     const completed = response.data.data.completed;
        //     setCourseCompleted(completed);
        // }
        // catch (error) {
        //     setCourseCompleted(false);
        // }

        fetchCertificate();
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    markCourseCompleted();
  };

  // fetch certificate
  const fetchCertificate = () => {
    const fetch = async () => {
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
          `${baseUrl}/courses/get-certificate/${courseId}/`,
          { headers }
        );

        setCourseCertificate(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetch();
  };

  const handleCertificateDownload = async () => {
    try {
      const response = await fetch(courseCertificate.certificate_image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${course.title}_certificate_image.png`;
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleAssessmentSubmit = (
    notebook_name,
    course_id,
    course_content_id
  ) => {
    // Assess the NoteBook
    const assess = async () => {
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

        const body = {
          notebook_name: notebook_name,
          course_id: course_id,
          course_content_id: course_content_id,
        };

        // Make the HTTP request with the authorization header
        setLoading(true);
        const response = await axios.post(
          `${baseUrl}/notebook-utlis/grade-notebook/`,
          body,
          { headers }
        );
        setLoading(false);
        if (response.data["Passed"] == true) {
          markContentProgress(course_content_id);

          if (!visitedButtons.includes(course_content_id)) {
            // If not visited, add it to the visitedButtons state
            setVisitedButtons([...visitedButtons, course_content_id]);
          }
          window.location.reload();
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching courses:", error);
      }
    };

    assess();
  };

  const handleOpenQuiz = (contentId, quizId) => {
    navigate(`/quiz/${courseId}/${contentId}/${quizId}`);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        >
          <h2 className=" font-bold text-4xl mb-8">{course.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Course Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg h-[300px] flex justify-center items-center shadow-lg overflow-hidden"
            >
              <img
                src={course.image}
                alt="Course"
                className="w-full h-48 object-contain"
              />
            </motion.div>

            {/* Course Introduction */}

            {/* Tutor Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold ">Tutor Details</h2>
              <div className="flex  w-full  h-[80%] justify-center items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF7DUFYVA-fc5pClHdj5MnORfFwVTHEG3gdg&s"
                  alt="Tutor"
                  className="w-24 h-24 object-cover items-center rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-bold">John Doe</h3>
                  <p className="text-gray-700">Senior Instructor</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white col-span-2 h-[250px] w-full rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Course Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                {expanded ? course.description : truncatedDescription}
                {course.description &&
                  course.description.length > maxLength && (
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? "Read Less" : "Read More"}
                    </button>
                  )}
              </p>
            </motion.div>
          </div>

          {/* Other Labs and Related Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">
              Other Labs and Related Information
            </h2>
            <ul className="list-disc pl-4">
              <li>Lab 1: Introduction to Programming</li>
              <li>Lab 2: Data Structures and Algorithms</li>
              <li>Lab 3: Web Development Fundamentals</li>
              {/* Add more labs or related information */}
            </ul>
          </motion.div>

          <Col className=" mt-5 ">
            <div className=" flex">
              {courseContent.map((content) => (
                <Row
                  key={content.course_content.id}
                  className="mb-4 w-full flex"
                >
                  {content.course_content.content_type !== "QUIZ" && (
                    <div className=" ">
                      <button
                        className=" bg-green-300 cursor-pointer hover:scale-[1.01] transition-all duration-200  py-3 rounded-full  px-4"
                        variant={
                          !visitedButtons.includes(content.course_content.id) &&
                          !content.completed
                            ? "primary"
                            : "secondary"
                        }
                        onClick={
                          isTokenFetched
                            ? () =>
                                handleButtonClick(
                                  content.course_content.id,
                                  content.course_content.content,
                                  content.course_content.content_type
                                )
                            : null
                        } // Call handleButtonClick function only when isTokenFetched is true
                        disabled={!isTokenFetched} // Disable the button when isTokenFetched is false
                      >
                        {isTokenFetched
                          ? content.course_content.title
                          : "Lab is being set up..."}
                      </button>
                    </div>
                  )}

                  <div>
                    <div className=" ">
                      <div>
                        {content.course_content.content_type === "QUIZ" && (
                          <button
                            className="me-3  bg-green-300 cursor-pointer hover:scale-[1.01] transition-all duration-200  py-3 rounded-full  px-4"
                            variant={
                              !visitedButtons.includes(
                                content.course_content.id
                              ) && !content.completed
                                ? "primary"
                                : "secondary"
                            }
                            onClick={
                              isTokenFetched
                                ? () =>
                                    handleOpenQuiz(
                                      content.course_content.id,
                                      content.course_content.quiz
                                    )
                                : null
                            } // Call handleButtonClick function only when isTokenFetched is true
                            disabled={!isTokenFetched} // Disable the button when isTokenFetched is false
                          >
                            {isTokenFetched
                              ? content.course_content.title
                              : "Lab is being set up..."}
                          </button>
                        )}
                      </div>
                      <div>
                        {content.course_content.content_type !== "QUIZ" && (
                          <Row className="mt-4 flex  justify-center items-center  justify-content-center">
                            {content.course_content.content_type ===
                              "ASSESSMENT" && (
                              <button
                                className=" -translate-x-36 bg-blue-500  py-2 px-5 rounded-md font-semibold flex justify-center items-center"
                                variant="info" // Adjust the variant according to your design
                                onClick={() =>
                                  handleAssessmentSubmit(
                                    content.course_content.content,
                                    course.id,
                                    content.course_content.id
                                  )
                                } // Define the handleAssessmentSubmit function
                              >
                                <div className=" ">
                                  {loading ? (
                                    <ThreeDots
                                      visible={true}
                                      height="21"
                                      width="50"
                                      color="#ffffff"
                                      radius="9"
                                      ariaLabel="three-dots-loading"
                                      wrapperStyle={{}}
                                      wrapperClass=""
                                    />
                                  ) : (
                                    <>Submit</>
                                  )}
                                </div>
                              </button>
                            )}
                          </Row>
                        )}
                      </div>
                    </div>
                  </div>
                </Row>
              ))}
            </div>

            <div>
              {courseCompleted && (
                <Row className="mb-4">
                  <Button variant="success" onClick={handleViewCertificate}>
                    View Certificate
                  </Button>
                </Row>
              )}
            </div>
            <Modal
              show={showCertificateModal}
              onHide={() => setShowCertificateModal(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Certificate</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={courseCertificate.certificate_image}
                  alt="Certificate"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    margin: "auto",
                    display: "block",
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowCertificateModal(false)}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={handleCertificateDownload}>
                  Download
                </Button>
              </Modal.Footer>
            </Modal>

            <Row className=" mx-auto w-[300px] ">
              <Button variant="secondary" href="/home" className=" ">
                Back to Courses
              </Button>
            </Row>
          </Col>
        </motion.div>
      </div>
    </>
  );
};

export default CourseLandingScreen;

// `${jhubBaseUrl}/user/${firstName.toLowerCase()}/notebooks/${content.course_content.content}?token=${isTokenFetched ? jhubToken : ''}`
