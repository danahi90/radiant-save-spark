# **Secure Savings Pro**

# Project Context & Scope Strategy

* Strategy: Just the Demo Mode + visuals (Presentation-focused for Hackathon).

* Priority: Focus on stunning visuals, preloaded realistic mock data, smooth transitions, and flawless front-end simulation. Skip complex live database/backend integrations to maximize development speed and avoid runtime bugs during the presentation.

* Primary Persona Target: Both Student (Stipend/Savings-focused with cooling-off nudges) and Professional (Salary/Investment-focused), switchable via a "Persona Switcher" toggle in Demo Mode to showcase app adaptability.

* Default Language: Arabic (RTL) first layout as the default state, with an instant toggle switch to English (LTR).

⸻

# Interactive Prototype & Functional Navigation Requirements

This project must NOT be a static UI. Build a fully interactive banking prototype with clickable and connected experiences. All buttons, cards, and navigation elements must be functional.

### 1. Cards Experience & Security Management (Based on image_5.png layout)

Create a dedicated Cards section based on the structure shown in image_5.png:

* Main Account Card (البطاقة الرئيسية):

  - Tappable and highly interactive.

  - Standard Security Actions placed directly below it: "إظهار" (Show details), "تجميد البطاقة" (Freeze card for security/loss prevention), and "إدارة" (Manage).

  - The middle button must toggle between "تجميد البطاقة" (Freeze) and "إلغاء التجميد" (Unfreeze). This action is strictly for card/account security in case of loss, NOT for savings.

* Card Details Grid: Displaying clear fields for "رقم البطاقة" (Card Number), "المتاح" (Available Balance), and "الرصيد الإجمالي" (Total Balance).

### 2. The Savings Card & Behavioral Locking (البطاقة الادخارية)

Rename the "Flexi-Save" / "حافظة المرونة" section to **"البطاقة الادخارية"** across the entire app. This savings section must be fully interactive and separated from the main card's security features:

* Positioned right below the main card as a dedicated slot, styled exactly as the protected section in image_5.png (showing the lock icon 🔒 and "Protected" badge).

* **Visual Glow & Lighting Effect (خاصية الإضاءة):** Add a subtle, modern ambient glow effect (using soft green or golden shadow/glow effects) around the "البطاقة الادخارية" when it is in "Protected" status to draw visual attention to its secure state.

* Users must be able to:

  - Tap the "البطاقة الادخارية" section to open a dedicated savings detail page.

  - View "الرصيد المقفل" (Locked Balance), savings progress, and tracked protected savings.

  - Manage the behavioral "Cooling-off" locking mechanism: This is where the financial self-control logic belongs. 

  - Submit an unlock request for the savings, which triggers an interactive cooling-off countdown timer (e.g., "سيتم فك قفل المدخرات بعد 3 ساعات" to prevent impulse spending).

  - Cancel the unlock request at any time to keep the savings locked and protected.

  - View activation history.

### 3. Smart Notifications System (خاصية التنبيهات في العرض)

Implement an active, high-fidelity notification experience tailored for the hackathon demo:

* **Interactive Alerts:** When a user attempts to break their saving habit or requests an unlock, trigger an immediate, beautifully designed floating notification or push-alert banner at the top of the screen.

* **Notification Content:** The alerts must act as a behavioral coach (e.g., "⚠️ تنبيه تهدئة: هل أنت متأكد من الشراء الآن؟ فك قفل البطاقة الادخارية يستغرق 3 ساعات لمنع الصرف الاندفاعي").

* **Visual Polish:** Notifications should feature smooth slide-in animations and a soft neon alert indicator light/dot to make the live presentation engaging.

### 4. Functional Quick Actions

The following quick action buttons must be fully clickable and connected:

* Transfer (تحويل)

* Pay (سداد)

* Top Up (شحن)

* Investment (استثمار)

Each action must open a dedicated detail screen, simulate an interactive workflow, and conclude with a successful confirmation state. Do not leave these actions as static placeholders.

### 5. Functional Bottom Navigation

The bottom navigation bar must be fully connected, displaying active states, animated transitions, back-navigation support, and proper routing between these pages:

* Home (الرئيسية)

* Cards (البطاقات)

* Payments (المدفوعات)

* Insights (التحليلات)

* Profile / More (المزيد)

Each tab must render a dedicated screen filled with realistic, production-ready UI content.

⸻

# Technical Quality & Prototype Rules

* Data Architecture: Pure mock (fastest) approach. Store state in-memory or via localStorage. No real live cloud auth required—Demo Mode is the primary delivery vehicle.

* Localization: Ensure high-quality Arabic typography, accurate financial terminology localization, and instant RTL/LTR layout adaptation when switching languages.

* Presentation Goal: Simulate a high-fidelity mobile banking application where "Main Card Freeze" represents instant account security, "البطاقة الادخارية" showcases innovative behavioral coaching, and dynamic glow lighting effects with smart notifications elevate the UI presentation quality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5a966f11-a2a9-4da6-8f0c-bb7937f84d6a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
