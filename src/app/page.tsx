import { ThemeToggle } from '@/components/theme-toggle';
import { projects } from '@/lib/projects';
import Link from 'next/link';
export default function Home() {
  return (
    <main className='flex-1 py-16'>
      <section className='mb-16'>
        <h1 className='text-3xl font-mono mb-8'> Hi, I'm Jason.</h1>
        <p className='font-mono text-sm leading-relaxed max-w-lg'>
          I'm a Full Stack Developer focused on building responsive, accessible,
          and performant web applications with modern technologies. Currently @
          Glassdoor.
        </p>
      </section>

      <section className='mb-16'>
        <ul className='font-mono text-sm space-y-2'>
          {projects
            .filter((project) => project.onHomepage)
            .map((project) => (
              <li key={project.id}>
                <Link
                  href={`/project/${project.id}`}
                  className='hover:underline'
                >
                  — {project.title}
                </Link>
              </li>
            ))}
        </ul>
      </section>
      <section>
        <ul className='font-mono text-sm space-y-2'>
          <li>
            <Link
              href='https://linkedin.com/in/jasoncjohnson5'
              className='hover:underline inline-flex items-center'
            >
              — LinkedIn
            </Link>
          </li>
          <li>
            <Link
              href='https://github.com/jaysenjonsin'
              className='hover:underline inline-flex items-center'
            >
              — GitHub
            </Link>
          </li>
          <li>
            <Link
              href='mailto:jasoncjohnson626@gmail.com'
              className='hover:underline inline-flex items-center'
            >
              — email
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
