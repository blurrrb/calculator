import { base } from '$app/paths';

export function getAssetPath(path: string): string {
	return `${base}${path}`;
}
