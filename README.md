# seekrett.github.io ✦

Yuto's portfolio. React + TypeScript + Vite, deployed to GitHub Pages.

## Run it locally

```bash
npm install
npm run dev
```

## Edit your content

Everything you'd normally want to change lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `src/data/profile.ts` | name, bio, typewriter roles, skill levels, talents, contact links |
| `src/data/projects.ts` | the project collection (rarity 5/4/3 = gold/purple/blue cards) |
| `src/data/writing.ts` | the bookshelf (the three books there now are **samples**, replace them) |

## Site map

The page reads like a skating program instead of a tab bar. The skate on the left rail (a pill at the bottom on phones) glides to the section you're on.

| Section | File | Idea |
| --- | --- | --- |
| Opening Pose | `src/sections/Hero.tsx` | name, typewriter roles, figure-eight rink |
| Warm-up | `src/sections/About.tsx` | about me as a gacha character profile |
| Project Banner | `src/sections/Projects.tsx` | wish ×1 pull animation, limited events, collection |
| Library | `src/sections/Writing.tsx` | bookshelf; click a spine to open the book |
| Kiss & Cry | `src/sections/Contact.tsx` | contact scoreboard, throw plushies onto the ice |

## Playable activities (Limited Events)

Mini-projects that run on the site itself live in `src/activities/` and are listed in `src/activities/index.ts`.
Each one gets a "Limited Event" card in the Projects section and opens at `https://seekrett.github.io/#/play/<id>`.

**Gift Exchange Draw** (`#/play/gift-draw`): enter everyone's names, then each person picks who they are and draws a
name out of the box. Drawn names are removed from the box. With "can't draw their own name" on, nobody draws
themselves and the last person never gets stuck with their own name. Progress is saved in that browser, so do all the
draws on the same device.

### Removing the gift draw when the event is over

1. Delete the folder `src/activities/gift-draw/`.
2. Delete its entry from the `activities` list in `src/activities/index.ts`.

That's it. With no activities left, the Limited Event card disappears and the rest of the site is unchanged.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it.
One-time setup: on GitHub go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
