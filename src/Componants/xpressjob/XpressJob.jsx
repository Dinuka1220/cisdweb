import React, { useEffect } from "react";
import footerlogo from "../../assets/images/expressjobsfooter.png"

export default function XpressJobsWidget() {
  useEffect(() => {
    // Load CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "https://xj-cdn.s3-ap-southeast-1.amazonaws.com/xj.min.css";
    document.head.appendChild(cssLink);

    // Load JS dynamically
    const script = document.createElement("script");
    script.src = "https://xj-cdn.s3.ap-southeast-1.amazonaws.com/xj-sector.min.js";
    script.async = true;

    script.onload = () => {
      // Initialize widget after script loads
      new window.XpressJobs("xj-internships", "44", 1, {
        pageSize: 20,
        showType: true,
        showOverview: true,
        showlocations: true,
        showSearchBar: true,
        showHeading: true,
        heading: "Current Openings",
      });
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup – remove script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className=" p-6 md:max-w-[70%] mx-auto" id={"Job Portal"}>
      <h2 className="text-md  mb-4 text-gray-800 text-justify mt-5">
          <span className={"font-bold"}>The Colombo Institute of Sales & Distribution (CISD)</span> is pleased to announce a strategic collaboration with Xpress.Jobs through the signing of a Memorandum of Understanding (MoU) focused exclusively on enhancing career opportunities in the sales and business development sector. Through this partnership, CISD students will gain direct access to a dedicated pool of sales-related job opportunities sourced from Xpress.Jobs’ network of over 11,000 active employers across Sri Lanka. This initiative enables students to easily explore, apply for, and secure sales roles ranging from entry-level to experienced positions, effectively bridging the gap between education and industry needs. By integrating real-time sales job listings into the CISD platform, this collaboration empowers students to launch successful careers in sales with confidence and efficiency.
      </h2>

      {/* Job list container */}
      <div id="xj-internships" className="w-full "></div>
        <div className={"w-[10rem] h-[10rem] flex ml-auto "}>
            <img src={footerlogo} alt="footerlogo"/>
        </div>
    </div>
  );
}
