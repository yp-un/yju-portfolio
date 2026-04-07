import { use } from "react";
import Main from "./_sections/main/Main";
import AboutMe from "./_sections/aboutme/AboutMe";
import Skills from "./_sections/skills/Skills";
import Archiving from "./_sections/archiving/Archiving";
import Projects from "./_sections/projects/Projects";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Page(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams);
  const company = searchParams.company;

  return (
    <>
      <Main />
      <AboutMe company={company} />
      <Skills />
      <Archiving />
      <Projects />
    </>
  );
}
