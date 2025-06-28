import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Disc, Clapperboard, Drama } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/layout/animated-section';

const categoryCards = [
  {
    title: 'Singers',
    icon: <Mic className="w-8 h-8 text-primary" />,
    href: '/artists?category=Singer',
  },
  {
    title: 'DJs',
    icon: <Disc className="w-8 h-8 text-primary" />,
    href: '/artists?category=DJ',
  },
  {
    title: 'Dancers',
    icon: <Clapperboard className="w-8 h-8 text-primary" />,
    href: '/artists?category=Dancer',
  },
  {
    title: 'Speakers',
    icon: <Drama className="w-8 h-8 text-primary" />,
    href: '/artists?category=Speaker',
  },
];

const howItWorksSteps = [
  {
    step: 1,
    title: 'Discover Artists',
    description: 'Browse our diverse catalog of professional performers. Use filters to find the perfect match for your event.',
  },
  {
    step: 2,
    title: 'Request a Quote',
    description: 'Shortlist your favorite artists and send booking inquiries with a single click. It\'s fast, free, and easy.',
  },
  {
    step: 3,
    title: 'Book with Confidence',
    description: 'Connect directly with artists or their managers to finalize details and secure your booking.',
  },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=600&h=400&fit=crop&auto=format', alt: 'Concert with lights', hint: 'concert lights' },
  { src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&h=400&fit=crop&auto=format', alt: 'Singer at microphone', hint: 'singer microphone' },
  { src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=600&h=400&fit=crop&auto=format', alt: 'Dancers on a stage', hint: 'dancers stage' },
  { src: 'https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?q=80&w=600&h=400&fit=crop&auto=format', alt: 'DJ at a party', hint: 'dj party' },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=600&h=400&fit=crop&auto=format', alt: 'Guitarist on stage', hint: 'guitarist stage' },
  { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&h=400&fit=crop&auto=format', alt: 'Audience at a music festival', hint: 'music festival' },
  { src: 'https://images.unsplash.com/photo-1559497936-8ead9f997635?q=80&w=600&h=400&fit=crop&auto=format', alt: 'Speaker at an event', hint: 'event speaker' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=600&h=400&fit=crop&auto=format', alt: 'Crowd at a concert', hint: 'concert crowd' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 sm:py-24 lg:py-32">
          <AnimatedSection triggerOnce={false}>
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground font-headline">
                Find the Perfect Artist for Your Next Event
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
                Artistly is the premier platform for event planners and artist
                managers to connect. Browse, book, and manage performing artists
                with ease.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/artists">Explore Artists</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/onboarding">Join as an Artist</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tight text-center font-headline">
                Browse by Category
              </h2>
            </AnimatedSection>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {categoryCards.map((card, index) => (
                <AnimatedSection key={card.title} delay={`${index * 150}ms`}>
                  <Link href={card.href}>
                    <Card className="text-center hover:shadow-lg transition-shadow duration-300 hover:border-primary/50 cursor-pointer bg-card/50 backdrop-blur-sm h-full">
                      <CardHeader>
                        <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                          {card.icon}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="font-headline">{card.title}</CardTitle>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-3xl font-bold tracking-tight text-center font-headline">
                How Artistly Works
              </h2>
            </AnimatedSection>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {howItWorksSteps.map((step, index) => (
                  <AnimatedSection key={index} delay={`${index * 200}ms`}>
                    <div className="flex flex-col items-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-xl font-bold text-primary font-headline">
                        {step.step}
                      </div>
                      <h3 className="mt-6 text-xl font-semibold font-headline">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Artist Section */}
        <section className="py-16 sm:py-20">
          <AnimatedSection>
            <div className="container mx-auto px-4">
                <div className="bg-primary/90 text-primary-foreground rounded-lg p-8 md:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 backdrop-blur-sm">
                    <div className="w-full lg:w-1/2">
                        <Image
                          src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=600&h=400&fit=crop&auto=format"
                          alt="Featured artist at a concert"
                          width={600}
                          height={400}
                          data-ai-hint="concert crowd"
                          className="rounded-lg shadow-xl"
                        />
                    </div>
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight font-headline">Ready to Elevate Your Event?</h2>
                        <p className="mt-4 text-lg text-primary-foreground/80">
                            From soulful singers to high-energy DJs, our curated selection of artists will make your event unforgettable. Find the perfect talent that aligns with your vision and budget.
                        </p>
                        <div className="mt-6">
                            <Button asChild size="lg" variant="secondary">
                                <Link href="/artists">Find Your Artist Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Image Scroll Section */}
        <section className="py-16 sm:py-20 overflow-hidden">
          <AnimatedSection>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">
                Experience the Vibe
              </h2>
            </div>
          </AnimatedSection>
          <div className="scroller" data-speed="slow">
            <div className="scroller-inner">
              {galleryImages.map((image, index) => (
                <Image
                  key={`gallery-1-${index}`}
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  data-ai-hint={image.hint}
                  className="rounded-lg object-cover aspect-[3/2] w-96 max-w-none"
                />
              ))}
              {galleryImages.map((image, index) => (
                <Image
                  key={`gallery-2-${index}`}
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  data-ai-hint={image.hint}
                  className="rounded-lg object-cover aspect-[3/2] w-96 max-w-none"
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
