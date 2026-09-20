import React from 'react';
import logo1 from "../../assets/images/sliderl1.png"
import logo2 from "../../assets/images/sliderl2.png"
import logo3 from "../../assets/images/sliderl3.png"

const LogoSlider = () => {
    const logos = [
        { id: 1, src: logo1, alt: 'Logo 1' },
        { id: 2, src: logo2, alt: 'Logo 2' },
        { id: 3, src: logo3, alt: 'Logo 3' },
        { id: 4, src: logo1, alt: 'Logo 4' },
        { id: 5, src: logo2, alt: 'Logo 5' },
        { id: 6, src: logo3, alt: 'Logo 6' },
    ];

    // Duplicate logos for seamless loop
    const duplicatedLogos = [...logos, ...logos];

    return (
        <div className="relative w-full overflow-hidden py-8 py-12 " style={{ backgroundColor: '#112967' }}>
           {/*  Animated Border
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-border-slide bg-[length:200%_100%]" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 animate-border-slide bg-[length:200%_100%]" />
            </div>*/}

            {/* Slider Container */}
            <div className="relative flex animate-scroll">
                {duplicatedLogos.map((logo, index) => (
                    <div
                        key={`${logo.id}-${index}`}
                        className="flex-shrink-0 mx-8  transition-all duration-300"
                    >
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className="h-6 md:h-8 lg:h-12 w-auto object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Gradient Overlays for smooth fade */}
            <div className="absolute top-0 left-0 w-32 h-full pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #112967, transparent)' }} />
            <div className="absolute top-0 right-0 w-32 h-full pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #112967, transparent)' }} />

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes borderSlide {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .animate-scroll {
                    animation: scroll 30s linear infinite;
                }

                .animate-border-slide {
                    animation: borderSlide 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default LogoSlider;