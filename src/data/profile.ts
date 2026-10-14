export interface Profile {
  readonly name: string;
  /** og:site_name. */
  readonly brand: string;
  readonly title: string;
  readonly employer: { readonly name: string; readonly url: string };
  readonly tagline: string;
  readonly location: { readonly city: string; readonly region: string };
  readonly email: string;
  readonly linkedin: string;
  /** One sentence, used for meta descriptions. */
  readonly summary: string;
  /** The résumé's summary paragraph. */
  readonly resumeSummary: string;
  readonly about: readonly string[];
  readonly expertise: readonly string[];
  readonly earlierRoles: readonly string[];
}

// Never name Praxent's clients anywhere on this site.
export const profile = {
  name: 'Matthew Wooley',
  brand: 'wooley.dev',
  title: 'Technical Director',
  employer: { name: 'Praxent', url: 'https://praxent.ai' },
  tagline: 'Architect of Scalable Software Experiences',
  location: { city: 'Houston', region: 'TX' },
  email: 'matthew@wooley.dev',
  linkedin: 'https://www.linkedin.com/in/wooleydev',
  summary:
    'Technical Director at Praxent. 15 years taking software from prototype to production for financial services, government and energy: APIs, AWS, .NET and AI with Claude.',
  resumeSummary:
    'Technical Director at Praxent, an AI transformation firm and Anthropic partner for financial services, with 15 years of building cloud applications that actually work. I take client prototypes to production, lead the engineering group that delivers them, and build with Claude every day. Claude Certified Architect and AWS Certified Solutions Architect – Professional.',
  about: [
    "Hi, I'm Matthew, a Technical Director at Praxent with 15 years of experience helping teams build modern cloud applications that actually work — and work well.",
    "At Praxent, an AI transformation firm and Anthropic partner for financial services, I take clients' prototypes to production — three so far, including industry-standard APIs and a platform built to scale for a national provider of IRA, HSA and retirement-plan services. I'm upfront with clients about what we can and can't do before they commit; it's the fastest way I know to earn trust.",
    "I also look after the engineering group behind the work, partnering with our AI enablement team so our engineers are ready for whatever we sign up for.",
    "I specialize in AWS, .NET and API design, with a strong foundation in event-driven architecture and distributed systems, and I build with Claude every day. I'm a Claude Certified Architect, I trained with Anthropic at their Basecamp in San Francisco, and I traveled to Cartagena, Colombia for an AI enablement. Before Praxent I led a $6M modernization at Headspring (part of Accenture) and spent years in the energy industry at Baker Hughes.",
    "The recognition that means the most to me is Praxent's “Do It Together” Praxie, a peer-nominated award for living our core values. My nominator wrote that I help create “the kind of environment where people feel comfortable contributing, communicating openly, and asking for help when needed.” As far as I'm concerned, that's the job.",
    "If you're looking for someone who can see the big picture, dive into the details, and keep the vibe positive along the way — let's connect.",
  ],
  expertise: [
    'Technical Architecture',
    'API Design',
    'AI Enablement',
    'Full-Stack Development',
    'Delivery Lead',
    'Software Engineering',
    'Cloud Platforms',
    'Complex Problem Solving',
    'Training & Mentoring',
    'Stakeholder Engagement',
  ],
  earlierRoles: [
    'Lead MWD Supervisor, Ryan Energy',
    'Drilling Roughneck & Assistant, Greywolf',
    'Roughneck, Texas Wyoming Drilling',
  ],
} as const satisfies Profile;
