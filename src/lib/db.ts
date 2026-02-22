import { put, list } from "@vercel/blob";

const BLOB_NAME = "leads.json";

const HAS_BLOB_TOKEN = !!process.env.BLOB_READ_WRITE_TOKEN;

export interface Lead {
  name: string;
  email: string;
  phone: string;
  source: string;
  created_at: string;
}

// Cache em memória — evita ler blob desatualizado por CDN delay
let leadsCache: Lead[] | null = null;
let cacheLoaded = false;

async function loadFromBlob(): Promise<Lead[]> {
  if (!HAS_BLOB_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: BLOB_NAME });
    if (blobs.length === 0) return [];

    const url = `${blobs[0].url}?t=${Date.now()}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return [];

    return (await response.json()) as Lead[];
  } catch {
    return [];
  }
}

async function getLeads(): Promise<Lead[]> {
  if (!cacheLoaded) {
    leadsCache = await loadFromBlob();
    cacheLoaded = true;
  }
  return leadsCache || [];
}

async function saveLeads(leads: Lead[]): Promise<boolean> {
  // Atualiza cache imediatamente
  leadsCache = leads;

  if (!HAS_BLOB_TOKEN) {
    console.error("[blob] BLOB_READ_WRITE_TOKEN não configurado");
    return false;
  }
  try {
    await put(BLOB_NAME, JSON.stringify(leads, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return true;
  } catch (err) {
    console.error("[blob] Erro ao salvar:", err);
    return false;
  }
}

export async function insertLead(
  name: string,
  email: string,
  phone: string,
  source: string
): Promise<{ lead: Lead; persisted: boolean }> {
  const leads = await getLeads();
  const lead: Lead = {
    name,
    email,
    phone,
    source,
    created_at: new Date().toISOString(),
  };
  leads.push(lead);
  const persisted = await saveLeads([...leads]);
  return { lead, persisted };
}

export async function findLeadByEmail(
  email: string
): Promise<Lead | undefined> {
  const leads = await getLeads();
  return leads.find((l) => l.email.toLowerCase() === email.toLowerCase());
}

export async function getAllLeads(): Promise<Lead[]> {
  const leads = await getLeads();
  return [...leads].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function countLeads(): Promise<number> {
  const leads = await getLeads();
  return leads.length;
}
