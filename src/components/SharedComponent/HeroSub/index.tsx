import React, { FC } from "react";

interface HeroSubProps {
    title: string;
}

const HeroSub: FC<HeroSubProps> = ({ title }) => {

    return (
        <>
     <section className="relative py-24 bg-[url('/images/background/volunteer-bg.jpg')] bg-no-repeat bg-cover lg:mt-40 sm:mt-44 mt-20">

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* Content */}
  <div className="relative container mx-auto lg:max-w-(--breakpoint-xl) px-4">
    <h2 className="text-white md:text-6xl text-4xl font-medium" data-aos="fade-right">
      {title}
    </h2>
  </div>

</section>
        </>
    );
};

export default HeroSub;