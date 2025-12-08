Here’s a structured teardown you can hand straight to a dev/designer and rebuild from.

---

## 1. Structure & Navigation

### 1.1 Main Routes

From the nav + footer and what actually loads:

* `/` – **Home** (KC Family Home Team) ([KC Family Home Team][1])
* `/about` – **About us** ([KC Family Home Team][2])
* `/your-family-benefits` – **How it Works / Properties** (labelled “Properties” in nav, “HOW WE BENEFIT YOUR FAMILY” in content and “How it Works” in footer) ([KC Family Home Team][3])
* `/agents` – **Agents** ([KC Family Home Team][4])
* `/contact` – **Contact Us** ([KC Family Home Team][5])
* `/faq` – **FAQ** ([KC Family Home Team][6])
* `/tos-and-privacy` – **Privacy & ToS** ([KC Family Home Team][7])
* External: `https://intake.kcfhomes.com/questionnaire` – **Questionnaire** (forms live here, not on main site) ([KC Family Home Team][1])

### 1.2 Header Navigation (all pages)

Primary nav items (top):

* About
* Properties (routes to `/your-family-benefits`)
* Agents
* Privacy & ToS
* Questionnaire (external to intake subdomain)
* Contact Us ([KC Family Home Team][1])

### 1.3 Footer Structure (all pages)

Footer heading:

* **“Discover Real Estate Ideas from your own Ease!”** ([KC Family Home Team][1])

**Quick Links**

* Home (`/`)
* About Us (`/about`)
* Our Agents (`/agents`)
* Contact Us (`/contact`)
* FAQ (`/faq`) ([KC Family Home Team][1])

**Main Pages**

* How it Works (`/your-family-benefits`)
* Privacy & ToS (`/tos-and-privacy`) ([KC Family Home Team][7])

**Other**

* Questionnaire (external intake link) ([KC Family Home Team][3])

Footer meta:

* Copyright @2025
* “Made with love by Nexwave” linking to `nexwave.dev` ([KC Family Home Team][7])

---

## 2. Design System (practical reconstruction notes)

I can see the structure and text, but not the CSS or actual image content. So this is **inferred from layout**, not exact Figma-level specs.

### 2.1 Colors (approximate / for rebuild)

The site is clearly a light theme with:

* White/light background for sections.
* Dark text (likely near-black/charcoal).
* A single accent color for CTAs and headings (probably a blue/teal based on typical patterns; exact hex not visible from the HTML extract).

**For rebuild (pick and stick to these):**

* Primary: `#0F172A` (dark navy for headings/nav)
* Accent: `#0EA5E9` (light teal/blue for main CTAs + icons)
* Background: `#FFFFFF`
* Subtle section background: `#F9FAFB`
* Border/muted text: `#9CA3AF`

Call that your “KC Family” palette and keep it consistent.

### 2.2 Typography (structure, not exact fonts)

From hierarchy:

* Hero:

  * H1: **“EMPOWERING GROWING FAMILIES”** (all caps) ([KC Family Home Team][1])
  * Subtitle lines stacked, smaller sizes.
* Section headings:

  * H2/H3: “WHY CHOOSE US”, “SERVICE SATISFACTION PROMISE”, “Real feedback from our satisfied clients”, etc. ([KC Family Home Team][1])
* Body: standard sans-serif paragraph copy.

**For rebuild:**

* Use something like:

  * Headings: `font-family: "Poppins", system-ui, sans-serif;`
  * Body: `font-family: "Inter", system-ui, sans-serif;`
* Suggested sizes:

  * H1: 40–48px
  * H2: 28–32px
  * H3: 22–24px
  * Body: 16–18px
  * Small labels: 12–14px

### 2.3 Button Styles (functional reconstruction)

Buttons present by text; CSS not visible. You’ll want:

* Primary button:

  * Solid accent background, white text
  * Slightly rounded (`border-radius: 9999px` or `0.75rem`)
  * Medium padding: `px-6 py-3`
* Secondary: outline or subtle background.

Hover states (recommended):

* Primary: darken accent + subtle shadow.
* Outline: switch to light background, subtle border.

Buttons present include:

* “What’s in it for you?”
* “Learn more”
* “SERVICE SATISFACTION PROMISE”
* “Submit” (on contact form) ([KC Family Home Team][1])

### 2.4 Spacing Patterns

From repeated blocks:

