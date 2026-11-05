import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { h: "Demo data", p: "This demonstration store does not send any personal information to a server. Your bag, wishlist, recently viewed items and demo account name are stored only in your own browser's local storage." },
        { h: "Forms", p: "Newsletter, contact, account and checkout forms are validated in your browser and are not transmitted. No emails are sent and no payment details are collected." },
        { h: "Clearing your data", p: "You can remove all demo data at any time by clearing your browser's site data for this website." },
        { h: "Launch", p: "A full privacy policy describing how Solid Racks handles customer data will be published when the live store launches." },
      ]}
    />
  );
}
