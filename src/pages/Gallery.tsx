import { Gallery as GalleryComponent } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <GalleryComponent />
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;