import React from 'react';
import img1 from "../../assets/images/about1.png"
import img2 from "../../assets/images/about2.png"
import img3 from "../../assets/images/about3.png"
import img4 from "../../assets/images/about4.png"
import img5 from "../../assets/images/about5.png"
import img6 from "../../assets/images/about6.png"
import img7 from "../../assets/images/about7.png"
import img8 from "../../assets/images/about8.png"
import img9 from "../../assets/images/about9.png"
const AboutUs = () => {
    // Student cards data with different colors and images
    const students = [
        { id: 1, name: 'Student 1', color: 'bg-orange-400', image: img1},
        { id: 2, name: 'Student 2', color: 'bg-purple-400', image: img2  },
        { id: 3, name: 'Student 3', color: 'bg-red-500', image: img3},
        { id: 4, name: 'Student 4', color: 'bg-green-500', image: img4 },
        { id: 5, name: 'Student 5', color: 'bg-pink-400', image: img5 },
        { id: 6, name: 'Student 6', color: 'bg-blue-600', image: img6 },
        { id: 7, name: 'Student 7', color: 'bg-yellow-400', image: img7 },
        { id: 8, name: 'Student 8', color: 'bg-indigo-500', image: img8 },
        { id: 9, name: 'Student 9', color: 'bg-teal-500', image: img9 },
    ];

    // Split students into 3 columns
    const column1 = students.filter((_, i) => i % 3 === 0);
    const column2 = students.filter((_, i) => i % 3 === 1);
    const column3 = students.filter((_, i) => i % 3 === 2);

    return (
        <div id={"about"} className="min-h-screen lg:min-h-[15rem]  bg-gradient-to-br from-gray-50 to-gray-100 py-12 lg:py-0   px-4 sm:px-6 lg:px-8">
            <div className="max-w-[75%] lg:max-w-[85%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center  ">

                    {/* Left Side - Text Section with Slide Animation */}
                    <div className="animate-slideInLeft order-2 lg:order-1  md:ml-[4rem] lg:ml-[0rem]">
                        <h2 className="text-4xl sm:text-5xl 3xl:text-6xl font-bold text-gray-800 mb-6 md:ml-[4.5rem] lg:ml-[0rem]">
                            About CISD
                        </h2>
                        <div className="space-y-4 text-gray-600 leading-relaxed text-justify 3xl:text-xl max-w-[35rem]  3xl:max-w-[40rem]">
                            <p>
                                CISD, Sri Lanka's first institution for professional sales education, believes
                                sales drives economies and enterprise
                            </p>
                            <p className={"text-justify"}>

                                The Colombo Institute of Sales & Distribution (CISD) is Sri Lanka’s pioneering higher-education institution exclusively dedicated to developing skilled, ethical, and industry-ready professionals in Sales, Marketing, and Distribution Management.

                                As a British-accredited institution with pathways to chartered recognition, CISD offers internationally recognised qualifications aligned with global higher-education standards and professional competency frameworks.

                                Our founding team comprises senior academics and industry leaders with over two decades of experience in higher education, professional training, and corporate sales leadership—ensuring a strong blend of academic excellence, industry relevance, and future-focused learning.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - 3 Column Vertical Scrolling Cards */}
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden order-1 lg:order-2">
                        <div className="absolute inset-0 flex gap-3 sm:gap-4 justify-center">

                            {/* Column 1 - Scrolls Up */}
                            <div className="flex-1 max-w-[140px] sm:max-w-[160px]">
                                <div className="animate-scrollUp space-y-4">
                                    {[...column1, ...column1, ...column1].map((student, index) => (
                                        <div
                                            key={`col1-${index}`}
                                            className="relative w-32 sm:w-36 lg:w-40 h-60 sm:h-64 lg:h-[22rem] rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"

                                        >
                                            <img
                                                src={student.image}
                                                alt={student.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Column 2 - Scrolls Down */}
                            <div className="flex-1 max-w-[140px] sm:max-w-[160px]">
                                <div className="animate-scrollDown space-y-4">
                                    {[...column2, ...column2, ...column2].map((student, index) => (
                                        <div
                                            key={`col2-${index}`}
                                            className="relative w-32 sm:w-36 lg:w-40 h-60 sm:h-64 lg:h-[22rem] rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
                                        >
                                            <img
                                                src={student.image}
                                                alt={student.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Column 3 - Scrolls Up */}
                            <div className="flex-1 max-w-[140px] sm:max-w-[160px]">
                                <div className="animate-scrollUp space-y-4">
                                    {[...column3, ...column3, ...column3].map((student, index) => (
                                        <div
                                            key={`col3-${index}`}
                                            className="relative w-32 sm:w-36 lg:w-40 h-60 sm:h-64 lg:h-[22rem] rounded-full overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
                                        >
                                            <img
                                                src={student.image}
                                                alt={student.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Gradient Overlays for Smooth Fade */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-100 to-transparent pointer-events-none z-10"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none z-10"></div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes scrollUp {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-33.333%);
                    }
                }

                @keyframes scrollDown {
                    0% {
                        transform: translateY(-33.333%);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }

                .animate-slideInLeft {
                    animation: slideInLeft 1s ease-out forwards;
                }

                .animate-scrollUp {
                    animation: scrollUp 15s linear infinite;
                }

                .animate-scrollDown {
                    animation: scrollDown 15s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default AboutUs;