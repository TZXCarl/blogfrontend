import * as React from 'react';

require("./style.scss")

class SVG extends React.Component {
    render() {
        return (
            <svg width="850px" height="300px">
                <defs>
                    <radialGradient id="Gradient2" cy="60%" fx="95%" fy="70%" r="2">
                        <stop offset="0%" stop-color="#ED6E46"/>
                        <stop offset="10%" stop-color="#b4c63b"/>
                        <stop offset="20%" stop-color="#ef5b2b"/>
                        <stop offset="30%" stop-color="#503969"/>
                        <stop offset="40%" stop-color="#ab6294"/>
                        <stop offset="50%" stop-color="#1cb98f"/>
                        <stop offset="60%" stop-color="#48afc1"/>
                        <stop offset="70%" stop-color="#b4c63b"/>
                        <stop offset="80%" stop-color="#ef5b2b"/>
                        <stop offset="90%" stop-color="#503969"/>
                        <stop offset="100%" stop-color="#ab6294"/>
                    </radialGradient>
                </defs>
                <text x="20%" y="75%" fill="url(#Gradient2)" font-family="'Signika', sans-serif" font-size="200">
                    Cherry
                </text>
            </svg>
        )
    }
}

export default SVG