function Copyright() {
    return (
        <div style={{
            fontFamily: 'Sour Gummy, sans-serif',
            background: 'linear-gradient(to right, #262626, #3a3a3a)',
            color: 'white',
            padding: '.25rem 1.5rem',
            borderRadius: '.25rem',
            position: 'absolute',          // Absolute positioning
            bottom: '5rem',                // Distance from the bottom
            left: '50%',                   // Horizontally center the element
            transform: 'translateX(-50%)', // Correct for the 50% left positioning
            width: '50rem',                // Set width
            zIndex: '9999',                // Make sure it's on top of other elements
            // textAlign: 'center'            // Center text within the div
        }} className="copyright">
            <p>© {new Date().getFullYear()} Lachy League. All rights reserved. This broadcast includes custom graphics and content created exclusively for this production. The presenters, audio, images, and other related media are the property of Fox League and are used with permission. Unauthorized use or reproduction of any part of this broadcast without prior consent is prohibited.</p>
        </div>
    );
}

export default Copyright;