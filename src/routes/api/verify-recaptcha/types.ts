export interface RecaptchaVerificationResponse {
	success: boolean;
	challenge_ts?: string; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
	hostname?: string; // the hostname of the site where the reCAPTCHA was solved
	score?: number; // the score for this request (0.0 - 1.0)
	action?: string; // the action name for this request (important to verify)
	'error-codes'?: string[]; // optional error codes
}

export interface VerificationRequest {
	token: string;
}
