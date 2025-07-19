"use client";

import { Button } from "@/components/ui/button";
import {
  Leaf,
  Target,
  Shield,
  Bell,
  Users,
  Filter as FilterIcon,
  BarChart2,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    title: "Integration ecosystem",
    description: "Track your progress and motivate your efforts everyday.",
    icon: <Leaf className="size-6" />,
  },
  {
    title: "Goal setting and tracking",
    description: "Set and track goals with manageable task breakdowns.",
    icon: <Target className="size-6" />,
  },
  {
    title: "Secure data encryption",
    description: "Ensure your data's safety with top-tier encryption.",
    icon: <Shield className="size-6" />,
  },
  {
    title: "Customizable notifications",
    description: "Get alerts on tasks and deadlines that matter most.",
    icon: <Bell className="size-6" />,
  },
  {
    title: "Progress Dashboard",
    description: "Track your progress and motivate your efforts everyday.",
    icon: <BarChart2 className="size-6" />,
  },
  {
    title: "Collaborative workspaces",
    description: "Share tasks and progress in a real-time team space.",
    icon: <Users className="size-6" />,
  },
  {
    title: "Intuitive time tracking",
    description: "Track your progress and motivate your efforts everyday.",
    icon: <Clock className="size-6" />,
  },
  {
    title: "Advanced filters",
    description: "Find exactly what you need with custom task filters.",
    icon: <FilterIcon className="size-6" />,
  },
];

 const Features = () => {
  return (
    <section className="bg-custom-primary text-white py-16 px-6 lg:py-16 lg:pb-24">
      <div className="container mx-auto space-y-12 lg:space-y-16">
        {/* Heading row */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div>
            <h1 className="section-title text-white">Our Features</h1>
          <h2 className="max-w-xl text-sm font-light text-white/90 mt-2">
            Be a part of the movement that rewrites the story in classrooms, hearts and <span className="text-gray-200">history</span>.
          </h2>
          </div>
          <Button variant="secondary" className="bg-white text-custom-primary px-8 w-full sm:w-auto">
            Join the Community
          </Button>
        </div>

        {/* Features grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feat) => (
            <div key={feat.title} className="space-y-4">
              <div className="text-white">{feat.icon}</div>
              <h3 className="font-semibold text-base lg:text-lg">{feat.title}</h3>
              <p className="text-sm text-white/90 leading-relaxed">{feat.description}</p>
              <Link href="#" className="inline-flex items-center gap-1 text-sm font-medium hover:underline underline-offset-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;