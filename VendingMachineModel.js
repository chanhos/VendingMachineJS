//모델 요소 1 : 상품(Goods)클래스 
class Goods {
    constructor(goodsId , goodsName, price, stock) {
        this._goodsID = goodsId
        this._goodsName = goodsName;
        this._price = price;
        this._stock = stock
    }    
}

//모델 요소 2 : 현금금액토큰(CashToken) 클래스 
class CashToken {
    constructor(tokenName, cashValue){
        this._tokenName = tokenName;
        this._cashValue = cashValue;        
    }
}

//자판기의 상태 및 로직을 정의하는 모델 (VendingMachineModel)

VedingMachinemodel.prototype = {
    //Property
    _currentAmount ,  //현재금액
    _goodsLists ,     //상품리스트
    _returnGoods,     //반환된 상품리스트
    _tokenCashes,     //입력및 반환하는 금액토큰의종류
    
    //Events
    changeCurrentAmountEvent ,
    changeReturnCashEvent ,
    //Constructor
    constructor : function() {
        this._currentAmount = 0;    
        this._returnGoods =[];
        this._goodsLists = [];
        //금액토큰 리스트 초기화  
        model._tokenCashes = [];
        
        //이벤트 초기화
        this.changeCurrentAmountEvent = document.createEvent("HTMLEvents");
        this.changeReturnCashEvent = document.createEvent("HTMLEvents");
    }  , 
    //Method
    
    

    
}