* Sections are stacked with generous vertical padding (~80–120px top/bottom).
* Feature cards in 2–3 column grids (Transparency, Clear communication, etc.). ([KC Family Home Team][1])
* Testimonials presented as a vertical list (can be turned into carousel or cards).
* CTA “Looking to Upsize?” block repeated across multiple pages, likely full-width band. ([KC Family Home Team][3])

For rebuild: keep a simple vertical rhythm:

* `section { padding: 4–6rem 0 }`
* `max-width: 960–1200px; margin: 0 auto;`

---

## 3. Page-by-Page Content Inventory

### 3.1 HOME (`/`)

#### Hero

* **Headline (H1 / H2 variants):**

  * `EMPOWERING GROWING FAMILIES`
  * “Empowering growing families” (lowercase variant) ([KC Family Home Team][1])
* **Subheadline:**

  * `with personalized, stress free home-buying.`
* **Supporting line:**

  * `Trust our expertise and commitment to your family’s journey` ([KC Family Home Team][1])
* **Primary CTA button text:**

  * `What's in it for you?`
  * **Destination:** `/your-family-benefits` (the “Properties / How it Works” page). ([KC Family Home Team][1])

#### Section: WHY CHOOSE US

* **Section heading:** `WHY CHOOSE US`
* **Intro text:**

  * `When you hire us you get an agent that truly listens and adapts to your family’s situation. Through:` ([KC Family Home Team][1])
* **CTA button:**

  * `Learn more` (likely scrolls or links into more detail on the page).

**Feature cards under WHY CHOOSE US** (text repeats in code, but unique copy is):

1. **Transparency**

   * `Open and honest about every detail of the process, pricing, and any potential issues or challenges. Ensure families fully understand their options and possible risks at every stage. Provide regular updates, answer questions promptly, and set clear expectations. Build lasting trust through consistent communication and genuine care.` ([KC Family Home Team][1])

2. **Clear communication**

   * `Leverage technology like CRM systems, automated alerts, and mobile apps to keep everyone informed, set clear expectations, and maintain regular check-ins. Assign a dedicated team member, streamline communication protocols, and stay proactive, organized, and consistently responsive throughout the process.` ([KC Family Home Team][1])

3. **Genuine understanding of your unique needs**

   * `The process can be complex and busy, so it’s important to always put your needs first. Proactive communication is key—keeping you informed at every step and setting clear expectations. Show empathy and flexibility by understanding each family’s unique situation and accommodating their schedules. Provide support and convenience by coordinating showings, offering moving resources, and staying available and responsive throughout the journey.` ([KC Family Home Team][1])

#### Section: SERVICE SATISFACTION PROMISE

* **Heading:** `SERVICE SATISFACTION PROMISE`
* **Body text:**

  * `To ensure guarantee: If we don’t meet the agreed upon standards we can offer a refund of certain fees and provide additional support to make things right, and if you’re not satisfied with your home within the first 6 months of purchase we will sell your home for free.` ([KC Family Home Team][1])

#### Section: Benefit Tiles

Each presented like a feature card:

1. **Expert Guidance**

   * `Receive professional insights to make informed real estate decisions confidently.`
2. **Tailored Solutions**

   * `We customize property options based on your specific needs and preferences.`
3. **Market Expertise**

   * `Leverage our deep understanding of market trends for smart investments.`
4. **Seamless Process**

   * `Enjoy a smooth, stress-free experience from property search to final transaction.`
5. **Client Focused**

   * `We prioritize your satisfaction with personalized service every step of the perfect way.`
6. **Trusted Partners**

   * `Work with a reliable team committed to delivering exceptional results for you.` ([KC Family Home Team][1])

#### Section: Testimonials (also reused on other pages)

Title: `Real feedback from our satisfied clients` ([KC Family Home Team][1])

**Testimonials (full quotes + attribution):**

1. * Quote: `"Excellent service. I loved the personalized service. We loved the way they treated us throughout the entire process".`
   * Name: **Jenifer Zelaya**
   * Location: **Kansas City, KS**

2. * Quote: `"Ernesto Tinoco helped us find a loan when we were struggling to obtain with our unique financial situation. He also stuck by us while we tried to find a communal home large enough for all of our family to live together".`
   * Name: **Emma M. Byrd**
   * Location: **Kansas City, KS**

