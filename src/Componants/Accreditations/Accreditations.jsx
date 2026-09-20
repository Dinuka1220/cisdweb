import React, { useEffect, useRef, useState } from 'react';
import logo1 from "../../assets/images/Alogo1.png"
import logo2 from "../../assets/images/Alogo2.png"
import videoimg from "../../assets/images/Avideoimg.png"

const Accreditations = () => {
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
        <div id={"accreditations"} ref={sectionRef} className="relative w-full  bg-gradient-to-r from-[#EBD0C9] to-[#FFF9F5] overflow-hidden py-[4rem] lg:py-[8rem] px-4 sm:px-6 lg:px-8">
            {/* Decorative Elements*/}
            <div className="absolute top-24 left-4 sm:left-8 w-10 h-10 bg-[#FFBA00] rounded-full opacity-70"></div>
            <div className="absolute top-32 right-8 sm:right-16 w-5 h-5 bg-[#417CD4] rounded-full opacity-70"></div>
            <div className="absolute top-60 left-1/3 w-5 h-5 bg-[#ED4883] rounded-full opacity-70"></div>
            <div className="absolute top-20 right-1/4 w-7 h-7 bg-[#FFBA00] rotate-45 opacity-50"></div>

            {/* Header Section*/}
            <div className="max-w-7xl mx-auto text-center mb-12 sm:mb-1">
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-[#060919] mb-4 sm:mb-6 font-['Space_Grotesk'] transition-all duration-1000 ease-out ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    Accreditations
                </h1>
                <p className={`text-base sm:text-lg text-[#414D60] max-w-2xl mx-auto font-medium transition-all duration-1000 ease-out delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    Quality is key at CISD.
                </p>
            </div>

            {/* Accreditation Cards*/}
            <div className="max-w-7xl mx-auto mb-16 sm:mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-12 items-start">
                    {/* ATHE Card - Slides from Left*/}
                    <div className={`flex flex-col items-center lg:items-center space-y-6 p-6 sm:p-8 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                    }`}>
                        <div className={`w-full max-w-md aspect-[547/249] relative transition-all duration-1000 ease-out delay-300 ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <img
                                src={logo1}
                                alt="ATHE UK Accreditation"
                                className="w-full h-full object-contain justify-center"
                            />
                        </div>

                        <h2 className={`text-3xl sm:text-4xl font-semibold text-[#0C0712] font-['Rubik'] transition-all duration-1000 ease-out delay-400 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}>
                            ATHE (UK)
                        </h2>
                        <p className={`text-xl text-center sm:text-2xl lg:text-3xl text-[#888888] leading-relaxed font-['Rubik'] transition-all duration-1000 ease-out delay-500 max-w-[44rem] ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}>
                            Accredited by ATHE (UK), ensuring international standards and progression to degrees like MBA/MSc.
                        </p>
                    </div>


                     {/*Vertical Divider - Hidden on mobile, visible on lg screens*/}
                    {/*<div className="hidden lg:block absolute left-1/2 top-1/3   -translate-x-1/2 px-6">
                        <div className="flex justify-center items-center w-full h-[20rem]">
                            <div
                                className={`h-full w-px border-l-2 border-dashed border-gray-300 transition-all duration-1000 ease-out delay-200 ${
                                    isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
                                }`}
                                style={{ transformOrigin: 'top' }}
                            />
                        </div>
                    </div>*/}

                     {/*CISP Card - Slides from Right*/}
                    {/*<div className={`flex flex-col items-center lg:items-center space-y-6 p-6 sm:p-8 transition-all duration-1000 ease-out ${
                        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                    }`}>
                        <div className={`w-48 h-48 sm:w-52 sm:h-52 relative transition-all duration-1000 ease-out delay-300 ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <img
                                src={logo2}
                                alt="CISP Sri Lanka Accreditation"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h2 className={`text-3xl sm:text-4xl font-semibold text-[#0C0712] text-center lg:text-right font-['Rubik'] transition-all duration-1000 ease-out delay-400 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}>
                            CISP (Sri Lanka)
                        </h2>
                        <p className={`text-xl  sm:text-2xl lg:text-3xl text-[#888888]  leading-relaxed text-center font-['Rubik'] transition-all duration-1000 ease-out delay-500 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                        }`}>
                            Endorsed by CISP (Sri Lanka), offering membership, training, and networks.
                        </p>
                    </div>*/}
                </div>
            </div>

            {/* Bottom Section - Slides from Bottom */}
            <div className="max-w-7xl mx-auto">
                <div className={`bg-[#112967] rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 ease-out delay-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
                }`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Text Content */}
                        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F2F2F2] mb-6 sm:mb-8 leading-tight font-['Space_Grotesk'] transition-all duration-1000 ease-out delay-800 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}>
                                Why Accreditation and Endorsement Matter
                            </h2>
                            <p className={`text-base sm:text-lg text-white leading-relaxed font-['Rubik'] transition-all duration-1000 ease-out delay-900 ${
                                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}>
                                These credentials provide global credibility for learners (accepted by employers and universities)
                                and trust for partners, blending international standards with local realities.
                            </p>
                        </div>

                        {/* Image */}
                        <div className={`relative h-64 sm:h-80 lg:h-auto min-h-[400px] transition-all duration-1000 ease-out delay-1000 ${
                            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center  overflow-hidden">
                                <img
                                    src={videoimg}
                                    alt="Accreditation importance visual"
                                    className="w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Decorative Elements at Bottom */}
            <div className={`absolute bottom-32 right-12 w-6 h-6 bg-[#ED4883] rotate-45 opacity-40 transition-all duration-1000 ease-out delay-1100 ${
                isVisible ? 'opacity-40 scale-100' : 'opacity-0 scale-75'
            }`}></div>
        </div>
    );
};

export default Accreditations;