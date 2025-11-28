import { collection, addDoc } from "firebase/firestore";
import { db } from "./firestore";

export async function enviarDados(colecao: string, dados: any) {
  try {
    const docRef = await addDoc(collection(db, colecao), dados);
    return docRef.id; // ID gerado no Firestore
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    return null;
  }
}
