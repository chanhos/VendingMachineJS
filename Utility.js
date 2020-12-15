/// Element Create : 전달받은 Parameter를 통해서 원하는 HTML 요소를 반환한다.
// *********parameter************************* 
// name - HTML 요소명 (String) 
// attributes - HTML 요소에 해당하는 attribute 설정 (Object) ex- {type:"button"} 
// arguments[..] - 자식 요소로서 붙일 HTML요소 (HTML 요소)
function elc(name, attributes) {
	var node = document.createElement(name);
	if( attributes ) {
		for(var attr in attributes) {
			if(attributes.hasOwnProperty(attr)) {
				node.setAttribute(attr,attributes[attr]);
			}
		}
	}
	for(var i=2; i<arguments.length; i++) {
		var child = arguments[i];
		if( typeof child == "string" ) {
			child = document.createTextNode(child);
		}
		node.appendChild(child);
	}
	return node;
}

