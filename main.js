"use strict";
onload = ()=>{
    var datamodel = new VedingMachinemodel(0);
    datamodel.randomGenerateGoods(10);
    datamodel.generateTokens(5,[2,5]);
    console.log(datamodel._goodsLists);

    var view = new VedingMachineView();
    //모델을 참조하여 상품버튼을 랜더링.
    //view.makeGoodsButton(view.middleFrame, datamodel, 2);

    //마지막으로 body요소에 view를 추가한다.
    document.body.appendChild( elc("div" , {class : "root"}, view ) ) ;
}


