const   piyanoTuslari   =   document.querySelectorAll(".piyano-tuslari .tus"),
        sesAyari        =   document.querySelector(".ses-ayari input"),
        tusTakimi       =   document.querySelector(".tus-takimi input");

let tumTuslar = [],
ses = new Audio("./akorlar/a.wav"); // sesin varsayılan akoru "a" dır.

const melodiCal = (tus) => {
    ses.src = `./akorlar/${tus}.wav`; // basılan tuşa göre ses kaynağını getirme
    ses.play(); // sesi çal

    const tiklananTus = document.querySelector(`[data-tus="${tus}"]`); // tıklanan anahtar öğe
    tiklananTus.classList.add("aktif"); // tıklanan anahtar öğeye aktif sınıfını ekleme
    setTimeout(() => { // tıklanan anahtar öğeden 150 ms sonra aktif sınıfın kaldırılması
        tiklananTus.classList.remove("aktif");
    }, 150);
}

// data-tus değerini argüman olarak ileterek melodiCal fonksiyonunun çağrılması
piyanoTuslari.forEach(tus => {
    tumTuslar.push(tus.dataset.tus); // tumTuslar dizisine data-tus değerlerini ekleme
    tus.addEventListener("click", () => melodiCal(tus.dataset.tus));
});

const sesDegeri = (e) => {
    ses.volume = e.target.value; // ses kaydıracı değerini bir ses düzeyi olarak belirleme
}

const gosterGizle = () => {
    // onay kutusundaki her bir anahtardan sınıf gizlemeyi değiştirme
    piyanoTuslari.forEach(tus => tus.classList.toggle("gizle"));
}

const basilanTus = (e) => {
    // basılan tuş tumTuslar dizisinde varsa, melodiCal işlevini çağırın
    if (tumTuslar.includes(e.key)) melodiCal(e.key);
}

// piyano üzerindeki onay kutusunun durumunu alma
tusTakimi.addEventListener("click", gosterGizle);

// piyano üzerindeki hareketli ses sliderının değerini alma
sesAyari.addEventListener("input", sesDegeri);

// klavyeden tuşa basılınca tıklanan tuşun tüm özelliklerini alma
document.addEventListener("keydown", basilanTus);