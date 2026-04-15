/**
 * Normaliza `NEXT_PUBLIC_SUPABASE_URL` para o formato exigido pelo `@supabase/supabase-js`
 * (evita "Invalid supabaseUrl" quando falta `https://` ou há aspas ao colar na Vercel).
 */
export function normalizeSupabaseUrl(raw: string | undefined): string | null {
  if (raw == null) return null;
  let s = raw.trim();
  if (!s) return null;
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1).trim();
  }
  if (!s) return null;

  const lower = s.toLowerCase();
  if (!lower.startsWith("http://") && !lower.startsWith("https://")) {
    if (/^[a-z0-9][a-z0-9-]*\.supabase\.co$/i.test(s)) {
      s = `https://${s}`;
    }
  }

  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}
