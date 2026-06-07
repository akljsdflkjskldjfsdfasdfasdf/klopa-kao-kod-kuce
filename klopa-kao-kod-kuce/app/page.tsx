import HeartCursor from "@/components/HeartCursor";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import ClosingSection from "@/components/ClosingSection";

export default function Home() {
  return (
    <>
      <HeartCursor />
      <main className="relative">
        <Hero />
        <Gallery />
        <EventDetails />
        <Countdown />
        <ClosingSection />
      </main>
    </>
  );
}
