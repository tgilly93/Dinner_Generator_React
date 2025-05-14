import React from "react";
import "../styles/FoodSpinner.css"; 

const foodIcons = ["🍕", "🍣", "🍔", "🥗", "🌮", "🍝", "🍛", "🥩"];

const FoodSpinner = () => {
    const numSlices = foodIcons.length;
    const radius = 100;
    const center = radius;
    const anglePerSlice = (2 * Math.PI) / numSlices;

    const slices = foodIcons.map((icon, index) => {
        const startingAngle = anglePerSlice * index;
        const endAngle = startingAngle + anglePerSlice;

        const x1 = center + radius * Math.cos(startingAngle);
        const y1 = center + radius * Math.sin(startingAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);

        const largeArcFlag = anglePerSlice > Math.PI ? 1 : 0;

        const pathData = 
            `M ${center} ${center} 
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
            Z`;

        const iconX = center + (radius * 0.65) * Math.cos(startingAngle + anglePerSlice / 2);
        const iconY = center + (radius * 0.65) * Math.sin(startingAngle + anglePerSlice / 2);

        return (
            <g key={index}>
                <path d={pathData} fill={`hsl(${(index * 360) / numSlices}, 70%, 60%)`} />
                <text
                    x={iconX}
                    y={iconY}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="24"
                    >
                    {icon}
                    </text>
            </g>
        );
    });

    return (
        <div className="spinner-container d-flex justify-content-center my-4">
            <svg
                className="spinner-wheel"
                width="200"
                height="200"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                >
                    {slices}
                </svg>
                </div>
    );
};

export default FoodSpinner;