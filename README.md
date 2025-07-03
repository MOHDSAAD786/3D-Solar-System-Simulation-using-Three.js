# 🌌 3D Solar System Simulation using Three.js

> Developed by **Mohd Saad**  
> Frontend Assignment 2025  

---

## 🔭 Description

This project is a 3D simulation of the **Solar System** using [Three.js](https://threejs.org/), featuring:

- Planet rotation and revolution
- Orbit rings toggle
- Speed control slider
- Glowing planet name labels
- Pause/resume animation
- Responsive layout

---

## 🛠 Technologies

- HTML5  
- CSS3  
- JavaScript (ES6 Modules)  
- Three.js v0.129.0  
- OrbitControls for camera movement

---

## 📁 Folder Structure

SolarSystem/
│
├── index.html # Main HTML page
├── style.css # UI styles (in root)
├── js/
│ └── main.js # Three.js logic & animation
├── img/
│ ├── sun_hd.jpg
│ ├── earth_hd.jpg
│ ├── ... (other planet textures)
│ └── skybox/ # Skybox images (6 sides)
│ ├── space_ft.png
│ ├── ...

yaml
Copy
Edit

---

## 🎮 Features

| Feature                  | Description                                      |
|--------------------------|--------------------------------------------------|
| 🪐 Planet Revolution     | Each planet orbits the sun at realistic speed    |
| 🔄 Planet Rotation       | Every planet spins on its own axis               |
| 🛰️ Orbit Rings          | Toggle visibility using checkbox                 |
| 🎛️ Speed Multiplier     | Range slider to adjust orbit speed globally      |
| ✨ Glowing Name Labels   | Shows planet names above each body               |
| ⏯️ Pause / Resume      | Press `Space` key to pause/resume                |
| 🖱️ Orbit Controls       | Use mouse/trackpad to rotate camera              |

---

## 💡 How to Run

1. 📦 Make sure your folder contains:

   - `index.html`
   - `style.css` (in root folder)
   - `js/main.js`
   - All textures inside `img/` folder

2. 🌐 Open `index.html` in your browser  
   (💡 For modules to work properly, use **Live Server** or local server)

3. ✅ Enjoy the 3D solar system!

---

## 📱 Responsive Design

- Control panel is mobile-friendly  
- Glassmorphism effect with blur & glow  
- Works on all screen sizes
