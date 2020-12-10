# VendingMachineJS
 자판기의 전시 된 상품을 선택하고 물건 구매 및 반환하는 기능의 자판기를 JS로구현!!

----------

엔티티 모델: 

- 전역
m 무작위 상품생산(number 개수)   ->  Array<상품>  10개의 무작위상품 0~3개의 재고
m 자판기 초기화


  자판기 
p 현재금액 : number
p Array<상품> 상품리스트 
 
f 디스플레이 상품 버튼(Array<상품> 상품리스트)  
f 지폐 입력 버튼 초기화 ( Array<token> 입력현금리스트)     
f 재고 채워 넣기();

f 현금입력();  -> 1. 현재금액에 Display

f 잔돈반환();  -> 1. 현재금액에 반환가능한 금액이 있어야만함.  
                  2. 잔돈은 가장 적은수의 지폐와 동전으로  

f 상품선택( number 상품인덱스) ;   
  if( 상품재고 = 0) 
    -선택불가
  els
     if( 현재금액 - 상품금액 < 0 )
        - 금액이 부족합니다. 
     else 
       현재금액 -= 상품가격 
       구매한음료 [] .push(상품)                       
 
                          
- 상품 
 p 상품이름 : string 
 p 상품가격 : string
 p 상품재고 : number
 p 선택가능 : boolean

   
- token 
 p 가치 : number
 p 개수 : number 


