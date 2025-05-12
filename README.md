# Obsidian FileTitle

Auto-renames your note to a kebab-case, accent-free filename based on the YAML frontmatter `title`.

## Why?

I made this for myself because it matches my workflow. I create new notes based on a frontmatter template that i have on the side. I only care about the frontmatter `title` to name my content, but, in doing so, i'd have to rename the filename too afterwards.

To eliminate this last step, this plugin will rename the filename based on whatever i wrote into the `title`.

## How to use

Edit your frontmatter `title:` and save—your file will instantly rename.

## How to change

- Clone this repo
- `npm install`
- Make your changes to `main.ts`
- `npm run build` to get the output files onto `dist/`
- Grab those files
- Paste them on the place where Obsidian app will pick them: `.obsidian/plugins/filetitle`
- If open, close your Obsidian app
- Open your Obsidian app and enable "FileTitle" under Community Plugins

## Warning

This is very experimental and may not work on your vault. Back up your files before using it. I will not be responsible for anything.
