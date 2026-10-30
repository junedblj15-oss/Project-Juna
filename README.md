# Siliwangi Grub Cashflow (versi Netlify)

Cara pasang:
1. Ekstrak zip ini. Upload SEMUA isinya (folder `public`, `netlify`, dan file lain) ke repo GitHub baru.
2. Di Netlify: Add new site > Import an existing project > pilih repo itu > Deploy. Build command kosong; folder publish sudah diatur di netlify.toml.
3. Site configuration > Environment variables > tambah `ADMIN_PIN` isi PIN pilihanmu, lalu Deploys > Trigger deploy.
4. Buka situsnya, tekan tombol Admin, masukkan PIN. Pasangan lain yang buka link cuma bisa lihat.

Ubah tampilan:
- Font: bagian atas CSS di `public/index.html` (variabel `--font` dan link Google Fonts).
- Judul, tahun, dan nama 7 pasangan: lewat menu Pengaturan di mode admin.

Data dari Emergent tidak ikut pindah; input ulang setoran lewat mode admin.
