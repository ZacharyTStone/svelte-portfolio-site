import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { RecaptchaVerificationResponse, VerificationRequest } from './types';

const RECAPTCHA_SECRET_KEY = import.meta.env.VITE_RECAPTCHA_SECRET_KEY || '';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = (await request.json()) as VerificationRequest;
		const { token } = data;

		if (!token) {
			return json({ success: false, error: 'Missing reCAPTCHA token' }, { status: 400 });
		}

		// Verify the token with Google reCAPTCHA API
		const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				secret: RECAPTCHA_SECRET_KEY,
				response: token
			})
		});

		const recaptchaResult = (await recaptchaResponse.json()) as RecaptchaVerificationResponse;
		console.log('reCAPTCHA verification result:', recaptchaResult);

		// Check if verification was successful
		if (!recaptchaResult.success) {
			return json(
				{
					success: false,
					error: 'reCAPTCHA verification failed',
					details: recaptchaResult['error-codes'] || []
				},
				{ status: 400 }
			);
		}

		// For extra security, check the score if using v3
		if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.5) {
			return json(
				{
					success: false,
					error: 'reCAPTCHA score too low',
					score: recaptchaResult.score
				},
				{ status: 400 }
			);
		}

		return json({ success: true });
	} catch (error) {
		console.error('reCAPTCHA verification error:', error);
		return json({ success: false, error: 'Internal server error' }, { status: 500 });
	}
};
