import React, { useEffect, useRef, useState } from 'react';
import bg from "../../assets/images/ourvaluebg.png"
import bgvideo from "../../assets/video/bg.mp4"
const CoreValue = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
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
        <div ref={sectionRef} className="relative w-full h-screen overflow-hidden  max-h-fit lg:h-[45.8rem] 3xl:h-[55.8rem]   ">
            {/* Full Screen Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed top-0 left-0 w-screen h-screen w-full   -z-10 pr-[12rem]"
            >
                <source
                    src={bgvideo}
                    type="video/mp4"
                />

            </video>

            {/* Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-black/50">
                <img src={bg} alt=""/>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full h-[45rem] md:[36rem] lg:h-screen object-fit flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-20 -mt-14 bg-[#112967] xl:bg-transparent">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Title - Updated to align left */}
                    <div
                        className={`text-left mb-[6rem] lg:mb-20  transition-all duration-1000 ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                        }`}
                    >
                        <h2 className="absolute text-3xl sm:text-5xl md:text-4xl lg:text-[2.5rem] font-bold text-white uppercase tracking-wider  xl:mt-[5rem]  text-center md:ml-[10rem] lg:ml-[17rem] xl:ml-[7rem]">
                            Our Core Values
                        </h2>
                    </div>

                    {/* SMART Values Grid */}
                    <div className="flex justify-center xl:justify-end ">
                        <div className="flex flex-col justify-center space-y-6 lg:space-y-8 max-w-lg mt-10 lg:mt-0">
                            {/* S */}
                            <div key="desc-S" className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'}`} style={{ transitionDelay: `0ms` }}>
                                <div className="flex">
                                    <h3 className="text-xl lg:text-3xl font-bold text-white mb-2 mr-3 ml-1">S</h3>
                                    <h1 className={"text-white mt-1 ml-2 mr-3 font-bold text-xl"}>-</h1>
                                    <p className=" lg:text-xl text-gray-100 leading-relaxed">Strategic: Train professionals to think critically and drive growth.</p>
                                </div>
                            </div>

                            {/* M */}
                            <div key="desc-M" className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'}`} style={{ transitionDelay: `150ms` }}>
                                <div className="flex">
                                    <h3 className="text-xl lg:text-3xl font-bold text-white mb-2 mr-3">M</h3>
                                    <h1 className={"text-white mt-1 ml-2 mr-3 font-bold text-xl"}>-</h1>
                                    <p className=" lg:text-xl text-gray-100 leading-relaxed">Modern: Integrate technology and innovation for future-ready skills.</p>
                                </div>
                            </div>

                            {/* A */}
                            <div key="desc-A" className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'}`} style={{ transitionDelay: `300ms` }}>
                                <div className="flex">
                                    <h3 className="text-xl lg:text-3xl font-bold text-white mb-2 mr-3">A</h3>
                                    <h1 className={"text-white mt-1 ml-2 mr-3 font-bold text-xl"}>-</h1>
                                    <p className=" lg:text-xl text-gray-100 leading-relaxed">Accountable: Guide actions with integrity and transparency.</p>
                                </div>
                            </div>

                            {/* R */}
                            <div key="desc-R" className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'}`} style={{ transitionDelay: `450ms` }}>
                                <div className="flex">
                                    <h3 className="text-xl lg:text-3xl font-bold text-white mb-2 mr-3">R</h3>
                                    <h1 className={"text-white mt-1 ml-2 mr-3 font-bold text-xl"}>-</h1>
                                    <p className=" lg:text-xl text-gray-100 leading-relaxed">Respectful: Foster diversity and professional respect.</p>
                                </div>
                            </div>

                            {/* T */}
                            <div key="desc-T" className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-32'}`} style={{ transitionDelay: `600ms` }}>
                                <div className="flex">
                                    <h3 className="text-xl lg:text-3xl xl:text-3xl font-bold text-white mb-2 mr-3">T</h3>
                                    <h1 className={"text-white mt-1 ml-2 mr-3 font-bold text-xl"}>-</h1>
                                    <p className=" lg:text-xl text-gray-100 leading-relaxed">Transformative: Measure success by transforming careers and businesses.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreValue;