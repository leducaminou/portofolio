export interface Dictionary {
  nav: {
    services: string;
    stack: string;
    projects: string;
    team: string;
    capabilities: string;
    contact: string;
  };
  hero: {
    company: string;
    greeting: string;
    roles: string[];
    description: string;
    cta_work: string;
    cta_contact: string;
    tags: string[];
    available: string;
    team_label: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };
  stack: {
    title: string;
    subtitle: string;
    categories: Record<string, string>;
  };
  projects: {
    title: string;
    subtitle: string;
    metrics_label: string;
    implementations_label: string;
    performance: string;
    seo: string;
    uptime: string;
    visit: string;
    source: string;
    all: string;
    empty: string;
    client: string;
    show_more: string;
    show_less: string;
    close: string;
    categories: Record<string, string>;
  };
  team: {
    title: string;
    subtitle: string;
  };
  capabilities: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    available: string;
    name_label: string;
    name_placeholder: string;
    email_label: string;
    email_placeholder: string;
    message_label: string;
    message_placeholder: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: {
    rights: string;
    built_with: string;
  };
}
