import { useEffect, useState } from 'react';

const projects = [
  { id: 'meridia', label: '01 / Meridia' },
  { id: 'coming-soon', label: '02 / Coming soon' },
];

export default function ProjectDirectory() {
  const [active, setActive] = useState(projects[0].id);

  useEffect(() => {
    const sections = projects.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-30% 0px -55% 0px' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="project-directory" aria-label="Project directory">
      <span className="eyebrow directory-label">Index</span>
      <ol className="directory-list">
        {projects.map((project) => (
          <li key={project.id}>
            <a className={active === project.id ? 'active' : ''} href={`#${project.id}`} aria-current={active === project.id ? 'true' : undefined}>{project.label}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
