class Move{
    constructor(guess,message){
        this.guess=guess;
        this.message=message;
    }
}

class MastermindViewModel {
    constructor() {
        // game level: 3 --> 10
        // secret: 549
        // guess -> 123 -> No match!
        //          456 -> -2
        //          567 -> +1
        //          594 -> +1-2
        //  max tries: 10
        //  lives: 3
        //  game level: 4
        
        this.secret=this.createSecret(3);
        this.guess=ko.observable();
        this.tries=ko.observable(0);
        this.moves=ko.observableArray([]);
        this.level=ko.observable(3);
        this.lives=ko.observable(3);
        this.points=ko.observable(0);
        
        console.log(this.secret);

    }
    play = () =>{
        this.tries(this.tries()+1);
        let message="";
        let secret=String(this.secret);
        let guess=String(this.guess());
        let pos=0;
        let neg=0;        
        let isMatch=false;
        
       
        for (let s of secret){
            for (let g of guess){
                if (s==g){
                    isMatch=true;                   
                }

            } 
            if (isMatch==true){
                break;}
               
        }        
        if (isMatch==false){
            message="no match";
            this.moves.push(new Move(this.guess(),message));

        }
        else if (secret===guess){
            message="You win and level up";
            this.winGame(message);
            
        }

        else {

            if (this.tries()===10){                
                
                this.lives(this.lives()-1);
                this.looseGame();
               
            }

            else if (secret==guess){
                message="You win and level up";
                this.winGame(message);
              
            }


            else{
                                
                for (let i=0;i<secret.length;i++){
            
                    if (secret[i]===guess[i]){
                        pos+=1;
    
                    }
                    else{
                        for (let s of secret){
                        
                            if (s===guess[i]){
                                neg+=-1;
                            }
                        }
                    }
    
                }
                message=String(neg) +"/"+String(pos);
                this.moves.push(new Move(this.guess(),message));
        
            
        }
        }
   

}
    initializeGame=()=>{
        this.tries(0);
        this.guess();
        this.moves([]);       
    }
       
    
    winGame=(message)=>{
        this.initializeGame();       
        this.level(this.level()+1);
        this.points(this.points()+1);

        this.moves.push(new Move(this.secret,message));
        let coef=0;
        
        coef=Number(this.level());
        if (coef<10){
            this.secret = this.createSecret(coef);
            console.log(this.secret);
 
        }
      

    }

    looseGame=()=>{
      
        if (this.lives()>0){
            this.initializeGame();                    
            let message=`You could't find it and You have ${this.lives()} lives left.`;
            this.moves.push(new Move(this.secret,message)); 
                                                               
            let coef=Number(this.level());
            if (coef<10){
                this.secret = this.createSecret(coef);
                console.log(this.secret);
        }
        
        }        
        else {                        
            
            this.stopGame();  
        }
    }

    createSecret = (coef) => {
        let max=1;  
        console.log(coef);      
        while (coef>0){
            max*=10;
            coef-=1;
        }  
        let min=max/10;
        max-=1;                
        return Math.floor(Math.random() * (max - min + 1) + min)  
    }

    stopGame =()=>{
        this.moves.push(new Move(this.secret,"You used your 3 lives"));
        // if(this.level()===10){

        // }
 
        

    }

}



const mastermindViewModel = new MastermindViewModel();
window.onload = () => {
    ko.applyBindings(mastermindViewModel);
}

