import { App, Plugin, TFile, PluginSettingTab, Setting } from 'obsidian';

interface FileTitleSettings {
	excludedFolders: string[];
}
const DEFAULT_SETTINGS: FileTitleSettings = {
	excludedFolders: ['templates', 'attachments'],
};

export default class FileTitlePlugin extends Plugin {
	settings: FileTitleSettings;

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}
	async saveSettings() {
		await this.saveData(this.settings);
	}

	onload() {
		this.loadSettings().then(() => {
			this.addSettingTab(new FileTitleSettingTab(this.app, this));
		});

		this.registerEvent(
			this.app.vault.on('modify', (file) => {
				if (!(file instanceof TFile) || file.extension !== 'md') return;
				const normalizedPath = file.path.toLowerCase();
				const isExcluded = this.settings.excludedFolders
					.map(f => f.trim().toLowerCase().replace(/\/$/, ''))
					.some(folder => normalizedPath.startsWith(folder + '/'));
				if (isExcluded) return;
				this.renameOnSave(file);
			})
		);
	}

	private async renameOnSave(file: TFile) {
		const content = await this.app.vault.read(file);
		const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
		if (!fmMatch) return;
		const lines = fmMatch[1].split(/\r?\n/);
		let titleRaw: string | undefined;
		for (const line of lines) {
			const m = line.match(/^\s*title\s*:\s*(.*)$/);
			if (m) { titleRaw = m[1].trim(); break; }
		}
		if (!titleRaw) return;

		const safeName = titleRaw
			.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9\s-]/g, '').trim()
			.replace(/\s+/g, '-').replace(/-+/g, '-')
			.replace(/^-+|-+$/g, '');

		const newFilename = `${safeName}.md`;
		if (file.name === newFilename) return;
		try {
			await this.app.fileManager.renameFile(
				file,
				file.path.replace(/[^/]+$/, newFilename)
			);
		} catch (e) {
			console.error('FileTitle Error: Rename failed.', e);
		}
	}
}

class FileTitleSettingTab extends PluginSettingTab {
	plugin: FileTitlePlugin;

	constructor(app: App, plugin: FileTitlePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl('h2', { text: 'FileTitle Options' });

		new Setting(containerEl)
			.setName('Excluded folders')
			.setDesc('Comma-separated folder names, relatively to vault root, to ignore from the renaming process.')
			.addText(text =>
				text
					.setPlaceholder('templates, attachments')
					.setValue(this.plugin.settings.excludedFolders.join(', '))
					.onChange(async (value) => {
						this.plugin.settings.excludedFolders = value
							.split(',')
							.map(s => s.trim())
							.filter(Boolean);
						await this.plugin.saveSettings();
					})
			);
	}
}
