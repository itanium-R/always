/** ----------------------------------------------------------------
    fullScSlider.js
    (c) itanium-R 2019

    ※フルスクリーンな要素作成には以下のCSSを利用         
        .fullSc{
            position: fixed;
            top: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            border:0;
        }
---------------------------------------------------------------- */
class FullScSlider{
  /**
   * @param {HTMLElement[]} elmList    フルスクリーンなdivやiframeのElementを格納した配列
   * @param {Number}        slideDur   スライド間隔[ミリ秒]
   * @param {Number}        stepDur    スライド時間[ミリ秒]
   */
  constructor(elmList,slideDur,stepDur){
    this.curIdx = 0;

    this.slideDur = slideDur ? slideDur : 10000;
    this.stepDur = stepDur ? stepDur : 2000;

    this.elmList = elmList;
    this.elmList.forEach(elm => elm.style.transform = `translateX(100vw)`);
    this.elmList[0].style.transform = `translateX(0vw)`;

    this.idxMax = this.elmList.length - 1;
    if(elmList.length>1){
      setInterval(() => this.slide(), this.slideDur + this.stepDur);
    }
  }

  slide(){
    const isLastElm = (this.curIdx >= this.idxMax);
    const curElm = this.elmList[this.curIdx];
    const nxtElm = isLastElm ? this.elmList[0] : this.elmList[this.curIdx + 1];
    curElm.style.transition = `transform ease ${this.stepDur / 1000}s`;
    nxtElm.style.transition = `transform ease ${this.stepDur / 1000}s`;
    curElm.style.transform = `translateX(-100vw)`;
    nxtElm.style.transform = `translateX(0vw)`;

    setTimeout(
      () => {
        curElm.style.transition = ``;
        nxtElm.style.transition = ``;
        curElm.style.transform = `translateX(100vw)`;
      },
      this.stepDur);

    this.curIdx += 1;
    if (isLastElm) this.curIdx = 0;
  }
}