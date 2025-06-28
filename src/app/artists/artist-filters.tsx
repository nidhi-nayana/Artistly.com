'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { categories, feeRanges } from '@/lib/types';

interface Filters {
  category: string;
  location: string;
  feeRange: string;
}

interface ArtistFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  locations: string[];
}

export default function ArtistFilters({
  filters,
  onFilterChange,
  locations,
}: ArtistFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: keyof Filters) => (value: string) => {
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            name="category"
            value={filters.category}
            onValueChange={handleSelectChange('category')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="text"
            name="location"
            placeholder="Filter by location (e.g. New York)"
            value={filters.location}
            onChange={handleInputChange}
          />
          
          <Select
            name="feeRange"
            value={filters.feeRange}
            onValueChange={handleSelectChange('feeRange')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by fee range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Fee Ranges</SelectItem>
              {feeRanges.map(range => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
