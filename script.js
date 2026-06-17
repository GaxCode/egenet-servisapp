const gistUrl = "https://gist.githubusercontent.com/GaxCode/5e964c03dc03c71bba51b63caa6788d4/raw/sgk-egenet-servisler.txt";

const MAX_HANE = 10;

let servisAraliklari = [];
let girilenKod = "";

const servisSonuc = document.getElementById("servisSonuc");
const girisEkrani = document.getElementById("girisEkrani");
const durumMesaji = document.getElementById("durumMesaji");

async function fetchGistData() {
  try {
    durumMesaji.textContent = "Veriler yükleniyor...";

    const response = await fetch(gistUrl);

    if (!response.ok) {
      throw new Error("Veri alınamadı");
    }

    servisAraliklari = await response.json();

    durumMesaji.textContent = "";
  } catch (error) {
    console.error(error);

    durumMesaji.textContent = "Bağlantı hatası";
  }
}

function ekle(rakam) {
  if (!servisAraliklari.length) return;

  if (girilenKod.length >= MAX_HANE) return;

  girilenKod += rakam;

  girisEkrani.textContent = girilenKod;

  servisSonuc.textContent = "";

  if (girilenKod.length === MAX_HANE) {
    kontrolEt();
  }
}

function kontrolEt() {
  const numara = Number(girilenKod);

  const kayit = servisAraliklari.find(
    ([baslangic, bitis]) =>
      numara >= baslangic && numara <= bitis
  );

  if (kayit) {
    servisSonuc.textContent = kayit[2];

    if (navigator.vibrate) {
      navigator.vibrate(80);
    }
  } else {
    servisSonuc.textContent = "";
  }

  setTimeout(temizle, 3000);
}

function sil() {
  girilenKod = girilenKod.slice(0, -1);

  girisEkrani.textContent = girilenKod || "••••••••••";

  servisSonuc.textContent = "";
}

function temizle() {
  girilenKod = "";
  girisEkrani.textContent = "••••••••••";
  servisSonuc.textContent = "";
}

fetchGistData();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

