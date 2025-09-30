import { Button } from "@/components/ui/button";

const WeddingDetails = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-primary mb-8 tracking-wide">
          Wedding Venue
        </h2>
        <div className="w-24 h-0.5 bg-accent mx-auto mb-16"></div>
        
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our wedding ceremony will take place at Gospel Outreach Church Chaka, located in the beautiful 
            Nyeri County.
          </p>
        </div>
        
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif text-primary mb-4 uppercase tracking-wide">Location</h3>
            <p className="text-lg text-muted-foreground">Gospel Outreach Church Chaka, Nyeri County</p>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-muted-foreground mb-6">
              We're so pleased to invite you to join us for our special day at this beautiful church 
              in the heart of Nyeri County.
            </p>
            <p className="text-muted-foreground mb-6">
              Our venue is easily accessible by car and public transport from Nyeri town.
            </p>
            <p className="text-muted-foreground mb-8">
              The ceremony and reception will take place at the same venue, making it convenient 
              for all our guests to enjoy the full celebration.
            </p>
            <p className="text-muted-foreground mb-8">
              We look forward to welcoming you on Saturday, November 15th, 2025!
            </p>
          </div>
          
          <div className="text-center mb-12">
            <p className="text-lg text-primary font-medium mb-4">Wedding starts at 10:00 AM</p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 uppercase tracking-wide">
              Visit Website
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;