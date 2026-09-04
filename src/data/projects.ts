export interface Project {
  slug: string;
  tag: string;
  tagColor: string;
  title: string;
  excerpt: string;
  /** GitHub owner/repo - README is fetched from this at build time */
  githubRepo: string;
}

export const projects: Project[] = [
  {
    slug: 'recon-pipeline',
    tag: 'Bug Bounty',
    tagColor: '#00ed64',
    title: 'Recon Pipeline',
    excerpt: 'Automated asset discovery and vulnerability scanning pipeline.',
    githubRepo: 'rootwithkhandal/recon-pipeline',
  },
  {
    slug: 'llm-jailbreak',
    tag: 'AI Red-Team',
    tagColor: '#ff8a80',
    title: 'LLM Jailbreak Research',
    excerpt: 'Multi-turn prompt injection and token smuggling research.',
    githubRepo: 'rootwithkhandal/llm-jailbreak',
  },
  {
    slug: 'smart-contract-audit',
    tag: 'Blockchain',
    tagColor: '#b9f6ca',
    title: 'Smart Contract Audit',
    excerpt: 'Reentrancy and logic flaw audits on Immunefi and Code4rena.',
    githubRepo: 'rootwithkhandal/smart-contract-audit',
  },
  {
    slug: 'siem-triage',
    tag: 'SOC',
    tagColor: '#ffcc80',
    title: 'SIEM Alert Triage',
    excerpt: 'Python-based alert enrichment and false-positive reduction.',
    githubRepo: 'rootwithkhandal/siem-triage',
  },
  {
    slug: 'wireguard-killswitch',
    tag: 'OPSEC',
    tagColor: '#b2dfdb',
    title: 'WireGuard Kill-Switch',
    excerpt: 'NixOS declarative WireGuard kill-switch configuration.',
    githubRepo: 'rootwithkhandal/wireguard-killswitch',
  },
  {
    slug: 'llm-router',
    tag: 'Multi-Model',
    tagColor: '#e1bee7',
    title: 'Adaptive LLM Router',
    excerpt: 'FastAPI service that routes prompts across local and cloud LLMs.',
    githubRepo: 'rootwithkhandal/adaptive-llm-router',
  },
  {
    slug: 'home-manager-profiles',
    tag: 'Nix / DevOps',
    tagColor: '#b2ebf2',
    title: 'Home-Manager Profiles',
    excerpt: 'Declarative NixOS home-manager security tooling profiles.',
    githubRepo: 'rootwithkhandal/home-manager-profiles',
  },
  {
    slug: 'bounty-tracker',
    tag: 'Analytics',
    tagColor: '#e1bee7',
    title: 'Bug Bounty Tracker',
    excerpt: 'Dashboard for tracking bug bounty submissions and yield.',
    githubRepo: 'rootwithkhandal/bounty-tracker',
  },
];
