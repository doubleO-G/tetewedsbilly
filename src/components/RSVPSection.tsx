import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "",
    guests: "1",
    dietaryRestrictions: "",
    message: "",
    needsAccommodation: false,
    phoneNumber: "",
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log("RSVP Data:", formData);
    
    toast({
      title: "RSVP Submitted!",
      description: "Thank you for your response. We can't wait to celebrate with you!",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      attending: "",
      guests: "1",
      dietaryRestrictions: "",
      message: "",
      needsAccommodation: false,
      phoneNumber: "",
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Calendar className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
            RSVP
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please let us know if you'll be joining us for our special day. 
            Your response helps us plan the perfect celebration.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Heart className="w-6 h-6 text-rose-500" />
              We hope you can join us!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label className="text-base font-semibold">Will you be attending? *</Label>
                <RadioGroup 
                  value={formData.attending} 
                  onValueChange={(value) => handleInputChange("attending", value)}
                  className="mt-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">Yes, I'll be there!</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">Sorry, I can't make it</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.attending === "yes" && (
                <>
                  <div>
                    <Label htmlFor="guests">Number of Guests (including yourself)</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <Users className="w-5 h-5 text-muted-foreground" />
                      <RadioGroup 
                        value={formData.guests} 
                        onValueChange={(value) => handleInputChange("guests", value)}
                        className="flex gap-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="one" />
                          <Label htmlFor="one">1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="two" />
                          <Label htmlFor="two">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3" id="three" />
                          <Label htmlFor="three">3</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4" id="four" />
                          <Label htmlFor="four">4+</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="dietary">Dietary Restrictions or Allergies</Label>
                    <Input
                      id="dietary"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                      placeholder="Please let us know of any dietary needs"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accommodation"
                      checked={formData.needsAccommodation}
                      onCheckedChange={(checked) => handleInputChange("needsAccommodation", checked)}
                    />
                    <Label htmlFor="accommodation" className="text-sm">
                      I need help with accommodation recommendations
                    </Label>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="message">Message for the Couple</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Share your wishes, memories, or anything you'd like us to know..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={!formData.name || !formData.email || !formData.attending}
              >
                Submit RSVP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RSVPSection;