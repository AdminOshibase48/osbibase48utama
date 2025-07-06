// ======== Supabase Setup ========
const supabaseUrl = 'https://nuvfnnxuxtthbryesliu.supabase.co'; // GANTI dengan URL kamu
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51dmZubnh1eHR0aGJyeWVzbGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1Mzk1NTYsImV4cCI6MjA2NzExNTU1Nn0.Om73FRiKvdlWpZS-hIXCIKznjkQ3A3X3k1n2IzGzRes';    // GANTI dengan anon key kamu
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// ======== Load Galeri ========
async function loadGaleri() {
  const { data, error } = await supabase
    .from('galeri')
    .select('*')
    .order('created_at', { ascending: false });

  const container = document.getElementById('galeri-container');
  container.innerHTML = '';

  if (error) {
    container.innerHTML = '<p>Gagal memuat galeri 😢</p>';
    return;
  }

  data.forEach(item => {
    const el = document.createElement('div');
    el.className = 'galeri-card';
    el.innerHTML = `
      <img src="${item.image_url}" alt="${item.caption}" />
      <p>${item.caption}</p>
    `;
    container.appendChild(el);
  });
}

// ======== Load Berita ========
async function loadBerita() {
  const { data, error } = await supabase
    .from('berita')
    .select('*')
    .order('created_at', { ascending: false });

  const container = document.getElementById('berita-container');
  container.innerHTML = '';

  if (error) {
    container.innerHTML = '<p>Gagal memuat berita 😢</p>';
    return;
  }

  data.forEach(item => {
    const el = document.createElement('div');
    el.className = 'item';
    el.innerHTML = `
      <img src="${item.image_url}" alt="${item.title}" />
      <h3>${item.title}</h3>
      <a href="berita.html?id=${item.id}" class="btn-berita">Baca Selengkapnya</a>
    `;
    container.appendChild(el);
  });
}

// ======== Load Jadwal ========
async function loadJadwal() {
  const { data, error } = await supabase
    .from('jadwal')
    .select('*')
    .order('tanggal', { ascending: true });

  const container = document.getElementById('jadwal-container');
  container.innerHTML = '';

  if (error) {
    container.innerHTML = '<p>Gagal memuat jadwal 😢</p>';
    return;
  }

  data.forEach(item => {
    const el = document.createElement('div');
    el.className = 'jadwal-card';
    el.innerHTML = `
      <h3>${item.tanggal}</h3>
      <p>${item.kegiatan}</p>
    `;
    container.appendChild(el);
  });
}

// ======== Init Semua ========
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('galeri-container')) loadGaleri();
  if (document.getElementById('berita-container')) loadBerita();
  if (document.getElementById('jadwal-container')) loadJadwal();
});
