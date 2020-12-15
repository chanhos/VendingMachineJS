/// Test : 전달받은 테스트 코드를 진행한다. 
// *********parameter************************* 
// title - Test 제목 
// testCode - Test를 실행할 코드작성.
function test(title, testCode) {
	try {
	  testCode();
	} catch (error) {
	  console.error(error);
	}
}
var VedingMachinemodel = require('./VendingMachineModel');

/// expect : 예상되는 기대값과 같은지 비교한다. 
// *********parameter************************* 
// result - Test에서 예상되는 반환 기대값.
function expect(result) {
	return {
		toBe: function(expected) {
		if (result !== expected) {
			throw new Error(result + ' is not equal to ' + expected);
		}
		}
	}
}


//모델 테스트를 진행.
//1.VedingMachinemodel 을 생성한다.
var TestModel = new VedingMachinemodel(0);

//2.태스트 케이스를 추가하여 테스트
///Test 코드작성중 오류 발생..;
test("랜덤 상품생성", function(){
    expect(TestModel.randomGenerateGoods(10)).toBe(0);
});
  
test("금액입력및 반환금액 테스트 ", function(){
    expect(TestModel.putInCash(500)).toBe();
});

