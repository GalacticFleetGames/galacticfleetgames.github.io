import type { JobDescription } from './types';

export const jobs: Array<JobDescription> = [
	{
		title: 'Backend engineer - MMO Platform',
		description:
			"This isn't just about maintaining services; it's about replacing a legacy C++ solution with a modern, cutting-edge system that can handle the emergence, persistence, and launch-day load of a living simulation game world (think inter-planetary travel, real-time creature AI, complex economy).",
		slug: 'backend-engineer-mmo-platform',
		linkedinUrl: 'https://www.linkedin.com/company/galactic-fleet/about/',
		whatYouDo: [
			'Design and evolve the integration layer between Unity game servers and the Node.js backend',
			'Build and maintain backend services that drive core MMO systems (world logic, progression, economy)',
			'Collaborate closely with game engineers to support their workflows and platform needs'
		],
		whatWeLookFor: [
			'Have strong experience with C++, understand its inner workings',
			'Are comfortable designing service-to-service and engine-to-backend integrations',
			'Are excited about building a living simulation game world'
		]
	},
	{
		title: 'SRE - MMO Platform',
		description:
			"Exciting opportunity for experienced SREs! A studio founded by MMO industry veterans is building a next-gen, multi-world MMORPG. They're looking for an SRE to design and operate the AWS backend infrastructure as they head toward launch.",
		slug: 'sre-mmo-platform',
		linkedinUrl: 'https://www.linkedin.com/company/galactic-fleet/about/',
		whatYouDo: [
			'Design, operate, and scale AWS infrastructure for live game worlds',
			'Implement observability, incident response, and reliability practices',
			'Drive infrastructure automation and CI/CD for backend services'
		],
		whatWeLookFor: [
			'Hands-on SRE or DevOps experience with AWS',
			'Infrastructure-as-code and automation skills',
			'Enjoy debugging and problem-solving in unfamiliar or complex systems'
		]
	},
	{
		title: 'Graphics engineer (Unity)',
		description:
			"This role is a unique chance to push Unity's rendering capabilities, focusing on a deeply dynamic world where player actions have permanent visual impacts (think terrain modification, dynamic materials, etc.). You'll own key parts of the rendering stack, balancing high visual fidelity with top-tier PC performance.",
		slug: 'graphics-engineer-unity',
		linkedinUrl: 'https://www.linkedin.com/company/galactic-fleet/about/',
		whatYouDo: [
			'Design and implement rendering features in Unity on Windows - render on an ever-changing terrain!',
			'Diagnose and fix rendering issues across different GPUs and drivers',
			'Support art teams with asset integration and tooling'
		],
		whatWeLookFor: [
			'Expertise in Unity rendering and shader development',
			'Understand real-time rendering fundamentals',
			'Are comfortable debugging complex visual or performance issues'
		]
	}
];
