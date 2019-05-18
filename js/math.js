/*通用*/
function g(id){
	var ele=document.getElementById(id);
	return ele;
} 

var submitButton=g("submit-button");
var isSubmit=false;
var arry=new Array();
console.log(arry);
function check () {
	 return false;
}

submitButton.onclick=function(){

	var answers=document.getElementsByClassName("form-control");
	var title=document.getElementsByTagName("label");
	console.log(title);
	
	var wrong;
	var correctPercent;
 	
	if (isSubmit==false) {
		for (var i = answers.length-1; i >= 0; i--) {
		if (eval(title[i].innerHTML)!=answers[i].value) {
			answers[i].className="form-control warm";
			wrong++;

		}
		isSubmit=true;
	} 
	}
    else if (isSubmit==true) {
		for (var i = answers.length-1; i >= 0; i--) {
		if (eval(title[i].innerHTML)==answers[i].value) {
			answers[i].className="form-control";
		}
	}
 }
}
