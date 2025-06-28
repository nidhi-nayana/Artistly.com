import OnboardingForm from './onboarding-form';

export default function OnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
            Join the Artistly Community
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your profile to get discovered by event planners and grow your career.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}
