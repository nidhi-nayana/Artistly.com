import { z } from 'zod';

export const categories = ['Singer', 'Dancer', 'Speaker', 'DJ'] as const;
export const languages = ['English', 'Spanish', 'French', 'German', 'Hindi'] as const;
export const feeRanges = ['$100 - $500', '$500 - $1000', '$1000 - $2500', '$2500+'] as const;

export type ArtistCategory = typeof categories[number];
export type Language = typeof languages[number];
export type FeeRange = typeof feeRanges[number];


export interface Artist {
  id: string;
  name: string;
  category: ArtistCategory;
  location: string;
  feeRange: FeeRange;
  bio: string;
  image: string;
  languages: Language[];
}

export const onboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  bio: z.string().min(20, "Bio must be at least 20 characters long.").max(500, "Bio must be less than 500 characters."),
  categories: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one category.",
  }),
  languages: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one language.",
  }),
  feeRange: z.string({
    required_error: "A fee range is required.",
  }),
  location: z.string().min(2, "Location must be at least 2 characters long."),
  profileImage: z.any().optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
