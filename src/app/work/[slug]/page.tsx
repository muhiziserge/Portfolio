import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { RichParagraph } from "@/components/rich-paragraph";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Serge Muhizi`,
    description: project.lede,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />

      <header className="cs-header wrap">
        <p className="eyebrow">{project.eyebrow}</p>
        <h1>{project.heading}</h1>
        <p className="lede">{project.lede}</p>

        <div className="cs-meta">
          {project.meta.map((field) => (
            <div key={field.label}>
              <div className="label">{field.label}</div>
              <div className="value">{field.value}</div>
            </div>
          ))}
        </div>
      </header>

      {project.blocks.map((block) => (
        <section className="cs-block wrap" key={block.heading}>
          <h2>{block.heading}</h2>
          {block.kind === "prose" && (
            <div className="body">
              {block.paragraphs.map((paragraph, i) => (
                <RichParagraph key={i} runs={paragraph} />
              ))}
            </div>
          )}
          {block.kind === "list" && (
            <ul>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {block.kind === "visuals" && (
            <div className="shot-grid">
              {block.items.map((item) => (
                <div className="shot" key={item}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </section>
      ))}

      <div className="cs-nextprev wrap">
        <Link href={project.prevHref}>{project.prevLabel}</Link>
        <Link href={project.nextHref}>{project.nextLabel}</Link>
      </div>
    </>
  );
}
