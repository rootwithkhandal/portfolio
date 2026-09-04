export interface Research {
  slug: string;
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  /** GitBook URL — used as external link on the research page */
  gitbookUrl: string;
}

export const researches: Research[] = [
  {
    slug: 'recon-pipeline',
    tag: 'Bug Bounty',
    tagColor: '#00ed64',
    title: 'The Hardening guide for Android',
    excerpt: 'For anyone running pentesting, bug bounty, or blockchain workflows off a daily-driver Android phone — no custom ROM, no root, no bootloader unlock. Just discipline.',
    date: 'July 2026',
    readTime: '10 min',
    gitbookUrl: 'https://rootwithkhandal.gitbook.io/the-android-hardening',
  },
  {
    slug: 'recon-pipeline',
    tag: 'Bug Bounty',
    tagColor: '#00ed64',
    title: 'Building a Recon Pipeline with Subfinder, Httpx & Nuclei',
    excerpt: 'How I automated asset discovery and vulnerability scanning into a single declarative NixOS-managed pipeline that runs on every scope update.',
    date: 'Mar 2026',
    readTime: '8 min',
    gitbookUrl: 'https://rootwithkhandal.gitbook.io/recon-pipeline',
  },
  {
    slug: 'llm-jailbreak',
    tag: 'AI Red-Team',
    tagColor: '#e53935',
    title: 'Jailbreaking LLMs with Garak — What Actually Works in 2026',
    excerpt: 'A practical walkthrough of multi-turn prompt injection, role-play escalation, and token smuggling techniques tested against GPT-4o and Llama 3.',
    date: 'Feb 2026',
    readTime: '12 min',
    gitbookUrl: 'https://rootwithkhandal.gitbook.io/llm-jailbreak',
  },
  {
    slug: 'reentrancy-attacks',
    tag: 'Blockchain',
    tagColor: '#69f0ae',
    title: 'Reentrancy Attacks — From Classic to Cross-Function Variants',
    excerpt: 'Deep dive into reentrancy patterns in Solidity, how Slither and Foundry fuzz tests catch them, and a real Code4rena finding walkthrough.',
    date: 'Jan 2026',
    readTime: '10 min',
    gitbookUrl: 'https://rootwithkhandal.gitbook.io/reentrancy-attacks',
  },
  {
    slug: 'siem-triage',
    tag: 'SOC / Blue Team',
    tagColor: '#ff9800',
    title: 'SIEM Alert Triage at Scale — Cutting False Positives by 60%',
    excerpt: 'Lessons from building correlation rules, tuning Sigma detections, and using Python to auto-enrich alerts with threat intel feeds.',
    date: 'Dec 2025',
    readTime: '7 min',
    gitbookUrl: 'https://rootwithkhandal.gitbook.io/siem-triage',
  },
  {
    slug: 'nixos-wireguard-opsec',
    tag: 'OPSEC',
    tagColor: '#80cbc4',
    title: 'Declarative OPSEC — Managing a Kill-Switch WireGuard Setup with NixOS',
    excerpt: 'How I use Home Manager and WireGuard to enforce a network kill-switch, compartmentalised identities, and reproducible security tooling.',
    date: 'Nov 2025',
    readTime: '9 min',
    gitbookUrl: 'https://rootwithkhandal.gitbook.io/nixos-wireguard-opsec',
  },
  {
    slug: 'ssrf-aws-metadata',
    tag: 'Web Hacking',
    tagColor: '#ce93d8',
    title: 'SSRF to Internal AWS Metadata — A Bug Bounty Case Study',
    excerpt: 'Step-by-step breakdown of chaining an open redirect with a blind SSRF to reach the EC2 metadata endpoint and escalate to credential theft.',
    date: 'Oct 2025',
    readTime: '11 min',
    gitbookUrl: 'https://rootwithkhandal.gitbook.io/ssrf-aws-metadata',
  },
];
