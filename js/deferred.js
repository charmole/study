Deferred  = function (canceller){
    this.chain = [];
    this.id = setTimeout("1"); //用于生成不同ID，
    this.fired = -1; //未触发
    this.paused = 0; //暂停
    this.results = [null,null];
    this.canceller = canceller;
    this.silentlyCancelled = false;//是否被取消
    this.chained = false; //
}

function curry(fn, scope, args){
    return function(){
        var argv = [].concat.apply(args , arguments)
        return fn.apply(scope , args);
    }
}

Deferred.prototype = {
    status : function(){
        if(this.fired == -1){
            return 'unfired';
        }else if(this.fired === 0){
            return 'success';
        }else{
            return 'error';
        }
    },
    cancle : function(e){
        if(this.fired == -1){
            if(this.canceller){
                this.canceller(this);
            }else{
                this.silentlyCancelled =  true;
            }
            if(!(e instanceof Error)){ //判断e是否是Error的实例
                e = new Error(e + "");
            }
            this.errback(e);
        }else if((this.fired == 0) && (this.results[0] instanceof Deferred)){
            this.results[0].cancle(e);
        }

    }，
    //这里决定用哪个队列
    
}