import { Hero } from "@/components/sections/Hero";
import { Storitve } from "@/components/sections/Storitve";
import { Postopek } from "@/components/sections/Postopek";
import { OMeni } from "@/components/sections/OMeni";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Storitve />
      <Postopek />
      <OMeni />
      <CTA />
    </>
  );
}
