import type { JobDescription } from './types';

export const jobs: Array<JobDescription> = [
	{
		title: 'SENIOR SOFTWARE ENGINEER',
		description:
			'You will deal with the interaction model, persisting user data, create and orchestrate experiments with extensive logging, build visual and vocal interactions, deal with issues reported by actual players.',
		slug: 'senior-software-engineer',
		whatYouDo: [
			'Design engineering solutions for new game features or experiments',
			'Maintain the team’s delivery and its pace',
			'Identify roadblocks and help the team to get over them',
			'Understand and improve the end to end system behavior, development experience, code health',
			'Work with product managers, designers and QA people. Help them to improve and deliver new features',
			'End-to-end ownership of games from the concept through the backend and UI flows to the tested and released version',
			'Tracking issues, reporting to stakeholders',
			'Create maintainable code, no matter if it is new or a refactored old one'
		],
		whatWeLookFor: [
			'Strong computer science fundamentals, including knowledge of data structures and types, asynchronous algorithms, clean code, OOP and functional programming',
			'OK to write throw-away code and experiment with UX',
			'Strong data centric mindset, ready to create and analyze charts of user interactions.',
			'6+ years of experience building APIs, web services and frontend applications',
			'6+ years of experience with TypeScript and Node.js (Leveraging on TypeScript’s type system, Managing monorepos, Working with npm, Debugging is in your fingertips)',
			'1+ years of experience working with SQL and/or NoSQL databases (DynamoDB, MongoDB, etc…)',
			'Knowledge of using cloud provider services',
			'You are able to work with legacy code applying the boy scout rule.',
			'You are able to learn quickly and get up to speed',
			'You speak English with confidence - we are working with US studios'

		],
		whatWeOffer: [
		'Deep insights into the world of video games - work with professional US studios',
		'Opportunity to work independently and creatively - always appreciate your ideas and proactivity',
		'Flexible, hybrid working arrangements - we aim for the right work-life balance',
		'Cool office environment in the city centre of Budapest - relaxation facilities, office massage, free networking events',
		'Transparent, open and friendly company culture - everyone from various backgrounds, experiences, and perspectives are valued and respected',
		],
		howToApply: {
			text: "Please apply with an English CV in email: ",
			contact: "laura.kocsis@galactic-fleet.com"
		}
	},
	{
		title: 'MARKETING INTERN',
		description:
			"In  this  role,  you  will  be  responsible  for creating strategies for reaching our target audience and building our community. Your role will also include managing our social media platforms and  creating  content  that  represents  our  studio's culture and helps people connect with us and our games.",
		slug: 'marketing-intern',
		whatYouDo: [
			'Developing and implementing strategies to reach target audiences',
			'Strategies for building and nurturing a vibrant community',
			'Conducting competitor analysis and benchmarking',
			'Identifying and planning publication channels and methods',
			'Create content on relevant social media platforms',
			'Communicating and reinforcing brand vision',
		],
		whatWeLookFor: [
			'Highly organized, with the ability to prioritize and work independently in a proactive manner',
			'Familiarity with the gaming industry',
			'Up to date on social media trends',
			'Essential video and photo editor skills for content creation',
			'Strong written and verbal communication skills both in Hungarian and in English',
		],
		whatWeOffer: [
			'Paid internship',
			'Flexible working hours, 20 hours per week',
			'Office in the city center of Budapest',
			'Hybrid work',
			'International environment',
		],
		howToApply: {
			text: "Please apply with an English CV.	 You can send your application to: ",
			contact: "laura.kocsis@galactic-fleet.com"
		}
	},
];
