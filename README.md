
# Xico Nemi - Aplicación Móvil

**Xico Nemi** es una aplicación turística y de rutas diseñada para la región de Xicotepec de Juárez. Proporciona itinerarios, rutas turísticas, eventos y más, facilitando a los usuarios la exploración y disfrute de esta hermosa región.

## Estructura del Proyecto

```
/mobile-app
│
├── App.js            # Punto de inicio de la aplicación
├── assets/           # Imágenes y archivos estáticos
├── app/
│   ├── components/   # Componentes reutilizables
│   ├── language/     # Textos en inglés y español
│   ├── navigation/   # Archivos de navegación entre pantallas
│   ├── screens/      # Diferentes pantallas de la app
│   ├── store/        # Lógica de Redux para el manejo del estado global
│   ├── utils/        # Configuraciones de colores, fuentes, tamaños, etc.
```


## Instalación

### Clonar el Repositorio

```bash
git clone https://github.com/XicoNemi/mobile-app.git
cd mobile-app
```

### Instalar Dependencias

Asegúrate de tener **Yarn** instalado. Luego, corre el siguiente comando:

```bash
yarn install
```

---

## Inicio del Proyecto

Para iniciar el proyecto, puedes utilizar alguno de estos comandos:

```bash
npx expo start --localhost
```

o 

```bash
npx expo start --tunnel
```

- **--localhost**: Inicia el servidor en tu máquina local. Útil si tu dispositivo está conectado a la misma red.
- **--tunnel**: Útil si deseas acceder a la app desde una red diferente o si tienes problemas con la conexión local.

---
