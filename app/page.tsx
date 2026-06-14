"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

interface Product {
  id: string;
  title: string;
  store: string;
  link: string;
  image?: string;
  purchased?: boolean;
}

export default function WeddingRegistryApp() {
const copiarTexto = (texto: string) => {
  navigator.clipboard.writeText(texto);
  alert("Alias copiado");
};

const marcarComprado = async (id: string) => {
  const confirmar = window.confirm(
    "¿Confirmás que ya compraste este regalo?"
  );

  if (!confirmar) return;

  await updateDoc(doc(db, "products", id), {
    purchased: true,
  });
};
  
  const [productos, setProductos] = useState<Product[]>([]);
  const [diasRestantes, setDiasRestantes] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProductos(data);
      }
    );
const fechaCasamiento = new Date(2026, 11, 19);

const actualizarContador = () => {
  const hoy = new Date();
  const diferencia = fechaCasamiento.getTime() - hoy.getTime();
  const dias = Math.max(
  0,
  Math.ceil(diferencia / (1000 * 60 * 60 * 24))
);
  setDiasRestantes(dias);
};

actualizarContador();
    return () => unsubscribe();
  }, []);

  return (
    <main className="bg-[#f8f2ed] min-h-screen">

      {/* HERO */}

      <section className="relative h-screen w-full overflow-hidden">

        <img
          src="/hero.jpg"
          alt="Lourdes y Rodrigo"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-6">

          <p className="uppercase tracking-[0.4em] text-sm mb-6">
            19 · Diciembre · 2026
          </p>

          <h1 className="font-serif text-6xl md:text-8xl mb-4">
  Lourdes & Rodrigo
</h1>

<p className="max-w-2xl text-lg md:text-xl mt-4 leading-relaxed">
  Estamos muy felices de compartir con ustedes este momento tan especial.
  Gracias por acompañarnos y ayudarnos a construir nuestro futuro hogar.
</p>

<div className="mt-8">
  <p className="text-sm uppercase tracking-[0.3em] mb-2">
    Faltan
  </p>

  <p className="text-5xl font-serif">
    {diasRestantes} días
  </p>
</div>

          <a
            href="#regalos"
            className="mt-8 border border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
          >
            Ver lista
          </a>

        </div>

      </section>

      {/* LISTA */}

      <section
        id="regalos"
        className="max-w-6xl mx-auto px-6 py-24"
      >

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.3em] text-xs text-[#a08372] mb-3">
            Lista de regalos
          </p>

          <h2 className="text-5xl font-serif text-[#4b3425]">
            Nuestro futuro hogar
          </h2>

        </div>
<div className="mb-16 text-center">

  <p className="text-[#7b6657] mb-6 max-w-2xl mx-auto">
    También nos ayudarían mucho algunos de estos regalos
    que pueden conseguirse en cualquier tienda.
  </p>

  <div className="flex flex-wrap justify-center gap-3">

    {[
      "Tuppers de vidrio",
      "Juego de toalla y toallón",
      "Lámpara de Pie",
      "Juego de cama QUEEN",
      "Tablas",
      "Alfombra de Baño",
      "Organizadores",
      "Fuentes para horno",
      "Almohadas",
      "Especiero",
      "Juego de sábanas TWIN",
      "Bateria de Cocina",
      "Cubiertos",
      "Mantel",
    ].map((item) => (
      <span
        key={item}
        className="bg-white border border-[#e5d5c9] px-5 py-3 rounded-full text-[#6b5548] shadow-sm"
      >
        {item}
      </span>
    ))}

  </div>

</div>
<p className="text-center text-[#7b6657] mt-10 mb-12">
  O, si lo preferís, acá te dejamos algunos regalos que nos gustaron especialmente.
</p>
        <div className="grid md:grid-cols-3 gap-8">

          {productos.map((producto) => (

            <div
              key={producto.id}
              className="bg-white rounded-[30px] overflow-hidden shadow-sm"
            >

              {producto.image && (
  <img
    src={producto.image}
    alt={producto.title}
    className="w-full h-[300px] object-contain bg-[#f8f2ed]"
  />
)}

              <div className="p-6">

                <p className="text-sm uppercase tracking-[0.2em] text-[#b89b88] mb-2">
                  {producto.store}
                </p>

                <h3 className="text-2xl font-serif text-[#4b3425] mb-4">
  {producto.title}
</h3>

{producto.purchased && (
  <div className="mb-4 inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
    ✓ Comprado
  </div>
)}

                {!producto.purchased ? (
  <div className="space-y-3">

    <a
      href={producto.link}
      target="_blank"
      className="block w-full text-center bg-[#a08372] hover:bg-[#8d715f] text-white py-3 rounded-full transition"
    >
      Ver producto
    </a>

    <button
      onClick={() =>
        marcarComprado(producto.id)
      }
      className="w-full border border-[#a08372] text-[#a08372] py-3 rounded-full hover:bg-[#f3ebe6] transition"
    >
      Ya compré este regalo
    </button>

  </div>
) : (
  <div className="w-full text-center bg-green-100 text-green-700 py-3 rounded-full font-medium">
    ✓ Comprado
  </div>
)}

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* APORTE ECONÓMICO */}

      <section className="max-w-4xl mx-auto px-6 pb-24">

        <div className="bg-white rounded-[30px] p-10 shadow-sm text-center">

          <p className="uppercase tracking-[0.3em] text-xs text-[#a08372] mb-3">
            Aporte económico
          </p>

          <h2 className="text-4xl font-serif text-[#4b3425] mb-8">
            Gracias por acompañarnos
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            Si preferis ayudarnos con tu aporte económico,
            te dejamos acá los datos para colaborar con
            nuestro futuro hogar.
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">

            <div className="bg-[#f8f2ed] rounded-2xl p-6">
              <h3 className="font-serif text-2xl text-[#4b3425] mb-4">
                Cuenta en pesos
              </h3>

              <div>
  <p className="mb-3">
    <strong>Alias:</strong> RODRIYLU2025
  </p>

  <button
    onClick={() => copiarTexto("RODRIYLU2025")}
    className="bg-[#a08372] hover:bg-[#8d715f] text-white px-4 py-2 rounded-full transition"
  >
    Copiar alias
  </button>
</div>

              <p className="mt-2">
                <strong>Banco:</strong> UALA
              </p>

              <p className="mt-2">
                <strong>Titular:</strong> MARIA LOURDES ACTIS
              </p>
            </div>

            <div className="bg-[#f8f2ed] rounded-2xl p-6">
              <h3 className="font-serif text-2xl text-[#4b3425] mb-4">
                Cuenta en dólares
              </h3>

              <div>
  <p className="mb-3">
    <strong>Alias:</strong> CAJA.CESTA.COSA
  </p>

  <button
    onClick={() => copiarTexto("CAJA.CESTA.COSA")}
    className="bg-[#a08372] hover:bg-[#8d715f] text-white px-4 py-2 rounded-full transition"
  >
    Copiar alias
  </button>
</div>

              <p className="mt-2">
                <strong>Banco:</strong> BANCO MACRO
              </p>

              <p className="mt-2">
                <strong>Titular:</strong> MARIA LOURDES ACTIS
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}