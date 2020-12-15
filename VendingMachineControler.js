
//자판기 프로그램에서 사용자인터페이스 요소를 구현하고 이벤트를 처리하는 Controler Object

// VendingMachineControler 생성자
// *********parameter*************************     
// model -  GUI구성에 참조가될 Model객체 (Object)
function VendingMachineControler(model){
    //1.inputCashPanel : 사용자 금액 입력 패널
    this.inputCashPanel = this.makeInputPanel(model);
    //2.returnPanel : 거스름돈 반환 및 이용완료 패널
    this.returnPanel   = this.makeReturnPanel(model);   
}

VendingMachineControler.prototype = {
    
    //생성된 컨틀롤러를 HTML 요소로리턴한다. 
    retrunVendingMachineControler : function(){
        return elc( 
            "div" , {class : "control"} 
            , "사용자 입력"
            , this.inputCashPanel 
            , this.returnPanel  
        );
    } ,
    

    //모델을 참조하여 현금입력버튼을 동적으로 생성함 
    // *********parameter*************************     
    // model -  버튼추가에 참조가될 Model객체 (Object)
    makeInputPanel : function(model){
        var panel = elc("div", {class : "control-input"});
    
        //투입금액을 입력할수있는 버튼을 렌더링.
        for(var i =0 ; i < model._cashTokens.length ; i++){            
            //금액입력 버튼을 생성 
            var inputCashButton = elc("button", 
            { type :"button", class : "control-input-button" }
             , model._cashTokens[i]._tokenName
            );             

             //입력시 전달 금액을 넘겨준다.
            let cashValue = model._cashTokens[i]._cashValue; 
            //금액입력 버튼에 이벤트리스너를 생성
            inputCashButton.addEventListener("click", function(e){            
                model.putInCash(cashValue);
            });

            panel.appendChild(inputCashButton);
        }
        return panel;
    },

    //모델을 참조하여 거스름돈 반환버튼 및 이용완료 버튼을동적으로 생성함 
    // *********parameter*************************     
    // model -  버튼추가에 참조가될 Model객체 (Object)
    makeReturnPanel : function(model){
        var panel = elc("div", {class : "control-return"});
    
        //투입금액을 반환할 수 있는 버튼을 생성    
        var returnCashButton = elc("input", { 
            type :"button", 
            class : "control-return-changebutton" , 
            value : "거스름돈 반환"
        });
        //반환버튼에 이벤트 리스너 생성
        returnCashButton.addEventListener("click", function(e){       
            model.returnChanges();
        });

        //자판기 이용완료(초기화) 버튼 
        var completeButton = elc("input", { 
            type :"button", 
            class :  "control-return-complete" , 
            value : "이용 완료"
        });
        //이용완료버튼에 이벤트 리스너 생성
        completeButton.addEventListener("click", function(e){       
            model.initialize();
        });
    
        panel.appendChild(returnCashButton);
        panel.appendChild(completeButton);
        
        return panel;
    },

    //모델을 참조하여 상품버튼을 동적으로 생성함 
    // *********parameter************************* 
    // parent - 버튼이 들어가게될 상위요소 (HTML요소) 
    // model -  버튼추가에 참조가될 Model객체 (Object)    
    makeGoodsButton : function(parent , model ){
               
        for(var i = 0 ; i < model._goodsLists.length ; i++)
        {           
            //버튼을 생성
            // class - css 스타일 적용 Class로 , id : #+goosID 로 부여하여 View에서 특정 상품을 찾을수있도록한다. 
            var goodsButton = elc("button", 
            { type : "button", class : "middle-goodsButton_on" , id: `#${model._goodsLists[i]._goodsID}` },
             `${model._goodsLists[i]._goodsName}` ,
            elc("br",null), 
            `${model._goodsLists[i]._price}원`);
            
            //버튼을 식별하기위한 model의 goosID를 넘겨준다.
            let goodsId = model._goodsLists[i]._goodsID;
            
            //상품버튼의 클릭이벤트를 등록한다. 
            goodsButton.addEventListener("click",function(e){
                model.selectGoods(goodsId);
            });            

            parent.appendChild(goodsButton) ;                     
        }        
    }
}