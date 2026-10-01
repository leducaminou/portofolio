import { getDictionary } from "@/lib/i18n/dictionaries";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Team from "./components/Team";
import { getPublishedProjects, getPublishedTeam } from "@/lib/data/queries";

// Backstop: admin mutations revalidate immediately, this covers anything missed.
export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const [projects, team] = await Promise.all([
    getPublishedProjects(lang),
    getPublishedTeam(lang),
  ]);

  return (
    <main className="relative overflow-hidden min-h-screen">
      <Navbar dict={dict} lang={lang} hasTeam={team.length > 0} />
      <Hero dict={dict} team={team} />
      <Services dict={dict} />
      <TechStack dict={dict} />
      <Projects dict={dict} projects={projects} />
      <Team dict={dict} team={team} />
      <Capabilities dict={dict} />
      <Contact dict={dict} />
      <Footer dict={dict} />
      <WhatsAppButton />
    </main>
  );
}
