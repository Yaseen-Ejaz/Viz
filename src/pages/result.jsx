import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

function Result() {
    const result = useSelector((state) => state.data);
    const queryParameters = new URLSearchParams(window.location.search);
    const website = queryParameters.get("website");

    // State for controlling fade-in for each part
    const [fadeInHeading, setFadeInHeading] = useState(false);
    const [fadeInDescription, setFadeInDescription] = useState(false);
    const [fadeInWebsite, setFadeInWebsite] = useState(false);

    const getHeading = (result) => {
        const lines = result.split("\n"); // Split the result into lines
        const heading = lines[0]; // The first line is the heading
        const description = lines.slice(1).join("\n"); // Join the rest of the lines as the description
        return { heading, description };
    };

    const { heading, description } = getHeading(result);

    useEffect(() => {
        // Trigger fade-in for the heading
        setFadeInHeading(true);
        
        // Trigger fade-in for the description after the heading
        const descriptionTimeout = setTimeout(() => {
            setFadeInDescription(true);
        }, 500); // 500ms delay for the description

        // Trigger fade-in for the website after the description
        const websiteTimeout = setTimeout(() => {
            setFadeInWebsite(true);
        }, 1000); // 1000ms delay for the website

        // Cleanup timeouts
        return () => {
            clearTimeout(descriptionTimeout);
            clearTimeout(websiteTimeout);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-purple-700">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-10 drop-shadow-lg">
            <h1 className={`text-4xl font-bold mb-4 text-purple-700 transition-opacity duration-1000 ${
                    fadeInHeading ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {heading}
            </h1>

            <h2 className={`text-1xl text-purple-700 transition-opacity duration-1000 ${
                    fadeInDescription ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {description}
            </h2>

            <p className={`text-purple-700 mt-10 transition-opacity duration-1000 ${
                    fadeInWebsite ? 'opacity-100' : 'opacity-0'
                }`}
            >
                Go to <u><a href={`https://${website}`} target="_blank" rel="noopener noreferrer">{website}</a></u>
            </p>
            </div>
        </div>
    );
}

export default Result;
