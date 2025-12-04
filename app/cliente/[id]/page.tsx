"use client";

export default function ClientePerfil({ params }: any) {
  const { id } = params;

  return (
    <div style={{ padding: 20 }}>
      <h1>Perfil do Cliente #{id}</h1>
      {/* Aqui você pode buscar dados no Firebase */}
    </div>
  );
}
