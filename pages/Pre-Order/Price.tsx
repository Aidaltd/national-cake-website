"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import productImage from "@/public/Nationalcake-2.jpg";
import Image from "next/image";

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
    avatar: "/DR. HYELADI HARUNA.jpg" 
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-8xl md:px-4">
        <div className="bg-white md:rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image */}
            <div className="w-full lg:w-1/2 bg-gray-100 flex justify-center items-center">
              <div className="w-full h-full">
                <Image src={productImage} alt="National Cake Board Game" className="w-full h-full object-cover" />
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
                  <span className="text-3xl font-bold tracking-tighter text-custom-primary">₦25,000</span>
                  <span className="text-2xl text-gray-500 font-seminbold tracking-tighter line-through">₦30,000</span>
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
                  Preorder Now
                </Button>
              </a>
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
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
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
  );
};

