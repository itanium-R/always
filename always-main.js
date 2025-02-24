var pages =  pages || JSON.parse(localStorage.getItem("pages")) ||  
[{"url" : "https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=w&area=333&NS=S","iframeId" : "wth1","reloadDur": 0},
 {"url" : "https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=w&area=334&NS=S","iframeId" : "wth2","reloadDur": 0},
 {"url" : "https://itanium-r.github.io/memorandum/schoolWatch.html","iframeId" : "sw","reloadDur": 0}];

var tickerProp = tickerProp || JSON.parse(localStorage.getItem("tprop")) || 
                  {
                    "title"     : "TICKER",
                    "url"       : "https://script.google.com/macros/s/AKfycbxOBOfpSsnApd0GMwPm2xCLlBmnksqqUkLMICRFldFDBLt7Uv8/exec?mode=json_test",
                    "reloadDur" : 0,
                    "fieldName" : "msg",
                  };

var isClockBig         = parseFlg(isClockBig         || localStorage.getItem("isBCl") || false);
var usesP2pQuakeNotice = parseFlg(usesP2pQuakeNotice || localStorage.getItem("usP2p") || false);

function parseFlg(a){
  if(a === "true"  || a === "1") return true;
  if(a === "false" || a === "0") return false;
  return !!a;
}

function loadIframe(page){
  document.getElementById(page.iframeId).src = page.url;
  if(page.reloadDur > 0){
    setInterval(() => {
     document.getElementById(page.iframeId).src = '';
     setTimeout(() => document.getElementById(page.iframeId).src = page.url, 500);
    }, page.reloadDur * 1000);
  }
}

window.onload = function(){
  const slideDur = getParam("slideDur") || 10000;
  const usesBgmOverlay = parseFlg(getParam('bgm'));

  if (usesBgmOverlay) createBgmOverlay();
  if (usesP2pQuakeNotice) {       
    const chimeUrl = "./plugins/sounds/o26_(c)maoudamashii.wav"; // 効果音著作：魔王魂
    const p2pQL = new p2pQuakeListener(3, 3, chimeUrl);
    p2pQL.run();
  }

  const mainFrames = [];
  const body = document.getElementsByTagName("body")[0];

  for(page of pages){
    let iframe  = document.createElement("iframe");
    iframe.id   = iframe.name = page.iframeId;
    iframe.className = "fullSc";
    body.appendChild(iframe);
    loadIframe(page);
    mainFrames.push(document.getElementById(page.iframeId));
  }
  
  if (mainFrames.length > 1) new FullScSlider(mainFrames, Number(slideDur), 2000);
};

function createBgmOverlay() {
  const bgmOverlay = document.createElement('iframe');
  bgmOverlay.style.position = 'fixed';
  bgmOverlay.style.top = '1vw';
  bgmOverlay.style.right = '1vw';
  bgmOverlay.style.width = '32vw';
  bgmOverlay.style.height = '18vw';
  bgmOverlay.style.opacity = '0.1';
  bgmOverlay.style.zIndex = '5';
  bgmOverlay.style.background = '#FFF';
  bgmOverlay.style.transition = 'opacity 1s ease-out';
  bgmOverlay.src = './bgm-select.html';
  document.body.appendChild(bgmOverlay);

  bgmOverlay.addEventListener("mouseover", () => bgmOverlay.style.opacity = 1.0);
  bgmOverlay.addEventListener("mouseout", () => bgmOverlay.style.opacity = 0.1);
}

function getParam(key) {
  return (new URL(window.location.href)).searchParams.get(key);
}

function reload(){
  window.open(location.href,"_top");
}
