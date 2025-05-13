# Obsidian FileTitle

Auto-renames your Obsidian note to a kebab-case, accent-free filename based on the YAML frontmatter `title`.

## Why?

I made this for myself because it matches my workflow. I create new notes based on a frontmatter template, and i only care about the `title` to name my files. This plugin eliminates the extra file renaming step.

## Installation

- Download the [latest release](https://github.com/freenandes/filetitle/releases)
- Copy the files onto this new folder `<Your Vault Folder>/.obsidian/plugins/filetitle/`
- Enable the plugin in your Obsidian app → Settings → Community plugins  
- Find **FileTitle** in the list and toggle it on
- Restart Obsidian if it's not working

## Usage

- Open or create a note with YAML frontmatter, e.g.:
    ```md
    ---
    title: Pão para soluços
    ---
    ```
- Save or click outside the name title field
- The file will be immediately renamed to `pao-para-solucos.md`

Note: The behavior should only affect the file being edited at that precise moment. It shouldn't bulk change all other files.

## Settings

You can configure which folders to ignore in Settings → Community plugins → FileTitle → Options

Under "Excluded folders", enter comma-separated folder names, relatively to vault root, to ignore from the renaming process. For example: `templates, attachments`.

Notes:
- Leading/trailing spaces are ignored.  
- You can use names with or without a trailing slash; e.g. `templates/` or `templates`.

Any file saved under those folders (e.g. `templates/my-note.md` or `attachments/image.md`) will **not** be renamed, even if it has a `title:` frontmatter.

## Development

- Clone this
- `npm install` to get the dependencies
- Edit `main.ts`
- Build the files `npm run build`
- Manually copy the files like in the installation instructions above

## Warning

This is experimental and may not work on all vaults. **Back up your files** before using. I’m not responsible for any data loss.
