import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { EditorialIntro } from "@/components/sections/EditorialIntro";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { TechnicalDetails } from "@/components/sections/TechnicalDetails";
import { CartDrawer } from "@/components/cart/CartDrawer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <EditorialIntro />
        <ProductGallery />
        <TechnicalDetails />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