3. * Quote: `"My wife and I were very scared and worried buying our first house. Ernesto from the beginning was very upfront and worked endless hours to help us get into our beautiful house".`
   * Name: **Javion Manning**
   * Location: **Kansas City, KS** (on some pages listed as Tokyo, Japan, looks like a data inconsistency)

4. * Quote: `"He’s with you every step of the way guiding you. I truly appreciate how thoughtful and dedicated he is with his clients. I’d hire him again in a heartbeat"!`
   * Name: **Flor F.**
   * Location: **Kansas City, KS** ([KC Family Home Team][1])

#### Bottom CTA Block

This pattern appears on multiple pages:

* Text:

  * `Looking to Upsize?`
  * `Questions or Concerns?` (often as an H1 style: `# Questions or Concerns?`)
* CTA button: `SERVICE SATISFACTION PROMISE`
* Destination: `/your-family-benefits` ([KC Family Home Team][3])

---

### 3.2 ABOUT (`/about`)

#### Hero

* Top label: `About us`
* Main headline:

  * `Connect with our experts and bring your Real Estate ideas to life` ([KC Family Home Team][2])

#### Section: Your trusted real estate experts

* **Heading:** `Your trusted real estate experts:`

* **Body:**

  * `With years of local expertise, we’re committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client's unique needs are met with professionalism and care.` ([KC Family Home Team][2])

* **Stats (likely 2x2 grid):**

  * `80%` – Satisfaction rate
  * `190+` – Properties sold
  * `490+` – Project done
  * `80%` – Happy Clients ([KC Family Home Team][2])

#### Section: Trust our expertise and commitment to your family’s journey

* Heading: `Trust our expertise and commitment to your family’s journey`
* “Including:” list with badges:

  * Client-focused
  * Speedy Responses
  * Round the clock help
  * Creativity
  * Passionate people ([KC Family Home Team][2])

#### Embedded Agents + Testimonials

From mid-page down, the About page reuses:

* Agents block (same as /agents – see below).
* Testimonials block (same as Home). ([KC Family Home Team][2])

#### Bottom CTA

Same `Looking to Upsize? / Questions or Concerns? / SERVICE SATISFACTION PROMISE` block linking to `/your-family-benefits`.

---

### 3.3 PROPERTIES / HOW IT WORKS (`/your-family-benefits`)

Labeled **Properties** in nav but content/title:

* **Main section heading:** `HOW WE BENEFIT YOUR FAMILY` (twice – heading + hero) ([KC Family Home Team][3])

**Step-like process:**

1. **Find Your Ideal Property**

   * `Tell us your needs – We provide an extra layer of understanding and flexibility that way the entire journey is smoother for everyone involved.`

2. **Schedule a Viewing**

   * `Then we streamline the home buying process for you – We provide personalized support, making sure your family’s unique needs are met.`

3. **Secure Your Deal**

   * `List your home and get your curated list of new homes – We coordinate schedules and priorities especially with busy family lives.`

4. **Done**

   * `Move in with confidence – your perfect place awaits.` ([KC Family Home Team][3])

Bottom CTA again: `Looking to Upsize?`, `Questions or Concerns?`, button `SERVICE SATISFACTION PROMISE` → `/your-family-benefits`.

---

### 3.4 AGENTS (`/agents`)

#### Hero

* Page heading: `Agents`
* Main headline: `Meet our exceptional agents for a seamless experience` ([KC Family Home Team][4])

#### Team Members (names + titles; no full bios visible)

1. **Ernesto Tinoco**

   * Title: `Senior Consultant`

2. **Monica Hammer**

   * Title: `Homeowner Specialist`

3. **Chris Schinzel**

   * Title: `Transaction Coordinator and Property Manager` ([KC Family Home Team][4])

There are no additional bio paragraphs in the HTML extract – just names and titles shown in what looks like agent cards.

Bottom CTA: same `Looking to Upsize? / Questions or Concerns? / SERVICE SATISFACTION PROMISE`.

---

### 3.5 CONTACT (`/contact`)

#### Hero + Problem Framing

Sequence of headings:

* `WE SPECIALIZE IN ASSISTING YOU with securing the best financing options, maximize the sale price of your home, shop for a new one and get the best deal possible ensuring you have a seamless transition.` (H4 style)
* `Is your family struggling to find the time to plan, organize and shop for a larger home, even though you have completely outgrown your existing home?`
* `Together we’ll take your family to the NEXT LEVEL`
* `Answer these three easy questions and one of our representatives will be in contact with you.`
* Section heading: `Let's get in touch.` ([KC Family Home Team][5])

