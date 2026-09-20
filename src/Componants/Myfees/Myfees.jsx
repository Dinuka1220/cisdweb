/**
 * @authority DUSHAN MALINDA
 * @date 2/10/2026 10:27 AM
 * @user Dushan
 * @project codingcad-cisd-website
 * @package
 * Myfees.jsx
 */

import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Myfees = () => {
    const [formData, setFormData] = useState({
        studentName: '',
        description: '',
        amount: '',
        indexNumber: '',
        email: '',
        phoneNo: '',
        classOrCourse: '',
        paymentMethod: 'comVisa',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Call your backend endpoint
            const response = await fetch('http://localhost:4000/api/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Payment request failed');
            }

            // Redirect to MyFees payment page
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl; // Redirect to payment gateway
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r bg-orange-500 to-orange-800 px-8 py-6">
                        <h1 className="text-2xl font-bold text-white">Make a Payment</h1>
                        <p className="text-blue-100 mt-2">
                            Securely pay your fees through our payment gateway
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Student Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Student Name *
                                </label>
                                <input
                                    type="text"
                                    name="studentName"
                                    value={formData.studentName}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter full name"
                                    required
                                />
                            </div>

                            {/* Index Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Index Number *
                                </label>
                                <input
                                    type="text"
                                    name="indexNumber"
                                    value={formData.indexNumber}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., ABC123"
                                    required
                                />
                            </div>

                            {/* Class/Course */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Class/Course *
                                </label>
                                <input
                                    type="text"
                                    name="classOrCourse"
                                    value={formData.classOrCourse}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Grade 7 / Dip. in IT"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="+94 000 000 000"
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount (LKR) *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500">LKR</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Description *
                                </label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Semester Fee, Library Fee, etc."
                                    required
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Payment Method *
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {[
                                        { value: 'comVisa', label: 'Visa' },
                                        { value: 'AMEX', label: 'American Express' },
                                        { value: 'comUSD', label: 'Commercial USD' },
                                        { value: 'comLKR', label: 'Commercial LKR' },
                                        { value: 'comOnly', label: 'Commercial Only' },
                                        { value: 'DFCC', label: 'DFCC' },
                                    ].map((method) => (
                                        <label
                                            key={method.value}
                                            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                                                formData.paymentMethod === method.value
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.value}
                                                checked={formData.paymentMethod === method.value}
                                                onChange={handleChange}
                                                className="mr-3"
                                            />
                                            <span className="font-medium">{method.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Payment...
                  </span>
                                ) : (
                                    'Proceed to Payment'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>

                        {/* Security Note */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-sm text-blue-700 font-medium">Secure Payment</p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        Your payment is processed securely through MyFees.lk. We do not store your card details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Myfees;