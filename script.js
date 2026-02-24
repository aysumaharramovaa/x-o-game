
  const hujayralar = document.querySelectorAll('.hujayra');
  const xQeyd = document.getElementById('xQalibiyyet');
  const oQeyd = document.getElementById('oQalibiyyet');
  const btnYeniden = document.getElementById('yenidenBasla');
  const btnSkorSifirla = document.getElementById('skoruSifirla');

  let xQalibiyyet = 0;
  let oQalibiyyet = 0;

  // qazanma modelləri 
  const qazanmaModeli = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ];

  // hər hujayraya klik eventi 
  hujayralar.forEach(h => {
    h.addEventListener('click', () => {
      // Əgər boşdursa, istifadəçi X qoyur
      if(h.innerHTML === ''){
        h.innerHTML = 'X';
        // dərhal yoxla X qalibdirsə bitir
        if(yoxlaQalib('X')) return;
        // komp oynasın
        setTimeout(kompOyna, 350);
      }
    });
  });

  // özünü udmaq üçün yoxla o 
  // x udma ehtimalını blok et
  // təsadüfi hujayra seç
  function kompOyna(){
    // udmağa çalış
    let yer = enYaxsiYer('O');
    // blok et
    if(!yer) yer = enYaxsiYer('X');
    // random at
    if(!yer) yer = tesadufiYer();

    if(yer){
      document.getElementById(`${yer}`).innerHTML = 'O';
      yoxlaQalib('O');
    }
  }

  // 2 eyni işarə + boş hujayra olanda boş hujayranı qaytar
  function enYaxsiYer(oyuncu){
    for(let pattern of qazanmaModeli){
      let qiymetler = pattern.map(id => document.getElementById(id).innerHTML);
      let bosIndeks = qiymetler.indexOf('');
      let sayOyuncu = qiymetler.filter(v => v === oyuncu).length;
      if(sayOyuncu === 2 && bosIndeks !== -1){
        return pattern[bosIndeks]; // qalib və ya bloku tamamlayan hujayra
      }
    }
    return null;
  }

  // bos hujayralardan təsadüfi seç
  function tesadufiYer(){
    const bos = [];
    hujayralar.forEach(h => { if(h.innerHTML === '') bos.push(h.id); });
    if(bos.length === 0) return null;
    return bos[Math.floor(Math.random() * bos.length)];
  }

  // qalibiyyəti və bərabərliyi yoxla
  function yoxlaQalib(oyuncu){
    // qalib olub olmadığını yoxla
    for(let pattern of qazanmaModeli){
      const [a,b,c] = pattern;
      if(
        document.getElementById(a).innerHTML === oyuncu &&
        document.getElementById(b).innerHTML === oyuncu &&
        document.getElementById(c).innerHTML === oyuncu
      ){
        // skoru artır
        if(oyuncu === 'X'){
          xQalibiyyet++;
          xQeyd.innerText = xQalibiyyet;
        } else {
          oQalibiyyet++;
          oQeyd.innerText = oQalibiyyet;
        }

        setTimeout(()=> {
          alert(oyuncu + ' qazandı!');
          sifirlashTaxta();
        }, 200);

        return true;
      }
    }

    // bərabərlik 
    let bosVar = false;
    hujayralar.forEach(h => { if(h.innerHTML === '') bosVar = true; });

    if(!bosVar){
      setTimeout(()=> {
        alert('Bərabərlik!');
        sifirlashTaxta();
      }, 200);
      return true;
    }

    return false; 
  }

  // sıfırla
  function sifirlashTaxta(){
    hujayralar.forEach(h => h.innerHTML = '');
  }

  // control
  btnYeniden.addEventListener('click', () => {
    sifirlashTaxta();
  });

  btnSkorSifirla.addEventListener('click', () => {
    xQalibiyyet = 0;
    oQalibiyyet = 0;
    xQeyd.innerText = '0';
    oQeyd.innerText = '0';
    sifirlashTaxta();
  });

