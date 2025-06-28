'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Artist } from '@/lib/types';
import { MapPin, Mic, Disc, Clapperboard, Drama } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArtistCardProps {
  artist: Artist;
  layout?: 'grid' | 'list';
}

const categoryIcons = {
    Singer: <Mic className="w-4 h-4" />,
    DJ: <Disc className="w-4 h-4" />,
    Dancer: <Clapperboard className="w-4 h-4" />,
    Speaker: <Drama className="w-4 h-4" />,
}

export default function ArtistCard({ artist, layout = 'grid' }: ArtistCardProps) {

  const CardLayout = ({ children }: { children: React.ReactNode }) => (
    <Card className={cn("flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1", 
      layout === 'list' ? 'sm:flex-row' : ''
    )}>
      {children}
    </Card>
  )

  const ImageContainer = () => (
    <div className={cn("relative", layout === 'list' ? 'sm:w-1/3' : '')}>
      <Image
        src={artist.image}
        alt={artist.name}
        width={400}
        height={400}
        className={cn(
          "object-cover aspect-square w-full",
          layout === 'list' ? 'sm:h-full rounded-l-lg' : 'rounded-t-lg',
        )}
      />
      <Badge variant="secondary" className="absolute top-2 right-2">{artist.category}</Badge>
    </div>
  )

  const ContentContainer = () => (
    <div className={cn("flex flex-col flex-grow", layout === 'list' ? 'sm:w-2/3' : '')}>
      <CardHeader>
        <CardTitle className="font-headline tracking-tight">{artist.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
            {categoryIcons[artist.category]}
            {artist.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{artist.bio}</p>
        <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{artist.location}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-semibold">{artist.feeRange}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Ask for Quote</Button>
      </CardFooter>
    </div>
  )


  return (
    <CardLayout>
      <ImageContainer />
      <ContentContainer />
    </CardLayout>
  );
}
