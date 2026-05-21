"use client";

import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function WeddingRegistryApp() {
  const categories = [
    "Cocina",
    "Electrodomésticos",
    "Dormitorio",
    "Baño",
    "Organización",
    "Patio",
    "Gustos",
  ];
const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Juego de Vajilla",
      store: "Tiendas Vesta",
      address: "Av. Rafael Núñez 4252, Córdoba",
      image:
        "https://images.unsplash.com/photo-1516685018646-549d52e3f1d3?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.mercadolibre.com.ar/",
      purchased: true,
      purchasedBy: "Familia Pérez",
      category: "Cocina",
    },
    {
      id: 2,
      title: "Cafetera",
      store: "Mercado Libre",
      address: "Compra online",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.mercadolibre.com.ar/",
      purchased: false,
      purchasedBy: null,
      category: "Electrodomésticos",
    },
    {
      id: 3,
      title: "Juego de Sábanas",
      store: "Blanco Store",
      address: "Villa Allende Shopping, Córdoba",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      link: "https://www.mercadolibre.com.ar/",
      purchased: false,
      purchasedBy: null,
      category: "Dormitorio",
    },
  ]);
useEffect(() => {
  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      if (!querySnapshot.empty) {
        const firebaseProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(firebaseProducts as any);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  loadProducts();
}, []);
const markAsPurchased = async (id: string) => {
  try {
    await updateDoc(doc(db, "products", id), {
      purchased: true,
      purchasedBy: "Reservado",
    });

    setProducts((prev: any) =>
      prev.map((product: any) =>
        product.id === id
          ? {
              ...product,
              purchased: true,
              purchasedBy: "Reservado",
            }
          : product
      )
    );
  } catch (error) {
    console.log(error);
  }
};
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-2xl">
      Cargando lista...
    </div>
  );
}
  return (
    <div className="min-h-screen bg-[#f7f1ea] text-[#4f3c33]">
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,#d8c2ae,transparent_60%)]" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="uppercase tracking-[0.35em] text-sm mb-4 text-[#8c6f5d]">
            19 de diciembre de 2026 • Córdoba, Argentina
          </p>

          <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
            Lourdes & Rodrigo
          </h1>

          <div className="w-24 h-[1px] bg-[#b79d8b] mx-auto mb-8" />

          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-[#6b5548]">
            Lo más importante para nosotros es compartir este momento con
            ustedes. No hace falta ningún regalo, pero si desean ayudarnos a
            construir nuestro hogar, armamos esta lista.
          </p>

          <div className="mt-10 mb-12">
            <div className="inline-flex flex-col items-center rounded-[30px] bg-white/70 backdrop-blur border border-[#e5d3c7] px-10 py-6 shadow-sm">
              <p className="uppercase tracking-[0.3em] text-xs text-[#a08372] mb-3">
                Faltan
              </p>

              <div className="flex items-center gap-6 text-center">
                <div>
                  <p className="text-4xl font-serif">214</p>
                  <span className="text-xs uppercase tracking-widest text-[#9a7d6b]">
                    días
                  </span>
                </div>

                <div>
                  <p className="text-4xl font-serif">7</p>
                  <span className="text-xs uppercase tracking-widest text-[#9a7d6b]">
                    meses
                  </span>
                </div>

                <div>
                  <p className="text-4xl font-serif">30</p>
                  <span className="text-xs uppercase tracking-widest text-[#9a7d6b]">
                    semanas
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <div
                key={category}
                className="rounded-full border border-[#d8c2b3] bg-white/70 backdrop-blur px-5 py-3 text-sm tracking-wide shadow-sm"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-[32px] bg-white shadow-xl shadow-[#dccabd40] border border-[#ead7ca]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="h-80 w-full object-cover"
              />

              <div className="p-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#f5ebe3] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#8d6d5b]">
                    {product.category}
                  </span>

                  {product.purchased ? (
                    <span className="text-green-700 text-sm font-medium">
                      Comprado ✓
                    </span>
                  ) : (
                    <span className="text-[#a08372] text-sm">
                      Disponible
                    </span>
                  )}
                </div>

                <h3 className="text-3xl font-serif mb-3">
                  {product.title}
                </h3>

                <div className="text-sm text-[#7b6659] mb-5 space-y-1">
                  <p className="font-medium">
                    {product.store}
                  </p>

                  <p>
                    {product.address}
                  </p>
                </div>

                {product.purchasedBy && (
                  <div className="mb-5 rounded-2xl bg-[#f6efe9] border border-[#ead7ca] px-4 py-3 text-sm text-[#6b5548]">
                    Comprado por {product.purchasedBy}
                  </div>
                )}

                <div className="flex gap-3">
                  <a
                    href={product.link}
                    target="_blank"
                    className="flex-1 rounded-2xl bg-[#8f715f] hover:bg-[#7b6051] transition-all text-white py-4 text-center text-sm tracking-wide"
                  >
                    Ver producto
                  </a>

                  <button
  disabled={product.purchased}
  onClick={() => markAsPurchased(String(product.id))}
  className={`flex-1 rounded-2xl py-4 text-sm tracking-wide transition-all ${
    product.purchased
      ? "bg-green-700 text-white cursor-not-allowed"
      : "border border-[#d8c2b3] hover:bg-[#f6efe9]"
  }`}
>
  {product.purchased
    ? "Ya fue comprado ✓"
    : "Ya lo compré"}
</button>
</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto rounded-[40px] bg-white border border-[#ead7ca] p-10 shadow-xl shadow-[#d9c7ba40]">
          <p className="uppercase tracking-[0.3em] text-xs text-[#a08372] mb-3">
            Aporte económico
          </p>

          <h3 className="text-4xl font-serif mb-6">
            Nuestro futuro hogar
          </h3>

          <p className="text-[#6b5548] leading-relaxed mb-8">
            Si preferís hacernos un regalo de otra forma, te dejamos nuestros
            datos para colaborar con nuestro futuro hogar y nuevos proyectos.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl bg-[#f8f2ed] p-5 border border-[#ead7ca]">
              <p className="uppercase text-xs tracking-[0.25em] text-[#a08372] mb-2">
                Alias en pesos
              </p>

              <p className="text-xl">
                LOURDESYRODRI.CASA
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8f2ed] p-5 border border-[#ead7ca]">
              <p className="uppercase text-xs tracking-[0.25em] text-[#a08372] mb-2">
                Alias USD
              </p>

              <p className="text-xl">
                LOURDESYRODRI.USD
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8f2ed] p-5 border border-[#ead7ca]">
              <p className="uppercase text-xs tracking-[0.25em] text-[#a08372] mb-2">
                Titular
              </p>

              <p className="text-xl">
                Lourdes Actis
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8f2ed] p-5 border border-[#ead7ca]">
              <p className="uppercase text-xs tracking-[0.25em] text-[#a08372] mb-2">
                Banco
              </p>

              <p className="text-xl">
                Banco Galicia
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto rounded-[40px] bg-white border border-[#ead7ca] p-10 text-center shadow-xl shadow-[#d9c7ba40]">
          <h3 className="text-4xl font-serif mb-6">
            Gracias por acompañarnos
          </h3>

          <p className="text-lg leading-relaxed text-[#6b5548] max-w-2xl mx-auto">
            Cada detalle suma muchísimo a esta etapa nueva que estamos
            construyendo juntos ¡Gracias por ser parte y ayudarnos a construir nuestro hogar!
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm uppercase tracking-[0.2em] text-[#9a7d6b]">
            <span>19 de diciembre de 2026</span>
            <span>•</span>
            <span>Córdoba, Argentina</span>
          </div>
        </div>
      </section>
    </div>
  );
}