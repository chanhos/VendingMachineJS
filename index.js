"use strict";

window.onload = function(){
    //model 생성
    var model = new VedingMachinemodel(0);
    model.randomGenerateGoods(10);
    model.generateTokens(5,[5,2]);
    
    //View와 Controler 생성
    var VendimgMachine =  view.create();
    var controler = new VendingMachineControler(model);    
    //모델을 참조하여 상품버튼을 랜더링.
    controler.makeGoodsButton(view.middleFrame, model);

    //마지막으로 View와 Controller 요소를 합쳐서 Body 요소를 만든다. 
    document.body.appendChild( 
        elc("div" , {class : "root"}, 
        VendimgMachine, 
        controler.retrunVendingMachineControler(), 
        )) ;
}


