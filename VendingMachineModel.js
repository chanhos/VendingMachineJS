
// 초기재고수량
const INITIAL_STOCKCNT = 3;
// 현금금액단위
const MINIMUM_CASHUNIT = 100;
// 무작위 대상 상품 리스트
var GOODS_NAME_ARRAY = new Array(
    "조지아" , "비타500", "TOP" ,"핫식스" , "박카스" , "레드불", "몬스터에너지"
    ,"오로나민C" , "코카콜라" , "깜찍이소다" , "망고", "수박" , "솔의눈", "써니텐"
);
//데이터 요소1: 상품(Goods)클래스 
class Goods {
    constructor(goodsId , goodsName, price, stock) {
        //1._goodsID : 상품 ID (Number)
        this._goodsID = goodsId
        //2._goodsName : 상품 이름 (String)
        this._goodsName = goodsName;
        //3._price : 상품 가격  (Number)
        this._price = price;
        //4._stock : 상품 재고 수량  (Number)
        this._stock = stock
    }    
}
//데이터 요소2 : 현금금액토큰(CashToken) 클래스 
class CashToken {
    constructor(tokenName, cashValue){
        //1._tokenName : 현금금액(지폐,동전) 이름  (String)
        this._tokenName = tokenName;
        //2._cashValue : 현금금액 가치 (Number)
        this._cashValue = cashValue;        
    }
}



//자판기 프로그램의 데이터와 상태값을 가지며  프로그램 로직을 처리하고 View에 알려주는 Model Object

//VedingMachinemodel 생성자
function VedingMachinemodel(){
    //Property
    this._currentAmount = 0;                                                //1.현재금액  (Number)
    this._goodsLists = [];                                                  //2.상품리스트  (Array[object])
    this._returnGoods = new Map();                                          //3.반환된 상품 (Map  - Key:반환상품이름 value : 수량)
    this._cashTokens = [];                                                  //4.금액토큰 리스트 (Array[object])
     //Events
    this.changeCurrentAmountEvent = document.createEvent("HTMLEvents");     //5.현재액의 변화 이벤트
    this.changesReturnEvent = document.createEvent("HTMLEvents");           //6.거스름돈 이벤트
    this.returnGoodsEvent = document.createEvent("HTMLEvents");             //7.상품구매 이벤트
    this.soldOutEvent = document.createEvent("HTMLEvents");                 //8.상품품절 이벤트
}


