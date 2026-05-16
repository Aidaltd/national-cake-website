"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import Head from "next/head";

interface FeatureListProps {
  features: string[];
}
const FeatureList: React.FC<FeatureListProps> = ({ features }) => (
  <ul className="space-y-2 text-sm font-semibold text-custom-primary">
    {features.map((feature) => (
      <li key={feature} className="flex items-start gap-2">
        <span className="text-gray-400">•</span>
        <span className="text-base">{feature}</span>
      </li>
    ))}
  </ul>
);

// Star Rating Component
const StarRating: React.FC<{ rating: number; maxRating?: number }> = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Rating Bar Component
const RatingBar: React.FC<{ rating: number; count: number; total: number }> = ({ rating, count, total }) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-2 text-gray-600">{rating}</span>
      <StarRating rating={1} maxRating={1} />
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-6 text-xs text-gray-500">{count}</span>
    </div>
  );
};

export default function Price() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nationalcake.ng";
  const pagePath = "/Order/Price";
  const pageUrl = `${siteUrl}${pagePath}`;

  const features = [
    'Box — 14" x 14" x 3"',
    'Board — 25.5" x 26"',
    'Spin pads — 5" x 5"',
    'Weight — 20 kg',
    'Components:',
    '1 Board',
    '4 Personal Spin Pads',
    '8 Race Counters (2 Blue, 2 Red, 2 Green & 2 Yellow)',
    '40 Bridge Tokens (20 white & 20 green)',
  ];

  // Mock data for ratings and reviews
  const totalReviews = 50;
  const averageRating = 4.5;
  const ratingBreakdown = [
    { rating: 5, count: 30 },
    { rating: 4, count: 15 },
    { rating: 3, count: 3 },
    { rating: 2, count: 1 },
    { rating: 1, count: 1 },
  ];

  const testimonial = {
    name: "Dr. Hyeladi Haruna",
    rating: 5,
    date: "13 JUL 2025",
    comment: "Every student must have to play this National Cake to pass their exams because it is very strategic. We are learning other people’s history, not our own. I like the idea; I have even benefitted by sitting here. I don’t pay attention to history that much but just going through the timeline, already it is impacting my curiosity.",
    avatar: "/DR-HYELADI-HARUNA.jpg" 
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "National-cake Board Game",
    description:
      "Nigeria’s first civic board game that teaches history, citizenship, and nation-building.",
    image: [`${siteUrl}/Nationalcake-2.jpg`],
    brand: {
      "@type": "Brand",
      name: "National-cake",
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "NGN",
      price: "30000",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.5,
      reviewCount: 50,
    },
  } as const;

  return (
    <>
    <Head>
      <title>Order National-cake Board Game | Price & Availability</title>
      <meta
        name="description"
        content="Order the National-cake Board Game. Nigeria's first civic board game for learning history, citizenship, and nation-building. Limited edition."
      />
      <link rel="canonical" href={pageUrl} />
      {/* Open Graph */}
      <meta property="og:type" content="product" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content="Order National-cake Board Game" />
      <meta property="og:description" content="Nigeria's first civic board game. Limited edition." />
      <meta property="og:image" content={`${siteUrl}/logo1.png`} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Order National-cake Board Game" />
      <meta name="twitter:description" content="Nigeria's first civic board game. Limited edition." />
      <meta name="twitter:image" content={`${siteUrl}/logo1.png`} />
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </Head>
    <section className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-8xl md:px-4">
        <div className="bg-white md:rounded-b-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center">
              <div className="w-full h-full">
                <Image 
                  src="/Nationalcake-28.jpg"
                  alt="National-cake Board Game" 
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  quality={85}
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12">
              {/* Brand */}
              <p className="text-sm text-gray-500 mb-2">Game</p>
              
              {/* Product Title */}
              <h1 className="text-3xl lg:text-4xl tracking-tighter font-bold text-custom-primary mb-4">
              National Cake Board Game (limited Edition)
              </h1>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-bold tracking-tighter text-custom-primary">Price: &nbsp; &nbsp; ₦30,000</span>
                </div>
              </div>

              {/* Product Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Description & Fit</h3>
                <p className="text-base text-gray-600 mb-4">
                If we do not teach ourselves who we are, the world will tell us who we are not. If we do not guide the children through the crossroads, they may lose the road entirely.
                </p>
                <FeatureList features={features} />
              </div> 

              {/* Action Buttons */}
              <a href="https://paystack.com/buy/national-cake" target="_blank" rel="noopener noreferrer">
                <Button className="flex-1 bg-custom-primary w-full hover:bg-custom-primary/90 text-white py-3">
                  Order Now
                </Button>
              </a>
            </div>
          </div>

          {/* Premium Sales Banner */}
          <div className="relative bg-gradient-to-br from-custom-primary via-custom-primary/90 to-custom-primary/80 p-8 lg:p-12 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
            </div>
            
            {/* Premium Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-white text-custom-primary px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                🔥 LIMITED OFFER
              </div>
            </div>

            <div className="relative max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left">
                  <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wider border border-white/30">
                    EXCLUSIVE BULK OFFER
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                    Premium <span className="text-yellow-300">Bulk</span> Pricing
                  </h2>
                  
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Perfect for schools, organizations, and institutions. 
                    <span className="text-yellow-300 font-semibold"> 50+ copies</span> at special rates.
                  </p>

                  {/* Pricing Cards */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex-1">
                      <div className="text-sm text-white/70 mb-1">Regular Price</div>
                      <div className="text-2xl font-bold line-through text-white/60">₦30,000</div>
                    </div>
                    
                    <div className="bg-white text-custom-primary rounded-xl p-4 flex-1 relative shadow-lg">
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-custom-primary text-xs px-2 py-1 rounded-full font-bold">
                        SAVE ₦5,000
                      </div>
                      <div className="text-sm font-semibold mb-1 text-custom-primary">Bulk Price (50+)</div>
                      <div className="text-2xl font-bold text-custom-primary">₦25,000</div>
                    </div>
                  </div>

                  <div className="text-sm text-white/70">
                    Contact us for bulk orders and custom pricing
                  </div>
                </div>

                {/* Right Content - Visual Elements */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Main Badge */}
                    <div className="bg-white text-custom-primary rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2 text-custom-primary">₦25,000</div>
                        <div className="text-sm font-semibold mb-1 text-custom-primary">BULK PRICE</div>
                        <div className="text-xs opacity-80 text-custom-primary">50+ copies</div>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -left-4 bg-yellow-400 text-custom-primary px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                      SAVE ₦5,000
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-yellow-400 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-yellow-400">
                      LIMITED OFFER
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 lg:p-12 bg-gray-50">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 mb-8">
              So, we ask you:
            </h2>
            <ul className="list-disc pl-8 space-y-4 mb-8">
              <li className="text-base"><span className="font-semibold text-custom-primary">Sponsor a state</span> with National cake boxes and become a chapter in our national rebirth.</li>
              <li className="text-base"><span className="font-semibold text-custom-primary">Champion a region </span>with National Cake in every school, and inscribe your name in the chronicles of our civic awakening.</li>
              <li className="text-base"><span className="font-semibold text-custom-primary">Adopt a school </span>with national cake boxes and give a child the gift of belonging.</li>
              <li className="text-base"><span className="font-semibold text-custom-primary">Speak up </span>with National cake boxes from your pulpit, your office, and your boardroom, for unity, for truth, for transformation.</li>
              <li className="text-base"><span className="font-semibold text-custom-primary">Just get a copy</span> for yourself and your loved ones.</li>
            </ul>
          </div>

          <h1 className="lg:text-8xl md:text-6xl text-3xl text-center font-bold tracking-tighter text-gray-900 my-8">DELIVERY ONLY IN <span className="text-custom-primary">ABUJA</span> </h1>

          {/* Rating & Reviews Section */}
          <div className="border-t border-gray-200 p-4 lg:p-12">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 mb-8">Rating & Reviews</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Rating Summary */}
              <div>
                <div className="flex items-end gap-4 mb-6">
                  <div className="text-6xl tracking-tighter font-bold text-gray-900">
                    {averageRating}
                  </div>
                  <div className="pb-2">
                    <div className="text-lg text-gray-600 mb-1">/5</div>
                    <div className="text-sm text-gray-500">({totalReviews} New Reviews)</div>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-2">
                  {ratingBreakdown.map((item) => (
                    <RatingBar 
                      key={item.rating}
                      rating={item.rating}
                      count={item.count}
                      total={totalReviews}
                    />
                  ))}
                </div>
              </div>

              {/* Featured Review */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/DR-HYELADI-HARUNA.jpg"
                      alt={`National-cake - ${testimonial.name}`}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      quality={75}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <span className="text-sm text-gray-500">{testimonial.date}</span>
                    </div>
                    <StarRating rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

