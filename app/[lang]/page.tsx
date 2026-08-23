import { Hero } from "@/components/sections/Hero";
import { Storitve } from "@/components/sections/Storitve";
import { Demo } from "@/components/sections/Demo";
import { Postopek } from "@/components/sections/Postopek";
import { OMeni } from "@/components/sections/OMeni";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Storitve />
      <Demo />
      <Postopek />
      <OMeni />
      <CTA />
    </>
  );
}
