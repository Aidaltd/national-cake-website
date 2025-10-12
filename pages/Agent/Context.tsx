"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CldImage } from 'next-cloudinary';
import { getCloudinaryImage } from '@/lib/cloudinary';

interface CardItem {
  title: string;
  description: string;
  color: string;
}

const cards: CardItem[] = [
  {
    title: "A real income: ₦2,500 per box",
    description:
      "Earn a tangible commission on every National Cake box sold. Turn your network into steady, meaningful revenue.",
    color: "bg-red-100",
  },
  {
    title: "A real purpose: Educate. Connect. Inspire.",
    description:
      "Share stories and spark conversations that celebrate unity, culture, and possibility. Your voice can ignite change.",
    color: "bg-green-100",
  },
  {
    title: "A real legacy: Bring history home",
    description:
      "Deliver a piece of Nigerian heritage to families nationwide— preserving traditions for future generations.",
    color: "bg-yellow-100",
  },
  {
    title: "A real fulfillment: Reignite the Nigerian fire.",
    description:
      "Play your part in rebuilding national pride and optimism, one delicious slice at a time.",
    color: "bg-blue-100",
  },
];

export default function Context() {
  const communityHeroCloud = getCloudinaryImage('DSC155');
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-neutral-950 text-white">
      <div className="container mx-auto px-6 md:px-10 space-y-10">
        {/* Heading */}
        <div className="max-w-4xl space-y-6">
          <h2 className="section-title text-white ">
            Sell Something That Changes Lives, Bake Tomorrow ... Earn
            Today.
          </h2>
          <p className="section-description text-base text-gray-200 max-w-xl md:text-sm">
            This is nation-building for profit. Whether you are an entrepreneur, teacher, trainer, coach,
            faith-based leader, youth leader, side-hustler, changemaker or public servant.
          </p>
        </div>

        {/* Hero image */}
        <div className="mt-10">
          {communityHeroCloud ? (
            <CldImage
              src={communityHeroCloud.url}
              alt="National Cake"
              width={1200}
              height={450}
              className="w-full rounded-lg object-cover object-center h-64 sm:h-80 lg:h-[450px] border border-gray-400"
            />
          ) : null}
        </div>

        {/* Cards title */}
        <div className="space-y-10">
          <h3 className="text-3xl font-semibold text-white">
            National Cake offers you something rare:
          </h3>

          {/* Card grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                className={`${card.color} relative overflow-hidden rounded-2xl p-6 py-10 text-gray-900 shadow-lg`}
              >
                {/* Arrow icon */}
                <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <h4 className="text-lg font-bold mb-2">
                  {card.title}
                </h4>
                <p className="text-sm md:text-base leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }} layout className="pt-8 flex justify-center">

          <Button asChild size="lg" className="px-10 py-6 text-base rounded-xl">
            <a href="https://paystack.shop/pay/macro-agent" target="_blank" rel="noopener noreferrer">
            Become an AGENT TODAY
          </a>
          </Button>

        </motion.div>
      </div>



      {/* Subtle gradient ring */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-custom-primary/10 to-transparent" />
    </section>
  );
}
