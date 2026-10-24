import { css, type Component } from "dreamland/core";

type AppShortcut = {
	name: string;
	url: string;
};

const CUSTOM_APPS: AppShortcut[] = [
	{ name: "GAMES!", url: "https://playobsidian.com" },
	{ name: "HiAnime", url: "https://hianime.to" },
	{ name: "AniWatch", url: "https://aniwatch.ai.studio" },
	{ name: "Geometry Dash", url: "https://web-dashers.github.io" },
	{ name: "Cloud Moon", url: "https://web.cloudmoonapp.com" },
	{ name: "Kazwire", url: "https://kazwire.com" },
];

const POPULAR_APPS: AppShortcut[] = [
	{ name: "Google", url: "https://google.com" },
	{ name: "Brave Search", url: "https://search.brave.com" },
	{ name: "DuckDuckGo", url: "https://duckduckgo.com" },
	{ name: "Discord", url: "https://discord.com" },
	{ name: "ChatGPT", url: "https://chatgpt.com" },
	{ name: "Google Gemini", url: "https://gemini.google.com" },
	{ name: "YouTube", url: "https://youtube.com" },
	{ name: "Anime Stream / Movie Player", url: "https://fmoviesz.to" },
	{ name: "GeForce NOW / Gaming", url: "https://play.geforcenow.com" },
	{ name: "X (Twitter)", url: "https://x.com" },
	{ name: "Instagram", url: "https://instagram.com" },
	{ name: "Reddit", url: "https://reddit.com" },
	{ name: "Twitch", url: "https://twitch.tv" },
	{ name: "TikTok", url: "https://tiktok.com" },
	{ name: "Spotify", url: "https://open.spotify.com" },
];

const faviconUrl = (url: string) =>
	`https://www.google.com/s2/favicons?domain=${encodeURIComponent(new URL(url).hostname)}&sz=128`;

const AppTile: Component<
	{
		app: AppShortcut;
		onOpen?: (url: string) => void;
	},
	{},
	{}
> = function () {
	return (
		<button
			type="button"
			class="app-tile"
			on:click={() => this.onOpen?.(this.app.url)}
		>
			<span class="app-icon">
				<span class="app-fallback">{this.app.name.charAt(0)}</span>
				<img
					src={faviconUrl(this.app.url)}
					alt=""
					loading="lazy"
					on:error={(e: Event) => {
						(e.target as HTMLImageElement).style.display = "none";
					}}
				/>
			</span>
			<span class="app-name">{this.app.name}</span>
			<span class="app-domain">{new URL(this.app.url).hostname}</span>
		</button>
	);
};

AppTile.style = css`
	:scope {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.55em;
		padding: 1.15em 0.9em 1em;
		background: #161616;
		border: 1px solid #262626;
		border-radius: 12px;
		cursor: pointer;
		color: inherit;
		font: inherit;
		min-width: 0;
		transition:
			background 0.15s ease,
			border-color 0.15s ease,
			transform 0.15s ease;
	}
	:scope:hover {
		background: #1d1d1d;
		border-color: #3a3a3a;
		transform: translateY(-1px);
	}
	.app-icon {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		padding: 6px;
		background: #fff;
		border-radius: 12px;
		box-sizing: border-box;
	}
	.app-icon img {
		position: relative;
		z-index: 1;
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
		background: #fff;
		border-radius: 6px;
	}
	.app-fallback {
		position: absolute;
		inset: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.3em;
		color: #333;
	}
	.app-name {
		font-weight: 700;
		font-size: 0.95em;
		color: #fff;
		text-align: center;
		line-height: 1.25;
	}
	.app-domain {
		font-size: 0.78em;
		color: #8a8a8a;
		text-align: center;
		word-break: break-word;
	}
`;

const AppsView: Component<
	{
		onOpen?: (url: string) => void;
	},
	{},
	{}
> = function () {
	const renderSection = (title: string, apps: AppShortcut[]) => (
		<div class="apps-section">
			<div class="apps-section-title">{title}</div>
			<div class="apps-grid">
				{apps.map((app) => (
					<AppTile app={app} onOpen={this.onOpen} />
				))}
			</div>
		</div>
	);

	return (
		<div class="apps-view">
			<div class="apps-header">
				<h1>Apps</h1>
				<p>
					Shortcuts open in the Browser tab and load through the active
					Scramjet transport (wisp + URL rewriting) — the same proxied
					navigation path as typing into the omnibox.
				</p>
			</div>
			<hr class="apps-divider" />
			{renderSection("Custom apps & links", CUSTOM_APPS)}
			{renderSection("Popular apps", POPULAR_APPS)}
		</div>
	);
};

AppsView.style = css`
	:scope {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		overflow-y: auto;
		padding: 1.1em 1.25em 2em;
		background: #0f0f0f;
		color: #e5e7eb;
		font-family:
			system-ui,
			-apple-system,
			"Segoe UI",
			Roboto,
			"Helvetica Neue",
			Arial,
			sans-serif;
		box-sizing: border-box;
	}
	.apps-header h1 {
		margin: 0 0 0.45em;
		font-size: 1.15em;
		font-weight: 700;
	}
	.apps-header p {
		margin: 0;
		max-width: 62em;
		color: #b5b5b5;
		font-size: 0.88em;
		line-height: 1.5;
	}
	.apps-divider {
		border: 0;
		border-top: 1px solid #262626;
		margin: 1.1em 0 1.3em;
	}
	.apps-section {
		margin-bottom: 1.7em;
	}
	.apps-section:last-child {
		margin-bottom: 0;
	}
	.apps-section-title {
		margin: 0 0 0.85em;
		font-size: 0.76em;
		font-weight: 700;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		color: #8f8f8f;
	}
	.apps-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
		gap: 1em;
	}
`;
export default AppsView;
