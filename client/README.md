# BSI Solutionz Website

Astro + React build of the BSI Solutionz marketing site.

## Stack
- Astro
- React islands
- Tailwind CSS
- Lenis smooth scrolling
- Sonner notifications

## Scripts
- `npm run dev`
- `npm run build`
- `npm run preview`

## Notes
- Static sections are implemented in `.astro` components and pages.
- Interactive UI is kept in React islands under `src/components/react/`.
- The current enquiry flow still posts to `/api/enquiry`, which is an inherited serverless path and should be treated as a separate architecture decision from the Astro UI migration.
