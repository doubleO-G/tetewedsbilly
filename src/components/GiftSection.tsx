import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaystackButton } from "react-paystack";
import { Heart, DollarSign, Camera, Music, Cake, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FundraisingSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  // Replace this with your actual Paystack public key
  // const publicKey = "pk_test_a3634bac32e553d6ad1dd3ea2e2b313ae9701b0c";
  const publicKey = "pk_live_26d843a279fefde54d2771507bb444691f2e5d26";

  // Real-time donation amounts from database
  const [currentAmounts, setCurrentAmounts] = useState({
    pastry: 0,
    photo_video: 0,
    entertainment: 0,
    styling: 0
  });

  // Real-time pledge amounts from database
  const [pledgeAmounts, setPledgeAmounts] = useState({
    pastry: 0,
    photo_video: 0,
    entertainment: 0,
    styling: 0
  });

  // Fetch donation and pledge data from our API
  const fetchAmounts = async () => {
    try {
      // Fetch both donation and pledge amounts
      const [donationResponse, pledgeResponse] = await Promise.all([
        fetch('/api/donations/amounts'),
        fetch('/api/pledges/amounts')
      ]);

      if (donationResponse.ok) {
        const amounts = await donationResponse.json();
        setCurrentAmounts(amounts);
      }

      if (pledgeResponse.ok) {
        const amounts = await pledgeResponse.json();
        setPledgeAmounts(amounts);
      }
    } catch (error) {
      console.error('Error fetching amounts:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchAmounts();

    // Set up polling for updates - faster for live updates
    const interval = setInterval(fetchAmounts, 2000); // Poll every 2 seconds for live updates

    return () => {
      clearInterval(interval);
    };
  }, []);

  const categories = [
    {
      id: "pastry",
      name: "Pastry Services",
      icon: Cake,
      description: "Help us create beautiful wedding cakes and desserts",
      suggestedAmounts: [2000, 5000, 10000, 15000],
      target: 40000,
      current: currentAmounts.pastry,
      pledged: pledgeAmounts.pastry
    },
    {
      id: "photo_video",
      name: "Photo & Video",
      icon: Camera,
      description: "Capture our special moments with professional photography",
      suggestedAmounts: [3000, 8000, 15000, 25000],
      target: 75000,
      current: currentAmounts.photo_video,
      pledged: pledgeAmounts.photo_video
    },
    {
      id: "entertainment",
      name: "MC/DJ/Band",
      icon: Music,
      description: "Keep the celebration alive with great music and entertainment",
      suggestedAmounts: [1500, 4000, 8000, 12000],
      target: 50000,
      current: currentAmounts.entertainment,
      pledged: pledgeAmounts.entertainment
    },
    {
      id: "styling",
      name: "Decor/Tents/Event set up",
      icon: Sparkles,
      description: "Make everything beautiful with professional styling and decor",
      suggestedAmounts: [2500, 5000, 10000, 18000],
      target: 65000,
      current: currentAmounts.styling,
      pledged: pledgeAmounts.styling
    }
  ];

  const handlePaystackSuccess = async (reference: any) => {
    // Save the donation to the database
    const donationData = {
      donor_name: name,
      donor_email: email,
      amount: parseInt(amount),
      category: selectedCategory,
      message: message || null,
      paystack_reference: reference.reference,
      status: 'completed'
    };

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error('Failed to save donation');
      }

      toast({
        title: "Donation Successful!",
        description: `Thank you for contributing to our ${categories.find(c => c.id === selectedCategory)?.name}! We truly appreciate your support.`,
      });
      
      // Immediately refresh BOTH donation and pledge amounts for live updates
      fetchAmounts();
    } catch (error) {
      console.error('Error saving donation:', error);
      toast({
        title: "Payment Successful, but...",
        description: "Your payment was successful but there was an issue recording it. Please contact support with your reference: " + reference.reference,
        variant: "destructive",
      });
    }
    
    // Reset form and close modal
    setAmount("");
    setEmail("");
    setName("");
    setPhone("");
    setMessage("");
    setSelectedCategory("");
    setIsModalOpen(false);
  };

  const handlePaystackClose = () => {
    toast({
      title: "Payment Cancelled",
      description: "Your donation was not completed.",
      variant: "destructive",
    });
  };

  const componentProps = {
    email,
    amount: parseInt(amount) * 100, // Paystack expects amount in cents
    currency: "KES", // Kenyan Shillings
    channels: ['card', 'mobile_money'], // Enable mobile money for Kenya
    metadata: {
      name,
      phone,
      message,
      category: selectedCategory,
      custom_fields: [
        {
          display_name: "Donor Name",
          variable_name: "donor_name",
          value: name,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone",
          value: phone,
        },
        {
          display_name: "Category",
          variable_name: "category",
          value: categories.find(c => c.id === selectedCategory)?.name || "",
        },
        {
          display_name: "Message",
          variable_name: "message",
          value: message,
        },
      ],
    },
    publicKey,
    text: `Give KSh ${amount ? parseInt(amount).toLocaleString() : '0'}`,
    onSuccess: handlePaystackSuccess,
    onClose: handlePaystackClose,
  };

  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">
            Help Us Make Our Dream Wedding Come True
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your support means the world to us! Choose a category below to help fund our special day. 
            Every contribution, no matter the size, brings us closer to the wedding of our dreams.
          </p>
        </div>

        {/* Category Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
                }`}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setIsModalOpen(true);
                }}
              >
                <CardContent className="p-6 text-center">
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>KSh {(category.current + category.pledged).toLocaleString()}</span>
                      <span>KSh {category.target.toLocaleString()}</span>
                    </div>
                    
                    {/* Dual-color progress bar */}
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      {/* Actual donations (solid fill) */}
                      <div 
                        className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
                        style={{ 
                          width: `${Math.min((category.current / category.target) * 100, 100)}%` 
                        }}
                      />
                      {/* Pledges (striped pattern over donations + pledges) */}
                      <div 
                        className="absolute left-0 top-0 h-full bg-secondary/60 transition-all duration-500"
                        style={{ 
                          width: `${Math.min(((category.current + category.pledged) / category.target) * 100, 100)}%`,
                          background: `repeating-linear-gradient(
                            45deg,
                            hsl(var(--secondary)) 0px,
                            hsl(var(--secondary)) 4px,
                            transparent 4px,
                            transparent 8px
                          )`
                        }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-primary font-medium">
                            KSh {category.current.toLocaleString()} donated
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-secondary rounded-full"></div>
                          <span className="text-secondary-foreground">
                            KSh {category.pledged.toLocaleString()} pledged
                          </span>
                        </div>
                      </div>
                      <div className="text-primary font-medium">
                        {Math.round(((category.current + category.pledged) / category.target) * 100)}% total
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Donation Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <Heart className="w-6 h-6 text-primary" />
                Contribute to {selectedCategoryData?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="254712345678 (include country code)"
                />
              </div>

               <div>
                 <Label htmlFor="amount">Donation Amount (KSh)</Label>
                 <Input
                   id="amount"
                   type="number"
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   placeholder="Enter amount"
                 />
                 <div className="flex flex-wrap gap-2 mt-3">
                   {selectedCategoryData?.suggestedAmounts.map((quickAmount) => (
                     <Button
                       key={quickAmount}
                       variant="outline"
                       size="sm"
                       onClick={() => setAmount(quickAmount.toString())}
                       className="text-xs"
                     >
                       KSh {quickAmount.toLocaleString()}
                     </Button>
                   ))}
                 </div>
               </div>

              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your wishes for Stacey & Richie..."
                  rows={3}
                />
              </div>

              <div className="pt-4 space-y-3">
                {amount && email && name && phone && selectedCategory ? (
                  <>
                    <Button
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 px-6 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors"
                      onClick={async () => {
                        // Save pledge to database and Google Sheets
                        try {
                          const pledgeData = {
                            pledger_name: name,
                            pledger_email: email,
                            pledger_phone: phone,
                            amount: parseInt(amount),
                            category: selectedCategory,
                            message: message || null,
                            currency: 'KES'
                          };

                          const response = await fetch('/api/pledges', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(pledgeData),
                          });

                          if (!response.ok) {
                            throw new Error('Failed to save pledge');
                          }

                          toast({
                            title: "Pledge Recorded!",
                            description: `Thank you for pledging KSh ${parseInt(amount).toLocaleString()}. We'll contact you with payment details.`,
                          });
                          
                          // Immediately refresh BOTH donation and pledge amounts for live updates
                          fetchAmounts();
                        } catch (error) {
                          console.error('Error saving pledge:', error);
                          toast({
                            title: "Error!",
                            description: "Failed to save your pledge. Please try again.",
                            variant: "destructive",
                          });
                        }
                        
                        setIsModalOpen(false);
                        // Reset form
                        setAmount("");
                        setEmail("");
                        setName("");
                        setPhone("");
                        setMessage("");
                      }}
                    >
                      <Heart className="w-5 h-5" />
                      Pledge Now - KSh {parseInt(amount).toLocaleString()}
                    </Button>
                    <div onClick={() => setIsModalOpen(false)}>
                      <PaystackButton
                        {...componentProps}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <DollarSign className="w-5 h-5" />
                        Pay Now - KSh {parseInt(amount).toLocaleString()}
                      </PaystackButton>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Button disabled className="w-full" size="lg">
                      Please fill all required fields (name, email, phone, amount)
                    </Button>
                    <Button disabled className="w-full" size="lg" variant="outline">
                      Please fill all required fields (name, email, phone, amount)
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default FundraisingSection;
