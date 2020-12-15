
//자판기 프로그램의 UI를 만들고 model 데이터와 상태변화를 반영하는 View Object
var view = Object.create(null);

view.create = function(){
    // ###########상단프레임############### 
    // ######       title           ######
    // ##                currentAmount####
    // ###################################  
    //현재금액 상태를 표시하는  span 요소만듦 
    view.currentAmount = elc("span", {class :"top-amt-value"});
    //현재금액 0원 초기화
    view.currentAmount.innerHTML = 0;
    //현재금액 표시영역 만듦
    view.amountDiv = elc("div", {class : "top-amt"} , "현재금액 : " , view.currentAmount, " 원");
    //타이틀 영역 만듦
    view.title = elc("h1", {class : "top-title"} , "XID 개발자를 위한 자판기 ver 1.0");
    //만든요소들을 상단프레임으로 합침.    
    view.topFrame = elc("div", { class:"top"}, view.title , view.amountDiv);

    //######중단프레임#################### 
    // ###goodsButton1/goodsButton2....###
    // ###goodsButton3/goodsButton4....###              
    // ###################################
    //중단 프레임을 만듦
    view.middleFrame = elc("div", {class :"middle"});


    //######하단프레임#################### 
    // ####retrunChange:                ##
    // ####retrunGoods:                 ##              
    // ###################################
    // 반환된 금액 표시영역 만듦
    view.chagesReturn = elc("div", {class : "bottom-returnchanges"}, "반환된 금액: ")  ;
    // 구매한 음료 표시영역 만듦
    view.retrunGoods = elc("div", {class : "bottom-returngoods"}, "구매한 음료: ")  ;
    //만든요소들을 하단프레임으로 합침.   
    view.botomFrame= elc("div", {class:"bottom"}, view.chagesReturn , view.retrunGoods);    
 
    //View에 "changeCurrentAmount" 이벤트 리스너를 등록한다. 
    document.addEventListener("changeCurrentAmount", function(e){
        view.showCurrentAmount(e.data.currentAmount);
    }) ;

    //View에 "changesReturn" 이벤트 리스너를 등록한다. 
    document.addEventListener("changesReturn", function(e){
        view.showchangesReturn(e.data.changes);
    }) ;   
    
    //View에 "returnGoods" 이벤트 리스너를 등록한다. 
    document.addEventListener("returnGoods", function(e){
        view.showretrunGoods(e.data.retrunGoods);
    }) ;        

    //View에 "soldOut" 이벤트 리스너를 등록한다. 
    document.addEventListener("soldOut", function(e){
        view.changeSoldOutGoods(e.data.goodsId);
    }) ;      

    //위에서 생성한 요소들을 묶어서 자판기 UI로 생성하여 리턴한다. 
    return elc( 
        "div" , {class : "vendigmachine"} , view.topFrame , view.middleFrame , view.botomFrame 
    );
},

//View에 현재 금액을 표시한다
// *********parameter************************* 
// currentAmount - 현재금액 (number) 
view.showCurrentAmount = function(currentamount){    
    view.currentAmount.innerHTML = currentamount;
} 
    
//View에 반환된 금액을 표시한다
// *********parameter************************* 
// changes - 반환금액 (String) 
view.showchangesReturn = function(changes){
    view.chagesReturn.innerHTML = "반환된 금액: "+ changes;
} 

//View에  구매한 상품을 표시한다
// *********parameter************************* 
// retrunGoods - 구매한상품 (String) 
view.showretrunGoods = function(retrunGoods){
    view.retrunGoods.innerHTML = "구매한 음료: "+ retrunGoods;
} 

//View에 특정상품이 품절되었음을 표시한다.
// *********parameter************************* 
// retrunGoods - 구매한상품 (String) 
view.changeSoldOutGoods = function(goodsId){
    var goodsButton = document.getElementById(`#${goodsId}`);
    goodsButton.className = "middle-goodsButton_off" ;
}





