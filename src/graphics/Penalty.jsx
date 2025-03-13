function Penalty() {
    return (
        <div style={{
            padding: '0 3rem',
            flexDirection: 'column',
            textTransform: 'uppercase',
            height: '5rem',
            backgroundColor: '#313131',
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.8)',
            position: 'relative',
            left: '-1rem',
            borderRadius: '.5rem',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "Poppins, sans-serif",
            display: 'flex', // Added flex display for centering
            textAlign: 'center' // Ensures text is centered horizontally
        }} className="penalty">
            <div>
                <h3 style={{
                    width: '100%',
                    textAlign: 'center',
                    margin: 0,
                    color: '#B20000',
                    fontSize: '1.25rem'
                }}>
                    Penalty
                </h3>
                <h3 style={{
                    width: 'max-content',
                    margin: '0 auto', // Centers the "High Tackle" text horizontally
                    fontSize: '1rem',
                    color: 'white',
                    opacity: 0.8
                }}>
                    High Tackle
                </h3>
            </div>
        </div>
    );
}

export default Penalty;