import CoupleSection from "@/components/CoupleSection";
import { Button } from "@/components/ui/button";
import { Heart, Home, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";

const MeetCouple = () => {
  return (
    <div className="min-h-screen">

      {/* Navigation Buttons */}
      <section className="py-4 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" className="flex items-center gap-2">
                <HandHeart className="w-4 h-4" />
                Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <CoupleSection />

      {/* Call to Action */}
      <section className="py-8 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-serif text-primary mb-4">
            Ready to Support Our Journey?
          </h2>
          <p className="text-base text-muted-foreground mb-6">
            Your love and support mean everything to us as we begin this new chapter together.
          </p>
          <Link to="/support">
            <Button size="lg" className="text-lg px-8 py-4">
              <Heart className="w-5 h-5 mr-2" />
              Support Our Wedding
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MeetCouple;