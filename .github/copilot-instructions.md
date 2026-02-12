# Copilot Instructions for Portfolio/CV Website

## Project Overview
This is **Romaric Pradeau's personal portfolio and CV website**, built on the **iPortfolio Bootstrap template** (v5.3.3). It's a static site with HTML pages, responsive design, and interactive features for showcasing projects and professional experience.

- **Live Site**: https://rhomdev.github.io/porfolio_CV/
- **Framework**: Bootstrap 5.3.3 with vanilla JavaScript
- **Language Support**: Both English and French (bilingual content)
- **Deployment**: GitHub Pages

## Architecture & Key Components

### Page Structure
- **[index.html](index.html)**: Main landing page with hero section, about, services, resume, portfolio, testimonials
- **[service-details.html](service-details.html)**: Template for service detail pages
- **[projects/](projects)**: 10+ individual project showcase pages (e.g., robot, automation, 3D printing projects)
- **Header Navigation**: Persistent left sidebar on desktop, mobile hamburger menu (handled by `.header-toggle` in JS)

### Asset Organization
- **[assets/css/main.css](assets/css/main.css)**: Master stylesheet using CSS custom properties for theming (1500+ lines)
  - Uses CSS variables: `--accent-color`, `--heading-color`, `--background-color`, etc.
  - `.dark-background` and `.light-background` preset classes for section theming
  - Smooth scroll behavior across the site
- **[assets/js/main.js](assets/js/main.js)**: Core functionality handler (317 lines, IIFE pattern)
  - Mobile header toggle (hamburger menu show/hide)
  - AOS (Animate On Scroll) initialization with 600ms duration
  - Typed.js for text animation (reads `data-typed-items` attribute)
  - PureCounter for animated counters
  - Waypoints for skill progress bar animations
  - GLightbox for image lightbox galleries
  - Isotope for filterable portfolio layouts
  - Swiper for carousel/slider functionality
  - Navmenu scrollspy for active nav highlighting

### Third-Party Libraries (in [assets/vendor/](assets/vendor))
- **Bootstrap 5.3.3**: Grid, utilities, components
- **Bootstrap Icons**: Icon library
- **AOS.js**: Scroll animations
- **Swiper**: Touch sliders
- **GLightbox**: Image gallery lightbox
- **Isotope**: Masonry/filterable layouts
- **ImagesLoaded**: Wait for images to load before layout
- **Typed.js**: Typewriter effect animation
- **PureCounter**: Number counter animation
- **Waypoints**: Trigger animations on scroll
- **PHP Email Form**: Contact form handling (requires pro version setup)

## Development Patterns

### CSS Customization
1. **Never edit Bootstrap files directly** — use `main.css` overrides
2. **Theme via CSS variables** at `:root` level (e.g., `--accent-color: #149ddd`)
3. **Preset classes** for quick theme switching: `.dark-background`, `.light-background`
4. **Mobile-first approach**: Bootstrap grid (`col-lg-8`, `d-xl-none`, etc.)

### JavaScript Patterns
- **IIFE (Immediately Invoked Function Expression)**: All code wrapped in `(function() { "use strict"; })()` for scoping
- **Event delegation**: Use `querySelectorAll` + `forEach` for multiple elements
- **Data attributes**: Store config in HTML (e.g., `data-typed-items`, `data-layout`, `data-default-filter`)
- **Dynamic initialization**: Libraries init on `window.addEventListener('load', ...)` to ensure DOM ready

### HTML Conventions
- **Bilingual links**: Project pages use relative paths like `../index.html`, French filenames (e.g., `concour-fanuc.html`)
- **Semantic structure**: Header ID `#header`, nav ID `#navmenu`, main content in `<main>` tag
- **Data-driven interactivity**: Config lives in data attributes, not hardcoded JS
- **Project pages use standard structure**:
  - Header with background image overlay
  - Left column (col-lg-8): Context, Presentation, Realization, Results sections
  - Right sidebar (col-lg-4): Skills/Technologies list

### Form Handling
- **[forms/contact.php](forms/contact.php)**: Requires PHP Email Form library (`../assets/vendor/php-email-form/php-email-form.php`)
- **Email config**: Edit `$receiving_email_address` in contact.php
- **SMTP optional**: Uncomment SMTP block and configure credentials if needed
- **AJAX enabled**: Set `$contact->ajax = true;` for client-side form submission

## Common Development Tasks

### Adding a New Project
1. Create `projects/project-name.html` using [projects/project-template.html](projects/project-template.html) as base
2. Update relative paths (`../assets`, `../index.html`) if nesting differs
3. Add project link to `index.html` portfolio section and project dropdown menu in header
4. Ensure images are placed in `assets/img/projects/project-name/`

### Updating Portfolio Gallery
- Portfolio uses **Isotope.js** with data attributes: `data-layout="masonry"`, `data-default-filter="*"`
- Gallery items marked with `.isotope-item` class
- Filter buttons use `data-filter=".category"` to match item classes
- GLightbox automatically initializes on elements with `.glightbox` class

### Styling Changes
1. Modify color scheme: Update CSS variables in `main.css` `:root`
2. **Never touch vendor files** (Bootstrap, Bootstrap Icons) — override in `main.css`
3. **Test both themes**: Use `.dark-background` and `.light-background` classes on sections

### Deployment
- Project deploys to **GitHub Pages** (`https://rhomdev.github.io/porfolio_CV/`)
- Static site (no build step) — changes to `.html`, `.css`, `.js` auto-deploy
- Ensure relative paths are correct: project pages use `../` to reference root assets

## Troubleshooting & Best Practices

- **Animations not triggering**: Check if AOS has `once: true` (won't repeat on scroll back)
- **Mobile nav not closing**: Verify `.header-toggle` click event bubbles correctly
- **Images not loading**: Use relative paths consistently (`../assets/img/...` from projects/ folder)
- **Form not sending**: Ensure PHP Email Form library is in correct path and email address is configured
- **Bootstrap grid broken**: Verify column classes use Bootstrap 5 syntax (`col-lg-*` not `col-lg-*-*`)

## Key File Reference
- Entry point: [index.html](index.html)
- Style system: [assets/css/main.css](assets/css/main.css) (themes, variables, overrides)
- Core logic: [assets/js/main.js](assets/js/main.js) (all interactive behavior)
- Contact handler: [forms/contact.php](forms/contact.php)
- Project template: [projects/project-template.html](projects/project-template.html)
