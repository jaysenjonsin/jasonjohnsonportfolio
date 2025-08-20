import Link from 'next/link';
import { getProjectById } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { ProjectCarousel } from '@/components/project-carousel';
export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <main className='flex-1 py-16'>
      <div className='mb-8'>
        <Link href='/work' className='font-mono text-sm hover:underline'>
          ← back
        </Link>
      </div>

      <article className='space-y-8'>
        <header>
          <h1 className='text-3xl font-mono mb-2'>{project.title}</h1>
          <p className='font-mono text-sm text-muted-foreground'>
            {project.year}
          </p>
        </header>

        <div className='space-y-4'>
          <ProjectCarousel project={project} />
          <p className='font-mono text-sm leading-relaxed'>
            {project.longDescription}
          </p>
          <div>
            <h3 className='font-mono text-xs mb-2'>Technologies</h3>
            <div className='flex flex-wrap gap-1'>
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className='font-mono text-xs px-2 py-1 border border-border rounded-sm'
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className='pt-8 space-y-2'>
            {project.githubUrl && (
              <div>
                <Link
                  href={project.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-mono text-sm hover:underline inline-flex items-center'
                >
                  — view on github
                </Link>
              </div>
            )}

            {project.liveUrl && (
              <div>
                <Link
                  href={project.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-mono text-sm hover:underline inline-flex items-center'
                >
                  — view live site
                </Link>
              </div>
            )}
            {project.articleUrl && (
              <div>
                <Link
                  href={project.articleUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-mono text-sm hover:underline inline-flex items-center'
                >
                  — read article
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
