import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Carousel } from "react-bootstrap";
import queryString from "query-string";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { toast } from "react-toastify";

function CoursePage() {
    const [isLoading, setisLoading] = useState(false);
    const location = useLocation();
    const { githuburl, coursetitle } = queryString.parse(location.search);
    const userInfo = useSelector((state) => state.auth);
    console.log(userInfo.userInfo._id);
    const [link, setLink] = useState("");

    const saveLinkToUserCourses = async () => {
        try {
            // console.log("Mein run hua");
            setisLoading(true);
            const response = await fetch(
                "http://localhost:5001/api/users/add-course-url",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: userInfo.userInfo._id, // You need to replace this with the actual userId
                        courseName: coursetitle,
                        courseUrl: link,
                    }),
                }
            );
            setisLoading(false);

            if (!response.ok) {
                throw new Error("Failed to save link");
            }

            // Optionally, you can show a success message or perform other actions here
            console.log("Link saved successfully");
            toast.success("Link Saved Successfully!!!");
            setLink("");
        } catch (error) {
            console.error("Error saving link:", error);
        }
    };

    return (
        <div>
            <FormContainer>
                <p className=" font-semibold">
                    Click the button below to download the Notebook from GitHub
                </p>
                <a
                    href="https://mybinder.org/v2/gh/Shamshadz/binder-repo-1/HEAD"
                    target="_blank"
                    className="hover:bg-blue-400  justify-center items-center flex transition-all duration-300 no-underline cursor-pointer py-2 px-5 bg-blue-600 rounded-md font-semibold text-white"
                >
                    Click Here
                </a>
                <Form.Group className="my-4" controlId="password">
                    <Form.Label className=" font-semibold">
                        Enter your Notebook's Public Link
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Public Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </Form.Group>
                <button
                    onClick={saveLinkToUserCourses}
                    className="hover:bg-blue-400 transition-all duration-300 no-underline cursor-pointer py-2 px-5 bg-blue-600 rounded-md font-semibold text-white"
                >
                    {isLoading ? (
                        <div className="flex justify-center">
                            <ThreeDots
                                visible={true}
                                height={21}
                                width={50}
                                color="#ffffff"
                                radius={9}
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </FormContainer>
            <div className="mt-5">
                <h3>References:</h3>
                <ul>
                    <li>
                        <a href="https://www.open-mpi.org/doc/" target="_blank">
                            Reference 1
                        </a>
                    </li>
                    <li>
                        <a href="#">Reference 2</a>
                    </li>
                    <li>
                        <a href="#">Reference 3</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CoursePage;