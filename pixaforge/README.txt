PIXAFORGE + COOKIE EMPEROR
===========================

Files:
- index.html
- style.css
- script.js

Place these existing PIXAFORGE assets beside index.html:
- favicon.png
- word.png
- game.png

Create an assets folder and place:
- giant-cookie.png
- currency-cookie.png
- golden-cookie.png
- tiny-bakery.png
- cookie-farm.png
- bakery-background.png

Optional future building art paths already supported by the code:
- royal-oven.png
- cookie-factory.png
- cookie-mine.png
- enchanted-generator.png

Run:
Open index.html in a browser, or use VS Code Live Server.

Navigation:
- #home = PIXAFORGE homepage
- #cookie-emperor = integrated game view

IMPORTANT PROTOTYPE LIMITATIONS:
This is a frontend prototype. Progress is held in memory and resets on refresh.
There is no account authentication, cloud saving, secure offline earnings, server-side
purchase validation, recipes, collectible inventory, or prestige system yet.
The final release requires Supabase Auth + database functions/RLS and server-side
validation. Do not treat this prototype as a production multiplayer economy.
