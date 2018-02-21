//JaccardAlgorithm to find similarity between properties and predict properties that user like
// Parameters list of users favourite properties, list of all available properties
// Returns top 5 properties user may like
function JaccardAlgorithm(favProperties,allProperties,callback){
  var reccProperties = [];
  var jaccPositive = 0, jaccAll = 0, jaccCoeff = 0;
  if(favProperties.length>0){
        for(var i = 0;i < allProperties.length;i++) {
          if(!allProperties[i].jaccCoeff){
            allProperties[i].jaccCoeff=-1;
            allProperties[i].customer_favorite=0;
          }
          for(var j = 0;j < favProperties.length;j++) {
            if(allProperties[i].id==favProperties[j].id)
            {
                //console.log(allProperties[i].price);
                allProperties[i].jaccCoeff= 0 ;
                allProperties[i].customer_favorite=1;
            }
            else if(allProperties[i].jaccCoeff!=0){
              jaccPositive = 0, jaccAll = 0, jaccCoeff = 0;
                  allProperties[i].customer_favorite=0;
                  //size
                  if(Math.abs(favProperties[j].size-allProperties[i].size)<5){
                    jaccPositive++;
                    jaccAll++;
                  }
                  else {
                      jaccAll++;
                  }
                  //price
                  if(Math.abs(favProperties[j].price-allProperties[i].price)<10000){
                    jaccPositive++;
                    jaccAll++;
                  }
                  else {
                      jaccAll++;
                  }
                  //number of Rooms
                  if(Math.abs(allProperties[i].numberofrooms - favProperties[j].numberofrooms)<2 ){
                    jaccPositive++;
                    jaccAll++;
                  }
                  else{
                    jaccAll++;
                  }
                  //furnishingstate
                  if(allProperties[i].furnishingstate == favProperties[j].furnishingstate){
                    jaccPositive++;
                    jaccAll++;
                  }
                  else{
                    jaccAll++;
                  }
                  //city
                  if(allProperties[i].city == favProperties[j].city ){
                    jaccPositive++;
                    jaccPositive++;
                    jaccAll++;
                  }
                  else{
                    jaccAll++;
                  }

                  jaccCoeff=jaccPositive/jaccAll;
                  if(jaccCoeff > allProperties[i].jaccCoeff)
                      allProperties[i].jaccCoeff=jaccCoeff;

            }
          }
        }
        allProperties.sort(function(a, b){
          return b.jaccCoeff-a.jaccCoeff
        });
    }
    for(var i = 0;i <5;i++) {
        reccProperties[i]=allProperties[i];
    }
    callback(reccProperties);

}