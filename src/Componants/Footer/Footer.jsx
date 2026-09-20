import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logo2 from "../../assets/images/footerlogo2.png"
import logo from "../../assets/images/footerlogo.png"
import postimg from "../../assets/images/postimg.png"
import xpress from "../../assets/images/expressjobs.png"
import whatsapp from "../../assets/images/whatsapp.png"
import myfess from "../../assets/images/myfees.png"

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [show, setShow] = useState(false);



    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setMessage('Please enter your email address');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Please enter a valid email address');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const now = new Date();
            const emailData = {
                service_id: 'service_ysz10mv',
                template_id: 'template_66ewwts',
                user_id: 'k8EVG8njXbjQG6OQh',
                template_params: {
                    email: email,
                    source: 'CISD Website Newsletter',
                    date: now.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }),
                    time: now.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    }),
                    year: now.getFullYear()
                }
            };

            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });

            const responseText = await response.text();

            if (response.ok) {
                setMessage('Thank you for subscribing to our newsletter!');
                setEmail('');
                setTimeout(() => setMessage(''), 5000);
            } else {
                throw new Error(`Failed with status ${response.status}: ${responseText}`);
            }
        } catch (error) {
            console.error('Newsletter subscription error:', error);
            setMessage('Failed to subscribe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            id="footer"
            ref={footerRef}
            className="absolute w-full overflow-hidden bg-gray-50 z-[9999]"
            //className="absolute w-full overflow-hidden bg-gray-50 z-[9999] select-none"
            /*style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none', msUserSelect: 'none' }}*/
        >
            {/* Newsletter Section */}
            <div className="relative w-full px-4 md:px-8 py-5 md:py-8 lg:px-20 lg:py-10 z-40 max-h-[10rem] lg:max-h-[15rem] object-fit">
                <div
                    className={`relative bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl transition-all w-[95%] md:w-[80%] lg:w-[70%] mx-auto duration-1000 min-h-[16rem] sm:min-h-[15rem] max-h-[15rem] top-[0rem] lg:top-[3rem] xl:top-[3rem] ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                    }`}
                    style={{ transitionDelay: '100ms' }}
                >
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 md:p-12 lg:p-8">
                        {/* Left Image */}
                        <div className="hidden lg:block lg:w-1/3 relative">
                            <img
                                src={postimg}
                                alt="postimg"
                                className="h-[18rem] absolute -bottom-[7rem] right-0 z-40"
                            />
                        </div>

                        {/* Newsletter Content */}
                        <div className="flex-1 text-center lg:text-left object-fit">
                            <div className="max-w-sm">
                                <h2 className="text-white text-lg max-w-[18rem] sm:max-w-[160rem] md:text-2xl lg:text-xl font-semibold mb-6 leading-tight">
                                    Subscribe to our newsletter for the latest updates and insights.
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="bg-orange-400 bg-opacity-50 backdrop-blur-sm rounded-full border border-white border-opacity-20 p-1 flex flex-col sm:flex-row items-center max-w-[70vw] sm:max-w-[100vw]">
                                        <div className="flex items-center gap-2 flex-1 px-4 w-full sm:w-auto">
                                            <svg className="w-5 h-5 text-white ml-8 sm:ml-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="bg-transparent text-white placeholder-white placeholder-opacity-80 outline-none flex-1 text-sm w-full"
                                                disabled={loading}
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-all mt-2 mb-1 sm:mt-0 sm:mb-0 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
                                        >
                                            {loading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : 'Subscribe'}
                                        </button>
                                    </div>

                                    {message && (
                                        <div className={`text-sm ${message.includes('Thank you') ? 'text-green-300' : 'text-red-300'} transition-all duration-300`}>
                                            {message}
                                        </div>
                                    )}

                                    <p className="text-white text-[10px] opacity-90">
                                        Stay ahead with the latest updates, insights, and events from Colombo Institute of Sales & Distribution.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Section */}
            <div className="relative bg-blue-900 text-white z-0 h-[90rem] md:h-auto object-fit">
                <div className="pt-32 pb-12 px-4 md:px-8 lg:px-20 w-[95%] md:w-[80%] lg:w-[95%] xl:w-[85%] mx-auto">
                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 transition-all duration-1000 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                        }`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        {/* Logo and Address Section */}
                        <div className="space-y-7">
                            <div className="w-52 h-auto flex items-center justify-center mt-10 md:mt-5 lg:mt-0">
                                <img src={logo} alt="logo"/>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm leading-relaxed opacity-90 text-justify max-w-[20rem]">
                                    CISD, Sri Lanka's first institution for professional sales education, believes sales drives economies and enterprise..
                                </p>
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-5">
                                <a
                                    href="https://www.facebook.com/profile.php?id=61581838874616"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </div>
                                </a>

                                <a
                                    href="https://www.linkedin.com/company/colomboinstitute/posts/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.368-1.85 3.6 0 4.267 2.368 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0z"/>
                                        </svg>
                                    </div>
                                </a>

                                <a
                                    href="https://www.instagram.com/colomboinstitute"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.344 3.608 1.319.975.975 1.257 2.242 1.319 3.608.058 1.266.069 1.646.069 4.84s-.012 3.574-.07 4.84c-.062 1.366-.344 2.633-1.319 3.608-.975.975-2.242 1.257-3.608 1.319-1.266.058-1.646.069-4.84.069s-3.574-.012-4.84-.07c-1.366-.062-2.633-.344-3.608-1.319-.975-.975-1.257-2.242-1.319-3.608-.058-1.266-.069-1.646-.069-4.84s.012-3.574.07-4.84c.062-1.366.344-2.633 1.319-3.608.975-.975 2.242-1.257 3.608-1.319 1.266-.058 1.646-.069 4.84-.069zm0 3.675a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Contact Us Section */}
                        <div
                            className={`space-y-6 transition-all duration-1000 ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                            } z-50`} // or z-0, z-20 depending on layer

                        >
                            {/* Contact Title */}
                            <h3 className="text-white text-xl font-bold">Contact Us</h3>

                            {/* Email */}
                            <div>
                                <a
                                    href="mailto:info@colomboinstitute.com"
                                    className="block hover:opacity-80 transition-opacity cursor-pointer"
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-start gap-4">
                                            <Mail className="w-5 h-5 text-white mt-1" />
                                            <p className="text-sm font-semibold text-white">Email Us</p>
                                        </div>
                                        <p className="text-[14px] text-white/80 mt-1 hover:text-white transition-colors">
                                            info@colomboinstitute.com
                                        </p>
                                    </div>
                                </a>
                            </div>

                            {/* Call */}
                            <div>
                                <a
                                    href="tel:+94722300030"
                                    className="block hover:opacity-80 transition-opacity cursor-pointer"
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-start gap-4">
                                            <Phone className="w-5 h-5 text-white mt-1" />
                                            <p className="text-sm font-semibold text-white">Call Us</p>
                                        </div>
                                        <p className="text-[14px] text-white/80 mt-1 hover:text-white transition-colors">
                                            0722 3000 30
                                        </p>
                                    </div>
                                </a>
                            </div>

                            {/* Visit */}
                            <div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-white mt-1" />
                                    <p className="text-sm font-semibold text-white">Visit Us</p>
                                </div>
                                <div>
                                    <p className="text-[14px] text-white/80 leading-relaxed mt-1">
                                        54/1 Ananda Coomrswamy Mawatha, Colombo 03
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Xpress Logo Section */}
                        {/*<div className="relative z-50">
                            <div className="max-w-sm rounded-xl text-white mb-8">
                                <h3 className="text-xl font-bold mb-4">Opening Hours</h3>

                                <div className="space-y-3 text-sm text-blue-100">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8">
                                            <Clock size={20} />
                                        </span>
                                        <p>Monday–Friday : 8.30 am – 5.30 pm</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8">
                                            <Clock size={20} />
                                        </span>
                                        <p>Saturday–Sunday : 9.00 am – 5.00 pm</p>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="/xpress-widget"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                className="block relative cursor-pointer group"
                            >
                                <img
                                    className={`w-[16rem] -mt-[0px] transition-all duration-300 ${
                                        hovered ? 'scale-110 brightness-110' : 'scale-100'
                                    }`}
                                    src={xpress}
                                    alt="express"
                                />
                            </a>
                        </div>*/}
                        <div className="space-y-2">
                            {/* Opening Hours and Make a Payment - Side by Side */}
                            <div className="flex flex-col md:flex-row gap-4 ">
                                {/* Opening Hours - Left Side */}
                                <div className="flex-1  md:pb-6 md:px-6 rounded-xl ">
                                    <h3 className="text-xl font-bold mb-4 text-white">Opening Hours</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-3 text-blue-100">
                    <span className="flex items-center justify-center w-8 h-8">
                        <Clock size={20} />
                    </span>
                                            <p>Monday–Friday : 8.30 am – 5.30 pm</p>
                                        </div>
                                        <div className="flex items-center gap-3 text-blue-100">
                    <span className="flex items-center justify-center w-8 h-8">
                        <Clock size={20} />
                    </span>
                                            <p>Saturday–Sunday : 9.00 am – 5.00 pm</p>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* Xpress Logo */}
                            <a
                                href="/xpress-widget"
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}
                                className="block relative cursor-pointer group"
                            >
                                <img
                                    className={`w-[16rem] transition-all duration-300 ${
                                        hovered ? 'scale-110 brightness-110' : 'scale-100'
                                    }`}
                                    src={xpress}
                                    alt="express"
                                />
                            </a>
                        </div>


                        {/* Make a Payment - Right Side */}
                        <div className="flex-1 bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl p-6 max-h-[20rem] max-xl:-[14rem]">
                            <h3 className="text-white text-xl font-bold mb-4">Make a Payment</h3>
                            <p className="text-gray-200 mb-6 text-sm">
                                Pay your fees securely through our payment gateway.
                            </p>

                            <a
                                href="https://myfees.lk/"
                                target="_blank"
                                className="w-full bg-green-600 hover:bg-green-700 xl:whitespace-nowrap text-white font-bold py-3 px-3 rounded-lg transition-colors flex items-center justify-center"
                                /*onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = '/payment';
                                }}*/
                            >
                                Proceed to Payment
                            </a>

                            {/* Alternative responsive fix */}
                            <div className="w-full h-auto flex items-center justify-center mt-4">
                                <img src={myfess} alt="logo2" className="opacity-1 h-auto w-[46rem] "/>
                            </div>
                        </div>

                        {/* Large Logo Section */}
                        <div className="hidden lg:block">
                            <div
                                className={`w-full h-86 flex items-start justify-center transition-all duration-1000 absolute -top-[10rem] -right-[16rem] z-50 pointer-events-none ${
                                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                                }`}
                                style={{ transitionDelay: '700ms' }}
                            >
                                <img src={logo2} alt="logo2" className="opacity-30 h-auto w-[46rem] pointer-events-none"/>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Button */}
                    <div
                        className={`
                            fixed right-4 z-[9999]
                            transition-all duration-500 ease-in-out
                            ${show ? "bottom-16 opacity-100 translate-y-0" : "bottom-10 opacity-0 translate-y-6 pointer-events-none"}
                        `}
                    >
                        <a
                            href="https://wa.me/94722300030"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-8 py-2.5 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-all duration-300"
                        >
                            <img className="w-5 h-5" src={whatsapp} alt="whatsapp" />
                            <span className="text-sm font-semibold min-w-[5rem]">
                                Message Us
                            </span>
                        </a>
                    </div>

                    {/* Copyright Section */}
                    <div
                        className={`absolute bottom-0 left-0 right-0 w-full bg-black border-t border-white border-opacity-20 pt-8 pb-8 text-center transition-all duration-1000 ${
                            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                        }`}
                        style={{transitionDelay: '900ms'}}
                    >
                        <p className="text-sm opacity-75">
                            ©️ 2026 Colombo Institute of Sales & Distribution. All rights reserved.
                            Designed by{" "}
                            <a
                                href="https://www.codingcad.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                CODINGCAD
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;