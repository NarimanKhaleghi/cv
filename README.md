
   **[English](README.md)** | **[فارسی](README_FA.md)**
   
---
<div align="center">
   <h1>💎 Glassmorphism Resume Template</h1>
  
  [![Live Demo](https://img.shields.io/badge/demo-live-green?style=for-the-badge&logo=safari)](https://cv.narimankhaleghi.ir)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
</div>

A stunning, single-page personal resume/portfolio template featuring a **Glassmorphism** design, interactive animations, and full bilingual support (English & Persian). Built with **HTML5** and **Tailwind CSS**, this lightweight template is designed to be easily customizable and deployed directly to GitHub Pages without any build process.

---
<div align=center>
  <img width=90% alt="nariman khaleghi resume and portfolio demo" src="images/demo.jpg">
</div>
---

> **View Live Demo:** [cv.narimankhaleghi.ir](https://cv.narimankhaleghi.ir)

## ✨ Key Features

### 🎨 Visuals & Design
* **Glassmorphism UI:** Modern, translucent elements with backdrop blur effects (`backdrop-filter: blur`).
* **Interactive Background:** Dynamic particle effects using **Particles.js** that react to mouse movement.
* **Custom Cursor:** A unique, trailing circle cursor effect that interacts with page elements.
* **Animations:** Smooth fade-in, slide-in, and scale-in animations upon scrolling.
* **Dark & Light Mode:** Seamless theme switching with persistent user preference (saved in `localStorage`).

### 🛠 Functionality
* **Bilingual Support (i18n):**
    * Instant switch between **English (LTR)** and **Persian (RTL)**.
    * Automatic font switching (**Poppins** for EN, **Vazirmatn** for FA).
    * Auto-conversion of English numbers to Persian numerals in RTL mode.
* **Fully Responsive:** Optimized layouts for Mobile, Tablet, and Desktop using Tailwind's responsive prefixes.
* **Smart Navigation:**
    * **Scrollspy:** Automatically highlights the active section in the sidebar.
    * **Smooth Scroll:** Elegant scrolling behavior when navigating between sections.
* **Interactive Modals:** Detailed pop-ups for Experience, Education, and Projects to keep the main interface clean.
* **Welcome Popup:** A polite initial modal to let users choose their preferred language and theme.

## 🗂 Project Structure

The entire project is contained within a single `index.html` file for simplicity, utilizing CDN links for libraries.

* **Header:** Name, Language Switcher, Theme Toggler.
* **Sidebars:**
    * **Right:** Main navigation (Profile, Experience, Education, etc.).
    * **Left:** Social media and contact quick links.
* **Sections:**
    1.  **Profile:** Hero section with photo and bio.
    2.  **Experience:** Interactive timeline with expandable modals.
    3.  **Education:** Grid layout showcasing academic background.
    4.  **Languages:** Circular progress bars indicating proficiency.
    5.  **Projects:** Portfolio grid with GitHub links and detail modals.
    6.  **Hard Skills:** Technical stack proficiency.
    7.  **Soft Skills:** Interpersonal skills visualization.
    8.  **Certificates:** Grid view with an **Image Lightbox** for viewing credentials.

## 🚀 Technologies Used

* **[Tailwind CSS](https://tailwindcss.com/):** For utility-first styling and responsiveness (via CDN).
* **[Particles.js](https://vincentgarreau.com/particles.js/):** For the interactive background network effect.
* **[Font Awesome](https://fontawesome.com/):** For high-quality icons.
* **[Google Fonts](https://fonts.google.com/):** 'Poppins' font for English text.
* **[Vazirmatn Font](https://github.com/rastikerdar/vazirmatn):** A beautiful, legible font for Persian text.
* **Vanilla JavaScript:** No heavy frameworks (React/Vue) required; pure JS for logic and DOM manipulation.

## ⚙️ How to Customize

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/NarimanKhaleghi/cv.git
    ```
2.  **Open `index.html`:**
    You can edit this file in any code editor (VS Code, Sublime, etc.).
3.  **Update Content:**
    * Look for `data-lang-en` and `data-lang-fa` attributes in the HTML tags.
    * **Example:**
        ```html
        <h1 data-lang-en="John Doe" data-lang-fa="جان دو">John Doe</h1>
        ```
    * Replace the text inside the quotes with your own details.
4.  **Add/Remove Items:**
    * The code is modular. To add a new Job Experience, simply copy the `div` with class `glassmorphism` inside the `#experience` section and paste it below the existing ones.
    * Don't forget to create a corresponding **Modal** `div` at the bottom of the file (inside `#modal-container`) with a unique ID (e.g., `id="experience-3-modal"`).

## 🌐 Deployment

This project is **GitHub Pages Ready**.
1.  Push your changes to your GitHub repository.
2.  Go to **Settings** > **Pages**.
3.  Select `main` branch as source and click **Save**.
4.  Your professional resume is now online!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/NarimanKhaleghi/cv/issues).

---
<div align="center">
    Designed with ❤️ by <a href="https://github.com/narimankhaleghi">Nariman Khaleghi</a>
</div>
