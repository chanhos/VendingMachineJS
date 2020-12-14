//import styles from './viewStyle.css';
"use strict";

class Goods {
    constructor(goodsId , goodsName, price, stock) {
        this._goodsID = goodsId
        this._goodsName = goodsName;
        this._price = price;
        this._stock = stock
    }    
}

class CashToken {
    constructor(tokenName, cashValue){
        this._tokenName = tokenName;
        this._cashValue = cashValue;        
    }
}



const INITIAL_STOCKCNT = 3;
const MINIMUM_CASHUNIT = 100;

var goodsNameArray = new Array(
    "조지아" , "비타500", "TOP아메리카노" ,"핫식스" , "박카스" , "레드불", "몬스터에너지"
    ,"오로나민C" , "코카콜라" , "깜찍이소다"
);

var view = Object.create(null);  //View 객체
var model = Object.create(null); //model 객체 
var controler = Object.create(null); // Controler 객체 


window.onload = function(){    
    createVendingMachine(document.body, 2,400,500);

  

    
}


const createVendingMachine = function(parent, nx , width, height){
    model.create();
    model.generateTokens(5,[5,2]);
    console.log(model._inputCashes);
    //자판기모델의 상품리스트에 랜덤으로 생성한 물건들을 넣는다.
    model._goodsLists = randomGenerateGoods(10);
    
    var vendingmachine = view.create(5 , 400,800, model);
    var inputPane = controler.inputPane(model);
    var returnPane = controler.returnPane(model);
    //View를만든다.
    parent.appendChild( elt("div" , {class : "root"}, vendingmachine , inputPane, returnPane) ) ;
}

const randomGenerateGoods = function(howMany){
    var goodsLists = [];
    
    for( let i = 0; i< howMany; i++){
        //가격은 500~1000사이 임의로 지정된다.
        let price = Math.floor( (Math.random() * (11-5)) +5) * MINIMUM_CASHUNIT ;
        //이름을 배열 앞에서 부터 하나씩 뽑아온다.
        let goodsName = goodsNameArray.shift();
        //초기 재고 수량만큼 상품을 생성한다.
        goodsLists.push(new Goods(i, goodsName, price, INITIAL_STOCKCNT))
    }

    return goodsLists;
};


//물건디스플레이
view.create = function(nx , width, height, model){
    
    //현재금액 상태를 표시하는 Status 패널을 만든다. 
    view.currentAmount = elt("span", {class :"amt"});
    view.currentAmount.innerHTML = 0;
    view.amountSatus = elt("div", {class : "amt-status"} , "현재금액 : " , view.currentAmount);
    //타이틀
    view.title = elt("h1", {class : "title"} , "JS 자판기");
    //상단프레임의 위의 status패널 및 타이틀을 합친다.
    view.topFrame = elt("div", { class:"top-frame"}, view.title , view.amountSatus);

 
    view.middleFrame = elt("div", {class :"middle-frame"} )  ;    
    view.makeGoodsButton(view.middleFrame, model) ;


    view.retrunChange = elt("div", {class : "return-change"}, "반환된금액: ")  ;
    view.retrunGoods = elt("div", {class : "return-goods"}, "구매한 음료: ")  ;
    
    view.botomFrame= elt("div", {class:"bottom-frame"}, view.retrunChange , view.retrunGoods);    
    

    //View에 changeAmount 이벤트 리스너를 등록한다. 
    document.addEventListener("changeAmount", function(e){
        view.showCurrentAmount(e.data.currentAmount);
    }) ;

    //View에 returnCashChange 이벤트 리스너를 등록한다. 
    document.addEventListener("returnCashChange", function(e){
        view.showReturnCash(e.data.returnCash);
    }) ;

    return elt( 
        "div" , {class : "vendigmachine"} , view.topFrame , view.middleFrame , view.botomFrame 
    );

}

view.showCurrentAmount = function(currentAmount){
    view.currentAmount.innerHTML = currentAmount;
}

view.showReturnCash = function(returnCash){
    view.retrunChange.innerHTML = "반환된금액: "+ returnCash;
}

model.create = function(){
    /*
    _currentAmount ;
    _goodsLists ;
    _returnGoods;
    _inputCashes;
    */
    //현재금액과 반환 물건 리스트  초기화 
    model._currentAmount = 0;    
    model._returnGoods =[];
    model._goodsLists = [];
    //입력금액 Cash배열 초기화  
    model._inputCashes = [];     

    model.changeCurrentAmountEvent = document.createEvent("HTMLEvents");
    model.changeReturnCashEvent = document.createEvent("HTMLEvents");

}

