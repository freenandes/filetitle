# Obsidian FileTitle

Auto-renames your note to a kebab-case, accent-free filename based on the YAML frontmatter `title`.

## Why?

I made this for myself because it matches my workflow. I create new notes based on a frontmatter template, and i only care about the `title` to name my files. This plugin eliminates the extra file renaming step.

## Installation

1. Download the [latest release](https://github.com/freenandes/filetitle/releases)
2. Copy the files onto this new folder `<Your Vault Folder>/.obsidian/plugins/filetitle/`
3. Enable the plugin in your Obsidian app → Settings → Community plugins  
4. Find **FileTitle** in the list and toggle it on
4. Restart Obsidian if it's not working

## Usage

1. Open or create a note with YAML frontmatter, e.g.:
    ```md
    ---
    title: Pão para soluços
    ---
    ```
2. Save or click outside the name title field
3. The file will be immediately renamed to `pao-para-solucos.md`

## Development

1. Clone this
2. `npm install` to get the dependencies
3. Edit `main.ts`
4. Build the files `npm run build`
4. Manually copy the files like in the installation instructions above

## Warning

This is experimental and may not work on all vaults. **Back up your files** before using. I’m not responsible for any data loss.
