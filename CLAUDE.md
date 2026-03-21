# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio landing page for Rogelio De La Rosa - a web developer and industrial engineer. The site showcases MVP development, consulting services, and automation solutions.

## Architecture

**Frontend**: Static HTML/CSS/JS with "Dark Luxury" design system
- `index.html` - Main landing page with Hero, Services, Portfolio, About, and Contact sections
- `css/styles.css` - Design system using CSS custom properties (`--primary-500: #3B82F6`, `--bg-primary: #000000`, etc.)
- `js/script.js` - Particle animations, sticky navbar, flip cards, animated counters, AJAX form submission
- `js/whatsapp-widget.js` - Floating WhatsApp contact widget

**Backend**: PHP with MySQL for contact form handling
- `contact.php` - Receives form submissions, stores in MySQL, sends Telegram notification + email
- `config.php` - Database credentials and Telegram bot token
- `database.sql` - Schema for `contacts` table

**Lab Section**: `lab/` contains interactive tools using localStorage for data persistence
- CRM, Habit Tracker, Todo, Leads, Gastos managers
- Each tool is a standalone HTML file with embedded CSS/JS

**Project Pages**: `proyectos/` contains case study pages for portfolio projects

## Key Patterns

**CSS Design System**: All colors use CSS variables. Primary accent is Electric Blue (`#3B82F6`). Backgrounds use ultra-dark palette (`#000000`, `#09090B`).

**Form Submission**: The contact form uses AJAX to POST to `contact.php`. On success, the form fades out and a success state with animated checkmark appears. Error responses display inline.

**Animations**:
- Particle system generated dynamically in `#particles-container`
- Intersection Observer triggers counter animations in `.social-proof` section
- Flip cards (`service-card-flip`) use CSS transforms, with tap-to-flip fallback for touch devices

**Mobile Navigation**: Hamburger toggle (`#mobile-menu-toggle`) animates spans into X shape when active

## Deployment

This site is deployed on Hostinger with PHP/MySQL support. The `config.php` contains production credentials and must be kept out of version control (already in `.gitignore`).

## File Structure

```
Web HTML/
├── index.html          # Main landing page
├── unisesorias.html    # Unisesorías brand page
├── contact.php         # Form handler (MySQL + Telegram + Email)
├── config.php          # DB credentials, Telegram token
├── database.sql        # Schema for contacts table
├── css/styles.css      # Main stylesheet with design system
├── js/script.js        # Main JavaScript
├── js/whatsapp-widget.js
├── lab/                # Interactive tools (localStorage-based)
│   ├── index.html
│   ├── crm.html
│   ├── habit-tracker.html
│   ├── todo.html
│   ├── leads.html
│   └── gastos.html
├── proyectos/          # Case study pages
├── images/             # Static assets
└── cv/                 # CV PDFs
```