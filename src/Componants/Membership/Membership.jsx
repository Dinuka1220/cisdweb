import React, { useState, useEffect } from 'react';

const Membership = () => {
    /*const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const memberships = [
        {
            level: 'Student Member',
            requirements: 'Enrolled in CISD programs',
            benefits: 'Access to training and mentorship',
            fee: 'LKR 2,500/year'
        },
        {
            level: 'Associate Member – AMCISP',
            requirements: '5+ years experience',
            benefits: 'CPD programs and webinars',
            fee: 'LKR 4,500/year'
        },
        {
            level: 'Member – MCISP',
            requirements: '10+ years experience',
            benefits: 'Certified recognition',
            fee: 'LKR 7,500/year'
        },
        {
            level: 'Fellow – FCISP',
            requirements: 'Senior leadership roles',
            benefits: 'Leadership forums and networks',
            fee: 'LKR 10,000/year'
        },
        {
            level: 'Corporate Membership',
            requirements: 'For organisations',
            benefits: 'Talent and training support',
            fee: 'Contact for pricing'
        }
    ];*/

    return (
        <div className="min-h-[1rem] lg:min-h-[8rem] bg-gradient-to-r from-[#EBD0C9] to-[#FFF9F5] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/*<div className="max-w-7xl mx-auto pt-5 md:pt-16 pb-5 md:pb-0 ">
                 Header Section with Left to Right Animation
                <div
                    className={`text-center mb-8 transition-all duration-1000 transform ${
                        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                    }`}
                >
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
                        CISP Membership Pathways
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
                        Progress through professional membership levels as your career advances
                    </p>
                </div>

                 Table with Bottom to Up Animation
                <div
                    className={`transition-all duration-1000 delay-300 transform ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                >
                     Desktop Table View
                    <div className="hidden lg:block bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-orange-500 to-orange-500">
                                <tr>
                                    <th className="px-6 py-6 text-left text-lg font-semibold text-white">
                                        Membership Level
                                    </th>
                                    <th className="px-6 py-6 text-left text-lg font-semibold text-white">
                                        Requirements
                                    </th>
                                    <th className="px-6 py-6 text-left text-lg font-semibold text-white">
                                        Benefits
                                    </th>
                                    <th className="px-6 py-6 text-left text-lg font-semibold text-white">
                                        Annual Fee
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {memberships.map((membership, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {membership.level}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {membership.requirements}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {membership.benefits}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {membership.fee}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                     Tablet View
                    <div className="hidden md:block lg:hidden bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-orange-500 to-orange-500">
                                <tr>
                                    <th className="px-4 py-5 text-left text-base font-semibold text-white">
                                        Level
                                    </th>
                                    <th className="px-4 py-5 text-left text-base font-semibold text-white">
                                        Requirements
                                    </th>
                                    <th className="px-4 py-5 text-left text-base font-semibold text-white">
                                        Benefits
                                    </th>
                                    <th className="px-4 py-5 text-left text-base font-semibold text-white">
                                        Fee
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {memberships.map((membership, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                            {membership.level}
                                        </td>
                                        <td className="px-4 py-4 text-xs text-gray-600">
                                            {membership.requirements}
                                        </td>
                                        <td className="px-4 py-4 text-xs text-gray-600">
                                            {membership.benefits}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                                            {membership.fee}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                     Mobile Card View
                    <div className="block md:hidden space-y-4">
                        {memberships.map((membership, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-orange-500 to-orange-500 px-4 py-3">
                                    <h3 className="text-lg font-semibold text-white">
                                        {membership.level}
                                    </h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Requirements
                                        </p>
                                        <p className="text-sm text-gray-900 mt-1">
                                            {membership.requirements}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Benefits
                                        </p>
                                        <p className="text-sm text-gray-900 mt-1">
                                            {membership.benefits}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                            Annual Fee
                                        </p>
                                        <p className="text-base font-semibold text-gray-900 mt-1">
                                            {membership.fee}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>*/}
        </div>
    );
};

export default Membership;