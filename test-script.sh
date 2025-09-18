#!/bin/bash
echo "🔧 Iniciando prueba completa..."

# 1. Verificar usuario en la base de datos
echo "📊 Verificando usuario en base de datos..."
docker compose exec postgres psql -U admin -d datahub -c "SELECT id, email, \"isEmailVerified\" FROM users;"

# 2. Verificar el email si es necesario
echo "📧 Verificando email..."
docker compose exec postgres psql -U admin -d datahub -c "UPDATE users SET \"isEmailVerified\" = true, \"emailVerificationToken\" = NULL WHERE email = 'test@example.com';"

# 3. Obtener CSRF token
echo "🛡️ Obteniendo CSRF token..."
rm -f cookies.txt
CSRF_TOKEN=$(curl -s -c cookies.txt -b cookies.txt http://localhost:3001/auth/csrf-token | grep -o '"csrfToken":"[^"]*"' | cut -d'"' -f4)
echo "✅ CSRF Token: $CSRF_TOKEN"

# 4. Hacer login y extraer el accessToken
echo "🔐 Haciendo login..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: $CSRF_TOKEN" \
  -c cookies.txt -b cookies.txt \
  -d '{"email":"test@example.com","password":"12345678"}')

# Extraer el accessToken de la respuesta
ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
echo "✅ Access Token: $ACCESS_TOKEN"

# 5. Probar endpoint /users/me con JWT
echo "👤 Probando endpoint /users/me..."
curl -s -H "X-CSRF-Token: $CSRF_TOKEN" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -b cookies.txt http://localhost:3001/users/me | jq .

# 6. Probar logout
echo "🚪 Probando logout..."
curl -s -X POST http://localhost:3001/auth/logout \
  -H "X-CSRF-Token: $CSRF_TOKEN" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -b cookies.txt | jq .

echo "✅ Prueba completada!"
