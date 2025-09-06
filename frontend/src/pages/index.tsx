import React from 'react';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 DataHub Platform</h1>
      <p>¡Bienvenido a tu proyecto personal!</p>
      <p>El backend está en: http://localhost:3001</p>
      <p>El frontend está en: http://localhost:3001</p>
      <div>
        <h2>Estado de los servicios:</h2>
        <ul>
          <li>✅ PostgreSQL: Funcionando en puerto 5432</li>
          <li>✅ Redis: Funcionando en puerto 6379</li>
          <li>✅ Backend: Listo para desarrollo</li>
          <li>✅ Frontend: Corriendo correctamente</li>
        </ul>
      </div>
    </div>
  );
}
