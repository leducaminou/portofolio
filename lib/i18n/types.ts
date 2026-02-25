export interface Dictionary {
  nav: {
    services: string;
    stack: string;
    projects: string;
    capabilities: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    roles: string[];
    description: string;
    cta_work: string;
    cta_contact: string;
    tags: string[];
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
    items: Array<{
      title: string;
      description: string;
      implementations: string[];
    }>;
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
