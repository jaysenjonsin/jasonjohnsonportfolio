import Link from 'next/link';
import { projects, Project } from '@/lib/projects';

function ProjectList({ items }: { items: Project[] }) {
  return (
    <div className='space-y-8'>
      {items.map((project) => (
        <section key={project.id}>
          <h2 className='font-mono text-md mb-2'>{project.title}</h2>
          <p className='font-mono text-sm leading-relaxed max-w-lg mb-2'>
            {project.description}
          </p>
          <Link
            href={`/project/${project.id}`}
            className='font-mono text-sm hover:underline'
          >
            view work →
          </Link>
        </section>
      ))}
    </div>
  );
}

export default function WorkPage() {
  const workProjects = projects.filter((p) => p.category === 'work');
  const sideProjects = projects.filter((p) => p.category === 'project');

  return (
    <main className='flex-1 py-16'>
      <h1 className='text-3xl font-mono mb-8'>what I've built</h1>
      <ProjectList items={workProjects} />
      <div className='mt-8'>
        <ProjectList items={sideProjects} />
      </div>
    </main>
  );
}
