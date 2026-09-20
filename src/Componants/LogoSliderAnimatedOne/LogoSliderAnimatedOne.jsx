import React from 'react';
import logo1 from "../../assets/images/sliderl1.png";
import logo2 from "../../assets/images/sliderl2.png";
import logo3 from "../../assets/images/sliderl3.png";

const LogoSliderAnimatedOne = () => {
    // Placeholder logos - replace with your actual imports
    const logos = [
        { id: 1, src: logo1, alt: 'Logo 1' },
        { id: 2, src: logo2, alt: 'Logo 2' },
        { id: 3, src: logo3, alt: 'Logo 3' },
        { id: 4, src: logo1, alt: 'Logo 4' },
        { id: 5, src: logo2, alt: 'Logo 5' },
        { id: 6, src: logo3, alt: 'Logo 6' },
    ];


    // Double the logos for seamless loop
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos];

    return (
        <div className="bg-white">
            <div className="w-full space-y-6 py-8">
                {/* Slider One - Gradient Background */}
                <div className="relative w-full overflow-hidden py-6">
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-gradient bg-[length:200%_100%]" />

                    {/* Slider Container */}
                    <div className="relative">
                        <div className="flex animate-scroll-seamless">
                            {duplicatedLogos.map((logo, index) => (
                                <div
                                    key={`slider1-${index}`}
                                    className="flex-shrink-0 px-4 sm:px-6 md:px-8 lg:px-10 grayscale hover:grayscale-0 transition-all duration-300"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="h-8 sm:h-8 md:h-12 lg:h-14 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gradient Fade Overlays */}
                    <div className="absolute top-0 left-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-r from-red-600 to-transparent pointer-events-none z-10" />
                    <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-full bg-gradient-to-l from-red-600 to-transparent pointer-events-none z-10" />
                </div>

                {/* Slider Two - Blue Background with Animated Borders */}
                <div className="relative w-full overflow-hidden py-6" style={{ backgroundColor: '#112967' }}>
                    {/* Animated Border Lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-border-slide bg-[length:200%_100%]" />
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-border-slide bg-[length:200%_100%]" />
                    </div>

                    {/* Slider Container */}
                    <div className="relative">
                        <div className="flex animate-scroll-seamless">
                            {duplicatedLogos.map((logo, index) => (
                                <div
                                    key={`slider2-${index}`}
                                    className="flex-shrink-0 px-4 sm:px-6 md:px-8 lg:px-10 grayscale hover:grayscale-0 transition-all duration-300"
                                >
                                    <img
                                        src={logo.src}
                                        alt={logo.alt}
                                        className="h-8 sm:h-8 md:h-12 lg:h-14 w-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gradient Fade Overlays */}
                    <div className="absolute top-0 left-0 w-16 sm:w-24 md:w-32 h-full pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #112967, transparent)' }} />
                    <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-full pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #112967, transparent)' }} />
                </div>

                <style jsx>{`
                    @keyframes scroll-seamless {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }

                    @keyframes gradient {
                        0%, 100% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                    }

                    @keyframes border-slide {
                        0%, 100% {
                            background-position: 0% 50%;
                        }
                        50% {
                            background-position: 100% 50%;
                        }
                    }

                    .animate-scroll-seamless {
                        animation: scroll-seamless 30s linear infinite;
                        display: flex;
                        will-change: transform;
                    }

                    .animate-gradient {
                        animation: gradient 8s ease infinite;
                    }

                    .animate-border-slide {
                        animation: border-slide 3s ease-in-out infinite;
                    }

                    /* Pause animation on hover */
                    .animate-scroll-seamless:hover {
                        animation-play-state: paused;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default LogoSliderAnimatedOne;