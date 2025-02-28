export interface JobDescription {
	title: string;
	description: string;
	slug: string;
	whatWeLookFor: string[];
	whatYouDo: string[];
	whatWeOffer?: string[];
	howToApply?: {
		text: string;
		contact: string;
	}
}
