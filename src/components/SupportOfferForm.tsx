import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Music, Car, Utensils, Palette, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const supportCategories = [
  { id: 'photography', name: 'Photography/Videography', icon: Camera, description: 'Capture our special moments' },
  { id: 'music', name: 'Music & Entertainment', icon: Music, description: 'Keep the celebration lively' },
  { id: 'transport', name: 'Transportation', icon: Car, description: 'Help with getting around' },
  { id: 'catering', name: 'Catering & Food', icon: Utensils, description: 'Delicious food for our guests' },
  { id: 'decoration', name: 'Decoration & Flowers', icon: Palette, description: 'Make it beautiful' },
  { id: 'coordination', name: 'Event Coordination', icon: Users, description: 'Help organize the day' },
];

const SupportOfferForm = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    availability: '',
    contact_preference: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      toast({
        title: "Please select a category",
        description: "Choose what type of support you'd like to offer.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/support-offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          support_type: selectedCategory,
          guest_name: formData.name,
          guest_email: formData.email,
          phone: formData.phone,
          description: formData.description,
          availability: formData.availability,
          contact_preference: formData.contact_preference,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit support offer');

      toast({
        title: "Thank you for your offer!",
        description: "We'll be in touch soon to discuss the details.",
      });

      // Reset form
      setSelectedCategory('');
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: '',
        availability: '',
        contact_preference: 'email'
      });
    } catch (error) {
      console.error('Error submitting support offer:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Category Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">What would you like to help with?</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {supportCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id 
                    ? 'ring-2 ring-primary border-primary bg-primary/5' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium text-sm mb-1">{category.name}</h4>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Form */}
      {selectedCategory && (
        <Card>
          <CardHeader>
            <CardTitle>Tell us more about your offer</CardTitle>
            <CardDescription>
              We'd love to learn more about how you can help make our day special
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Describe your offer *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about what you can provide, your experience, equipment available, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Your availability</Label>
                <Textarea
                  id="availability"
                  placeholder="When are you available? Any specific dates or time constraints?"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_preference">Preferred contact method</Label>
                <Select
                  value={formData.contact_preference}
                  onValueChange={(value) => handleInputChange('contact_preference', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="both">Both Email & Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Your Offer"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SupportOfferForm;