'use client';

import Link from 'next/link';
import type { Artist } from '@/lib/types';
import { artists as allArtists } from '@/lib/data';
import ArtistCard from '@/app/artists/artist-card';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
            Manager Dashboard
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Browse our roster of managed artists.
          </p>
        </div>
        <Button asChild className="mt-4 sm:mt-0">
          <Link href="/onboarding">Add New Artist</Link>
        </Button>
      </div>

      {allArtists && allArtists.length > 0 ? (
        <div className="flex flex-col gap-4">
          {allArtists.map((artist: Artist) => (
            <ArtistCard key={artist.id} artist={artist} layout="list" />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">No Artists Found</h3>
          <p className="text-muted-foreground mt-2">
            There are currently no artists in the roster.
          </p>
        </div>
      )}
    </div>
  );
}
