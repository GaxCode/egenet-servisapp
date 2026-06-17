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

  kontrolEt();
}
function kontrolEt() {
  if (!girilenKod) {
    servisSonuc.textContent = "";
    return;
  }

  const numara = Number(girilenKod);

  const kayit = servisAraliklari.find(
    ([baslangic, bitis]) =>
      numara >= baslangic &&
      numara <= bitis
  );

  if (kayit) {
    servisSonuc.textContent = kayit[2];
  } else {
    servisSonuc.textContent = "";
  }
}

function sil() {
  girilenKod = girilenKod.slice(0, -1);

  girisEkrani.textContent = girilenKod || "";

  kontrolEt();
}

function temizle() {
  girilenKod = "";
  girisEkrani.textContent = "";
  servisSonuc.textContent = "";
}

document.addEventListener(
  "dblclick",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

document.addEventListener(
  "gesturestart",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

fetchGistData();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    const registration = await navigator.serviceWorker.register("./sw.js");

    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;

      newWorker.addEventListener("statechange", () => {
        if (
          newWorker.state === "installed" &&
          navigator.serviceWorker.controller
        ) {
          window.location.reload();
        }
      });
    });
  });
}

