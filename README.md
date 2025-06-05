# 🎲 Random Option Picker PWA

Una Progressive Web App (PWA) intuitiva y responsiva que te ayuda a decidir entre múltiples opciones de forma aleatoria. Puedes registrar opciones temporales o guardar listas favoritas para uso recurrente. La app está diseñada con animaciones suaves, menú móvil interactivo y modales personalizados para una experiencia visual agradable.

---

## 🚀 Funcionalidades principales

### 🔢 Registro de Opciones
- Introduce opciones separadas por comas o saltos de línea.
- Visualiza las opciones como botones removibles.
- Valida entradas vacías o repetidas.

### 🎰 Selección Aleatoria
- Al hacer clic en `RANDOM OPTION`, se inicia una animación que muestra una opción al azar.
- Las opciones se eligen solo si hay mínimo dos registradas.
- Modal visual con transición de texto animado.

### ⭐ Favoritos
- Página dedicada para guardar listas de opciones favoritas (como "Cena", "Películas", etc.).
- Visualiza las listas en tarjetas responsivas.
- Cada tarjeta permite:
  - 👁️ Ver opciones (pendiente).
  - ✏️ Editar lista (pendiente).
  - 🔀 `SHUFFLE`: elige una opción al azar de esa lista con la animación.
  - 🗑️ `DELETE`: elimina la lista con confirmación por modal.

### 📦 Almacenamiento en Firebase
- Las listas favoritas se guardan y leen desde Firestore.
- Soporte para operaciones CRUD básicas (guardar, leer, eliminar).

---

## 🖼️ Estética y UX
- Paleta visual: fondo beige `#FFCE32`, botones y texto en gris oscuro `#323232`.
- Botones redondeados, sombras suaves y tipografía clara.
- Diseño totalmente responsive (mobile-first).
