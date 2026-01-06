import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Luxvio Ceylon - Luxury Sri Lanka Travel'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#003B36', // luxvio-teal
                    backgroundImage: 'radial-gradient(circle at center, #004d46 0%, #003B36 100%)',
                    color: '#C5A059', // luxvio-gold
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    {/* Logo representation */}
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            border: '4px solid #C5A059',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '20px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                        }}
                    >
                        <span style={{ fontSize: '40px' }}>L</span>
                    </div>
                    <h1
                        style={{
                            fontSize: '80px',
                            fontWeight: 'bold',
                            fontFamily: 'serif',
                            margin: 0,
                            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                        }}
                    >
                        Luxvio Ceylon
                    </h1>
                </div>
                <p
                    style={{
                        fontSize: '32px',
                        color: '#F5F5F0', // luxvio-cream
                        marginTop: '10px',
                        fontFamily: 'sans-serif',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    Luxury Sri Lanka Travel
                </p>
            </div>
        ),
        {
            ...size,
        }
    )
}
