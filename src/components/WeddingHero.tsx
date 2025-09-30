import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-couple-new.jpg";

const WeddingHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-right md:bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="text-center px-4 max-w-4xl mx-auto relative z-10 text-white">
        <div className="mb-12">
          <h2 className="text-6xl md:text-8xl font-serif mb-8 tracking-wider font-bold">
            Stacey & Richie
          </h2>
          
          {/* Date and Venue Box */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Date Info */}
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-accent" />
                <div className="text-left">
                  <p className="text-lg font-semibold">
                    SATURDAY, 15TH<br />
                    NOVEMBER 2025
                  </p>
                </div>
              </div>
              
              {/* Location Info */}
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-accent" />
                <div className="text-left">
                  <p className="text-lg font-semibold">
                    G.O.C. CHAKA<br />
                    NYERI - KENYA
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white/20 text-white border border-white/30 hover:bg-white/30">
              <Link to="/meet-couple">About Us</Link>
            </Button>
            <Button asChild size="lg" className="bg-accent text-white hover:bg-accent/90">
              <Link to="/support">Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingHero;