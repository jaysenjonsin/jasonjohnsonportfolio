import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';

export default function About() {
  return (
    <main className='flex-1 py-16'>
      <h1 className='text-3xl font-mono mb-8'>about me</h1>
      <div className='font-mono text-sm leading-relaxed max-w-lg mb-16'>
        When I'm not coding, you can find me reading, gymming, making music or
        going to the movies!
      </div>
      <section className='mb-16'>
        <h2 className='font-mono text-sm mb-4'>skills</h2>
        <div className='space-y-4'>
          <div>
            <h3 className='font-mono text-xs mb-2'>languages</h3>
            <div className='flex flex-wrap gap-1'>
              {[
                'TypeScript',
                'JavaScript(ES6)',
                'Python',
                'HTML/CSS',
                'Ruby',
              ].map((skill) => (
                <span
                  key={skill}
                  className='font-mono text-xs px-2 py-1 border border-border rounded-sm'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className='font-mono text-xs mb-2'>libraries/frameworks</h3>
            <div className='flex flex-wrap gap-1'>
              {[
                'React',
                'Next.js',
                'Node.js',
                'Express',
                'GraphQL',
                'Tailwind',
                'SCSS',
                'MUI',
                'Bootstrap',
              ].map((skill) => (
                <span
                  key={skill}
                  className='font-mono text-xs px-2 py-1 border border-border rounded-sm'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className='font-mono text-xs mb-2'>
              development tools/platforms
            </h3>
            <div className='flex flex-wrap gap-1'>
              {['Git', 'GitHub', 'Vercel', 'Netlify', 'VS Code', 'Figma'].map(
                (skill) => (
                  <span
                    key={skill}
                    className='font-mono text-xs px-2 py-1 border border-border rounded-sm'
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className='font-mono text-xs mb-2'>databases</h3>
            <div className='flex flex-wrap gap-1'>
              {[
                'SQL',
                'NoSQL',
                'PostgreSQL',
                'MongoDB',
                'Redis',
                'Supabase',
                'Firebase',
              ].map((skill) => (
                <span
                  key={skill}
                  className='font-mono text-xs px-2 py-1 border border-border rounded-sm'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
