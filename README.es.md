<p align="center">
  <a href="https://kuenta.dev">
    <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Kuenta Devs CLI logo">
  </a>
</p>
<p align="center">Kuenta Devs CLI — el agente de programación con IA, rebrandeado por <strong>Kuenta Devs</strong>.</p>
<p align="center">Identidad visual: <strong>negro + verde Matrix (#00ff41)</strong>. Construido sobre OpenCode.</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.es.md">Español</a>
</p>

---

> [!NOTE]
> Este proyecto es un fork de [OpenCode](https://github.com/anomalyco/opencode) con un rebranding visual completo: comando `kuenta-devs`, paleta negro + verde Matrix, y la marca **Kuenta Devs**.

### Instalación

```bash
# Script de instalación oficial de Kuenta Devs
curl -fsSL https://kuenta.dev/install | bash

# Gestores de paquetes
npm i -g kuenta-devs@latest
```

El binario queda instalado en `$HOME/.kuenta-devs/bin` y queda disponible en tu PATH como:

```bash
kuenta-devs
```

### ¿Qué cambió respecto a OpenCode?

| Aspecto            | OpenCode            | Kuenta Devs CLI                |
| ------------------ | ------------------- | ------------------------------ |
| Comando CLI        | `opencode`          | `kuenta-devs`                  |
| Identidad visual   | Naranja             | Negro + verde Matrix (#00ff41) |
| Theme por defecto  | `opencode`          | `kuenta-devs`                  |
| Bin path           | `$HOME/.opencode/bin` | `$HOME/.kuenta-devs/bin`     |
| Logo               | "OpenCode"          | "Kuenta Devs CLI"              |

### Agentes

Kuenta Devs CLI incluye los mismos dos agentes integrados que OpenCode, que puedes alternar con la tecla `Tab`:

- **build** — Por defecto, agente con acceso completo para tareas de desarrollo
- **plan** — Agente de solo lectura para análisis y exploración de código
  - Deniega ediciones de archivos por defecto
  - Pide permiso antes de ejecutar comandos bash
  - Ideal para explorar codebases desconocidas o planificar cambios

Además, incluye un subagente **general** para búsquedas complejas y tareas de varios pasos.
Se usa internamente y se puede invocar con `@general` en los mensajes.

### Contribuir

Si te interesa contribuir a este fork, lee [CONTRIBUTING.md](./CONTRIBUTING.md) antes de enviar un pull request.

---

**Kuenta Devs** — Hecho con 💚 por la comunidad.