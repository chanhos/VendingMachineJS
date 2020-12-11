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

class VendingMachine{
    _currentAmount ;
    _goodsLists ;
    _returnGoods;
    _inputCashes;

    constructor(){
        this._currentAmount = 0;    
        this._returnGoods =[];          
    }

    putInCash(cashToken) {
        this._currentAmount += cashToken._cashValue;
    }

    returnChange(){
        var i = 4 ;
        var returnAmount = this._currentAmount;
        var returnCashToken = new Map();
        var retrunCashStr ="";
        while(i >= 0)
        {   
            //현재금액이 거스름돈의 단위보다는 커야지 적용가능
            if ( returnAmount >= this._inputCashes[i]._cashValue ) {
                let count = 0 ;
                //현재금액에서 거스름돈을 빼면서 계산.
                while(returnAmount >= this._inputCashes[i]._cashValue )
                {
                    returnCashToken.set(this._inputCashes[i]._tokenName, ++count);
                    returnAmount -= this._inputCashes[i]._cashValue ;
                }                
            } 

            i--;
        }

        returnCashToken.forEach((value,key)=>{
            retrunCashStr += key +" x " + value + ", "
        });            
        return retrunCashStr;
    }

    selectGoods(goodsId){
        if (this._goodsLists[goodsId]._stock > 0){
            //현재금액줄어듬
            this._currentAmount -=  this._goodsLists[goodsId]._price;
            //재고 하나 줄어듬.
            this._goodsLists[goodsId]._stock--;
            //선택상품 반환리스트에 들어감
            this._returnGoods.push(this._goodsLists[goodsId]) ;
        }else{
            //재고 없음을 알려줌
            window.alert(`${this._goodsLists[goodsId]._goodsName}은 품절되었습니다.!`);
            //TODO: 재고없는경우 버튼 랜더링.
        }
    }

}

const INITIAL_STOCKCNT = 3;
const MINIMUM_CASHUNIT = 100;

var goodsNameArray = new Array(
    "조지아" , "비타500", "TOP아메리카노" ,"핫식스" , "박카스" , "레드불", "몬스터에너지"
    ,"오로나민C" , "코카콜라" , "깜찍이소다"
);


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

const generateTokens = function(howMany , makeSequence){
    var tokens = [];
    var cashValue = MINIMUM_CASHUNIT;
    for(let i = 0 ;  i < howMany ; i++)
    {
        tokens.push( new CashToken( cashValue+"원" , cashValue)) ;
        cashValue *= makeSequence[i%2]
    }

    return tokens;
}

//1.자판기를 생성한다.
var drinkMachine = new VendingMachine();
//2.상품을 생성하여 자판기에 집어넣는다.
drinkMachine._goodsLists = randomGenerateGoods(10);
//3.투입금액 및 자판기에 반환할 금액 종류를 생성하여 설정한다.
drinkMachine._inputCashes= generateTokens(5, [5,2]);

//4.금액입력
drinkMachine.putInCash(drinkMachine._inputCashes[4]);
drinkMachine.putInCash(drinkMachine._inputCashes[2]);
drinkMachine.putInCash(drinkMachine._inputCashes[0]);
drinkMachine.putInCash(drinkMachine._inputCashes[0]);
drinkMachine.putInCash(drinkMachine._inputCashes[1]);

console.log(drinkMachine._currentAmount);

drinkMachine._currentAmount -= 1200;
console.log(drinkMachine._currentAmount);

console.log(drinkMachine.returnChange());

//자판기에서 상품메뉴를 렌더링한다. 
console.dir(drinkMachine._goodsLists);

