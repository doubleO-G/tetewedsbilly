import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Heart, Camera, Music, Car, Gift, Utensils, Palette, Users } from "lucide-react";

const supportCategories = [
  { id: "photography", name: "Photography", icon: Camera, description: "Capture beautiful moments" },
  { id: "music", name: "Music & Entertainment", icon: Music, description: "DJ, live music, or entertainment" },
  { id: "transportation", name: "Transportation", icon: Car, description: "Transport for guests or couple" },
  { id: "catering", name: "Food & Catering", icon: Utensils, description: "Meals, snacks, or beverages" },
  { id: "decoration", name: "Decoration & Styling", icon: Palette, description: "Flowers, centerpieces, or styling" },
  { id: "coordination", name: "Event Coordination", icon: Users, description: "Help with planning and coordination" },
  { id: "items", name: "Items & Gifts", icon: Gift, description: "Specific items or equipment needed" },
  { id: "other", name: "Other Services", icon: Heart, description: "Any other way you'd like to help" },
];

const SupportOffersSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    phone: "",
    description: "",
    availability: "",
    contact_preference: "email"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast({
        title: "Please select a category",
        description: "Choose what type of support you'd like to offer",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/support-offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          support_type: selectedCategory
        }),
      });

      if (!response.ok) throw new Error('Failed to submit support offer');

      toast({
        title: "Thank you for your offer!",
        description: "We'll be in touch soon to discuss the details."
      });

      // Reset form
      setSelectedCategory("");
      setFormData({
        guest_name: "",
        guest_email: "",
        phone: "",
        description: "",
        availability: "",
        contact_preference: "email"
      });
    } catch (error) {
      toast({
        title: "Error submitting offer",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Offer Your Support
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond monetary gifts, we'd love your help to make our wedding day special. 
            Choose how you'd like to contribute your talents and services.
          </p>
        </div>

        {/* Support Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {supportCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === category.id 
                    ? "ring-2 ring-primary bg-primary/5" 
                    : "hover:bg-accent/50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Support Offer Form */}
        {selectedCategory && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {React.createElement(
                  supportCategories.find(cat => cat.id === selectedCategory)?.icon || Heart,
                  { className: "h-5 w-5 text-primary" }
                )}
                Offer {supportCategories.find(cat => cat.id === selectedCategory)?.name}
              </CardTitle>
              <CardDescription>
                Tell us more about how you'd like to help with our wedding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guest_name">Your Name *</Label>
                    <Input
                      id="guest_name"
                      value={formData.guest_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, guest_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guest_email">Email Address *</Label>
                    <Input
                      id="guest_email"
                      type="email"
                      value={formData.guest_email}
                      onChange={(e) => setFormData(prev => ({ ...prev, guest_email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">What would you like to offer? *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe your offer in detail (equipment, services, experience, etc.)"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">When are you available?</Label>
                  <Textarea
                    id="availability"
                    placeholder="Please let us know your availability (dates, times, duration, etc.)"
                    value={formData.availability}
                    onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_preference">Preferred Contact Method</Label>
                  <Select
                    value={formData.contact_preference}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, contact_preference: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Your Offer"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default SupportOffersSection;