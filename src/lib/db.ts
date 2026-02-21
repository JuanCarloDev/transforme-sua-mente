import { put, list } from "@vercel/blob";

const BLOB_NAME = "leads.json";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  source: string;
  created_at: string;
}

async function getLeadsFromBlob(): Promise<Lead[]> {
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

async function saveLeadsToBlob(leads: Lead[]): Promise<void> {
  await put(BLOB_NAME, JSON.stringify(leads, null, 2), {
    access: "public",
    addRandomSuffix: false,
  });
}

export async function insertLead(
  name: string,
  email: string,
  phone: string,
  source: string
): Promise<Lead> {
  const leads = await getLeadsFromBlob();
  const lead: Lead = {
    name,
    email,
    phone,
    source,
    created_at: new Date().toISOString(),
  };
  leads.push(lead);
  await saveLeadsToBlob(leads);
  return lead;
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
