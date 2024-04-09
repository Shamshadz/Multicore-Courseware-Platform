import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Carousel } from "react-bootstrap";
import Footer from "../../components/Footer";

function LandingPage() {
    const navigate = useNavigate();
    const Courses = [
        {
            id: "alsjdlasjdflkjs",
            title: "Basics of OpenMPI",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus suntrem velit architecto aut commodi, pariatur quod molestias. Dicta aliquaveniam libero, unde commodi nostrum!",
            thumbnail:
                "data:image/jpeg;base64,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",

            githuburl:
                "https://github.com/Anonymousgeek111/Chapter-1-Basics-of-OpenMPI/tree/main",
        },
        {
            id: "lajsdfalasdjfl",
            title: "Intermediate OpenMPI",
            description:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus suntrem velit architecto aut commodi, pariatur quod molestias. Dicta aliquaveniam libero, unde commodi nostrum!",
            thumbnail:
                "https://repository-images.githubusercontent.com/181981725/1af35680-6a25-11e9-985e-a483461309fe",
            githuburl:
                "https://github.com/Anonymousgeek111/Chapter-2-Intermediate-OpenMPI",
        },
    ];
    return (
        <div className=" relative mb-10">
            {/* Hero Section */}

            <div className="  text-black py-20 ">
                <div className="container mx-auto flex flex-col items-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Welcome to{" "}
                        <span className=" text-blue-500"> MultiCore CourseWare</span>
                    </h1>
                    <p className="text-lg md:text-xl text-center max-w-lg">
                        <span className=" text-xl font-bold">"</span>Learn from the best,
                        expand your knowledge, and advance your career with our diverse
                        range of courses. <span className=" text-xl font-boldb">"</span>
                    </p>
                </div>
            </div>

            <Carousel className=" mt-3">
                <Carousel.Item>
                    <img
                        className="d-block w-100 h-[500px]  object-center"
                        src="https://media.istockphoto.com/id/1416048929/photo/woman-working-on-laptop-online-checking-emails-and-planning-on-the-internet-while-sitting-in.jpg?s=612x612&w=0&k=20&c=mt-Bsap56B_7Lgx1fcLqFVXTeDbIOILVjTdOqrDS54s="
                        alt="First slide"
                    />
                    <Carousel.Caption className=" bg-gray-500  bg-opacity-75">
                        <h3>Parallel Thinking</h3>
                        <p>
                            Explore the basics of parallel thinking, learning how to apply
                            principles and techniques in real-world scenarios.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 h-[500px] object-center content-center"
                        src="https://media.istockphoto.com/id/1349390515/photo/paperless-workplace-idea-e-signing-electronic-signature-document-management-businessman-signs.jpg?s=612x612&w=0&k=20&c=EyQl13diegNV5DVLnb0krcAcRDhL7NiSA7IEVImZs6Q="
                        alt="Second slide"
                    />
                    <Carousel.Caption className=" bg-gray-500  bg-opacity-75">
                        <h3>Advanced Parallel Thinking Strategies</h3>
                        <p>
                            Discover advanced techniques for optimizing parallel processing,
                            tackling complex challenges efficiently.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 h-[500px] "
                        src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_640.jpg"
                        alt="Third slide"
                    />
                    <Carousel.Caption className=" bg-gray-500  bg-opacity-75">
                        <h3>Parallel Thinking in Action</h3>
                        <p>
                            Gain hands-on experience with real-world projects and simulations,
                            mastering parallel thinking skills for success.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            {/* Course Cards */}
            <div className="container mx-auto mt-10">
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Our Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Sample Card */}
                    {Courses.map((course) => (
                        <div key={course.id}
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="py-4 pb-1 cursor-pointer bg-gray-300 px-4 rounded-lg shadow-md overflow-hidden hover:scale-[1.01] transition-all duration-200 hover:shadow-xl"
                        >
                            <img
                                src={course.thumbnail}
                                alt="Course"
                                className="w-full object-center max-h-[300px]  object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                                <p className="text-gray-600">{course.description}</p>
                                <a
                                    href="#"
                                    className="block text-blue-500 mt-2 hover:underline"
                                ></a>
                            </div>
                        </div>
                    ))}

                    {/* Add more cards as needed */}
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
}

export default LandingPage;