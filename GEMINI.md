# Zlatý úl - Honey Farm Project

## Project Overview
This is a responsive landing page and ordering system for "Zlatý úl," a family-owned honey farm. The project focuses on presenting their products (Linden, Honeycomb, and Creamed honey) and providing a simple, client-side order form for local pickup.

### Main Technologies
- **HTML5**: Semantic structure for SEO and accessibility.
- **CSS3**: Vanilla CSS with custom properties and responsive design using Grid and Flexbox.
- **JavaScript (ES6+)**: Vanilla JS for DOM manipulation and interactivity.
- **FontAwesome**: Used for iconography (via CDN).
- **Google Fonts**: "Oswald" font family.

## Project Structure
- `index.html`: The main landing page featuring the hero section, about section, and product showcase.
- `objednávky.html`: The order form page where users can select products and see real-time price calculations.
- `style.css`: Contains all visual styling, including a mobile-responsive bottom navigation bar and scroll-reveal animations.
- `script.js`: 
  - Implements an `IntersectionObserver` for `.scroll-reveal` elements.
  - Manages the dynamic "Order Form" logic (adding/removing items, calculating totals).
  - Handles URL parameters (e.g., `?honey=linden`) to pre-select items when coming from the product list.
- `obrazky/`: Stores all visual assets (logos, product images, background photos).

## Building and Running
As a static website, this project does not require a build step.
- **To View**: Open `index.html` in any modern web browser.
- **Local Development**: Using a simple local server (like VS Code's "Live Server" extension) is recommended to ensure all paths and potential future AJAX requests work correctly.

## Development Conventions
- **Naming**: Classes follow a mix of BEM-like and descriptive naming conventions (e.g., `top-bar-content`, `product-card`).
- **Responsive Design**:
  - Desktop: Top navigation bar.
  - Mobile (below 700px): Fixed bottom navigation bar and stacked layout for sections.
- **Interactivity**:
  - Prefer Vanilla JS over libraries for lightweight performance.
  - Scroll reveal animations are triggered by adding the `.active` class via JavaScript.
- **Localization**: The site is in Czech (`lang="cs"`).

## Key Files Summary
- **`script.js`**: Essential for the ordering logic. If adding new honey types, update the `prices` object in the JS file to ensure correct calculations.
- **`style.css`**: The `spacer` class is used for consistent section separation. The `main-wrapper` and `order-main-wrapper` control the primary layout constraints.
