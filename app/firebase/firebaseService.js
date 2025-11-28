// Exemplo: lib/firebaseService.js (Adaptar com sua estrutura de dados)
import { db } from "./firebase"; // Sua instância do Firestore
import { collection, query, where, getDocs } from "firebase/firestore";

export async function fetchAppointmentsForDay(dayOfWeek) {
  try {
    // Consulta a coleção de agendamentos onde o campo 'day' corresponde
    const q = query(
      collection(db, "appointments"),
      where("day", "==", dayOfWeek)
    );
    
    const querySnapshot = await getDocs(q);
    const appointments = [];
    
    querySnapshot.forEach((doc) => {
      // Adiciona o ID do documento junto com os dados
      appointments.push({ id: doc.id, ...doc.data() });
    });
    
    return appointments;
  } catch (error) {
    console.error("Erro ao buscar agendamentos: ", error);
    // Em caso de erro, retorna um array vazio
    return []; 
  }
}