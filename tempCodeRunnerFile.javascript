function validTime(str) {
    //  write code here.
    const arr = str.split(':');
    for(i = 0; i < arr.length; i++){
        value = parseInt(arr[i]);
        if (i == 1){
            console.log('hello');
            if(value >= 60){
                return false;
            }
            else{
                continue;
            }
        }
            
        if(i == 0){
            if(value >= 24){
                console.log('bye');
                return false;
        }
        }

        }
        return true;
    }

const str = '33:58';
console.log(validTime(str));
