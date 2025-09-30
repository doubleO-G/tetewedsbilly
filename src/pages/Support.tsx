import GiftSection from "@/components/GiftSection";
import SupportOfferForm from "@/components/SupportOfferForm";
import { Button } from "@/components/ui/button";
import { Gift, HandHeart, Home, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/20">

      {/* Navigation Buttons */}
      <section className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <Link to="/meet-couple">
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gift Contribution Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Gift className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-serif text-primary mb-4">
              Gift Contribution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Help us start our journey together with a monetary gift
            </p>
          </div>
          <GiftSection />
        </div>
      </section>

      {/* Offer Support Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HandHeart className="w-12 h-12 text-primary mx-auto mb-3" />
            <h2 className="text-2xl md:text-3xl font-serif text-primary mb-3">
              Offer Support
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Help with services, items, or skills for our wedding
            </p>
          </div>
          <SupportOfferForm />
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif text-primary mb-4">
            Thank You for Your Love & Support
          </h2>
          <p className="text-base text-muted-foreground">
            Every gesture of love and support brings us closer to the wedding of our dreams.
            We are grateful for each of you and the role you play in our journey together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Support;