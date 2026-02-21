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

async function getLeadsFromBlob(): Promise<Lead[]> {
  if (!HAS_BLOB_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: BLOB_NAME });
    if (blobs.length === 0) return [];

    const response = await fetch(blobs[0].url);
    if (!response.ok) return [];

    return (await response.json()) as Lead[];
  } catch {
    return [];
  }
}

async function saveLeadsToBlob(leads: Lead[]): Promise<boolean> {
  if (!HAS_BLOB_TOKEN) return false;
  try {
    await put(BLOB_NAME, JSON.stringify(leads, null, 2), {
      access: "public",
      addRandomSuffix: false,
    });
    return true;
  } catch {
    return false;
  }
}

export async function insertLead(
  name: string,
  email: string,
  phone: string,
  source: string
): Promise<{ lead: Lead; persisted: boolean }> {
  const leads = await getLeadsFromBlob();
  const lead: Lead = {
    name,
    email,
    phone,
    source,
    created_at: new Date().toISOString(),
  };
  leads.push(lead);
  const persisted = await saveLeadsToBlob(leads);
  return { lead, persisted };
}

export async function findLeadByEmail(
  email: string
): Promise<Lead | undefined> {
  const leads = await getLeadsFromBlob();
  return leads.find((l) => l.email.toLowerCase() === email.toLowerCase());
}

export async function getAllLeads(): Promise<Lead[]> {
  const leads = await getLeadsFromBlob();
  return leads.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function countLeads(): Promise<number> {
  const leads = await getLeadsFromBlob();
  return leads.length;
}