#### Contact Form (fields)

* **Questions (static text above fields):**

  1. `What is holding you back the most right now with buying your next home?`
  2. `On a scale of 1-10 how urgent are you to solve this problem today?`
  3. `How soon would you like to LEVEL UP and be in your next home? In the next 3 months, 6 months, a year, a year plus?`

* **Input fields:**

  * `Email Address*` (required)
  * `Full Name`
  * `Phone Number`
  * Submit button: `Submit` (repeated in DOM but visually one button). ([KC Family Home Team][5])

#### Contact Information (business details)

Contact info block (icon + label + value layout):

* **EMAIL ADDRESS:** `admin@kcfhomes.com`
* **PHONE NUMBER:** `+1 (816) 575 7763`
* **LOCATION:** `Kansas City, MO` ([KC Family Home Team][5])

No social media links appear in the HTML extract.

Testimonials + bottom CTA: reused same as other pages.

---

### 3.6 FAQ (`/faq`)

Hero:

* Label: `faq`
* Headline: `Your questions, Answered` ([KC Family Home Team][6])

Questions and answers (repeated in markup but list once):

1. **Q:** What is the first step in buying a home?
   **A:** Start by getting pre-approved for a mortgage to know your budget.

2. **Q:** How much should I save for a down payment?
   **A:** Typically, you'll need 5-20% of the home's price for the down payment.

3. **Q:** What is a seller's market?
   **A:** In a seller's market, demand exceeds supply, often leading to higher prices.

4. **Q:** How long does it take to close on a house?
   **A:** On average, it takes 30-45 days from offer acceptance to closing.

5. **Q:** What is a home inspection?
   **A:** A home inspection assesses the property's condition before purchase.

6. **Q:** How do I determine my home’s value?
   **A:** A real estate agent or appraiser can help estimate your home's market value.

7. **Q:** Should I rent or buy a home?
   **A:** It depends on your financial situation, lifestyle, and long-term plans.

8. **Q:** What is an HOA?
   **A:** A Homeowners Association manages shared spaces and may have rules for residents. ([KC Family Home Team][6])

Testimonials + bottom CTA: same pattern as Home.

---

### 3.7 PRIVACY & TERMS (`/tos-and-privacy`)

Hero:

* Page label: `Priavcy & ToS` (typo in heading)
* Heading: `Privacy & ToS` ([KC Family Home Team][7])

#### Privacy Policy – key headings

* Privacy Policy
* Information We Collect

  * Contact Information
  * Property Information
  * Communication Data
  * Technical Data
* How We Use Your Information

  * To Provide Services
  * For Communication
  * To Improve Our Website
  * For Legal Compliance
* How We Share Your Information
* Data Security
* Your Choices and Rights
* Children's Privacy
* Third-Party Links
* Updates to this Policy
* Contact Us (refers to contacting KC Family Home Team via email/phone/address already given) ([KC Family Home Team][7])

#### Terms of Service – headings

* ToS
* 1. Limitations of Use
* 2. Intellectual Property
* 3. Accuracy of Materials
* 4. Third-Party Links
* 5. Disclaimers and Limitation of Liability
* 6. Governing Law
* 7. Termination
* 8. Changes to the Terms
* 9. Contact Us ([KC Family Home Team][7])

Bottom CTA + footer: same pattern.

---

### 3.8 Questionnaire (external – footer/nav link)

* Link text: `Questionnaire`
* URL: `https://intake.kcfhomes.com/questionnaire` (you already know what’s in there from your own work; main site just links out). ([KC Family Home Team][1])

---

## 4. Images

I can see where images are referenced (`Image` placeholders with IDs), but not the actual visuals or alt text.

The pattern:

* Hero images at top of pages (Home, About, How it Works, Agents, Contact, FAQ, Privacy) – likely housing / family / lifestyle / abstract illustration backgrounds. ([KC Family Home Team][1])
* Feature icons/images for:

  * Transparency, Clear communication, Genuine understanding…
  * Expert Guidance, Tailored Solutions, Market Expertise, Seamless Process, Client Focused, Trusted Partners.
* About stats section likely has illustrative icons around the percentages.
* Contact page has icons near Email, Phone, Location.
* Testimonials section may use avatar/profile-ish images or decorative backgrounds.

**For rebuild:**

