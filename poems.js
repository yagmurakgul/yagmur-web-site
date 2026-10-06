// Seçtiğim şiir alıntıları
const selectedVerses = {
    "Nâzım Hikmet Ran": `ben artık şarkı dinlemek değil,
şarkı söylemek istiyorum...`,

    "Orhan Veli Kanık": `İstanbul'u dinliyorum, gözlerim kapalı;
Başımda eski alemlerin sarhoşluğu.`,

    "Cemal Süreya": `Şimdi sen kalkıp gidiyorsun. Git
Gözlerin durur mu onlar da gidiyorlar. Gitsinler.`,

    "Turgut Uyar": `Senin bu ellerinde ne var bilmiyorum göğe bakalım
Tuttukça güçleniyorum kalabalık oluyorum.`,

    "Edip Cansever": `Biliyor musun az az yaşıyorsun içimde
Oysaki seninle güzel olmak var.`,

    "Attilâ İlhan": `Ben sana mecburum bilemezsin
Adını mıh gibi aklımda tutuyorum.`,

    "Necip Fazıl Kısakürek": `Ne hasta bekler sabahı,
Ne taze ölüyü mezar.`,

    "Yahya Kemal Beyatlı": `Artık demir almak günü gelmişse zamandan
Meçhule giden bir gemi kalkar bu limandan.`,

    "Cahit Sıtkı Tarancı": `Şakaklarıma kar mı yağdı ne var?
Benim mi Allahım bu çizgili yüz?`,

    "Özdemir Asaf": `Sana gitme demeyeceğim.
Üşüyorsun ceketimi al.`,

    "Mehmet Âkif Ersoy": `Şu Boğaz Harbi nedir? Var mı ki dünyâda eşi?
En kesîf orduların yükleniyor dördü beşi`
};

// Tablodaki her şair satırını bul.
document.querySelectorAll(".poet-table tbody tr").forEach(function (row) {
    const nameCell = row.querySelector('th[scope="row"]');

    if (!nameCell) {
        return;
    }

    const poetName = nameCell.textContent.trim();
    const verse = selectedVerses[poetName];

    if (!verse) {
        return;
    }

    // Açılıp kapanan bir bölüm oluştur.
    const details = document.createElement("details");
    details.className = "verse-details";

    const summary = document.createElement("summary");
    summary.textContent = "Read a verse";
    summary.setAttribute(
        "aria-label",
        "Read a verse by " + poetName
    );

    // Alıntıyı metin olarak ekle.
    const quotation = document.createElement("blockquote");
    quotation.className = "verse-quote";
    quotation.lang = "tr";
    quotation.textContent = verse;

    details.append(summary, quotation);
    nameCell.appendChild(details);
});