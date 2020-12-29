class CarouselService{
    
    constructor(increment, lastIndex){
        this.index = 0
        this.incr = increment
        this.lastIndex = lastIndex
    }

    getShow(list){
        return list.slice(this.index, this.index+this.incr)
    }

    getNext(list){
        this.index = this.index===this.lastIndex-this.incr? 0: this.index+this.incr
        return list.slice(this.index, this.index+this.incr)
    }

    getPrev(list){
        this.index = this.index===0? this.lastIndex-this.incr: this.index-this.incr
        return list.slice(this.index, this.index+this.incr)
    }
}

export default CarouselService