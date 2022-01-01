import { base } from '$app/paths';

export function getResourcePath(path: string): string {
	return `${base}${path}`;
}
