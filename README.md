# The News Adda (thenewsadda.in) - Digital News Portal

> **Tagline**: ONLY NEWS NO AGENDA (केवल खबर, कोई एजेंडा नहीं)

This project is a modern, responsive, high-performance news portal built with React, styled to match the official design and structure of [thenewsadda.in](https://thenewsadda.in).

---

## 🌟 Key Features

### 1. 🔐 Admin Access Portal (Add & Edit News)
* **Access Route**: `/admin` (or click **"एडमिन पैनल" / "Admin Dashboard"** in the top header)
* **Admin Login**: `/admin/login`
  * **Default Username**: `admin`
  * **Default Password**: `admin123`
* **Features in Admin Portal**:
  * **Admin Dashboard**: Real-time stats on total published articles, breaking news items, featured stories, and system status.
  * **Add News (`/admin/add`)**: Create new articles with Title, Category, Language (Hindi/English), Author, Cover Image URL (or 1-click Preset Library), Summary, Full Article Body, Breaking News Ticker toggle, and Hero Featured toggle.
  * **Manage & Edit News (`/admin/manage`)**:
    * Search news by title or author
    * Filter by category and language
    * **Edit News**: Full modal editor pre-filled with all existing fields; updates publish live immediately
    * **Delete News**: Remove articles with confirmation prompt
    * **Quick Toggles**: Toggle Breaking News or Featured status directly with one click
    * **Reset Data**: 1-click button to reset back to original seed stories if needed
  * **Persistence**: Articles are stored in `localStorage`, so any news added or edited stays saved across sessions.

---

### 2. 🌐 Multi-Language Support (Hindi & English)
* **Language Switch Button**: Click the `🇮🇳 हिन्दी | EN` toggle button located in both the top bar and header.
* **Instant Switching**:
  * Switches all navigation menus, category names, dates, footer links, and form labels between Hindi and English.
  * Filter articles on the Home and Category pages by **All Languages**, **केवल हिन्दी**, or **English Only**.

---

### 3. 🌓 Day / Night Theme Switch (Dark & Light Mode)
* **Theme Switch Button**: Click the Sun / Moon (`☀️ / 🌙`) button in the top bar.
* Fully styled light and dark palettes with CSS variables and Bootstrap dark mode.
* Preference is automatically remembered in `localStorage`.

---

### 4. 📄 Pages & Routes
* `/` - **Home Page**:
  * Hero Section (1 large featured headline + 3 side trending cards)
  * Animated **News Buzz / Breaking News** ticker with pause, play, and navigation controls
  * Latest News Grid with language filter
  * Section spotlights for *PURE पॉलिटिक्स* and *Growth स्टोरी*
  * Sidebar with Trending stories, Dehradun Live Weather widget, and Admin quick banner
* `/news/:id` - **News Detail Reader**:
  * Full article view with headline, author, date, category badge, and cover image
  * Formatted multi-paragraph body
  * WhatsApp, Facebook, Twitter, and copy link sharing
  * Tag badges and related news recommendations
* `/category/:slug` - **Dynamic Category Page**:
  * Dedicated pages for:
    * `/category/news360` (न्यूज़ 360)
    * `/category/growth-story` (Growth स्टोरी)
    * `/category/politics` (PURE पॉलिटिक्स)
    * `/category/adda-special` (Adda स्पेशल)
    * `/category/your-column` (Your कॉलम)
    * `/category/explainer` (एक्सप्लेनर)
    * `/category/sports` (खेल)
    * `/category/entertainment` (मनोरंजन)
    * `/category/health` (हेल्थ)
    * `/category/education` (शिक्षा)
    * `/category/technology` (टेक्नोलॉजी)
    * `/category/state` (राज्य / उत्तराखंड)
    * `/category/world` (विदेश)
    * `/category/viral` (वायरल)
  * Supports keyword search query (`?q=keyword`)
* `/about-us` - **About Us**: Mission, vision, journalistic ethics of The News Adda.
* `/contact-us` - **Contact Us**: Interactive contact form, office address in Dehradun, editorial helpline, and email.
* `/privacy-policy` - **Privacy Policy**
* `/terms-conditions` - **Terms & Conditions**

---

## 🚀 Running the Project

### Development Server
```bash
npm start
```
Runs the app on [http://localhost:3000](http://localhost:3000).

### Production Build
```bash
npm run build
```
Creates an optimized production bundle ready for deployment.
