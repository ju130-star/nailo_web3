import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Adiciona cliente
export async function adicionarCliente(cliente) {
  return await addDoc(collection(db, "clientes"), cliente);
}

// Lista clientes
export async function listarClientes() {
  const snapshot = await getDocs(collection(db, "clientes"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
