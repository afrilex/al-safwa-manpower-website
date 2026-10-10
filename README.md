# Al Safwa Manpower Limited — Website

A responsive, dependency-free company website built with **HTML, CSS and JavaScript**. The site uses your supplied Al Safwa branding and images. It works with VS Code **Live Server**; no npm installation, React build or database is required.

## Run locally in VS Code

1. Extract the ZIP folder.
2. Open the `al-safwa-manpower-website` folder in **Visual Studio Code** (`File > Open Folder`).
3. Install the VS Code extension **Live Server** (by Ritwick Dey), if you don't already have it.
4. Right-click **`index.html`** → **Open with Live Server**.
5. Your browser should open a local address such as `http://127.0.0.1:5500/`. You can also double-click `index.html` directly to preview it.

## Features

- Fully responsive desktop, tablet and mobile layouts; responsive mobile navigation.
- Al Safwa branding, optimised local images taken from your uploaded artwork.
- Home, company introduction, Saudi Arabia and Qatar destinations, opportunity-interest cards, benefits, recruitment process, FAQs and contact.
- Clickable destination tabs and opportunity filters.
- **Candidate enquiry form** with field validation, consent and a composed WhatsApp message.
- **Email alternative** for application enquiries and an email-based contact form.
- WhatsApp contact shortcut, click-to-call phone number and clickable email.
- Privacy notice and website terms pages, SEO metadata and basic accessibility features.
- Mobile-friendly spacing, focus indicators and reduced-motion support.

## Important: How the enquiry forms work

**This is a real working front-end, but there is no backend or recruitment dashboard.** The candidate form gathers non-sensitive information in the browser and opens WhatsApp with a ready-to-send message. The visitor must press **Send** in WhatsApp. The email alternative and contact form open the visitor's email client with a composed draft; the visitor must send it. No information is silently stored on a server. This avoids pretending that an applicant database exists.

To receive/store submissions directly on your website, add a secure backend (such as Supabase or Firebase) with proper authentication, spam controls, database rules, email alerts, privacy consent and secure document upload. Don't build document upload into a public unprotected form.

## Where to edit things

| What | File |
| --- | --- |
| Page text, opportunities, FAQ, headings, navigation | `index.html` |
| Colours, typography, responsive breakpoints, animations | `assets/css/styles.css` |
| Country filtering, forms, menu, WhatsApp/email flow | `assets/js/main.js` |
| Company photographs & logo | `assets/images/` |
| Privacy page | `pages/privacy.html` |
| Terms page | `pages/terms.html` |

The colour palette is navy `#0A1B37`, orange `#FF650C`, cream `#FAF8F4`.

## Business details currently on the website

- **Company name:** Al Safwa Manpower Limited
- **Location:** Ngara, Nairobi, Kenya (full street address not yet provided)
- **WhatsApp / phone:** +254 755 541 141
- **Email:** dennisogato325@gmail.com
- **Destinations:** Saudi Arabia and Qatar
- **Salary text:** advertised Saudi estimates only, based on the supplied posters; all offers must be independently confirmed.

Please check the contact details before making the site public. The design avoids pretending to have verified licences, partner employers, placement numbers or actual vacancies.

## Before putting the website online

- [ ] Confirm company name, phone number, email and full office address with the company.
- [ ] Confirm current Saudi Arabia and Qatar opportunities, salaries, required qualifications and contract details.
- [ ] If available, add the **genuine** Kenya recruitment agency licence number and the issuing authority's verification link. Do not claim the business is licensed without verification.
- [ ] Have management/legal counsel review the privacy notice and terms. `noindex` is enabled on these draft pages until they are approved. Remove `noindex` when ready to publish them.
- [ ] Decide if a secure applicant database, user accounts and admin dashboard are needed.
- [ ] Publish via Netlify, Cloudflare Pages, GitHub Pages, cPanel hosting or another static website host. Upload the complete folder contents, keeping the file structure unchanged.
- [ ] Connect the domain and HTTPS, update social sharing image to an absolute URL, add a correct sitemap if needed.
- [ ] Test both forms on a real phone with WhatsApp/email installed.

## Offline note

The photos and logo are included in the project, so they work offline. The page uses a Google Fonts stylesheet when connected to the internet, but falls back to system fonts if offline. WhatsApp/email actions naturally require the relevant app/service to be available.

© Al Safwa Manpower Limited. Site content to be approved by company management before launch.
