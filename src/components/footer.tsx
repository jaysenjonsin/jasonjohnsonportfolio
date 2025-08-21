import Link from 'next/link';
import { WaveForm } from './wave-form';

export const Footer = () => {
  return (
    <footer className='w-full flex justify-between items-center py-4'>
      <Link href='/'>
        <p className='font-mono text-sm'>© Jason Johnson</p>
      </Link>
      <WaveForm />
    </footer>
  );
};
