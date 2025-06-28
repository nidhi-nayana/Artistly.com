'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { OnboardingFormValues } from '@/lib/types';
import { onboardingSchema, categories, languages, feeRanges } from '@/lib/types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import useLocalStorage from '@/hooks/use-local-storage';
import { useRouter } from 'next/navigation';

const MultiSelectPopover = ({
  items,
  selectedItems,
  onSelect,
  placeholder,
}: {
  items: readonly string[];
  selectedItems: string[];
  onSelect: (value: string) => void;
  placeholder: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate">
            {selectedItems.length > 0
              ? selectedItems.join(', ')
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <div className="flex flex-col p-1">
            {items.map(item => (
            <button
                type="button"
                key={item}
                onClick={() => onSelect(item)}
                className={cn(
                'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                )}
            >
                <Check
                className={cn(
                    'mr-2 h-4 w-4',
                    selectedItems.includes(item) ? 'opacity-100' : 'opacity-0',
                )}
                />
                {item}
            </button>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function OnboardingForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [storedArtists, setStoredArtists] = useLocalStorage<OnboardingFormValues[]>('onboarded-artists', []);
  
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: '',
      bio: '',
      categories: [],
      languages: [],
      feeRange: undefined,
      location: '',
      profileImage: undefined,
    },
  });

  const onSubmit = (data: OnboardingFormValues) => {
    console.log('Form Submitted:', data);
    setStoredArtists([...storedArtists, data]);
    toast({
      title: 'Profile Submitted!',
      description: 'Your artist profile has been successfully created and added to the list.',
    });
    form.reset();
    router.push('/artists');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline">Artist Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name / Stage Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Elena Vox" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your unique talent and experience..."
                      className="resize-y min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A great bio is engaging and highlights your unique qualities.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <MultiSelectPopover
                      items={categories}
                      selectedItems={field.value}
                      onSelect={(currentValue) => {
                        const newValues = field.value.includes(currentValue)
                          ? field.value.filter(v => v !== currentValue)
                          : [...field.value, currentValue];
                        field.onChange(newValues);
                      }}
                      placeholder="Select your categories"
                    />
                    <FormDescription>Select all that apply.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages Spoken</FormLabel>
                    <MultiSelectPopover
                      items={languages}
                      selectedItems={field.value}
                      onSelect={(currentValue) => {
                        const newValues = field.value.includes(currentValue)
                          ? field.value.filter(v => v !== currentValue)
                          : [...field.value, currentValue];
                        field.onChange(newValues);
                      }}
                      placeholder="Select languages"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="feeRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Standard Fee Range</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fee range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {feeRanges.map(range => (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., New York, NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="profileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                    </FormControl>
                    <FormDescription>Optional. A professional headshot works best.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <CardFooter className="p-0 pt-4">
              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create My Profile
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
