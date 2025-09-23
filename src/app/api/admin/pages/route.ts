import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";

type PageEntry = {
  route: string;
  filePath: string;
};

function isHiddenDir(name: string) {
  // Exclude API routes and Next special folders
  return (
    name.startsWith(".") ||
    name === "api" ||
    name === "_next" ||
    name === "node_modules"
  );
}

function isGroupingSegment(name: string) {
  // Next.js route groups in parentheses should not appear in the URL
  return name.startsWith("(") && name.endsWith(")");
}

async function scanAppDir(appDir: string): Promise<PageEntry[]> {
  const results: PageEntry[] = [];

  async function walk(currentDir: string, segments: string[]) {
    const dirents = await fs.promises.readdir(currentDir, { withFileTypes: true });

    // Check for a page.tsx in this directory
    const hasPage = dirents.some((d) => d.isFile() && d.name === "page.tsx");
    if (hasPage) {
      const filteredSegments = segments.filter((s) => !isGroupingSegment(s));
      const route = "/" + filteredSegments.join("/");
      results.push({
        route: route === "/" ? "/" : route.replace(/\/+$/, ""),
        filePath: path.join(currentDir, "page.tsx"),
      });
    }

    // Recurse into subdirectories
    for (const dirent of dirents) {
      if (dirent.isDirectory()) {
        const name = dirent.name;
        if (isHiddenDir(name)) continue;
        // Skip app/api subtree entirely
        if (path.relative(appDir, path.join(currentDir, name)).split(path.sep)[0] === "api") continue;
        await walk(path.join(currentDir, name), [...segments, name]);
      }
    }
  }

  await walk(appDir, []);
  return results
    .filter((p) => !p.route.startsWith("/api"))
    .sort((a, b) => a.route.localeCompare(b.route));
}

export async function GET() {
  try {
    const appDir = path.join(process.cwd(), "src", "app");
    const pages = await scanAppDir(appDir);
    return NextResponse.json({ pages });
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}


