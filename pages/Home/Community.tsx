"use client";

import Image from "next/image";
import CountUp from "@/components/Animations/count-up";
import { Check, CheckCircle } from "lucide-react";

// temporary assets – replace with real paths later
const COMMUNITY_HERO = "/community.jpg";
const AVATARS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

const Community = () => {
  const bullets = [
    {
      title: "For the Youth:",
      body:
        "it is where you turn curiosity into voice, story into strategy and play into power.",
    },
    {
      title: "For leaders and elders:",
      body:
        "it is your chance to sponsor not a project but a generation, that will change the narrative",
    },
    {
      title: "For faith leaders:",
      body:
        "it is where morality meets memory without preaching, lets change the narrative",
    },
    {
      title: "For our donors:",
      body:
        "it is the platform where patriotism becomes measurable and legacy becomes visible.",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-16 lg:px-12 lg:py-24">
      {/* Header block */}
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto]">
        {/* Heading & description */}
        <div className="space-y-6 max-w-3xl">
          <h2 className="section-title">
            Insights, Into the <span className="text-custom-primary">National Cake’s</span>{" "}
            Developing Community
          </h2>
          <p className="text-sm  text-gray-700 max-w-2xl">
            This is not just a network rather it is Nigeria's first civic revival, disguised as a game, a national oven where a new cake is in progress. This is the living, breathing extension of the game itself.
          </p>
        </div>

        {/* Stat & avatar */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-6 items-start lg:items-end">
          {/* Blog posts */}
          <div className="flex items-baseline gap-2">
            <h3 className="lg:text-5xl text-3xl font-bold">
              <CountUp from={0} to={500} duration={1.2} separator="," className="inline-block " />+
            </h3>
            <span className="text-sm text-gray-600">Blog Posts</span>
          </div>

          {/* Avatar group */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {AVATARS.map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
              Connect With Your People
            </span>
          </div>
        </div>
      </div>

      {/* Hero image */}
      <div className="mt-10">
        <Image
          src={COMMUNITY_HERO}
          alt="Community"
          width={1200}
          height={600}
          className="w-full rounded-lg object-cover h-64 sm:h-80 lg:h-[380px]"
        />
      </div>

      {/* Checklist bullet grid */}
      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {bullets.map((item) => (
          <div key={item.title} className="flex gap-4 items-start">
            <span className="mt-1.5">
              <CheckCircle className="h-6 w-6 text-custom-primary" />
            </span>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg sm:text-xl">{item.title}</h4>
              <p className="text-sm text-gray-700 max-w-md">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Community;