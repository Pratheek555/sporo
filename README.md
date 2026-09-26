This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Studio video gallery

The `/studio` gallery sits below the archive book and its progress rail.
`app/components/studio-video-gallery.tsx` holds the film list. It currently uses
`public/work.mp4`, the only video in the repository. Add a distinct source, title,
description, poster, and displayed dimensions for each additional film. Use the
rotation-corrected dimensions, not just the encoded frame size. The grid adapts to
more films without repeating the same footage.

The player uses browser controls and inline playback, without autoplay or video
preloading. Its direct-video link also gives visitors a fallback if playback fails.
Add reviewed caption tracks for films with spoken content. No transcript or caption
file was supplied for the existing clip.

`public/media/studio-work-poster.jpg` is the frame at 2 seconds from `work.mp4`,
extracted with FFmpeg at 576 pixels wide. To regenerate it:

```bash
ffmpeg -ss 2 -i public/work.mp4 -frames:v 1 -vf scale=576:-1 -q:v 3 -update 1 public/media/studio-work-poster.jpg
```
