"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface FeatureListProps {
  features: string[];
}

const FeatureList: React.FC<FeatureListProps> = ({ features }) => (
  <ul className="space-y-2 text-sm text-gray-700">
    {features.map((feature) => (
      <li key={feature} className="flex items-center gap-2">
        <Check className="h-4 w-4 flex-shrink-0 text-custom-primary" />
        {feature}
      </li>
    ))}
  </ul>
);

interface PlanCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  description,
  price,
  features,
  popular = false,
}) => (
  <div
    className={`relative flex flex-col rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 lg:p-10 ${
      popular ? "border-gray-300 bg-gray-100 ring-2 ring-gray-300" : "border-gray-200"
    }`}
  >
    {popular && (
      <span className="absolute right-4 top-4 rounded-md bg-custom-primary px-2.5 py-0.5 text-xs font-semibold text-white">
        Popular
      </span>
    )}
    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
    <p className="mt-1 text-sm text-gray-500">{description}</p>

    {/* Price */}
    <div className="mt-6 flex items-end gap-1">
      <span className="text-3xl font-bold text-gray-900">{price}</span>
      <span className="text-sm text-gray-500">/ per month</span>
    </div>

    {/* Divider */}
    <hr className="my-6 border-t border-gray-200" />

    {/* Features */}
    <FeatureList features={features} />

    {/* CTA */}
    <Button
      className={`mt-auto w-full text-sm ${
        popular ? "bg-black hover:bg-gray-800 text-white" : "bg-white text-gray-900 hover:bg-gray-100"
      }`}
      variant={popular ? "default" : "outline"}
    >
      Get started for — {price.replace("$", "").trim() === "0" ? "Free" : price}
    </Button>
  </div>
);

const Price: React.FC = () => {
  const plans: PlanCardProps[] = [
    {
      name: "Free",
      description: "Ideal for hobbyists and individuals exploring web app creation.",
      price: "$0",
      features: [
        "NewMode Domain",
        "NewMode Badge",
        "10 Members",
        "5 Spaces",
      ],
    },
    {
      name: "Pro",
      description: "Designed for creators and startups scaling their digital products.",
      price: "$49",
      features: [
        "Unlimited Members",
        "Custom Domain",
        "20 Spaces",
        "25 GB Storage",
        "5 Collaborators",
        "2 Translation Locale",
      ],
      popular: true,
    },
    {
      name: "Business",
      description: "For small creators and freelancers needing more and/or brands, businesses or emerging enterprises growth.",
      price: "$99",
      features: [
        "Unlimited Members",
        "Custom Domain",
        "30 Spaces",
        "50 Collaborators",
        "3 Translation Locale",
        "SEO optimization",
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
           Our Pre-Order Plans
          </h2>
          <p className="mt-2 text-lg text-gray-500">
            Choose the pre-order plan that works for you and enjoy the experience and exclusive benefits of the national cake.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <PlanCard key={plan.name} {...plan} />
          ))}
        </div>
      
        {/* Breakdown table */}
        <div className="mt-16 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-900">Feature</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Free</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Pro</th>
                <th className="px-4 py-3 font-semibold text-gray-900">Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { feature: "Members", free: "10", pro: "Unlimited", business: "Unlimited" },
                { feature: "Custom Domain", free: "-", pro: "✓", business: "✓" },
                { feature: "Spaces", free: "5", pro: "20", business: "30" },
                { feature: "Storage", free: "-", pro: "25 GB", business: "-" },
                { feature: "Collaborators", free: "-", pro: "5", business: "50" },
                { feature: "Translation Locale", free: "-", pro: "2", business: "3" },
                { feature: "SEO optimization", free: "-", pro: "-", business: "✓" },
              ].map((row) => (
                <tr key={row.feature}>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-700">{row.feature}</td>
                  <td className="px-4 py-3 text-gray-600">{row.free}</td>
                  <td className="px-4 py-3 text-gray-600">{row.pro}</td>
                  <td className="px-4 py-3 text-gray-600">{row.business}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Price;
