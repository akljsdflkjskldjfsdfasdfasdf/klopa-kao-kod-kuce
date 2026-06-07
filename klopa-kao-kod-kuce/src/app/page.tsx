import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { DailyDishes } from "@/components/daily-dishes";
import { MenuSection } from "@/components/menu-section";
import { About } from "@/components/about";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <DailyDishes />
        <MenuSection />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
