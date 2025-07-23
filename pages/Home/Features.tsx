"use client";

import { Button } from "@/components/ui/button";
import {
  Calendar,
  Award,
  Zap,
  Cake,
  ShoppingBag,
  MessageSquare,
  Plane,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    title: "Events",
    description: "Take part in exciting on-ground and online events that bring our community together.",
    icon: <Calendar className="size-6" />,
  },
  {
    title: "Badges",
    description: "Earn collectible badges as you hit milestones and show off your accomplishments.",
    icon: <Award className="size-6" />,
  },
  {
    title: "Influence Points",
    description: "Rack up points for every contribution and climb to the top of the leaderboards.",
    icon: <Zap className="size-6" />,
  },
  {
    title: "Cake Shop",
    description: "Spend your points on delicious cakes and sweet exclusive goodies in our shop.",
    icon: <Cake className="size-6" />,
  },
  {
    title: "Merchandise",
    description: "Grab exclusive branded merchandise and wear your Cake pride everywhere.",
    icon: <ShoppingBag className="size-6" />,
  },
  {
    title: "Forums & Discussions",
    description: "Join lively discussions, ask questions, and connect with fellow members.",
    icon: <MessageSquare className="size-6" />,
  },
  {
    title: "All-Expense Paid Trips",
    description: "Stand a chance to win fully sponsored trips to cake conventions and experiences.",
    icon: <Plane className="size-6" />,
  },
  {
    title: "Cake Trivia",
    description: "Test your knowledge about the art of cake making and history with our fun trivia challenges.",
    icon: <Cake className="size-6" />,
  },
];

 const Features = () => {
  return (
    <section className="bg-neutral-950 text-white py-16 px-6 lg:py-16 lg:pb-24" id="features">
      <div className="container mx-auto space-y-12 lg:space-y-16">
        {/* Heading row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div>
            <h1 className="section-title text-white">Our Features</h1>
          <h2 className="md:max-w-lg max-w-xl section-description font-light text-white/90 mt-2">
            Be a part of the movement that rewrites the story in classrooms, hearts and <span className="text-gray-200">history</span>.
          </h2>
          </div>
          <Link href="/community">
          <Button variant="secondary" className="bg-white text-custom-primary px-8 w-full sm:w-auto">
            Join the Community
          </Button>
          </Link>
        </div>

        {/* Features grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feat, idx) => {
            const colors = [
              "bg-lime-100 text-black",
              "bg-purple-100 text-black",
              "bg-yellow-100 text-black",
              "bg-sky-100 text-black",
            ];
            const colorClass = colors[idx % colors.length];
            return (
              <div
                key={feat.title}
                className={`relative rounded-lg p-6 shadow-md ${colorClass} hover:-translate-y-1 transition-transform duration-200`}
              >
                {/* arrow icon */}
                <ArrowUpRight className="w-5 h-5 absolute top-4 right-4" />

                <div className="mb-4 text-xl">{feat.icon}</div>
                <h3 className="font-bold text-base lg:text-lg mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4">
                  {feat.description}
                </p>
                <Link href="#" className="inline-flex items-center gap-1 text-sm font-medium underline">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;