/* Tokenizer.js*/
function Parentizer(jsObj){
    if( jsObj != undefined && jsObj.body != undefined )
    for( var i = 0; child = jsObj.body[i] ; i++ ){
        child.parent = jsObj;
        Parentizer(child);
    }
}

function Tokenize(str){
    // something to keep track of parens nesting
    var current = {};
    if(str){
        if( str[0] == '(')
            str = str.substr(1,str.length-2);
        var raw = str.split(' ');
        current.name = raw.shift();
        current.body = [];
        str = raw.join(" ");
        var fetched = false;
        var level = {
            open:0,
            close:0
        };
        var curr_beg = 0;
        for( var i =0 ; i < str.length ; i++){
            switch(str[i]){
                case '(':
                       if(level.open < 1){
                        curr_beg = i;
                       }
                       level.open++; 
                break;
                case ')':
                        level.close++;
                        if(level.open === level.close){
                            var _temp = Tokenize(str.substr(curr_beg,i-curr_beg+1));
                            current.body.push(_temp);
                            fetched = true;
                        }
                        level.close--;
                        level.open--;
                break;
            }
        }
        // Check Sum
        if( !fetched || !current.body.length ){
            current.body = str;
        }
    }
    return current;
}



module.exports = {
    Tokenizer:Tokenize,
    Parentizer:Parentizer
};