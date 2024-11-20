import type { JobDescription } from './types';

export const jobs: Array<JobDescription> = [
	{
		title: 'Data Layer Engineer',
		description:
			'You will be working together with both the platform team and the gameplay engineering team as well as game designers to understand the game experience and architect the underlying databases and APIs.',
		slug: 'data-layer',
		whatYouDo: [
			'Build APIs in the Data Layer to support new gameplay capabilities',
			'Understand the end to end system behavior',
			'Work with backend side databases',
			'Design and implement scalable and highly performant algorithms that are easy to use by gameplay engineers',
			'Work with the infrastructure engineers to execute performance profiling and understand key bottlenecks and limitations',
			'End-to-end ownership of web services'
		],
		whatWeLookFor: [
			'Strong computer science fundamentals, including knowledge of data structures, performance and scalability',
			'3+ years of experience building APIs or web services',
			'5+ years of experience working with SQL and NoSQL databases',
			'Experience with Go / Rust / C# or NodeJS',
			'Are able to learn quickly and get up to speed'
		]
	},
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
		title: 'Software Engineer Intern',
		description:
			'You have the chance to get in the world of game development, you will understand how your favorite games are created.',
		slug: 'swe-intern',
		whatYouDo: [
			'Work with senior game developers',
			'Understand the end to end system behavior',
			'Maintain existing code and implement new features'
		],
		whatWeLookFor: [
			'Basic computer science fundamentals, including knowledge of data structures',
			'High standards of work ethic',
			'Highly motivated and able to learn quickly',
			'Passion for computer games is plus',
			'Developed your own computer game is huge bonus'
		]
	}
];
