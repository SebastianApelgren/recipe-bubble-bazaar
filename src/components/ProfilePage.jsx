import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ProfilePage = ({ setShowProfile }) => {
  const [profile, setProfile] = useState({
    username: "",
    allergies: "",
    address: "",
    cardHolder: "",
    cardNumber: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the profile data
    console.log("Profile saved:", profile);
    setShowProfile(false);
  };

  return (
    <Card className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="allergies">Allergies</Label>
          <Input
            id="allergies"
            name="allergies"
            value={profile.allergies}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={profile.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="cardHolder">Card Holder Name</Label>
          <Input
            id="cardHolder"
            name="cardHolder"
            value={profile.cardHolder}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            value={profile.cardNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            name="cvv"
            value={profile.cvv}
            onChange={handleChange}
          />
        </div>
        <div className="space-x-2">
          <Button type="submit">Save Profile</Button>
          <Button type="button" variant="outline" onClick={() => setShowProfile(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfilePage;