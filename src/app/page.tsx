import { getProfileData } from "@/lib/data";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import Leadership from "@/components/sections/Leadership";
import CpStats from "@/components/sections/CpStats";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export const revalidate = 3600;

export default async function Home() {
  const data = await getProfileData();

  return (
    <>
      <Hero personal={data.personal} />
      <About />
      <Skills skills={data.skills} />
      <Education education={data.education} />
      <Experience experience={data.experience} />
      <Leadership roles={data.organizationalRoles} />
      <CpStats />
      <Projects projects={data.projects} />
      <Contact personal={data.personal} />
    </>
  );
}