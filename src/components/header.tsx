import Link from 'next/link';
import { WaveForm } from './wave-form';
import { ThemeToggle } from './theme-toggle';

export const Header = () => {
  return (
    <header className='w-full flex justify-between items-center py-4'>
      <div className='flex items-center space-x-1 sm:space-x-3'>
        <Link href='/' className='font-mono text-sm'>
          Jason Johnson
        </Link>
        <WaveForm />
      </div>
      <nav className='flex items-center space-x-2 sm:space-x-4 font-mono text-sm'>
        <Link href='/work' className='hover:underline'>
          work
        </Link>
        {/* <Link href='/projects' className='hover:underline'>
          projects
        </Link> */}
        <a
          href='/resume.pdf'
          target='_blank'
          rel='noopener noreferrer'
          className='hover:underline'
        >
          resume
        </a>
        <Link href='/about' className='hover:underline'>
          about
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
};
