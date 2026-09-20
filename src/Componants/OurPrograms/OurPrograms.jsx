import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft,Upload,X,ArrowRight } from 'lucide-react';
import icon1 from "../../assets/images/icon1.png"
import icon2 from "../../assets/images/icon2.png"
import icon3 from "../../assets/images/icon3.png"
import icon4 from "../../assets/images/icon4.png"
import modleimg from "../../assets/images/modleimg.jpg";

export default function ProgramCards() {
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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


    useEffect(() => {
        setIsVisible(true);
    }, []);



    return (
        <div className="relative bg-[#112967]  py-12 md:pt-15  md:pb-0 lg:pt-20  lg:pb-[3.5rem] 3xl:pb-[3rem]  px-4 overflow-hidden  object-fit">
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
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-left {
          animation: slideInLeft 1s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideInUp 0.8s ease-out forwards;
        }

        .gradient-border {
          background: linear-gradient(135deg, #f2911f 0%, #ed1c24 31.25%, #ff9b00 100%);
        }

        .card-backdrop {
          backdrop-filter: blur(6.35px);
          background: rgba(255, 255, 255, 0.1);
        }

        .divider-left {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 100%);
        }

        .divider-right {
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
        }
      `}</style>



            {/* Header Section */}
                <div id={"programs"} className="max-w-7xl mx-auto mb-8 md:mb-16">
                    <h1
                        className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#f2f2f2] mb-6 md:mb-8 text-center ${
                            isVisible ? 'animate-slide-left' : 'opacity-0'
                        }`}
                        style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            animationDelay: '0.2s'
                        }}
                    >
                        Our  Programmes
                    </h1>
                   {/* <p
                        className={`text-base md:text-lg text-[#f2f2f7] text-center max-w-4xl mx-auto ${
                            isVisible ? 'animate-slide-left' : 'opacity-0'
                        }`}
                        style={{ animationDelay: '0.4s' }}
                    >
                        Progress through professional membership levels as your career advances
                    </p>*/}
                </div>
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-6 mb-12 md:max-w-[85%] mx-auto">

                    {/* Card 1 */}
                    <div
                        className={` card-backdrop card- rounded-2xl p-3 md:p-5 relative overflow-hidden   ${
                            isVisible ? 'animate-slide-up' : 'opacity-0'
                        }`}
                        style={{ animationDelay: '0.6s' }}
                    >
                        {/* Icon */}
                        <div className="w-20 h-20 md:w-22 md:h-22 bg-[#f2f4f7] rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center">
                            <img className="w-10 h-10  flex items-center justify-center"
                                src={icon1} alt=""
                            >

                            </img>
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-md md:text-lg lg:text-xl font-semibold text-center mb-4 md:mb-6 min-h-[60px] md:min-h-[70px] flex items-center justify-center px-2">
                            Level 3 Diploma in Professional Sales, Customer Experience & AI Applications
                        </h3>

                        {/* Description */}
                        <p className="text-[#f0f4f5] text-sm md:text-base text-center mb-6 md:mb-8 min-h-[50px] flex items-center justify-center">
                            Focus: Sales skills, digital tools, progression to degrees/roles
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="relative w-full max-w-[220px] h-13 mx-auto block rounded-full overflow-hidden group">
                            {/* Border wrapper */}
                            <div className="absolute inset-0 gradient-border p-[2px] rounded-full transition-all duration-300 group-hover:p-0">
                                <div className="w-full h-full bg-[#112967] rounded-full transition-all duration-300 group-hover:bg-transparent" />
                            </div>

                            {/* Content */}
                            <div

                                className="relative flex items-center justify-center gap-3 py-3 px-6">
                                <span className="text-white font-semibold text-base">Apply</span>

                                {/* Arrow circle */}
                                <div className="w-9 h-9 bg-[#f44a1e] rounded-full flex items-center justify-center
                        transition-all duration-300
                        group-hover:bg-white group-hover:scale-110">
                                    <ChevronRight className="w-4 h-4 text-white transition-all duration-300 group-hover:text-[#f44a1e]" />
                                </div>
                            </div>
                        </button>


                    </div>

                    {/* Card 2 */}
                    <div
                        className={`card-backdrop rounded-2xl p-3 md:p-5 relative overflow-hidden ${
                            isVisible ? 'animate-slide-up' : 'opacity-0'
                        }`}
                        style={{ animationDelay: '0.75s' }}
                    >
                        {/* Icon */}
                        <div className="w-20 h-20 md:w-22 md:h-22 bg-[#f2f4f7] rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center">
                            <img className="w-10 h-10  flex items-center justify-center"
                                 src={icon1} alt=""
                            >

                            </img>
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-md md:text-lg lg:text-xl  lg:min-w-[16rem] font-semibold text-center mb-4 md:mb-6 min-h-[60px] md:min-h-[70px] flex items-center justify-center px-2">
                            Level 7 Extended Diploma in Strategic Sales Excellence & Channel Management
                        </h3>

                        {/* Description */}
                        <p className="text-[#f0f4f5] text-sm md:text-base text-center mb-6 md:mb-8 min-h-[50px] flex items-center justify-center">
                            Focus: Leadership, analytics, progression to MBA/MSc.
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="relative w-full max-w-[220px] h-13 mx-auto block rounded-full overflow-hidden group">
                            {/* Border wrapper */}
                            <div className="absolute inset-0 gradient-border p-[2px] rounded-full transition-all duration-300 group-hover:p-0">
                                <div className="w-full h-full bg-[#112967] rounded-full transition-all duration-300 group-hover:bg-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative flex items-center justify-center gap-3 py-3 px-6">
                                <span className="text-white font-semibold text-base">Request</span>

                                {/* Arrow circle */}
                                <div className="w-9 h-9 bg-[#f44a1e] rounded-full flex items-center justify-center
                        transition-all duration-300
                        group-hover:bg-white group-hover:scale-110">
                                    <ChevronRight className="w-4 h-4 text-white transition-all duration-300 group-hover:text-[#f44a1e]" />
                                </div>
                            </div>
                        </button>

                    </div>

                    {/* Card 3 */}
                    <div
                        className={`card-backdrop rounded-2xl p-3 md:p-5 relative overflow-hidden ${
                            isVisible ? 'animate-slide-up' : 'opacity-0'
                        }`}
                        style={{ animationDelay: '0.9s' }}
                    >
                        {/* Icon */}
                        <div className="w-20 h-20 md:w-22 md:h-22 bg-[#f2f4f7] rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center">
                            <img className="w-10 h-10  flex items-center justify-center"
                                 src={icon1} alt=""
                            >

                            </img>
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-md md:text-lg lg:text-xl  font-semibold text-center mb-4 md:mb-16 min-h-[60px] md:min-h-[70px] flex items-center justify-center px-2 ">
                            Diploma in Business English
                        </h3>

                        {/* Description */}
                        <p className="text-[#f0f4f5] text-sm md:text-base text-center mb-6 md:mb-8 min-h-[50px] flex items-center justify-center">
                            Focus: Communication skills for global business.
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="relative w-full max-w-[220px] h-13 mx-auto block rounded-full overflow-hidden group">
                            {/* Border wrapper */}
                            <div className="absolute inset-0 gradient-border p-[2px] rounded-full transition-all duration-300 group-hover:p-0">
                                <div className="w-full h-full bg-[#112967] rounded-full transition-all duration-300 group-hover:bg-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative flex items-center justify-center gap-3 py-3 px-6">
                                <span className="text-white font-semibold text-base">Enrol Now</span>

                                {/* Arrow circle */}
                                <div className="w-9 h-9 bg-[#f44a1e] rounded-full flex items-center justify-center
                        transition-all duration-300
                        group-hover:bg-white group-hover:scale-110">
                                    <ChevronRight className="w-4 h-4 text-white transition-all duration-300 group-hover:text-[#f44a1e]" />
                                </div>
                            </div>
                        </button>

                    </div>

                    {/* Card 4 - With Coming Soon Ribbon */}
                    <div
                        className={`card-backdrop rounded-2xl p-3 md:p-5 relative overflow-hidden ${
                            isVisible ? 'animate-slide-up' : 'opacity-0'
                        }`}
                        style={{ animationDelay: '1.05s' }}
                    >
                        {/* Coming Soon Ribbon */}
                        <div
                            className="absolute bg-[#f86c0d] rounded-xl w-[58px] h-[248px] -top-5 left-[150px] xs:left-[13rem] sm:left-[16rem] md:left-[160px] lg:left-[240px] xl:left-[140px] 2xl:left-[160px] 3xl:left-[220px]  -rotate-[43.618deg] origin-top-left"
                        />
                        <div
                            className="absolute text-white font-bold text-lg text-center w-[118px] leading-[22px] top-[18px] lg:top-[2.5rem] xl:top-[1rem] 3xl:top-[2rem] -right-[1rem] lg:-right-[1rem] xl:-right-[1rem] 3xl:-right-[.7rem] rotate-[46.045deg]"
                        >
                            Coming<br />soon
                        </div>

                        {/* Icon */}
                        <div className="w-20 h-20 md:w-22 md:h-22 bg-[#f2f4f7] rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center">
                            <img className="w-10 h-10  flex items-center justify-center"
                                 src={icon4} alt=""
                            >

                            </img>
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-md md:text-lg lg:text-xl  font-semibold text-center mb-16 md:mb-16 min-h-[60px] md:min-h-[70px] flex items-center justify-center px-2">
                            Masterclasses & Short Courses
                        </h3>

                        {/* Description */}
                        <p className="text-[#f0f4f5] text-sm md:text-base text-center mb-6 md:mb-8 min-h-[50px] flex items-center justify-center">
                            Workshops in digital selling, branding.
                        </p>

                        {/* Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="relative w-full max-w-[220px] h-13 mx-auto block rounded-full overflow-hidden group">
                            {/* Border wrapper */}
                            <div className="absolute inset-0 gradient-border p-[2px] rounded-full transition-all duration-300 group-hover:p-0">
                                <div className="w-full h-full bg-[#112967] rounded-full transition-all duration-300 group-hover:bg-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative flex items-center justify-center gap-3 py-3 px-6">
                                <span className="text-white font-semibold text-base">Join</span>

                                {/* Arrow circle */}
                                <div className="w-9 h-9 bg-[#f44a1e] rounded-full flex items-center justify-center
                        transition-all duration-300
                        group-hover:bg-white group-hover:scale-110">
                                    <ChevronRight className="w-4 h-4 text-white transition-all duration-300 group-hover:text-[#f44a1e]" />
                                </div>
                            </div>
                        </button>

                    </div>

                </div>
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

                {/* Navigation Buttons - Hidden on mobile
                <div className="hidden lg:flex justify-center gap-4 mb-8">
                    <button className="w-11 h-11 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-11 h-11 rounded-full border border-white flex items-center justify-center hover:bg-white/10 transition-colors">
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </div>

                 Horizontal Dividers
                <div className="hidden lg:block relative h-px max-w-6xl mx-auto">
                    <div className="absolute left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-white/30" />
                    <div className="absolute right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-white/30 to-white/30" />
                </div>*/}
            </div>



    );
}