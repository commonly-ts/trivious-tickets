import fs, { existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function getPackageRoot(): string {
	let dir = __dirname;

	while (dir !== dirname(dir)) {
		const pkgJson = join(dir, "package.json");
		if (existsSync(pkgJson)) {
			try {
				const pkg = JSON.parse(fs.readFileSync(pkgJson, "utf-8"));
				if (pkg.name === "@trivious/tickets") {
					return dir;
				}
			} catch {
				//
			}
		}
		dir = dirname(dir);
	}

	return __dirname;
}

const packageRoot = getPackageRoot();

export function resolveRelativePath(relativePath: string): string {
	const candidates = [join(packageRoot, "dist", relativePath), join(packageRoot, relativePath)];

	for (const candidate of candidates) {
		const fullPath = resolve(candidate);
		if (existsSync(fullPath)) {
			return fullPath;
		}
	}

	return join(packageRoot, relativePath);
}
