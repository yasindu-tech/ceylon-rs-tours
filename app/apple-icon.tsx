import { ImageResponse } from 'next/og'
import { join } from 'path'
import { readFile } from 'node:fs/promises'

// Route segment config
export const runtime = 'nodejs'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation
export default async function AppleIcon() {
    // Read the image file from the public directory
    const imagePath = join(process.cwd(), 'public', 'luxvio-logo.jpg')
    const imageBuffer = await readFile(imagePath)
    const imageSrc = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                }}
            >
                <img
                    src={imageSrc}
                    alt="Icon"
                    width="100%"
                    height="100%"
                    style={{ objectFit: 'cover' }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
