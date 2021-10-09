import { useEffect } from "react";
import { Container } from "./Container";

type PageProps = {
  title: string;
  wide?: boolean;
  children: React.ReactNode;
};

const Page = ({ title, wide, children }: PageProps) => {
  useEffect(() => {
    document.title = `${title} | Complex App`;
    window.scrollTo(0, 0);
  }, []);

  return <Container wide={wide}>{children}</Container>;
};

export { Page };
