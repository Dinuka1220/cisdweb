import React, { useEffect, useState, useRef } from 'react';
import vision from "../../assets/video/vision.mp4"
import vec1 from "../../assets/images/vector2.png"
import vec2 from "../../assets/images/Vector1.png"

const VisionAndMission = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div id={"visionandmission"}
            ref={sectionRef}
            className="relative w-full min-h-screen bg-white py-12 md:py-16 lg:py-24 px-4 overflow-hidden"
        >
            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-6 md:mb-8">
                Vision & Mission
            </h2>

            {/* Subtitle */}
            <p className="text-sm md:text-base lg:text-lg text-gray-600 text-center max-w-xl mx-auto mb-12 md:mb-16 px-4">
                Unlock your true potential and discover a world of opportunities that align with your skills, interests, and aspirations
            </p>

            {/* Main Content Container */}
            <div className="relative max-w-7xl mx-auto flex items-center justify-center min-h-[600px] md:min-h-[700px] cards-container">

                {/* Concentric Circles with Wave Animation */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="absolute w-64 h-64 md:w-96 md:h-96 lg:w-[636px] lg:h-[636px] rounded-full border border-orange-500 bg-orange-500 bg-opacity-5 animate-[wave-pulse_4s_ease-in-out_infinite]"></div>
                    <div className="absolute w-52 h-52 md:w-80 md:h-80 lg:w-[532px] lg:h-[532px] rounded-full border border-orange-500 bg-orange-500 bg-opacity-5 animate-[wave-pulse_4s_ease-in-out_infinite_0.5s]"></div>
                    <div className="absolute w-40 h-40 md:w-64 md:h-64 lg:w-[408px] lg:h-[408px] rounded-full border border-orange-500 bg-orange-500 bg-opacity-10 animate-[wave-pulse_4s_ease-in-out_infinite_1s]"></div>
                    <div className="absolute w-28 h-28 md:w-48 md:h-48 lg:w-[286px] lg:h-[286px] rounded-full border border-orange-500 bg-orange-500 bg-opacity-30 animate-[wave-pulse_4s_ease-in-out_infinite_1.5s]"></div>
                </div>

                {/* Center Video Card - Bottom to Top Animation */}
                <div
                    className={`video-card relative z-10 w-48 h-80 md:w-56 md:h-96 lg:w-[349px] lg:h-[572px] bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
                    }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600 via-orange-500/50 to-transparent">
                        <video
                            src={vision}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>


                </div>

                {/* Vision Card - Left to Right Animation */}
                <div
                    className={`vision-card absolute left-0 md:left-8 lg:left-4 top-1/2 -translate-y-1/2 w-64 md:w-72 lg:w-[301px] bg-gray-100 rounded-2xl border border-gray-200 shadow-2xl p-6 transition-all duration-1000 ease-out delay-200 py-[3rem] ${
                        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                    }`}
                >
                    <div className="text-center">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Vision
                        </h3>
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-[14rem] mx-auto">
                            Transform sales into a globally respected profession through education, ethics, and excellence.
                        </p>
                    </div>

                    {/* Decorative Arrow */}
                    <div className="absolute -right-16 lg:right-[1rem]  xl:-right-16  -bottom-[6rem] lg:-bottom-[12rem]  xl:-bottom-[6rem] hidden lg:block">
                        <img src={vec2} alt="vec1"/>
                    </div>
                </div>

                {/* Mission Card - Right to Left Animation */}
                <div
                    className={`mission-card absolute right-0 md:right-8 lg:right-4 top-1/4 w-64 md:w-72 lg:w-[302px] bg-gray-100 rounded-2xl border border-gray-200 shadow-2xl p-6 transition-all duration-1000 ease-out delay-300 py-[3rem] ${
                        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
                >
                    <div className="text-center">
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Mission
                        </h3>
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                            Empower individuals with recognised qualifications, thought leadership, and networks to redefine modern sales.
                        </p>
                    </div>

                    {/* Decorative Arrow */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                        <div className="absolute  lg:-right-[10rem]   xl:-right-16  lg:-top-[17rem] xl:-top-[14rem]   hidden lg:block">
                            <img src={vec1} alt="vec1"/>
                        </div>
                    </div>
                </div>

            </div>
            {/* Animations and Responsive Styles */}
            <style jsx>{`
                @keyframes wave-pulse {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    25% {
                        transform: scale(1.05);
                        opacity: 0.9;
                    }
                    50% {
                        transform: scale(1.1);
                        opacity: 0.7;
                    }
                    75% {
                        transform: scale(1.05);
                        opacity: 0.9;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                /* Responsive Styles */
                @media (max-width: 1023px) {
                    .vision-card {
                        position: relative !important;
                        left: auto !important;
                        right: auto !important;
                        top: auto !important;
                        transform: none !important;
                        margin: 0 auto 2rem auto !important;
                        order: 1;
                    }

                    .video-card {
                        position: relative !important;
                        margin: 2rem auto !important;
                        order: 2;
                    }

                    .mission-card {
                        position: relative !important;
                        left: auto !important;
                        right: auto !important;
                        top: auto !important;
                        transform: none !important;
                        margin: 2rem auto 0 auto !important;
                        order: 3;
                    }

                    .cards-container {
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default VisionAndMission;