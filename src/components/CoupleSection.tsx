import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

const CoupleSection = () => {
  // Static data for the couple
  const brideImage = "/lovable-uploads/844889cc-938c-48df-9c4c-c9759d8df09d.png";
  const groomImage = "/lovable-uploads/556a9819-b0ba-4433-8264-339ce85c07f6.png";
  const brideDescription = "Stacey is a dedicated psychologist and behavior analysis coach, passionate about making a difference in the lives of children with special needs. With a calm, organized demeanor and a thoughtful personality, she brings a unique blend of structure, empathy, and deep attentiveness creating safe, nurturing environments where growth and healing can truly begin. ";
  const groomDescription = "Richard is an accountant by profession, but creativity is where his heart truly comes alive. He's the founder of a growing design, branding, and printing business in Nairobi, where he turns ideas into bold, beautiful visuals. Whether it's crafting logos, designing prints, or building brand identities, Richard brings passion and precision to every project. Outside the creative world, he's a music minister through musical instruments and song. With a balance of structure, artistry, and faith, Richard wears many hats—and wears them well.";

  return (
    <section className="py-8 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
            Meet Stacey & Richard
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get to know the beautiful couple whose special day you're helping to make perfect
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bride Card */}
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-square bg-secondary/50 overflow-hidden">
                <img 
                  src={brideImage} 
                  alt="Stacey - Beautiful bride-to-be" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif text-primary mb-4 text-center">Stacey</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    {brideDescription}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Groom Card */}
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="aspect-square bg-secondary/50 overflow-hidden">
                <img 
                  src={groomImage} 
                  alt="Richard - Handsome groom-to-be" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif text-primary mb-4 text-center">Richard</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    {groomDescription}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Love Story Section */}
        <div className="mt-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-primary mb-4">Our Love Story</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Together, Stacey and Richard complement each other beautifully—her structured, empathetic approach to helping others paired with his creative vision and musical heart. Their shared faith and commitment to making a positive impact in their community has brought them together in love, and now they're ready to embark on the greatest adventure of all: marriage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
