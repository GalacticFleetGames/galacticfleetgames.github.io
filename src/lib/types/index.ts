export interface JobDescription {
	title: string;
	description: string;
	slug: string;
	pdfUrl?: string;
	linkedinUrl: string;
	whatWeLookFor: string[];
	whatYouDo: string[];
	whatWeOffer?: string[];
	howToApply?: {
		text: string;
		contact: string;
	}
}
