/*通用*/
function g(id){
	var ele=document.getElementById(id);
	return ele;
}

var problemAmoun=g("problem-amount"),
	submitButton=g("submit-button"),
	makeProblem=g("make-problem"),
	solveProblem=g("solve-problem"),
	title=g("title1"),
	solve=g("solve");
 

//随机产生3-5的数字
function opeNumber(){
	var operatorNumber=Math.ceil(Math.random()*10/2);//随机运算符数量
	//防止运算符少于2个
	while (operatorNumber<3) {
		operatorNumber=Math.ceil(Math.random()*10/2);
	}
	return operatorNumber;
}

// 生成j个运算符，存入数组中
function operatorArr(j){
	var arr=[];
	for ( i = j; i >= 0; i--) {
		//随机生成一个k=0、1、2或3
		var k=Math.ceil(Math.random()*10/2);
		while(k>4){
			k=Math.ceil(Math.random()*10/2);
		}
		
		//k为不同数字返回对应不同运算符
		switch (k) {
			case 1:arr[i] = "+";break;
			case 2:arr[i] = "-";break;	 
			case 3:arr[i] = "*";break;	 
			case 4:arr[i] = "÷";break;	 
			default:
				break;
		}
	}
	return arr;
}

//创建一个数组用于每隔一个数组单位放一个1-100的数字，一共放j个数字
function numberArr(j){
	var	numberArray=[];//数组存储随机生成的计算数字
		//向numberArray填充随机数
		for (var i = 1; i <= j; i++) {
			numberArray[2*i-1]=Math.ceil(Math.random()*100);
	   }
	   return numberArray;
}
// 判断是否会有计算后为负数（如果有则重新出题）
//arr为判断的数组，i为数组开始的位置，只要有某一次不符合不是负数或分数的要求，就return -1,到最后都依然符合要求就返回1
function judgePositive(arr,i){
	var array=[];//存储每次计算的两个数与一个计算符
	var arr1=[];//用于浅拷贝arr[]
	var equation;//用与存储算式
	arr1=arr.concat();

	//取值次数=计算次数=计算符的个数=arr.length/2-1,如果有一次计算结果为负，则返回-1
	var r=0;
	for(var i=0;i<arr1.length/2-1;i++){
		var equation="";
		//equation第一次取123号元素，第二次取12345号元素，1234567...
		for (let j = 1; j <= r+3; j++) {
			equation=equation+arr1[j];
		}
		if (eval(equation)<0) {
			return -1;
		}
		r=r+2;
		console.log(equation);
	}
	return 1;
}

//判断是否能除尽(无余数),如果有一次不能除尽则返回-1
//arr是判断的数组
function judgeDivision(arr){
	var array=[],j=0;//array用于每次储存 "÷"出现的下标
	var arr1=arr.concat();//用于浅拷贝数组参数arr
	//储存 "÷"出现的下标
	for(var i=0;i<=arr1.length;i++){
		if(arr1[i]=="÷"){
			array[j]=i;
			j++;
		}
	}

	//判断每次相除能否除尽,先判断是否有除号再判断能否除尽
	if(array.length==0){
		return 1;
	}
	for(var i=0;i<=array.length;i++){
		var a=array.slice(arr1[i])[0];//a用于存储被除数
		var b=array.slice(arr1[i+1])[0];//b用于存储除数
		if(a%b!=0){
			return -1;
		}
	}
	return 1;
}

//计算
//arr[]为存放了运算符+数字的数组，j为数字的个数，
function count( arr, j) {
	var ans=arr[1];
 
	//运算j-1次
	for(var i=1;i<=j*2;i++){
		switch (arr[i+1]) {
			case "+":
				ans+=arr[i+2];
				break;
			case "-":
				ans-=arr[i+2];
				break;
			case "*":
				ans*=arr[i+2];
				break;
			case "÷":
				ans/=arr[i+2];
				break;				
			default:
				break;
		}
	}
	return ans;
}

arr1=["",2,"+",3,"*",7];
var r=0;
for(var i=0;i<arr1.length/2-1;i++){
	var equation="";
	//equation第一次取123号元素，第二次取12345号元素，1234567...
	for (let j = 1; j <= r+3; j++) {
		equation=equation+arr1[j];
	}
	r=r+2;
}

submitButton.onclick=function(){
	//删除提交的按钮，防止后面又添加其进入数组answerArray中
	problemAmoun.parentNode.removeChild(problemAmoun);
	//判断出题数目是否是1-100，如果不是则变红
	if (problemAmoun.value<1 || problemAmoun.value>100) {
		problemAmoun.className="form-control warm";
	}

	else{
		problemAmoun.className="form-control";//颜色变回正常
		makeProblem.style.display="none";
		solveProblem.style.display="block";
		var	n=problemAmoun.value;//题目数量为n
		
		//生成n道题目并添加进html
		for(let i=0;i<n;i++){
			
			var	j=opeNumber();//运算符数量为j
			var numberArray=numberArr(j+1);//用于存储运算的数字，数字的个数等于运算符+1,生成数组，按1,3,5...顺序放入
			var opeArray=operatorArr(j);//生成储存运算符的数组

			//添加运算符到运算的数字中形成运算式
			for (let i = 1; i <= j; i++) {
				numberArray[2*i]=opeArray[i];
			}
			//判断是否同时满足无负数且无分数，如果不是则重新生成numberArr数组；
			while(judgeDivision(numberArray)!=1 || judgePositive(numberArray,1)!=1) {
				j=opeNumber();//运算符数量为j
				numberArray=numberArr(j+1);//用于存储运算的数字，数字的个数等于运算符+1,生成数组，按1,3,5...顺序放入
				opeArray=operatorArr(j);//生成储存运算符的数组
				for (let i = 1; i <=j; i++) {
					numberArray[2*i]=opeArray[i];
				}
			}
			//向做题界面添加html
			var divW=document.createElement("div");
			var divI=document.createElement("div");
			var label=document.createElement("label");
			var input=document.createElement("input");

			divW.className="form-group";
			divI.className="col-sm-12";
			label.className="col-sm-6  control-label";
			input.className="form-control";
			
			divW.appendChild(divI);	
			divI.appendChild(label);
			divI.appendChild(input);
			title.appendChild(divW);
			//取出数组中的值，放入html中
			numberArray.forEach(function (item,index) {
				label.innerHTML = label.innerHTML + item; 
			});
			
			console.log("计算出的答案为"+eval(label.innerHTML));
		
		}	
	}
}
window.onload=function(){
	solve.onclick=function () {
	var answerArray=document.getElementsByClassName('form-control');//存放用户输入的答案的数组，之后用于与正确答案相比较
	var titleArray=document.getElementsByClassName('control-label');//存放题目
	
	for(var i=0;i<answerArray.length;i++){
		 
		var b=titleArray[i].innerHTML;
		
		if(eval(b)!=answerArray[i].value){
			answerArray[i].className="form-control warm";
		}	
		else{
			answerArray[i].className="form-control";
			
		}
	}
	
}
}


function check(){
	if (problemAmoun.value>=1&&problemAmoun.value<=100) {
		return true;
	}
	else{
		return false;
	}
}

 
