'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import type { OnboardingFormValues } from '@/lib/types';

interface DashboardTableProps {
  data: OnboardingFormValues[];
}

export default function DashboardTable({ data }: DashboardTableProps) {
  const [selectedArtist, setSelectedArtist] = useState<OnboardingFormValues | null>(null);

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((artist, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{artist.name}</TableCell>
                  <TableCell>
                      <div className="flex flex-wrap gap-1">
                          {artist.categories.map(cat => <Badge key={cat} variant="secondary">{cat}</Badge>)}
                      </div>
                  </TableCell>
                  <TableCell>{artist.location}</TableCell>
                  <TableCell>{artist.feeRange}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setSelectedArtist(artist)}>
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedArtist && (
        <Dialog open={!!selectedArtist} onOpenChange={(isOpen) => !isOpen && setSelectedArtist(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedArtist.name}</DialogTitle>
              <DialogDescription>
                {selectedArtist.categories.join(', ')} based in {selectedArtist.location}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">{selectedArtist.bio}</p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Fee Range: <span className="font-normal">{selectedArtist.feeRange}</span></p>
                <p className="text-sm font-medium">Languages: <span className="font-normal">{selectedArtist.languages.join(', ')}</span></p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
