# 🚨 Incident Response — DataHub Platform

Este documento describe los pasos mínimos a seguir en caso de incidente en producción (caídas, errores críticos o mal funcionamiento).

---

## ✅ Checklist rápido

### 1. Revisar logs del backend
```bash
docker compose logs backend --tail=100 -f
