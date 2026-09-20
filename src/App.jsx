import { useState } from 'react'
import {BrowserRouter, Route, Routes,Router} from "react-router";
import './App.css'
import HeaderSection from "./Componants/HeaderSection/HeaderSection.jsx";
import HeroSection from "./Componants/HeroSection/HeroSection.jsx";
import OurPurpose from "./Componants/OurPurpose/OurPurpose.jsx";
import VisionAndMission from "./Componants/VisionAndMission/VisionAndMission.jsx";
import CoreValue from "./Componants/CoreValue/CoreValue.jsx";
import AboutUs from "./Componants/AboutUs/AboutUs.jsx";
import Accreditations from "./Componants/Accreditations/Accreditations.jsx";
import LogoSlider from "./Componants/LogoSlider/LogoSlider.jsx";
import Membership from "./Componants/Membership/Membership.jsx";
import Unique from "./Componants/Unique/Unique.jsx";
import OurPrograms from "./Componants/OurPrograms/OurPrograms.jsx";
import JoinWithUs from "./Componants/JoinWithUs/JoinWithUs.jsx";
import Footer from "./Componants/Footer/Footer.jsx";
import LogoSliderAnimatedOne from "./Componants/LogoSliderAnimatedOne/LogoSliderAnimatedOne.jsx";
import LogoSliderAnimatedTwo from "./Componants/LogoSliderAnimatedTwo/LogoSliderAnimatedTwo.jsx";
import XpressJobsWidget from "./Componants/xpressjob/XpressJob.jsx";
import Myfees from "./Componants/Myfees/Myfees.jsx";




function App() {
    const [count, setCount] = useState(0)

    return (
        <>


            <BrowserRouter>

                <Routes>
                    <Route path="/" element={
                        <>
                            <HeaderSection/>
                            <HeroSection/>
                            <OurPurpose/>
                            <VisionAndMission/>
                            <CoreValue/>
                            <AboutUs/>
                            <Accreditations/>
                            <LogoSlider/>
                            <Membership/>
                            <OurPrograms/>
                            <Unique/>
                            <JoinWithUs/>
                            <Footer/>
                        </>
                    } />



                    <Route path="/xpress-widget" element={<XpressJobsWidget/>} />
                    <Route path="/payment" element={<Myfees />} />

                    {/*<Route
                        path="/xpress-widget"
                        element={
                            <>
                                <HeaderSection />
                                <XpressJobsWidget />
                                <Footer />
                            </>
                        }
                    />*/}
                </Routes>

                </BrowserRouter>


        </>
    )
}

export default App