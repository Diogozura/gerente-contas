import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pagesDirectory = path.join(process.cwd(), "pages");

  const getAllPages = (dir, basePath = "") => {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    const result = {} as Record<string, Page[]>;

    files.forEach((file) => {
      const fullPath = path.join(dir, file.name);
      const relativePath = path.join(basePath, file.name);

      if (file.isDirectory()) {
        result[file.name] = getAllPages(fullPath, relativePath)[file.name] || [];
      } else if (file.name.endsWith(".tsx") && !file.name.startsWith("_") && file.name !== "novidades.tsx") {
        const folder = basePath.split(path.sep)[0] || "root";
        if (!result[folder]) result[folder] = [];
        result[folder].push({ name: file.name.replace(".tsx", ""), path: relativePath.replace(".tsx", "") });
      }
    });

    return result;
  };

  const pages = getAllPages(pagesDirectory);
  res.status(200).json(pages);
}
