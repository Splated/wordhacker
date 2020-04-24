
	var Airemovedletters = [];
	var Aikeepletters = [];
	
	
function AiGuess(Pass){
Debug("Ai guess level" + Ailevel);
	var guess = "";
	

for (var p=0;p<Ailevel;p++){
		Debug("Ai pass "+p);
		
		
		
		for (i=0;i<Wordarray.length;i++){
		
			var letters = Wordarray[i].split('');
			var uniquelet = [];
			var remaininglet = [];
		
		
		
			for (var l=0;l<letters.length;l++){
				var test = letters[l];
				
				if (uniquelet.indexOf(test) === -1) { 
					uniquelet.push(test);
					
					if (Airemovedletters.indexOf(test) === -1){
						remaininglet.push(test);
					}
				}
			}

			
			
		
		
		
			
			
			var count = 0;
			var goodcount = 0;
			
			for (var c1=0;c1<uniquelet.length;c1++){
				if(Pass.indexOf(uniquelet[c1]) > -1) { count = count + 1; }
				
				if(Aikeepletters.indexOf(uniquelet[c1]) > -1) { goodcount = goodcount + 1; }
			}
		
			if (count == 0){
				
				for (var c2=0;c2<uniquelet.length;c2++){
					var test = remaininglet[c2];
					
					if (Airemovedletters.indexOf(test) === -1){
						Airemovedletters.push(test);
					}
				} 
			}




			if (count == remaininglet.length){
			
				for (var c3=0;c3<remaininglet.length;c3++){
					var test = remaininglet[c3];
					
					if (Aikeepletters.indexOf(test) === -1){
						Aikeepletters.push(test);
					}
					 
				} 
			}
		
	
		if (count == goodcount){
			for (var c4=0;c4<uniquelet.length;c4++){
					var test = uniquelet[c4];
					
					
					
					if (Aikeepletters.indexOf(test) === -1){
						if (Airemovedletters.indexOf(test) === -1){ Airemovedletters.push(test);}
					}
					 
			} 
		}
			
				
				
				
		
				
				
				
			Debug("Word " + Wordarray[i] + " count:" + count + " goodcount:" + goodcount + " remaininglet.length "+remaininglet.length);
		
		
		
		
		
		
			
		
		}
	}// end off Pass
		
		
		
		
		
		
		
		Debug("Airemovedletters:"+Airemovedletters.length + " Aikeepletters:"+Aikeepletters.length);
		
		
		
	if (GameType == "AI Test"){
		removedletters=Airemovedletters;
		keepletters=Aikeepletters;
	}	




	


	if ( (Ailevel > 2) && (Aikeepletters.length == 0 )  && (Airemovedletters.length < WordSize ) ){
		Debug("GoodWordArray");
	 	guess = findAword(Airemovedletters,Aikeepletters,GoodWordArray); 
	 }
	
	
	if ( (Ailevel > 1) && (Aikeepletters.length ==  WordSize ) ){
		Debug("PassWordArray");
	 	guess = findAword(Airemovedletters,Aikeepletters,PassWordArray); 
	 
	 }
	
	
	if (guess == "") guess = findAword(Airemovedletters,Aikeepletters,MegaWordArray);
	



	if (Ailevel == 1) {
		if ( Math.floor(Math.random() * 10) == 1) {
			Debug("derp!");
			guess = findAword([],[],MegaWordArray);
		}
	}



	return guess;
}
	
	
	
function findAword(Badlet,GoodLet,WordListToSearch){


	var aword = "";
	var Keepers = [];
	
	var maxyes =  WordSize; //5
	
	if ( GoodLet.length < WordSize ) { maxyes =GoodLet.length; }
	
	
	
	for (i=0;i<WordListToSearch.length;i++){
			var reject = false;
			var keep = 0;
			
			
			var test = WordListToSearch[i];
			var letters = test.split('');
			for (l=0;l<letters.length;l++){
				
				var remove = Badlet.indexOf(letters[l]);
				
				if ( remove > -1){reject = true;}
				if(reject){ break;}
				
				
				var yes = GoodLet.indexOf(letters[l]);
				if ( yes > -1){keep = keep +1;}
				
				
			}
			
			//if ( Wordarray.indexOf(test) > -1) { reject = false;}
			//if (Wordarray.length > 0){
			
				if ( Wordarray.indexOf(test) > -1) {
			 			reject = true;
			 		}
			//}
			
				if(maxyes == keep){
					if(!reject){ Keepers.push(test); }
				}
		
		
		
		}


	
	//Debug('findAword started with ' + WordListToSearch.length + ' found '  + Keepers.length + ' Keepers');
	//TopBar(Keepers.length + " of " + WordListToSearch.length + " Words");
	if (Keepers.length > 0 ) {
		aword = Keepers[Math.floor(Math.random() * Keepers.length)];
	}
	


	return aword;
}