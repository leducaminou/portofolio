import { getDictionary } from "@/lib/i18n/dictionaries";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="relative">
      <Navbar dict={dict} lang={lang} />
      <Hero dict={dict} />
      <Services dict={dict} />
      <TechStack dict={dict} />
      <Projects dict={dict} />
      <Capabilities dict={dict} />
      <Contact dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
