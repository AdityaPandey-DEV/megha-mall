import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google ID token and return user info
export async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return {
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            avatar: payload.picture,
            emailVerified: payload.email_verified,
        };
    } catch (err) {
        console.error('Google token verification failed:', err.message);
        return null;
    }
}
