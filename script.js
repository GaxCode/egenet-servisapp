const gistUrl = "GIST_RAW_URL_BURAYA";

let servisAraliklari = [];
let girilenKod = "";

const servisSonuc = document.getElementById("servisSonuc");
const girisEkrani = document.getElementById("girisEkrani");
const durumMesaji = document.getElementById("durumMesaji");

async function fetchGistData() {
  try {
    durumMesaji.textContent = "🌐 Veriler yükleniyor...";

    const response = await fetch(gistUrl);

    if (!response.ok) {
      throw new Error("Veri alınamadı");
    }

    servisAraliklari = await response.json();

    durumMesaji.textContent =
      `✅ ${servisAraliklari.length} kayıt yüklendi`;

    servisSonuc.textContent = "Kod girin";

  } catch (err) {
    durumMesaji.textContent = "⚠️ Bağlantı hatası";
    servisSonuc.textContent = "Veri yüklenemedi";
  }
}

function ekle(rakam) {
  if (!servisAraliklari.length) return;

  if (girilenKod.length >= 4) return;

  girilenKod += rakam;
  girisEkrani.textContent = girilenKod;

  kontrolEt();
}

function kontrolEt() {
  if (girilenKod.length < 4) {
    servisSonuc.textContent = "4 haneli kod";
    return;
  }

  const numara = Number(girilenKod);

  const kayit = servisAraliklari.find(
    ([baslangic, bitis]) =>
      numara >= baslangic && numara <= bitis
  );

  if (kayit) {
    servisSonuc.textContent = `SERVİS ${kayit[2]}`;
  } else {
    servisSonuc.textContent = "Bulunamadı";
  }

  if (navigator.vibrate) {
    navigator.vibrate(80);
  }

  setTimeout(temizle, 3000);
}

function sil() {
  girilenKod = girilenKod.slice(0, -1);
  girisEkrani.textContent = girilenKod;

  if (girilenKod.length === 0) {
    servisSonuc.textContent = "Kod girin";
  } else {
    kontrolEt();
  }
}

function temizle() {
  girilenKod = "";
  girisEkrani.textContent = "";
  servisSonuc.textContent = "Kod girin";
}

fetchGistData();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
