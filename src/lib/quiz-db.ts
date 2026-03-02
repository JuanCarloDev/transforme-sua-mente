import { put, list } from "@vercel/blob";
import type { WoundType, Scores } from "@/lib/quiz-data";

const BLOB_NAME = "quiz-results.json";
const HAS_BLOB_TOKEN = !!process.env.BLOB_READ_WRITE_TOKEN;

export interface QuizResult {
  name: string;
  phone: string;
  wound: WoundType;
  scores: Scores;
  created_at: string;
}

let cache: QuizResult[] | null = null;
let cacheLoaded = false;

async function loadFromBlob(): Promise<QuizResult[]> {
  if (!HAS_BLOB_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: BLOB_NAME });
    if (blobs.length === 0) return [];
    const url = `${blobs[0].url}?t=${Date.now()}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return [];
    return (await response.json()) as QuizResult[];
  } catch {
    return [];
  }
}

async function getResults(): Promise<QuizResult[]> {
  if (!cacheLoaded) {
    cache = await loadFromBlob();
    cacheLoaded = true;
  }
  return cache || [];
}

async function saveResults(results: QuizResult[]): Promise<boolean> {
  cache = results;
  if (!HAS_BLOB_TOKEN) {
    console.error("[blob] BLOB_READ_WRITE_TOKEN não configurado — quiz salvo apenas no Telegram");
    return false;
  }
  try {
    await put(BLOB_NAME, JSON.stringify(results, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return true;
  } catch (err) {
    console.error("[blob] Erro ao salvar quiz:", err);
    return false;
  }
}

export async function insertQuizResult(
  name: string,
  phone: string,
  wound: WoundType,
  scores: Scores
): Promise<{ result: QuizResult; persisted: boolean }> {
  const results = await getResults();
  const result: QuizResult = {
    name,
    phone,
    wound,
    scores,
    created_at: new Date().toISOString(),
  };
  results.push(result);
  const persisted = await saveResults([...results]);
  return { result, persisted };
}

export async function getAllQuizResults(): Promise<QuizResult[]> {
  const results = await getResults();
  return [...results].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function countQuizResults(): Promise<number> {
  const results = await getResults();
  return results.length;
}
