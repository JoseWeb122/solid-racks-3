import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      sections={[
        { h: "Demonstration only", p: "This website is a concept demonstration of the Solid Racks online store. Products, prices and inventory shown are illustrative samples, not confirmed stock or pricing." },
        { h: "No purchases", p: "Orders placed through the demo checkout are simulated. No contract of sale is formed, no payment is taken and no goods will be delivered." },
        { h: "Imagery", p: "Campaign and product imagery is used for presentation purposes and may not represent final products." },
        { h: "Updates", p: "Full terms of sale and use will be published when the live store launches." },
      ]}
    />
  );
}
