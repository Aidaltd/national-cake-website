"use client";

import React from "react";
import clsx from "clsx";

interface TitleBannerProps {
  title: string;
  /**
   * Optional custom class for the outer banner element.
   */
  className?: string;
  /**
   * If true, the title will be centred instead of aligned left.
   */
  center?: boolean;
}

/**
 * Re-usable full-width banner with brand-green background and white title text.
 *
 * Usage:
 * <TitleBanner title="About Us" />
 */
export const TitleBanner: React.FC<TitleBannerProps> = ({ title, className, center }) => {
  return (
    <section
      className={clsx(
        "w-full bg-custom-primary text-white",
        className
      )}
    >
      <div className="container mx-auto px-6">
        <h1
          className={clsx(
            "py-12 sm:py-10 text-3xl sm:text-4xl lg:text-5xl font-semibold",
            center ? "text-center" : "text-left"
          )}
        >
          {title}
        </h1>
      </div>
    </section>
  );
};