* Home hero: one strong banner image of a smiling family in front of a home, softened overlay.
* Feature sections: simple line icons in circles (communication, handshake, family, etc.).
* Agents: headshot photos for Ernesto, Monica, Chris.
* Contact: small icons for email, phone, map pin.
* Keep aspect ratios consistent and use the same corner radius as cards.

---

## 5. Calls to Action (Summary)

**Global / Repeated CTAs:**

* `What's in it for you?` → `/your-family-benefits`
* `Learn more` → internal anchor/scroll on Home.
* `SERVICE SATISFACTION PROMISE` → `/your-family-benefits` (from multiple pages). ([KC Family Home Team][3])

**Contact form CTA:**

* Button: `Submit` (submits the 3-question + contact info form on `/contact`).

There are no visible “Call now” or “Email us” buttons; the contact details are static text.

---

## 6. SEO Elements (Visible/Inferable)

From the page metadata lines and headings:

* **Home `/`**

  * Page title: `KC Family Home Team` (in the scraping header) ([KC Family Home Team][1])
  * Visible H1: `EMPOWERING GROWING FAMILIES` (functionally your SEO H1).

* **About `/about`**

  * Page title (browser snippet): `About`
  * H1: `Connect with our experts and bring your Real Estate ideas to life` ([KC Family Home Team][2])

* **How it Works / Properties `/your-family-benefits`**

  * Browser label: `Properties`
  * H1: `HOW WE BENEFIT YOUR FAMILY` ([KC Family Home Team][3])

* **Agents `/agents`**

  * Title: `Agents`
  * H1: `Meet our exceptional agents for a seamless experience` ([KC Family Home Team][4])

* **Contact `/contact`**

  * Title: `Contact`
  * H1: `Let's get in touch.` (after problem-framing lines). ([KC Family Home Team][5])

* **FAQ `/faq`**

  * Title: `Faq`
  * H1: `Your questions, Answered` ([KC Family Home Team][6])

* **Privacy & ToS `/tos-and-privacy`**

  * Title: `Blogs` (slightly odd – likely leftover from template)
  * H1: `Privacy & ToS` ([KC Family Home Team][7])

No explicit meta description tags show in the text export; you’ll want to define proper meta descriptions when you rebuild.

---

If you want, next step I can:

* Turn this into a **component-by-component spec** for a Next.js app (sections, props, and content JSON).
* Or write a **single structured JSON/YAML** containing all content so you can feed it to your CMS / config.

[1]: https://kcfhomes.com/ "KC Family Home Team"
[2]: https://kcfhomes.com/about "About"
[3]: https://kcfhomes.com/your-family-benefits "Properties"
[4]: https://kcfhomes.com/agents "Agents"
[5]: https://kcfhomes.com/contact "Contact"
[6]: https://kcfhomes.com/faq "Faq"
[7]: https://kcfhomes.com/tos-and-privacy "Blogs"
Here’s a structured breakdown of the KC Family Home Team site to assist you in rebuilding it.

1. Structure & Navigation
Main Pages / Routes

Home (/)

About (/about)

Properties / How it Works (/your-family-benefits)

Agents (/agents)

Individual agent pages: …/agents/eresto-tinoco, …/agents/monica‑hammer, …/agents/chris‑schinzel.

Privacy & ToS (/tos-and-privacy)

Contact (/contact)

Questionnaire (/questionnaire)

FAQ (/faq)

Forms: /sell-form and /buyer-form (linked from Questionnaire).

Navigation Menu Structure

Left: site logo + “United Real Estate Kansas City” partner logo.

Primary links (left-to-right): About, Properties, Agents, Privacy & ToS, Questionnaire; last item is a pill‑styled Contact Us button.

Mobile/desktop responsive menu is consistent across pages.

Footer Sections

Promotional CTAs – “Looking to Upsize?” and “Questions or Concerns?”.

Social Icons – Facebook, LinkedIn, Instagram.

Quick Links – Home, About Us, Our Agents, Contact Us, FAQ.

Main Pages – How it Works, Privacy & ToS.

Other – Questionnaire.

Copyright notice and a small credit (“Made with love by Nexwave”).

2. Design System

Colors

