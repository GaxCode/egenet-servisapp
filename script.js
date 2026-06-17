const gistUrl = "https://gist.githubusercontent.com/GaxCode/5e964c03dc03c71bba51b63caa6788d4/raw/sgk-egenet-servisler.txt";
let servisAraliklari = [];
let girilenKod = "";

const servisSonuc = document.getElementById("servisSonuc");
const girisEkrani = document.getElementById("girisEkrani");

async function fetchGistData() {
  try {
    const response = await fetch(gistUrl);

    if (!response.ok) {
      throw new Error("Veri alınamadı");
    }

    servisAraliklari = await response.json();

  } catch (err) {
    console.error(err);
  }
}

function ekle(rakam) {
  if (!servisAraliklari.length) return;

  if (girilenKod.length >= 10) return;

  if (navigator.vibrate) {
    navigator.vibrate(10);
  }

  girilenKod += rakam;

  girisEkrani.textContent = girilenKod;

  kontrolEt();
}

function kontrolEt() {
  const numara = Number(girilenKod);

  const kayit = servisAraliklari.find(
    ([baslangic, bitis]) =>
      numara >= baslangic &&
      numara <= bitis
  );

  servisSonuc.textContent = kayit
    ? `SERVİS ${kayit[2]}`
    : "";
}

function sil() {
  girilenKod = girilenKod.slice(0, -1);

  girisEkrani.textContent = girilenKod || "0";

  kontrolEt();
}

function temizle() {
  girilenKod = "";

  girisEkrani.textContent = "0";
  servisSonuc.textContent = "";
}

fetchGistData();
