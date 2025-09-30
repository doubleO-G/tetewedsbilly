import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Users, DollarSign, Heart, Gift } from "lucide-react";
import { Link } from "react-router-dom";

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  category: string;
  message?: string;
  paystackReference?: string;
  status: string;
  createdAt: string;
}

interface Pledge {
  id: string;
  pledgerName: string;
  pledgerEmail: string;
  pledgerPhone?: string;
  amount: number;
  currency: string;
  category: string;
  message?: string;
  status: string;
  createdAt: string;
}

interface SupportOffer {
  id: string;
  guestName: string;
  guestEmail: string;
  supportType: string;
  description: string;
  availability?: string;
  contactPreference: string;
  phone?: string;
  createdAt: string;
}

const Admin = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [supportOffers, setSupportOffers] = useState<SupportOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch donations, pledges, and support offers
        const [donationsRes, pledgesRes, supportRes] = await Promise.all([
          fetch('/api/donations'),
          fetch('/api/pledges'),
          fetch('/api/support-offers')
        ]);

        if (donationsRes.ok) {
          const donationsData = await donationsRes.json();
          setDonations(donationsData);
        }

        if (pledgesRes.ok) {
          const pledgesData = await pledgesRes.json();
          setPledges(pledgesData);
        }

        if (supportRes.ok) {
          const supportData = await supportRes.json();
          setSupportOffers(supportData);
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();
    
    // Set up polling for real-time updates every 3 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalPledges = pledges.reduce((sum, p) => sum + p.amount, 0);

  // Export functions
  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header];
        return `"${String(value || '').replace(/"/g, '""')}"`;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportDonations = () => {
    const headers = ['Donor Name', 'Email', 'Amount (KSh)', 'Category', 'Message', 'Reference', 'Status', 'Date'];
    const exportData = donations.map(d => ({
      'Donor Name': d.donorName,
      'Email': d.donorEmail,
      'Amount (KSh)': d.amount,
      'Category': d.category,
      'Message': d.message || '',
      'Reference': d.paystackReference || '',
      'Status': d.status,
      'Date': new Date(d.createdAt).toLocaleString()
    }));
    exportToCSV(exportData, 'wedding_donations', headers);
  };

  const exportPledges = () => {
    const headers = ['Pledger Name', 'Email', 'Phone', 'Amount (KSh)', 'Category', 'Message', 'Status', 'Date'];
    const exportData = pledges.map(p => ({
      'Pledger Name': p.pledgerName,
      'Email': p.pledgerEmail,
      'Phone': p.pledgerPhone || '',
      'Amount (KSh)': p.amount,
      'Category': p.category,
      'Message': p.message || '',
      'Status': p.status,
      'Date': new Date(p.createdAt).toLocaleString()
    }));
    exportToCSV(exportData, 'wedding_pledges', headers);
  };

  const exportSupportOffers = () => {
    const headers = ['Guest Name', 'Email', 'Phone', 'Support Type', 'Description', 'Availability', 'Contact Preference', 'Date'];
    const exportData = supportOffers.map(s => ({
      'Guest Name': s.guestName,
      'Email': s.guestEmail,
      'Phone': s.phone || '',
      'Support Type': s.supportType,
      'Description': s.description,
      'Availability': s.availability || '',
      'Contact Preference': s.contactPreference,
      'Date': new Date(s.createdAt).toLocaleString()
    }));
    exportToCSV(exportData, 'wedding_support_offers', headers);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-serif text-primary">Wedding Admin Dashboard</h1>
              <p className="text-muted-foreground">Stacey & Richie - November 15, 2025</p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Donations</p>
                  <p className="text-2xl font-bold text-green-600">
                    KSh {totalDonations.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{donations.length} donations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Pledges</p>
                  <p className="text-2xl font-bold text-secondary">
                    KSh {totalPledges.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{pledges.length} pledges</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Support Offers</p>
                  <p className="text-2xl font-bold text-primary">{supportOffers.length}</p>
                  <p className="text-xs text-muted-foreground">services offered</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Gift className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Combined</p>
                  <p className="text-2xl font-bold text-accent">
                    KSh {(totalDonations + totalPledges).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">donations + pledges</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donations">Donations ({donations.length})</TabsTrigger>
            <TabsTrigger value="pledges">Pledges ({pledges.length})</TabsTrigger>
            <TabsTrigger value="support">Support Offers ({supportOffers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-4">
                    <span>Completed Donations</span>
                    <Badge variant="secondary">KSh {totalDonations.toLocaleString()}</Badge>
                  </CardTitle>
                  <Button 
                    onClick={exportDonations}
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export to Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((donation) => (
                        <tr key={donation.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">{new Date(donation.createdAt).toLocaleDateString()}</td>
                          <td className="p-2 font-medium">{donation.donorName}</td>
                          <td className="p-2 text-muted-foreground">{donation.donorEmail}</td>
                          <td className="p-2 font-bold text-green-600">
                            KSh {donation.amount.toLocaleString()}
                          </td>
                          <td className="p-2">
                            <Badge variant="outline">{donation.category}</Badge>
                          </td>
                          <td className="p-2">
                            <Badge variant="default">{donation.status}</Badge>
                          </td>
                          <td className="p-2 max-w-xs truncate" title={donation.message}>
                            {donation.message || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {donations.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No donations yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pledges">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-4">
                    <span>Monetary Pledges</span>
                    <Badge variant="secondary">KSh {totalPledges.toLocaleString()}</Badge>
                  </CardTitle>
                  <Button 
                    onClick={exportPledges}
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export to Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Phone</th>
                        <th className="text-left p-2">Amount</th>
                        <th className="text-left p-2">Category</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pledges.map((pledge) => (
                        <tr key={pledge.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">{new Date(pledge.createdAt).toLocaleDateString()}</td>
                          <td className="p-2 font-medium">{pledge.pledgerName}</td>
                          <td className="p-2 text-muted-foreground">{pledge.pledgerEmail}</td>
                          <td className="p-2">{pledge.pledgerPhone || '-'}</td>
                          <td className="p-2 font-bold text-secondary">
                            KSh {pledge.amount.toLocaleString()}
                          </td>
                          <td className="p-2">
                            <Badge variant="outline">{pledge.category}</Badge>
                          </td>
                          <td className="p-2">
                            <Badge variant="secondary">{pledge.status}</Badge>
                          </td>
                          <td className="p-2 max-w-xs truncate" title={pledge.message}>
                            {pledge.message || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {pledges.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No pledges yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Service & Gift Offers</CardTitle>
                  <Button 
                    onClick={exportSupportOffers}
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export to Excel
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Phone</th>
                        <th className="text-left p-2">Support Type</th>
                        <th className="text-left p-2">Description</th>
                        <th className="text-left p-2">Availability</th>
                        <th className="text-left p-2">Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportOffers.map((offer) => (
                        <tr key={offer.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">{new Date(offer.createdAt).toLocaleDateString()}</td>
                          <td className="p-2 font-medium">{offer.guestName}</td>
                          <td className="p-2 text-muted-foreground">{offer.guestEmail}</td>
                          <td className="p-2">{offer.phone || '-'}</td>
                          <td className="p-2">
                            <Badge variant="outline">{offer.supportType}</Badge>
                          </td>
                          <td className="p-2 max-w-xs truncate" title={offer.description}>
                            {offer.description}
                          </td>
                          <td className="p-2">{offer.availability || '-'}</td>
                          <td className="p-2">
                            <Badge variant="secondary">{offer.contactPreference}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {supportOffers.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No support offers yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;