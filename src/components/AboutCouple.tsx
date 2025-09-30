import { Button } from "@/components/ui/button";
import joinUsImage from "@/assets/join-us-couple.jpg";

const AboutCouple = () => {
  return (
    <>
      {/* Our Wedding Section */}
      <section className="py-20 px-4 bg-background text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-serif text-primary mb-8 tracking-wide">
            Our Wedding
          </h2>
          <div className="w-24 h-0.5 bg-accent mx-auto mb-12"></div>
          <div className="text-2xl md:text-3xl font-light text-primary mb-4 tracking-wider uppercase">
            Save The Date
          </div>
          <p className="text-lg text-muted-foreground mb-16">
            Saturday 15th November 2025
          </p>
          
          {/* Date details with icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-primary">15</span>
              </div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Day</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-primary">11</span>
              </div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Month</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-primary">25</span>
              </div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Year</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-serif text-primary">♥</span>
              </div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Love</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-serif text-primary mb-8">
                Join Us
              </h2>
              <div className="w-16 h-0.5 bg-accent mb-8"></div>
              <p className="text-lg text-primary mb-4 uppercase tracking-wide font-medium">
                You Are Invited
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Together with our families, we request the pleasure of your company as we exchange vows 
                and celebrate the beginning of our new journey together.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Join us in celebrating this joyful union as we commit to love, honor, and cherish 
                each other for the rest of our lives.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                The ceremony will take place at Gospel Outreach Church Chaka, Nyeri County, followed by a reception, 
                dancing, and celebration at the same place into the evening.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We look forward to celebrating this special moment with you.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-lg overflow-hidden">
                <img 
                  src="/lovable-uploads/8f6cebf4-a6c9-4e8c-bf0e-6b66da25ed41.png" 
                  alt="Stacey and Richie together" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCouple;
