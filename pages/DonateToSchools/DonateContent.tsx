"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe, Heart, Shield, Users, Landmark, Target } from "lucide-react";
import Link from "next/link";

/* ── Sub-component: Introduction ── */
function IntroSection() {
  return (
    <div className="w-full mx-auto text-center space-y-8 py-12">
      <div className="inline-flex items-center gap-2 px-4 py-2  bg-custom-primary/10 text-custom-primary font-semibold text-sm mb-4">
        <Heart className="w-4 h-4" /> The Greatest Tragedy
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
        A People Without History <br className="hidden md:block" />
        <span className="text-custom-primary">Become a People Without Direction</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-6xl mx-auto">
        Our greatest tragedy as a nation today is that children and adults alike know foreign heroes, but can't name the heroes who built their own nation. History has disappeared from our homes, our schools, and our everyday conversations.
      </p>
      <div className="pt-8">
        <p className="text-2xl font-bold text-gray-900">
          This is why <span className="text-custom-primary">Project GIANT</span> exists.
        </p>
      </div>
    </div>
  );
}

/* ── Sub-component: Project GIANT Intro ── */
function ProjectGiantIntro() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center py-16">
      <div className="relative group">
        <div className="absolute inset-0 bg-custom-primary/20  transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
        <OptimizedImage
          src="/PROJECT_GIANT_GOVERNMENT_SCIENCE_SECONDARY_SCHOOL_MAITAMA_2_rvlf54"
          alt="Project GIANT"
          width={800}
          height={600}
          className="w-full h-[450px] object-cover  shadow-xl relative z-10"
          cloudinary={{ width: 800, quality: "auto" }}
        />
      </div>
      <div className="space-y-8">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">More Than Just The Past</h3>
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            Project GIANT is a national movement to preserve Nigerian history, strengthen national identity, and inspire a new generation through storytelling, learning, play, and meaningful conversations.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg font-medium bg-gray-50 p-4  border-l-4 border-custom-primary">
            History is identity, belonging, and purpose.
          </p>
        </div>
        <div className="space-y-4 text-lg text-gray-700">
          <p>
            Through the National Cake History Box, we are putting Nigeria&apos;s story back into homes, schools, libraries, orphanages, youth centres, and communities across the country.
          </p>
        </div>
        <div className="bg-custom-primary text-white p-6  shadow-lg transform hover:-translate-y-1 transition-transform">
          <p className="font-bold text-xl flex items-start gap-4">
            <Shield className="w-8 h-8 shrink-0 text-yellow-400" />
            Every donated box is a portable classroom, and every conversation becomes an opportunity to awaken pride, responsibility, and citizenship.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-component: Why Your Donation Matters ── */
function WhyDonationMatters() {
  const whyMatters = [
    { text: "Help a child discover Nigerian heroes.", icon: Users },
    { text: "Reconnect families with values that build strong citizens.", icon: Heart },
    { text: "Preserve stories that might otherwise be forgotten.", icon: Landmark },
    { text: "Strengthen the emotional and cultural foundation of our nation.", icon: Globe },
    { text: "Build Civic Intelligence and Patriotic Capital.", icon: Target },
  ];

  return (
    <div className="bg-gray-900 text-white  p-8 md:p-16 shadow-2xl my-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-custom-primary  blur-3xl opacity-20 pointer-events-none"></div>
      <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center relative z-10">
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Your Donation Matters</h2>
            <p className="text-2xl text-gray-300 font-light">You are not simply donating a box.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {whyMatters.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-start gap-4 bg-white/5 p-4  hover:bg-white/10 transition-colors">
                  <div className="bg-custom-primary/20 p-2 ">
                    <Icon className="w-6 h-6 text-custom-primary" />
                  </div>
                  <span className="text-lg text-gray-200">{item.text}</span>
                </div>
              );
            })}
          </div>

          <div className="space-y-6 pt-6 border-t border-white/10">
            <p className="text-xl font-semibold text-white">
              Most importantly, you are helping ensure that the next generation inherits not just a country, but the story that gives meaning to that country.
            </p>
            <p className="text-lg text-gray-400">
              You are gifting knowledge and insight to youths, to understand the mistakes of the past and avoid the traps of yesteryears.
            </p>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10  pointer-events-none"></div>
          <OptimizedImage
            src="PROJECT_GIANT_1_hbej7q"
            alt="Donation impact"
            width={400}
            height={600}
            className="w-[360px] h-[500px] object-cover  shadow-2xl"
            cloudinary={{ width: 400, quality: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Sub-component: Mission & Future ── */
function MissionAndFuture() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start py-16">
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600">
            Over the next two years, Project GIANT aims to place National Cake History Boxes in:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-custom-primary/5 border border-custom-primary/20 p-8  text-center hover:shadow-lg transition-shadow">
            <span className="block text-5xl font-extrabold text-custom-primary mb-2">10K</span>
            <span className="block text-lg font-medium text-gray-800">Schools</span>
          </div>
          <div className="bg-custom-primary/5 border border-custom-primary/20 p-8  text-center hover:shadow-lg transition-shadow">
            <span className="block text-5xl font-extrabold text-custom-primary mb-2">50K</span>
            <span className="block text-lg font-medium text-gray-800">Families</span>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xl text-gray-800 font-semibold">
            Reaching millions of Nigerians home and abroad with the stories that unite us, inspire us, and remind us who we are.
          </p>
          <p className="text-lg text-gray-600 border-l-4 border-gray-300 pl-4">
            The truth is that the future is not inherited; It is taught, shared and remembered. <br /><br />
            <strong>Welcome to Project GIANT…. Preserve our Story, One Box, One Story at a Time.</strong>
          </p>
        </div>
      </div>

      <div className="space-y-8 bg-gray-50 p-8 md:p-10  border border-gray-100 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900">The Power of Your Gift</h2>
        <OptimizedImage
          src="/PROJECT_GIANT_2_toxmmw"
          alt="Donate today"
          width={600}
          height={400}
          className="w-full h-[250px] object-cover  shadow-md mb-6"
          cloudinary={{ width: 600, quality: "auto" }}
        />
        <div className="grid grid-cols-2 gap-4 text-md text-gray-700 font-medium">
          <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-custom-primary shrink-0" /> Preserve history</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-custom-primary shrink-0" /> Inspire a generation</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-custom-primary shrink-0" /> Patriotic capital</div>
          <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-custom-primary shrink-0" /> Strengthen identity</div>
        </div>
        <blockquote className="text-xl italic text-gray-700 font-medium bg-white p-6  shadow-sm border border-gray-100">
          &ldquo;A single donation may place history in a child&apos;s hands. A larger donation may place it in an entire school. A legacy donation may help preserve it for generations.&rdquo;
        </blockquote>
      </div>
    </div>
  );
}

