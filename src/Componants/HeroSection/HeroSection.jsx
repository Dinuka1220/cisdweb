import React, { useState, useEffect } from 'react';
import grid from "../../assets/images/Grid.png"
import { ArrowRight, X, Upload } from 'lucide-react';
import girl from "../../assets/images/girlhero.png"
import shape1 from "../../assets/images/bluevec.png"
import shape2 from "../../assets/images/orangevec.png"
import shape3 from "../../assets/images/yellowvec.png"
import shape4 from "../../assets/images/redvec.png"
import heroshape from "../../assets/images/heroshape.png"
import modleimg from "../../assets/images/modleimg.jpg";

const HeroSection = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        programme: '',
        qualifications: '',
        cv: null,
        intake: '',
        comments: ''
    });

    // Set visible on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, cv: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email) {
                setSubmitStatus({ type: 'error', message: 'Please fill in all required fields (*)' });
                setIsSubmitting(false);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
                setIsSubmitting(false);
                return;
            }

            // Send email using direct EmailJS API
            await sendApplicationEmail(formData);

            setSubmitStatus({ type: 'success', message: 'Application submitted successfully! We will contact you soon.' });

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                programme: '',
                qualifications: '',
                cv: null,
                intake: '',
                comments: ''
            });

            // Close modal after success
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitStatus(null);
            }, 3000);

        } catch (error) {
            console.error('Submission error:', error);
            setSubmitStatus({
                type: 'error',
                message: 'Failed to submit application. Please try again or contact us directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const sendApplicationEmail = async (data) => {
        try {
            // EmailJS configuration
            const emailData = {
                service_id: 'service_8bdz476',
                template_id: 'template_x3k3lhk',
                user_id: 'k8EVG8njXbjQG6OQh', // Your public key
                template_params: {
                    to_email: 'hello.colomboinstitute@gmail.com',
                    to_name: 'Admissions Team',
                    from_name: `${data.firstName} ${data.lastName}`,
                    from_email: data.email,
                    subject: `New Student Application - ${data.firstName} ${data.lastName}`,
                    applicant_name: `${data.firstName} ${data.lastName}`,
                    applicant_email: data.email,
                    programme: data.programme || 'Not specified',
                    qualifications: data.qualifications || 'Not specified',
                    intake: data.intake || 'Not specified',
                    comments: data.comments || 'No additional comments',
                    submission_date: new Date().toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    cv_file: data.cv ? data.cv.name : 'No file uploaded',
                    cv_size: data.cv ? `${(data.cv.size / 1024 / 1024).toFixed(2)} MB` : 'N/A'
                }
            };

            console.log('Sending email via direct API...', emailData);

            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            // Get response as text first
            const responseText = await response.text();
            console.log('API Response text:', responseText);

            // Check if response is OK (status 200)
            if (!response.ok) {
                // Try to parse as JSON for error details
                let errorData;
                try {
                    errorData = JSON.parse(responseText);
                } catch {
                    errorData = { message: responseText };
                }
                throw new Error(`EmailJS API error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            // Check if response is JSON or plain text "OK"
            let responseData;
            if (responseText.trim() === 'OK') {
                // Success! Email sent successfully
                responseData = { status: 'success', message: 'Email sent successfully' };
            } else {
                // Try to parse as JSON
                try {
                    responseData = JSON.parse(responseText);
                    // eslint-disable-next-line no-unused-vars
                } catch (error) {
                    // If not JSON, return as is
                    responseData = { status: 'success', message: responseText };
                }
            }

            console.log('Email sent successfully via direct API');
            return responseData;

        } catch (error) {
            console.error('Direct API email sending failed:', error);
            // Provide more specific error messages
            if (error.message.includes('service_id')) {
                throw new Error('Email service configuration error. Please check your service ID.');
            } else if (error.message.includes('user_id')) {
                throw new Error('Email authentication error. Please check your API key.');
            } else if (error.message.includes('template_id')) {
                throw new Error('Email template error. Please check your template ID.');
            }
            throw error;
        }
    };

    // Test function to verify EmailJS credentials
    const testEmailJSCredentials = async () => {
        try {
            const testData = {
                service_id: 'service_5uv985h',
                template_id: 'template_tmpv8w4',
                user_id: '2_YRdpKvAHlOwXSkW',
                template_params: {
                    test: 'true',
                    message: 'Testing EmailJS configuration',
                    timestamp: new Date().toISOString()
                }
            };

            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testData)
            });

            const result = await response.json();
            console.log('Test Result:', result);
            return result;
        } catch (error) {
            console.error('Test failed:', error);
            return null;
        }
    };


    return (
        <div id="home" className="relative min-h-fit  lg:min-h-screen  max-h-screen bg-[#112967] overflow-hidden">
            {/* Google Fonts - Space Grotesk */}
            <link
                href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
                rel="stylesheet"
            />

            {/* Grid Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0">
                    <img src={grid} alt="logo" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Gradient Blurs - Background Effects */}
            <div className="absolute top-24 left-4 w-96 h-96 md:w-[577px] md:h-[400px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute top-[10rem] left-[20rem] w-80 h-80 md:w-[467px] md:h-[150px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute top-48 right-[40rem] hidden lg:block w-[380px] h-[80px] bg-orange-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Main Content Container */}
            <div className="relative container mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-12 lg:pt-[7rem] pb-8 md:pb-16 lg:pb-40 max-w-[90%]  lg:max-w-[95%] xl:max-w-[90%] ">
                <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh] ">

                    {/* Girl Image - Top on Mobile/Tablet, Right on Desktop */}
                    <div
                        className="order-1 lg:order-2 w-full lg:w-1/2 flex justify-center z-20 mb-6 md:mb-8 lg:mb-0 animate-slide-in-right mt-16 lg:mt-0 xl:mt-1"
                    >
                        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                            <div
                                className="relative z-10"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out pointer-events-none">
                                    <img
                                        src={heroshape}
                                        alt="shape"
                                        className={`
                        w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[20.5rem] xl:h-[21rem] xl:mr-10
                        object-cover transition-all duration-700 ease-out 
                        ${isHovered
                                            ? 'scale-110 lg:scale-[1.4] opacity-100'
                                            : 'scale-100 opacity-90'
                                        }
                        animate-pulse-scale
                    `}
                                        style={{ animationDelay: '1.5s' }}
                                    />
                                </div>

                                 {/*Person Image*/}
                                <div className="relative z-20 flex items-center justify-center py-4 sm:py-6 md:py-8 lg:py-0">
                                    <img
                                        src={girl}
                                        alt="Professional woman with laptop"
                                        className="w-55 h-60 sm:w-56 sm:h-72 md:w-72 md:h-80 lg:w-full lg:h-[480px] xl:h-[580px]  3xl:h-[680px]  object-cover rounded-t-full transition-transform duration-700 ease-out"
                                        style={{
                                            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-2 lg:order-1 w-full lg:w-[70%] space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-9 z-10 text-center lg:text-left animate-slide-in-left">
                        {/* Main Heading */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[65px] 3xl:text-[6rem] font-bold leading-tight xl:leading-[80px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                            <span className="text-white">Redefining the </span>
                            <span className="text-[#f44a1e]">Future</span>
                            <br />
                            <span className="text-white">of Sales Education in </span>
                            <span className="text-[#f44a1e]">Sri Lanka</span>
                        </h1>

                        {/* Decorative Line */}
                        <div className="w-20 md:w-72 h-1 bg-gradient-to-r from-[#ffc947] to-[#ffc947]/50 mx-auto lg:mx-0"></div>

                        {/* Description */}
                        <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-[15px] xl:text-[22px] leading-relaxed xl:leading-[44px] px-2 sm:px-0">
                            Empower your career with globally recognised qualifications, expert mentorship, and pathways to Chartered membership.
                        </p>

                        {/* CTA Button - Fixed Version */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group relative bg-gradient-to-br from-[#ff9b00] via-[#ed1c24] to-[#ed1c24] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-xl lg:text-xl font-medium hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
                            {/* Gradient overlay on hover */}
                            <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>

                            {/* Button content */}
                            <span className="relative z-10 flex items-center justify-center gap-3">
            Get Started
        </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style jsx>{`
                @keyframes slide-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slide-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes pulse-scale {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.9;
                    }
                    50% {
                        transform: scale(1.05);
                        opacity: 1;
                    }
                }

                .animate-slide-in-left {
                    animation: slide-in-left 0.8s ease-out forwards;
                }

                .animate-slide-in-right {
                    animation: slide-in-right 0.8s ease-out forwards;
                    animation-delay: 0.2s;
                    opacity: 0;
                }

                .animate-pulse-scale {
                    animation: pulse-scale 3s ease-in-out infinite;
                }
            `}</style>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
                    <div
                        className={`transform transition-all duration-700 ease-out w-full max-w-7xl ${
                            isModalOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'
                        }`}
                    >
                        <div className="backdrop-blur-xl bg-gray-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-h-[90vh]">

                            {/* Left Side - Image Section */}
                            <div className="lg:w-2/5 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${modleimg})`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-600/30" />
                                </div>

                                <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10 min-h-[300px] lg:min-h-full">
                                    <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20">
                                        <h3 className="text-white font-bold text-2xl sm:text-3xl mb-3">
                                            Start Your Journey
                                        </h3>
                                        <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                                            Join thousands of students who have transformed their careers through our programs. Fill out the form to begin your application.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form Section */}
                            <div className="lg:w-3/5 flex flex-col max-h-[90vh] lg:max-h-full">
                                <div className="sticky top-0 backdrop-blur-xl bg-gray-900/95 border-b border-white/10 p-4 sm:p-6 flex items-center justify-between z-10 flex-shrink-0">
                                    <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">Application Form</h2>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg backdrop-blur-sm"
                                        disabled={isSubmitting}
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
                                    {/* Status Message */}
                                    {submitStatus && (
                                        <div className={`mb-6 p-4 rounded-lg text-center ${
                                            submitStatus.type === 'success'
                                                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                                : 'bg-red-500/20 text-red-300 border border-red-500/30'
                                        }`}>
                                            {submitStatus.message}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                        {/* Form fields */}
                                        <div>
                                            <label className="block text-gray-300 text-sm sm:text-base mb-2">
                                                First name*
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full backdrop-blur-sm bg-white/5 border border-white/20 text-gray-200 px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all text-sm sm:text-base"
                                                placeholder="Enter first name"
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 text-sm sm:text-base mb-2">
                                                Last name*
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full backdrop-blur-sm bg-white/5 border border-white/20 text-gray-200 px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all text-sm sm:text-base"
                                                placeholder="Enter last name"
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 text-sm sm:text-base mb-2">
                                                Email address*
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full backdrop-blur-sm bg-white/5 border border-white/20 text-gray-200 px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all text-sm sm:text-base"
                                                placeholder="Enter email"
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 text-sm sm:text-base mb-2">
                                                Programme
                                            </label>
                                            <select
                                                name="programme"
                                                value={formData.programme}
                                                onChange={handleInputChange}
                                                className="w-full backdrop-blur-sm bg-white/5 border border-white/20 text-gray-200 px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all text-sm sm:text-base"
                                                disabled={isSubmitting}
                                            >
                                                <option value="" className="bg-gray-800">Select programme</option>
                                                <option value="Level 3 Diploma in Sales & Channel Management" className="bg-gray-800">Level 3 Diploma in Sales & Channel Management</option>
                                                <option value="Level 7 Extended Diploma in Sales & Distribution" className="bg-gray-800">Level 7 Extended Diploma in Sales & Distribution</option>
                                                <option value="Diploma in English for Sales" className="bg-gray-800">Diploma in English for Sales</option>
                                                <option value="Masterclasses & Short Courses" className="bg-gray-800">Masterclasses & Short Courses</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 text-sm sm:text-base mb-2">
                                                Qualifications
                                            </label>
                                            <input
                                                type="text"
                                                name="qualifications"
                                                value={formData.qualifications}
                                                onChange={handleInputChange}
                                                className="w-full backdrop-blur-sm bg-white/5 border border-white/20 text-gray-200 px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all text-sm sm:text-base"
                                                placeholder="Enter qualifications"
                                                disabled={isSubmitting}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 text-sm sm:text-base mb-2">
                                                CV
                                            </label>
                                            <label className={`flex items-center justify-center w-full backdrop-blur-sm bg-white/5 border border-white/20 text-gray-400 px-4 py-3 sm:py-4 rounded-lg cursor-pointer transition-all text-sm sm:text-base ${
                                                !isSubmitting ? 'hover:border-orange-500 hover:bg-white/10' : 'opacity-50'
                                            }`}>
                                                <Upload className="w-5 h-5 mr-2" />
                                                <span className="truncate">{formData.cv ? formData.cv.name : 'Upload CV'}</span>
                                                <input
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                    accept=".pdf,.doc,.docx"
                                                    disabled={isSubmitting}
                                                />
                                            </label>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-gray-300 text-sm sm:text-base mb-2">
                                                Intake
                                            </label>
                                            <select
                                                name="intake"
                                                value={formData.intake}
                                                onChange={handleInputChange}
                                                className="w-full backdrop-blur-sm bg-white/5 border border-white/20 text-gray-200 px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all text-sm sm:text-base"
                                                disabled={isSubmitting}
                                            >
                                                <option value="" className="bg-gray-800">Select intake</option>
                                                <option value="january" className="bg-gray-800">January</option>
                                                <option value="may" className="bg-gray-800">May</option>
                                                <option value="september" className="bg-gray-800">September</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="block text-gray-300 font-bold text-sm sm:text-base mb-2">
                                                Comments
                                            </label>
                                            <textarea
                                                name="comments"
                                                value={formData.comments}
                                                onChange={handleInputChange}
                                                rows="4"
                                                className="w-full backdrop-blur-sm bg-white/5 border border-white/20 text-gray-200 px-4 py-3 sm:py-4 rounded-lg focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all resize-none text-sm sm:text-base"
                                                placeholder="Additional comments..."
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 lg:mt-8">
                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className={`group bg-gradient-radial from-orange-400 via-orange-500 to-red-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg lg:text-xl flex items-center gap-3 transform transition-all duration-300 shadow-xl mx-auto ${
                                                isSubmitting
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:scale-105 hover:shadow-orange-500/50'
                                            }`}
                                        >
                                            {isSubmitting ? (
                                                <span>Submitting...</span>
                                            ) : (
                                                <>
                                                    <span>Submit Application</span>
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default HeroSection;