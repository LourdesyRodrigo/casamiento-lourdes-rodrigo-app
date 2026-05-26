"use client";

import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { db, auth } from "../firebase";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [logged, setLogged] = useState(false);

  const [loading, setLoading] = useState(true);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [title, setTitle] = useState("");
  const [store, setStore] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const [products, setProducts] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<
    string | null
  >(null);

  const [editTitle, setEditTitle] = useState("");
  const [editStore, setEditStore] = useState("");
  const [editLink, setEditLink] = useState("");
  const [editImage, setEditImage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setLogged(!!user);

        if (user) {
          await loadProducts();
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      alert("Datos incorrectos");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loadProducts = async () => {
    const querySnapshot = await getDocs(
      collection(db, "products")
    );

    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setProducts(items as any[]);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  const saveProduct = async () => {
    if (!title || !store) {
      alert("Completá al menos nombre y tienda");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        title,
        store,
        link,
        image,
        purchased: false,
        purchasedBy: null,
      });

      setTitle("");
      setStore("");
      setLink("");
      setImage("");

      await loadProducts();

      showSuccess("Producto agregado ✨");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: string) => {
    const confirmDelete = confirm(
      "¿Eliminar este producto?"
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "products", id));

    await loadProducts();

    showSuccess("Producto eliminado");
  };

  const startEdit = (product: any) => {
    setEditingId(product.id);

    setEditTitle(product.title || "");
    setEditStore(product.store || "");
    setEditLink(product.link || "");
    setEditImage(product.image || "");
  };

  const saveEdit = async () => {
    if (!editingId) return;

    await updateDoc(doc(db, "products", editingId), {
      title: editTitle,
      store: editStore,
      link: editLink,
      image: editImage,
    });

    setEditingId(null);

    await loadProducts();

    showSuccess("Producto actualizado ✨");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f1ea]">
        <p className="text-[#8f715f] text-lg">
          Cargando...
        </p>
      </div>
    );
  }

  if (!logged) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f1ea] p-6">
        <div className="bg-white rounded-[35px] p-10 w-full max-w-md shadow-xl border border-[#ead7ca]">
          <p className="uppercase tracking-[0.3em] text-xs text-[#9d7f6d] mb-3">
            Acceso privado
          </p>

          <h1 className="text-4xl font-serif mb-8 text-[#4f3c33]">
            Admin
          </h1>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-2xl border border-[#d7c4b7] px-5 py-4 outline-none"
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-2xl border border-[#d7c4b7] px-5 py-4 outline-none"
            />

            <button
              onClick={login}
              className="w-full rounded-2xl bg-[#8f715f] text-white py-4 hover:opacity-90 transition"
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f1ea] p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[35px] p-8 shadow-xl border border-[#ead7ca]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-[#9d7f6d] mb-3">
                Panel privado
              </p>

              <h1 className="text-4xl font-serif text-[#4f3c33]">
                Administrar regalos
              </h1>
            </div>

            <button
              onClick={logout}
              className="border border-[#d7c4b7] px-5 py-3 rounded-2xl hover:bg-[#f7f1ea] transition"
            >
              Cerrar sesión
            </button>
          </div>

          {successMessage && (
            <div className="mb-6 bg-green-100 text-green-800 px-5 py-4 rounded-2xl">
              {successMessage}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <h2 className="text-2xl font-serif text-[#4f3c33]">
                Agregar producto
              </h2>

              <input
                type="text"
                placeholder="Nombre del producto"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full rounded-2xl border border-[#d7c4b7] px-5 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Tienda"
                value={store}
                onChange={(e) =>
                  setStore(e.target.value)
                }
                className="w-full rounded-2xl border border-[#d7c4b7] px-5 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Link de compra"
                value={link}
                onChange={(e) =>
                  setLink(e.target.value)
                }
                className="w-full rounded-2xl border border-[#d7c4b7] px-5 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="URL de imagen"
                value={image}
                onChange={(e) =>
                  setImage(e.target.value)
                }
                className="w-full rounded-2xl border border-[#d7c4b7] px-5 py-4 outline-none"
              />

              {image && (
                <img
                  src={image}
                  alt="preview"
                  className="w-full h-52 object-cover rounded-2xl border border-[#ead7ca]"
                />
              )}

              <button
                onClick={saveProduct}
                className="w-full rounded-2xl bg-[#8f715f] text-white py-4 hover:opacity-90 transition"
              >
                Agregar producto
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-serif text-[#4f3c33] mb-5">
                Productos
              </h2>

              <div className="space-y-4 max-h-[700px] overflow-auto pr-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-[#ead7ca] rounded-3xl p-5 bg-[#fffdfb]"
                  >
                    {editingId === product.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) =>
                            setEditTitle(
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border px-4 py-3"
                        />

                        <input
                          type="text"
                          value={editStore}
                          onChange={(e) =>
                            setEditStore(
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border px-4 py-3"
                        />

                        <input
                          type="text"
                          value={editLink}
                          onChange={(e) =>
                            setEditLink(
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border px-4 py-3"
                        />

                        <input
                          type="text"
                          value={editImage}
                          onChange={(e) =>
                            setEditImage(
                              e.target.value
                            )
                          }
                          className="w-full rounded-xl border px-4 py-3"
                        />

                        {editImage && (
                          <img
                            src={editImage}
                            alt="preview"
                            className="w-full h-40 object-cover rounded-2xl"
                          />
                        )}

                        <button
                          onClick={saveEdit}
                          className="bg-green-600 text-white px-5 py-3 rounded-2xl"
                        >
                          Guardar cambios
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-44 object-cover rounded-2xl"
                          />
                        )}

                        <div>
                          <h3 className="font-semibold text-xl text-[#4f3c33]">
                            {product.title}
                          </h3>

                          <p className="text-sm text-[#8a6f5e]">
                            {product.store}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              startEdit(product)
                            }
                            className="flex-1 bg-[#8f715f] text-white py-3 rounded-2xl"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() =>
                              deleteProduct(
                                String(product.id)
                              )
                            }
                            className="flex-1 bg-red-500 text-white py-3 rounded-2xl"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {products.length === 0 && (
                  <div className="border border-dashed border-[#d7c4b7] rounded-3xl p-10 text-center text-[#8a6f5e]">
                    No hay productos todavía
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}