VedingMachinemodel.prototype = {
   
    //자판기 속성 초기화 (사용완료)
    initialize : function() {
        this._currentAmount = 0;      //0으로 초기화
        this._returnGoods.clear();    //반환된 상품초기화
        
        //현재금액 View에 알림.
        this.notifyChangeCurrentAmount(this._currentAmount);
        //거스름돈 초기화 -> View에 알림
        this.notifyReturnGoods("");
        //받은상품 초기화 -> View에 알림
        this.notifyChangesReturn("");
    } ,  

    //현재금액의 변화를 View에 알림
    // *********parameter************************* 
    // currentAmount - 현재 금액 (number) 
    notifyChangeCurrentAmount : function(currentAmount){
        this.changeCurrentAmountEvent.initEvent("changeCurrentAmount", false,false)
        this.changeCurrentAmountEvent.data = { currentAmount };
        document.dispatchEvent(this.changeCurrentAmountEvent);
    },

    //반환금액을 View에 알림.
    // *********parameter************************* 
    // changes - 반환할 현금 (String) 
    notifyChangesReturn : function(changes){
        this.changesReturnEvent.initEvent("changesReturn", false,false);
        this.changesReturnEvent.data = { changes };
        document.dispatchEvent(this.changesReturnEvent);
    } ,

    //반환되는 상품을 View에 알림.
    // *********parameter************************* 
    // changes - 반환되는 상품 (String) 
    notifyReturnGoods : function(retrunGoods){
        this.returnGoodsEvent.initEvent("returnGoods", false,false);
        this.returnGoodsEvent.data = { retrunGoods };
        document.dispatchEvent(this.returnGoodsEvent);
    } ,

    //대상상품이 품절된 것을 View에 알림.
    // *********parameter************************* 
    // goodsId - 품절된 상품 ID (Number) 
    notifySoldOut : function(goodsId){
        this.soldOutEvent.initEvent("soldOut", false,false);
        this.soldOutEvent.data = { goodsId };
        document.dispatchEvent(this.soldOutEvent);
    } ,


    //현재금액에서 반환할 금액(CashToken) 을 계산하여 거스름돈을 반환함.
    returnChanges : function(){
        //0.현재 금액이 0원이라면 반환할 금액 없음.
        if(this._currentAmount ==0){
            return ;
        } 
        //1.금액토큰의 마지막 종류 index부터 시작.
        var i = this._cashTokens.length -1;    
        //2.잔돈으로 반환하게될 정보를 저장하는 Map 초기화  =>  key : CashToken._tokenName - Value : 수량
        var returnCashToken = new Map();
        //3.최종 반환하게되는 잔돈을 표시할 문자열과 총합계 금액 초기화
        var retrunCashTokenStr ="";
        var totalChangsAmount = 0;

        while(i >= 0)
        {   
            //4.현재금액이 거스름돈의 단위보다는 커야지 적용가능
            if ( this._currentAmount >= this._cashTokens[i]._cashValue ) {
                //금액토큰 수량
                let count = 0 ;
                //5.현재금액에서 거스름돈을 빼가면서 계산.
                while(this._currentAmount >= this._cashTokens[i]._cashValue )
                {
                    returnCashToken.set(this._cashTokens[i]._tokenName, ++count);
                    //반환총금액 추가
                    totalChangsAmount += this._cashTokens[i]._cashValue
                    //현재금액에서는 반환금액 뺌.
                    this._currentAmount -= this._cashTokens[i]._cashValue ;
                }                
            } 
            //6.금액토큰의 종류를 한단계씩 줄임.
            i--;
        }
        //7.거스름돈을 문자열로 출력한다.       
        retrunCashTokenStr = this.returnMapsToString(returnCashToken); 
        retrunCashTokenStr += ` : 총 ${totalChangsAmount}원` 

        //8.현재금액 변화를 View에 알림.
        this.notifyChangeCurrentAmount(this._currentAmount);
        //9.거스름돈을 View에 알림.
        this.notifyChangesReturn(retrunCashTokenStr) ;
    },


    //현재금액 입력
    // *********parameter************************* 
    // cashValue - 입력한 현금 (number) 
    putInCash : function(cashValue){
        this._currentAmount += cashValue;
        //현재금액 변화를 View에 알림.
        this.notifyChangeCurrentAmount(this._currentAmount);
    },

    //자판기에 입력 및 반환할 현금종류(CashToken) 을 생성함.
    // *********parameter************************* 
    // howmany - 입력할 현금 종류개수 (number) 
    // makeSequence - 현금 생성로직을 가지는 배열 [ number1, number2] 
    generateTokens : function(howMany , makeSequence){
        var cashTokens = [];
        var cashValue = MINIMUM_CASHUNIT;

        //MINIMUM_CASHUNIT 부터 시작하여 makeSequence 순서대로 곱해가며 token을 HowMany 개 만듦 
        for(let i = 0 ;  i < howMany ; i++)
        {
            cashTokens.push( new CashToken( cashValue+"원" , cashValue)) ;
            cashValue *= makeSequence[i%2]
        }
        this._cashTokens =  cashTokens;
    },

    //자판기에 들어갈 상품리스트를 개수에 맞게 임의의 금액대로 생성한다. 
    // *********parameter************************* 
    // howmany - 생성할  상품의 개수 (number) 
    randomGenerateGoods : function(howMany){
        var goodsLists = [];    
        for( let i = 0; i< howMany; i++){
            //Cnstraint 1 : 가격은 500~1000사이 임의로 지정된다.
            let price = Math.floor( (Math.random() * (11-5)) +5) * MINIMUM_CASHUNIT ;
            //상품이름을 배열에서 랜덤하게 하나씩 뽑아온다.
            let goodsName = GOODS_NAME_ARRAY.splice(Math.floor(Math.random() * GOODS_NAME_ARRAY.length) ,1)[0];
            //Cnstraint 3 : 각 상품은 0~3개의 재고를 가지고 있다.
            //초기 재고 수량만큼 상품을 생성한다.
            goodsLists.push(new Goods(i, goodsName, price, INITIAL_STOCKCNT))
        }

        this._goodsLists = goodsLists;
    } ,

    //자판기의 상품을 고른다.
    // *********parameter************************* 
    // goodsId - 선택한 상품의 ID (number) 
    selectGoods : function(goodsId){

        //1.선택한 상품보다 현재 투입된 금액이 많거나 같아야만 선택가능
        if( this._goodsLists[goodsId]._price <= this._currentAmount)
        {
            //2. 선택한 상품의 재고가 1개 이상 있어야 선택가능
            if (this._goodsLists[goodsId]._stock > 0){                
                //3.재고 하나 줄어듬.
                this._goodsLists[goodsId]._stock--;
                
                //4.재고가 줄어들어 개수가 0이면 품절.
                if(this._goodsLists[goodsId]._stock == 0)
                {
                    //4.1 품절되었음을 View에 알려줌.
                    this.notifySoldOut(goodsId);
                }

                let selectGoods = this._goodsLists[goodsId];                
                //5.현재금액줄어듬
                this._currentAmount -=  selectGoods._price; 

                //6.선택상품 반환상품 맵에 추가
                if(this._returnGoods.has(selectGoods._goodsName)){
                    //기존 반환상품에서 개수만 추가
                    let count = this._returnGoods.get(selectGoods._goodsName);
                    this._returnGoods.set(selectGoods._goodsName , ++count);
                }else{
                    //반환상품추가
                    this._returnGoods.set(selectGoods._goodsName, 1);
                }  

                //7.현재 금액 변화를 View 에 알림
                this.notifyChangeCurrentAmount(this._currentAmount);
                //8.현재 구매한 상품을 반환하도록 View에 알림
                let returnGoodsStr =  this.returnMapsToString(this._returnGoods);
                this.notifyReturnGoods(returnGoodsStr);

            }else{
                //Cnstraint 2 : 재고가 없는 경우 상품의 선택은 불가능합니다.
                //3.재고 없음을 알려줌
                alert(`${this._goodsLists[goodsId]._goodsName}은(는) 품절되었습니다.!`);
                
            }
        }else{
            //현재금액보다 상품금액이 적은경우 "금액이 부족합니다." 안내노출
            alert(`${this._goodsLists[goodsId]._goodsName}은(는) 구입하기에는 금액이부족합니다.!`);
        }
    },

    //map형식으로 들어온 파라미터 객체를 특정형식 ( key1 X value1 , key2 X value2 ...) 문자열로 리턴한다.
    // *********parameter************************* 
    // MapElement - Map형식의 객체 (Map) 
    returnMapsToString : function(MapElement){         
         var tempArray = [];
         MapElement.forEach( ( value, key)=>
             tempArray.push( key +" x " + value )
         );
        return tempArray.join(" , ");  
    }

}


module.exports = VedingMachinemodel;