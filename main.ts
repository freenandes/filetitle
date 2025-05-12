import { Plugin, TFile } from 'obsidian';

export default class FrontmatterFilenamePlugin extends Plugin {
	onload() {
		this.registerEvent(
			this.app.vault.on('modify', (file) => {
				if (!(file instanceof TFile) || file.extension !== 'md') return;
				this.renameOnSave(file);
			})
		);
	}

	private async renameOnSave(file: TFile) {
		const content = await this.app.vault.read(file);

		const fmMatch = content.match(/^---\s*([\s\S]*?)\s*---/);
		if (!fmMatch) return;

		const titleMatch = fmMatch[1].match(/^\s*title\s*:\s*(?:["']?)(.+?)(?:["']?)\s*$/m);
		if (!titleMatch) return;
		const title = titleMatch[1];

		const safeName = title
			.normalize('NFD')                  // decompose accents
			.replace(/[\u0300-\u036f]/g, '')   // remove diacritics
			.toLowerCase()                     // lowercase
			.replace(/[^a-z0-9\s-]/g, '')      // drop invalid chars
			.trim()                            // trim edges
			.replace(/\s+/g, '-')              // spaces → hyphens
			.replace(/-+/g, '-')               // collapse multi-hyphens
			.replace(/^-+|-+$/g, '');          // trim stray hyphens

		const newFilename = `${safeName}.md`;
		if (file.name === newFilename) return;

		const newPath = file.path.replace(/[^/]+$/, newFilename);
		try {
			await this.app.fileManager.renameFile(file, newPath);
		} catch (e) {
			console.error('FrontmatterFilename › rename failed', e);
		}
	}
}
