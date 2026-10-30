import { getStore } from "@netlify/blobs";

const json = (o, s = 200) =>
  new Response(JSON.stringify(o), {
    status: s,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

export default async (req) => {
  const store = getStore({ name: "tabungan", consistency: "strong" });

  if (req.method === "GET") {
    const d = await store.get("data", { type: "json" });
    return json(
      d || {
        judul: "Siliwangi Grub Cashflow",
        tahun: new Date().getFullYear(),
        pasangan: Array.from({ length: 7 }, (_, i) => "Pasangan " + (i + 1)),
        setoran: [],
      }
    );
  }
  if (req.method !== "POST") return json({ error: "Method tidak didukung" }, 405);

  // Hanya admin (yang tahu ADMIN_PIN) yang boleh menyimpan.
  const pin = process.env.ADMIN_PIN;
  if (!pin || req.headers.get("x-pin") !== pin) return json({ error: "PIN salah" }, 401);

  let b;
  try { b = await req.json(); } catch { return json({ error: "Data rusak" }, 400); }
  if (b && b.cek) return json({ ok: true });

  const valid =
    b && typeof b.judul === "string" && Number.isInteger(b.tahun) &&
    Array.isArray(b.pasangan) && b.pasangan.length <= 30 && b.pasangan.every((x) => typeof x === "string") &&
    Array.isArray(b.setoran) && b.setoran.length <= 5000 &&
    b.setoran.every((s) => s && typeof s.id === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s.tgl) &&
      Number.isInteger(s.p) && typeof s.jml === "number" && s.jml > 0);
  if (!valid) return json({ error: "Data tidak valid" }, 400);

  await store.setJSON("data", {
    judul: b.judul.slice(0, 60),
    tahun: b.tahun,
    pasangan: b.pasangan.map((x) => x.slice(0, 40)),
    setoran: b.setoran.map(({ id, tgl, p, jml }) => ({ id, tgl, p, jml })),
  });
  return json({ ok: true });
};

export const config = { path: "/api/data" };
