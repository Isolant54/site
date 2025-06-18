import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getMarkdownFiles(contentDirectory) {
  return fs.readdirSync(contentDirectory).filter(fileName => {
    const fullPath = path.join(contentDirectory, fileName);
    return fs.statSync(fullPath).isFile() && fileName.endsWith('.md');
  });
}

export function getAllCollections(collection) {
  const contentDirectory = path.join(process.cwd(), `content/${collection}`);
  const fileNames = getMarkdownFiles(contentDirectory);

  const allContentData = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data
    };
  });

  return allContentData;
}

export function getCollectionIds(collection) {
  const contentDirectory = path.join(process.cwd(), `content/${collection}`);
  const fileNames = getMarkdownFiles(contentDirectory);

  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, '')
    }
  }));
}

export function getCollectionById(collection, id) {
  const contentDirectory = path.join(process.cwd(), `content/${collection}`);
  const fullPath = path.join(contentDirectory, `${id}.md`);

  // Validación adicional (por si accidentalmente pasás un ID que es una carpeta)
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    throw new Error(`El archivo ${fullPath} no existe o no es un archivo válido`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data
  };
}
