import { Hero, FullSupport, CareForward, Trust, Office, CTA } from "@/components/sections/home";
// import { Services } from "@/components/sections/home"; // Commented out

export default function Home() {
  return (
    <main>
      <Hero />
      <FullSupport />
      <CareForward />
      {/* <Services /> */}
      <Trust />
      <Office />
      <CTA />
    </main>
  );
}
