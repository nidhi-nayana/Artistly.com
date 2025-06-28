'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { artists as allArtists } from '@/lib/data';
import type { Artist, ArtistCategory, FeeRange, OnboardingFormValues, Language } from '@/lib/types';
import ArtistCard from './artist-card';
import ArtistFilters from './artist-filters';
import { Button } from '@/components/ui/button';
import { List, LayoutGrid } from 'lucide-react';
import useLocalStorage from '@/hooks/use-local-storage';

export default function ArtistListingPage() {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [onboardedArtists] = useLocalStorage<OnboardingFormValues[]>('onboarded-artists', []);

  const [filters, setFilters] = useState({
    category: 'All',
    location: '',
    feeRange: 'All',
  });

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  const combinedArtists = useMemo(() => {
    const newArtists: Artist[] = onboardedArtists.map(formValue => ({
      id: new Date().getTime().toString() + formValue.name,
      name: formValue.name,
      category: formValue.categories[0] as ArtistCategory,
      location: formValue.location,
      feeRange: formValue.feeRange as FeeRange,
      bio: formValue.bio,
      image: 'https://placehold.co/400x400.png',
      languages: formValue.languages as Language[],
    }));
    
    const all = [...allArtists, ...newArtists];
    // Combine and remove potential duplicates based on name and location
    return all.filter((artist, index, self) =>
      index === self.findIndex((a) => a.name === artist.name && a.location === artist.location)
    );
  }, [onboardedArtists]);

  const locations = useMemo(() => {
    return ['All', ...Array.from(new Set(combinedArtists.map(a => a.location)))];
  }, [combinedArtists]);

  const filteredArtists = useMemo(() => {
    return combinedArtists.filter(artist => {
      const categoryMatch =
        filters.category === 'All' || artist.category === filters.category;
      const locationMatch =
        filters.location === '' ||
        artist.location.toLowerCase().includes(filters.location.toLowerCase());
      const feeRangeMatch =
        filters.feeRange === 'All' || artist.feeRange === filters.feeRange;
      return categoryMatch && locationMatch && feeRangeMatch;
    });
  }, [combinedArtists, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
          Discover Our Artists
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Filter by category, location, and fee to find the perfect talent for your event.
        </p>
      </div>

      <div className="mb-8">
        <ArtistFilters
          filters={filters}
          onFilterChange={setFilters}
          locations={locations}
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredArtists.length} of {combinedArtists.length} artists
        </p>
        <div className="hidden sm:flex items-center gap-2">
          <Button variant={layout === 'grid' ? 'default' : 'ghost'} size="icon" onClick={() => setLayout('grid')}>
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button variant={layout === 'list' ? 'default' : 'ghost'} size="icon" onClick={() => setLayout('list')}>
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {filteredArtists.length > 0 ? (
        <div className={layout === 'grid'
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
          : 'flex flex-col gap-4'}>
          {filteredArtists.map(artist => (
            <ArtistCard key={artist.id} artist={artist} layout={layout} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">No Artists Found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}
