# Ticketshop Prototype Web Analytics Strategy

A small, static prototype of a train-ticket shop landing page, built for a group assignment **"Developing a Web Analytics Strategy"** (university course on web analytics). It demonstrates consent-based tracking with Google Tag Manager and Google Analytics.

[Live demo](https://blackscreen21.github.io/landing_page/#)

> **Disclaimer:** This is a student project. It is **not** affiliated with, endorsed by, or connected to ÖBB. It sells nothing, has no backend, and the search does not return real connections. The layout is modelled on a public ticket shop purely for educational purposes. ÖBB and related names, logos and illustrations belong to their respective owners.

## What it does

- Landing page with ticket search (from / to, date, time, travellers, discount), recent searches, popular products and saved-trips teaser
- German / English language switch
- Light and dark mode, keyboard-friendly, responsive down to mobile
- Cookie banner: **no tracking script is loaded until the visitor clicks "Accept"**
- Recent searches are stored only in the visitor's own browser (`localStorage`) and never sent anywhere

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `styles.css` | Styling (light/dark, responsive) |
| `index.js` | Consent handling, GTM loading, event tracking, language switch, recent searches |
| `background_d5968060.svg` | SVG of OEBB |
| `discount_selector_opened` | Discount menu opened (first time in session) | – |
| `discount_selected` | Discount successfully chosen & applied | `discount` |

No build step and no dependencies. Open `index.html` in a browser or serve the folder with any static host (e.g. GitHub Pages).

## Tracking setup

**Tools:** Google Tag Manager (container `GTM-KD3RTMKB`) → Google Analytics 4 (measurement ID `G-VBB208P8D4`)

**Consent configuration**
1. On first visit a banner asks for consent. The choice is saved in `localStorage` under `analytics_consent`.
2. Only after "Accept" does `index.js` inject the GTM script. Before that, the `track()` function drops every event.
3. "Decline" is as easy as "Accept" and nothing is loaded.
4. "Change cookie settings" removes the stored choice, deletes `_ga*` cookies and reloads the page.
5. GA4 does not store IP addresses. Data retention is set to the 2-month minimum.

**Events pushed to `dataLayer`**

| Event | Trigger | Parameters |
|---|---|---|
| `search_submit` | Valid search submitted | `ticket_type`, `reservation_only`, `travellers`, `discount` |
| `cta_click` | Click on a product tile | `cta_name` |
| `login_click` | Click on account / "Log in" | `location` (`header`, `saved_trips`) |
| `ticket_type_change` | Ticket type dropdown changed | `ticket_type` |
| `reservation_only_toggle` | "Seat reservation only" toggled | `enabled` |
| `swap_stations_click` | Origin / destination swapped | – |
| `time_now_click` | "Now" button | – |
| `recent_search_click` / `_delete` / `_clear` | Interaction with recent searches | – |
| `language_change` | DE/EN switch | `language` |

Station names are deliberately **not** tracked.

**KPI mapping (examples)**
- Search conversion: `search_submit` / sessions
- Product interest: `cta_click` by `cta_name`
- Login intent: `login_click` by `location`
- Audience behaviour: language, ticket type and discount distribution

GTM triggers fire only on the prototype's hostname, so events from other origins are ignored.
