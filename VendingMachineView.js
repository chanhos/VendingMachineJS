

function VedingMachineView(){
    
    // ###########상단프레임############### 
    // ######       title           ######
    // ##                currentAmount####
    // ###################################  

    //현재금액 상태를 표시하는  span 요소만듦 
    this.currentAmount = elc("span", {class :"amt-span"});
    //현재금액 0원 초기화
    this.currentAmount.innerHTML = 0;
    //현재금액 표시영역 만듦
    this.amountDiv = elc("div", {class : "amt-div"} , "현재금액 : " , this.currentAmount);
    //타이틀 영역 만듦
    this.title = elc("h1", {class : "title-h1"} , "XID 개발자를 위한 자판기!");
    //만든요소들을 상단프레임으로 합침.    
    this.topFrame = elc("div", { class:"top-div"}, this.title , this.amountDiv);

     //######중단프레임#################### 
    // ###goodsButton1/goodsButton2....###
    // ###goodsButton3/goodsButton4....###              
    // ###################################
    //중단 프레임을 만듦
    this.middleFrame = elc("div", {class :"middle-div"});
    

     //######하단프레임#################### 
    // ####retrunChange:                ##
    // ####retrunGoods:                 ##              
    // ###################################
    // 반환된 금액 표시영역 만듦
    this.chagesReturn = elc("div", {class : "returnchanges-div"}, "반환된 금액: ")  ;
    // 구매한 음료 표시영역 만듦
    this.retrunGoods = elc("div", {class : "returngoods-div"}, "구매한 음료: ")  ;
    //만든요소들을 하단프레임으로 합침.   
    this.botomFrame= elc("div", {class:"bottom-div"}, this.chagesReturn , this.retrunGoods);    
    

    //View에 "changeCurrentAmount" 이벤트 리스너를 등록한다. 
    document.addEventListener("changeCurrentAmount", function(e){
        this.showCurrentAmount(e.data.currentAmount);
    }) ;

    //View에 changesReturn 이벤트 리스너를 등록한다. 
    document.addEventListener("changesReturn", function(e){
        this.showchangesReturn(e.data.changes);
    }) ;
    
    //View에 returnGoods 이벤트 리스너를 등록한다. 
    document.addEventListener("returnGoods", function(e){
        this.showretrunGoods(e.data.retrunGoods);
    }) ;


    //전체 프레임을 묶어서 자판기 뷰를 보여준다.
    return elc( 
        "div" , {class : "vendigmachine"} , this.topFrame , this.middleFrame , this.botomFrame 
    );
}

VedingMachineView.prototype = {
    
    //View에 현재 금액을 표시한다
    // *********parameter************************* 
    // currentAmount - 현재금액 (number) 
    showCurrentAmount : function(currentAmount){
        this.currentAmount.innerHTML = currentAmount;
    } ,
    
    //View에 반환된 금액을 표시한다
    // *********parameter************************* 
    // changes - 반환금액 (String) 
    showchangesReturn : function(changes){
        this.chagesReturn.innerHTML = "반환된 금액: "+ changes;
    } , 

    //View에  구매한 음료를 표시한다
    // *********parameter************************* 
    // retrunGoods - 구매한음료 (String) 
    showretrunGoods: function(retrunGoods){
        this.retrunGoods.innerHTML = "구매한 음료: "+ retrunGoods;
    } ,

    //모델을 참조하여 동작하는 상품버튼을 동적으로 생성함 
    // *********parameter************************* 
    // parent - 버튼이 들어가게될 상위요소 (HTML요소) 
    // model -  버튼의 참조가될 Model객체 (Object)
    // buttonRow - 버튼이 추가되는 열수 (ObjectArray)
    makeGoodsButton : function(parent , model , buttonRow){
        var oneRowButtonCnt = Math.floor(model._goodsLists.length / buttonRow);
        var cnt = 0;

        var buttonDiv = elc("div",null);        
        for(var i = 0 ; i < model._goodsLists.length ; i++)
        {           
            //버튼을 생성 (상품이름 - 상품가격)
            var goodsButton = elc("button", 
            { type : "button", class : "goodsButton"},
             `${model._goodsLists[i]._goodsName}` ,
            elc("br",null), 
            `${model._goodsLists[i]._price}원`);
            
            //버튼을 식별하기위한 model의 goosID를 넘겨준다.
            let goodsId = model._goodsLists[i]._goodsID;
            
            //상품버튼의 클릭이벤트를 등록한다. 
            goodsButton.addEventListener("click",function(e){
                model.selectGoods(goodsId);
            });            

            cnt++;
            buttonDiv.appendChild(goodsButton);
            //버튼을 생성하다가 한줄에 들어가야할 버튼이 생성이 다 되면..
            if(cnt == oneRowButtonCnt)
            {
                parent.appendChild(buttonDiv) ;
                buttonDiv = undefined;
                buttonDiv = elc("div",null);
            }            
        }
    }
}



