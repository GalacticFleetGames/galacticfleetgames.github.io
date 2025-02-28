import type { JobDescription } from './types';

export const jobs: Array<JobDescription> = [
	{
		title: 'Cloud Infrastructure Engineer',
		description:
			'To create an engaging gaming experience we need to lay down the fundamentals of the support platform. A multi-world MMO requires well-designed, flexible infrastructure connected to a quick delivery pipeline.',
		slug: 'cloud-infra',
		whatYouDo: [
			'Design and build the CI pipeline and the development, stage production environments',
			'Build up a proactive monitoring and alerting system',
			'Work closely with game developers and improving the developer experience and efficiency',
			'Develop and deploy changes via infrastructure as code',
			'Evaluate new tools and adopt them into the current infrastructure'
		],
		whatWeLookFor: [
			'Skilled cloud infrastructure engineer who understanding cloud computing concepts',
			'Working experience with managing HA production environments',
			'Working experience with CI/CD pipelines (Jenkins, Google Cloud Build)',
			'Expertise in cloud computing (AWS or GCP)',
			'Familiar with scripting, automation (bash, python)',
			'Understands and able to manage linux systems',
			'Quality focused mindset',
			'Being able to troubleshoot problems in unfamiliar systems',
			'Kubernetes expertise is a plus',
		]
	},
	{
		title: '2D illustrator intern ',
		description:
			"In this role, you will be responsible for creating visuals for games based on game concepts. You will collaborate with the team to understand project requirements and create visuals that incorporate the illustrations and design elements with the game's core principles.",
		slug: '2d-intern',
		whatYouDo: [
			'Collaborate with the team on making graphics and illustrations based on game concepts',
			'Create game assets, illustrations, character design and concept art',
			'Revise designs based on feedback from the team',
			'Collaborate  with team members to understand project objectives and deadlines',
			'Adhere to naming convention when creating game ready assets that can be used at all steps in the pipeline'
		],
		whatWeLookFor: [
			'Pursuing a degree in Graphic Design, Visual Arts, or a related field',
			'Proficiency in design software such as Adobe Illustrator or equivalent tools',
			'Strong understanding of design principles, typography, color theory, and layout',
			'Ability to work independently and cooperatively',
			'Manage time effectively to meet deadlines',
			'Advanced English language skills: ability to effectively present and explain your work in English',
		],
		whatWeOffer: [
			'Paid internship',
			'Office in the city center of Budapest',
			'Hybrid work',
			'Flexible working hours',
			'International environment'
		],
		howToApply: {
			text: "Please apply with an English CV and a portfolio of your latest work! You can send your application to ",
			contact: "laura.kocsis@galactic-fleet.com"
		}
	},
];
