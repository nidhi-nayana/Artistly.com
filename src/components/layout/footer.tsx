'use client';

import { Music, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Footer() {
  return (
    <footer className={cn("border-t border-white/10")}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Music className="h-6 w-6 text-primary" />
            <span className="font-brand text-2xl">Artistly</span>
          </div>
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            Made with <span className="text-primary">❤️</span> by Nidhi
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
