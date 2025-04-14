/**
 * Request payload for reCAPTCHA verification
 */
export interface VerificationRequest {
	token: string;
}

/**
 * Response from Google's reCAPTCHA verification API
 */
export interface RecaptchaVerificationResponse {
	/**
	 * Whether this request was a valid reCAPTCHA token for your site
	 */
	success: boolean;

	/**
	 * The score for this request (0.0 - 1.0)
	 * Only available for reCAPTCHA v3
	 */
	score?: number;

	/**
	 * The action name for this request (important to verify)
	 * Only available for reCAPTCHA v3
	 */
	action?: string;

	/**
	 * Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
	 */
	challenge_ts?: string;

	/**
	 * The hostname of the site where the reCAPTCHA was solved
	 */
	hostname?: string;

	/**
	 * Error codes provided by the service
	 */
	'error-codes'?: string[];
}