/* ── Sub-component: Donation Details ── */
function DonationDetails() {
  return (
    <div className="relative overflow-hidden  my-16 shadow-2xl">
      <div className="absolute inset-0 bg-custom-primary"></div>
      <div className="relative z-10 p-10 md:p-16 flex flex-col lg:flex-row gap-12 items-center justify-between">

        <div className="text-white max-w-xl space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">Help Nigeria Remember Who She Is</h2>
          <p className="text-xl text-white/90">
            The future of Nigeria will not be built only in government offices or boardrooms alone, it will also be built in schools, homes, and around dinner tables.
          </p>
          <div className="bg-white/10 backdrop-blur-md p-6  border border-white/20">
            <h3 className="text-2xl font-bold mb-4">Become A GIANT Builder</h3>
            <p className="text-white/80 mb-6">
              For corporate sponsorships, institutional partnerships, bulk donations, CSR collaborations, foundation grants, and legacy contributions:
            </p>
            <div className="flex flex-col gap-3 font-semibold">
              <a href="mailto:donation@nationalcake.ng" className="flex items-center gap-3 hover:text-yellow-300 transition-colors">
                <div className="bg-white/20 p-2 "><Globe className="w-5 h-5" /></div> donation@nationalcake.ng
              </a>
              <a href="tel:+2348036126128" className="flex items-center gap-3 hover:text-yellow-300 transition-colors">
                <div className="bg-white/20 p-2 "><Users className="w-5 h-5" /></div> 08036126128
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px] bg-white  p-8 shadow-xl transform hover:scale-[1.02] transition-transform">
          <div className="text-center mb-8">
            <div className="inline-block bg-green-100 text-custom-primary font-bold px-4 py-1  text-sm mb-4">
              DONATION DETAILS
            </div>
            <div className="text-4xl font-extrabold text-gray-900">₦45,000</div>
            <div className="text-gray-500 font-medium mt-1">Per History Box</div>
          </div>

          <div className="space-y-4 bg-gray-50 p-6  border border-gray-100">
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Name</p>
              <p className="font-bold text-gray-900 text-lg">Project GIANT / National Cake Initiative</p>
            </div>
            <div className="h-px bg-gray-200 w-full"></div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Number</p>
              <p className="font-bold text-gray-900 text-lg">1021788685</p>
            </div>
            <div className="h-px bg-gray-200 w-full"></div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Bank Name</p>
              <p className="font-bold text-gray-900 text-lg">UBA</p>
            </div>
            <div className="h-px bg-gray-200 w-full"></div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Account Name</p>
              <p className="font-bold text-gray-900 text-lg">EL-SPICE MEDIA LIMITED</p>
            </div>

            <div className="h-px bg-gray-200 w-full"></div>
            <Link href="https://paystack.com/buy/project-giant" className="w-full">
              <Button className="w-full">Donate Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function DonateContent() {
  return (
    <section className="mx-auto px-4 md:px-12 lg:py-20">
      <IntroSection />
      <ProjectGiantIntro />
      <WhyDonationMatters />
      <MissionAndFuture />
      <DonationDetails />

      {/* Bottom Image */}
      <div className="mx-auto mt-8 mb-16 relative group">
        <div className="absolute inset-0 bg-custom-primary/10  transform translate-x-3 translate-y-3 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
        <OptimizedImage
          src="PROJECT_GIANT_3_fllop1"
          alt="Project GIANT Impact"
          width={1200}
          height={600}
          className="w-full h-[300px] md:h-[500px] object-cover  shadow-xl relative z-10"
          cloudinary={{ width: 1200, quality: "auto" }}
        />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent  pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 z-30 p-8 text-center pointer-events-none">
          <p className="text-2xl md:text-4xl font-bold text-white mb-2">Today, you have an opportunity to become part of that future.</p>
        </div>
      </div>
    </section>
  );
}