//현재금액이 바뀔때 호출되는 메서드 changeAmount 이벤트를 발생시킨다.
model.notifyCurrentAmountChange = function(amount){
    model.changeCurrentAmountEvent.initEvent("changeAmount", false,false);
    model.changeCurrentAmountEvent.data = { currentAmount : amount};
    document.dispatchEvent(model.changeCurrentAmountEvent);
}
//반환금액이 바뀔때 호출되는 메서드 returnCashChange 이벤트를 발생시킨다. 
model.notifyReturnCashEvent = function(returnCash)
{
    model.changeReturnCashEvent.initEvent("returnCashChange", false,false);
    model.changeReturnCashEvent.data = { returnCash };
    document.dispatchEvent(model.changeReturnCashEvent);
}


model.selectGoods = function(goodsId){
    if( model._goodsLists[goodsId]._price <= model._currentAmount)
    {
        if (model._goodsLists[goodsId]._stock > 0){
            //현재금액줄어듬
            model._currentAmount -=  model._goodsLists[goodsId]._price;
            //재고 하나 줄어듬.
            model._goodsLists[goodsId]._stock--;
            //선택상품 반환리스트에 들어감
            model._returnGoods.push(model._goodsLists[goodsId]) ;
            model.notifyCurrentAmountChange(model._currentAmount);
        }else{
            //재고 없음을 알려줌
            window.alert(`${model._goodsLists[goodsId]._goodsName}은 품절되었습니다.!`);
            //TODO: 재고없는경우 버튼 랜더링.
        }
    }
   
}

//자판기 모델에 cashToken을 입력해서 현재금액을 입력한다. 
model.putInCash = function(cashValue) {
    model._currentAmount += cashValue;
    model.notifyCurrentAmountChange(model._currentAmount);
};

model.returnChange = function(){
    var i = model._inputCashes.length -1;    

    var returnCashToken = new Map();
    var retrunCashStr ="";
    while(i >= 0)
    {   
        //현재금액이 거스름돈의 단위보다는 커야지 적용가능
        if ( model._currentAmount >= model._inputCashes[i]._cashValue ) {
            let count = 0 ;
            //현재금액에서 거스름돈을 빼면서 계산.
            while(model._currentAmount >= model._inputCashes[i]._cashValue )
            {
                returnCashToken.set(model._inputCashes[i]._tokenName, ++count);
                model._currentAmount -= model._inputCashes[i]._cashValue ;
            }                
        } 

        i--;
    }
    returnCashToken.forEach((value,key)=>{
        retrunCashStr += key +" x " + value + ", "
    });       

    model.notifyCurrentAmountChange(model._currentAmount);
    model.notifyReturnCashEvent(retrunCashStr) ;
}

//자판기 모델에 입력할 현금 배열을 만든다.  
// parameter :  howmany - 입력할 현금 종류  makeSequence - 현금 생성로직을 가지는 배열
model.generateTokens = function(howMany , makeSequence){
    var tokens = [];
    var cashValue = MINIMUM_CASHUNIT;
    for(let i = 0 ;  i < howMany ; i++)
    {
        tokens.push( new CashToken( cashValue+"원" , cashValue)) ;
        cashValue *= makeSequence[i%2]
    }

    model._inputCashes =  tokens;
}


controler.inputPane = function(model){
    var pane = elt("div", {class : "inputPane"});

    //투입금액을 입력할수있는 버튼을 렌더링.
    for(var i =0 ; i < model._inputCashes.length ; i++){
        var inputButton = elt("input", { 
            type :"button", 
            class : "inputCash" , 
            value : model._inputCashes[i]._tokenName 
        });

        let cashValue = model._inputCashes[i]._cashValue; 
        inputButton.addEventListener("click", function(e){            
            model.putInCash(cashValue);
        });
        pane.appendChild(inputButton);
    }
    return pane;
}

controler.returnPane = function(model){
    var pane = elt("div", {class : "returnPane"});

    //투입금액을 반환할 수 있는 버튼을 렌더링.    
    var returnButton = elt("input", { 
        type :"button", 
        class : "returnCash" , 
        value : "반환"
    });

    returnButton.addEventListener("click", function(e){       
        model.returnChange();
    });

    pane.appendChild(returnButton);
    
    return pane;
}


view.makeGoodsButton = function(parent, model)
{
    console.log(model._goodsLists[0]._goodsName);
    for(var i = 0 ; i < model._goodsLists.length ; i++)
    {
        var goodsButton = elt("input", 
        {
            type : "button",
            class : "goodsButton" ,
            value : `${model._goodsLists[i]._goodsName}\n${model._goodsLists[i]._price}원`            
        });
        
        let goodsId = model._goodsLists[i]._goodsID;
        goodsButton.addEventListener("click",function(e){
            model.selectGoods(goodsId);
        });
        parent.appendChild(goodsButton) ;
    }


}