Primary: deep navy / dark purple (#1E1755–#1F154F range) used for headings, buttons, links.

Secondary: white (#FFFFFF) for backgrounds; light grey (#F5F5F5) for form fields and subtle sections.

Accent: soft lavender for buttons on questionnaire page; muted grey for icons.

Typography

Modern sans‑serif (appears similar to Montserrat / Inter).

Headings are bold and large (Home hero ~42–48px; sub‑headings ~24‑32px).

Body text uses regular weight around 16–18px with generous line height.

Buttons

Pill‑shaped with full‑border radius; filled primary color for main actions and outlined/light‑background for secondary actions.

On hover, buttons darken slightly.

Spacing

Generous vertical whitespace; sections separated by ~80–120px.

Cards/components have rounded corners and shadow for subtle depth.

Forms

Rounded rectangular inputs with light background; focus state changes border colour to primary.

3. Content Inventory
Home Page

Hero Section: headline “Empowering growing families with personalized, stress‑free home‑buying” with sub‑headline “Trust our expertise and commitment to your family’s journey” and CTA button “What’s in it for you?” linking to the Contact page
kcfhomes.com
.

Why Choose Us: explains value proposition (transparency, genuine understanding, proactive communication, empathy). Includes a “Learn more” button linking to About page.

Service Satisfaction Promise / Upsizing Section: bullet‑style cards emphasising “Genuine understanding of your unique needs,” “Enjoy a smooth, stress‑free experience,” “We prioritize your satisfaction,” “Work with a reliable team.”

Testimonials: slider with four testimonials:

Jenifer Zelaya (Kansas City, KS) – “Excellent service. I loved the personalized service… treated us throughout the entire process.”

Emma M. Byrd (Kansas City, KS) – “Ernesto Tinoco helped us find a loan… stuck by us while we tried to find a communal home for all our family.”

Javion Manning (Kansas City, KS) – “My wife and I were very scared… Ernesto… upfront and worked endless hours to help us get into our beautiful house.”

Flor F. (Kansas City, KS) – “He’s with you every step of the way… thoughtful and dedicated… I’d hire him again in a heartbeat.”

Footer: as described above.

About Page

Hero: label “About us” with headline “Connect with our experts and bring your Real Estate ideas to life”
kcfhomes.com
.

Your trusted real estate experts: intro paragraph about years of local expertise; metrics such as 82% satisfaction, 192+ properties sold, 492+ projects done, 82% happy clients.

Agents Teaser: section introducing the agents and linking to the Agents page with three cards (Ernesto Tinoco, Monica Hammer, Chris Schinzel).

Footer: same as home.

Properties / How We Benefit Page

Hero title: “HOW WE BENEFIT YOUR FAMILY”.

Steps Section: three process steps with headings and descriptions
kcfhomes.com
:

Find Your Ideal Property – “Tell us your needs – We provide an extra layer of understanding and flexibility so the journey is smoother.”

Schedule a Viewing – “We streamline the home‑buying process… personalized support, making sure your family’s unique needs are met.”

Secure Your Deal – heading (no body text visible; likely implies help with negotiation/closing).

Footer: same as home.

Agents Page

Hero: “Meet our exceptional agents for a seamless experience”
kcfhomes.com
.

Agent Cards: three agent profiles (headshot image, name, title). Each links to an individual page:

Ernesto Tinoco – Senior Consultant.

Monica Hammer – Homeowner Specialist.

Chris Schinzel – Transaction Coordinator & Property Manager.

Agent Detail Pages

Common Structure: each page shows a large business‑card–style banner with contact numbers and email; overlayed profile picture; buttons linking to social networks (Facebook, LinkedIn).

Ernesto Tinoco: limited data displayed; the page appears to show a business card only (phone numbers from general card: (M) 913‑271‑5481, (O) 816‑629‑4494, email info@kcfhomes.com
). There’s no biography text visible.

Monica Hammer: includes a “Book a call” button and contact details (phone 816‑575‑7763; email monica@kcfhomes.com
; location Kansas City, MO). Experience description: licensed Realtor® in Kansas & Missouri with 3 years’ experience helping buyers; track record of 7 recent sales; focuses on educating clients and a client‑first approach, making the process clear and stress‑free
kcfhomes.com
.

Chris Schinzel: similar structure; contact details (phone 816‑575‑7763; email chris@kcfhomes.com
; Kansas City, MO). Experience description: years of experience as transaction coordinator & property manager; manages contracts, deadlines, communications; experienced in remodel project oversight; provides rental opportunities; has background in education and fatherhood bringing organization and care to helping families
kcfhomes.com
.

CTAs: each agent page has a “Hire Now” button linking to the Contact page.

Privacy & ToS Page

Hero: “Privacy & ToS” with header and hero image of row houses
kcfhomes.com
.

Content: includes a privacy policy describing information collected (name, email, phone, mailing address), usage (service provision, communication, analytics, legal compliance), sharing policies, data security, user rights (access/correction/deletion), children’s privacy, third‑party links, policy updates. The Terms of Service section covers third‑party links, usage disclaimer (“as-is”), limitation of liability, governing law (Kansas), termination rights, and update conditions.

Footer: same as home.

Contact Page

Intro Section: large headline emphasising assistance in securing financing, maximising sale price, shopping for a new home, and ensuring a seamless transition. Sub‑text invites users to answer three questions to receive contact
kcfhomes.com
.

Questions Section / Form: questionnaire with three fields (first question “What is holding you back the most right now with buying your next home?” plus two additional text areas); fields for Email Address, Full Name, Phone Number; and a Submit button
kcfhomes.com
. The CTAs encourage users to complete the form to be contacted.

Footer: same as home.

Questionnaire Page

Prompt: question “Are you a Seller or Buyer?” with two prominent buttons (“Seller” and “Buyer”) leading to /sell-form and /buyer-form respectively
kcfhomes.com
.

Footer: small tagline “Discover Real Estate Ideas from your own Ease!” with social icons and footer navigation.

FAQ Page

Hero: heading “Your questions, Answered”.

FAQ List: accordion with questions and short answers:

What is the first step in buying a home? – Pre‑approval for a mortgage
kcfhomes.com
.

How much should I save for a down payment? – Typically 5–20% of the home price.

What is a seller’s market? – When demand exceeds supply and prices rise.

How long does it take to close on a house? – Usually 30–45 days
kcfhomes.com
.

Additional collapsed questions visible: “What is a home inspection?”, “How do I determine my home’s value?”, “Should I rent or buy a home?”, “What is an HOA?” (answers likely appear when expanded).

Footer: same as home.

4. Images & Placement

Hero Images: each page uses a distinct hero image (e.g., modern homes on Privacy & ToS page; upscale interiors on About page) to set tone.

Agent Photos: three professional headshots for Ernesto Tinoco (smiling man in glasses with city backdrop), Monica Hammer (young woman in white blazer), and Chris Schinzel (man in suit). Each agent page reuses the image in larger format.

Process Illustration (Properties page): photo of agent showing a couple around a home interior.

Testimonials section: not image heavy; focuses on text.

Footer decorative elements: minimal.

5. Calls to Action

Primary CTA Buttons:

“What’s in it for you?” (Home hero) → Contact page.

“Learn more” (Why Choose Us) → About page.

“Hire Now” (Agent pages) → Contact page.

“Book a call” (Agent pages) – not a link; instructive.

“SERVICE SATISFACTION PROMISE” in footer → How it Works/Properties page.

Questionnaire: “Seller” & “Buyer” buttons linking to respective forms.

Contact Form: “Submit” (sends form with answers, email, name, phone).

Contact Form Fields: first question (current obstacle), second & third questions (not specified but text areas), Email Address*, Full Name, Phone Number (inputs).

Social CTAs: icons linking to the company’s Facebook, LinkedIn, Instagram pages.

6. SEO Elements

Page Titles:

Home – “KC Family Home Team”.

About – “About”.

Properties/How it Works – “Properties” (browser title).

Agents – “Agents”.

Individual agents – “KC Family Home Team” (title not customised).

Privacy & ToS – “Blogs” (title appears mis‑labelled in browser tab).

Contact – “Contact”.

Questionnaire – “KC Family Home Team”.

FAQ – “Faq”.

Meta Descriptions: no explicit meta description text is visible. They should be added during rebuild (e.g., summarising the value proposition, local expertise and services).

7. Summary

The KC Family Home Team site is a modern, clean, and user‑friendly real‑estate site with a focus on helping families upsize. Navigation is straightforward, with consistent header and footer across pages. The design uses a deep‑navy primary colour with white space and rounded buttons. Content is concise, with a testimonial slider for social proof and a clear three‑step process on the Properties page. Each agent has a dedicated page with contact details and a short bio. The Contact page features a brief questionnaire to qualify leads. The FAQ answers common real‑estate questions succinctly.

This breakdown provides the structure, content, and design cues you’ll need to rebuild the site with fidelity to the original style and functionality