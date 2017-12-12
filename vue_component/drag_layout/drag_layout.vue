<style lang="scss" scoped>
@mixin h($v) {
    height: $v;
    line-height: $v;
}


.idrag_box {    
    margin: 5px;
    width: 250px;    
    border: 1px solid #ddd;
    border-radius: 3px;    
    transition: all .25s;
    -webkit-tap-highlight-color: transparent;

    $v: 30px;
    .idrag_title {
        @include h($v);
        border-bottom: 1px solid #ddd;
        background: #eee;
        user-select: none;
        cursor: move;

        h3 {
            float: left;
            margin: 0;
            padding-left: 10px;
            font-weight: normal;
            font-size: 14px;
        }
        span {
            float: right;
            padding: 0 10px;
            cursor: pointer;
        }
    }
    .idrag_content {
        padding: 10px;
        background: #fff;
    }
}
.dragStatus {
    transition: none;
}
.empty {
    border: 1px dashed #ddd;
    overflow: hidden;
}
</style>

<template>
    <div class="idrag_parent" ref="idrag_parent">
    
        <div v-for="(item, index) in arr" class="idrag_box" :class="{'empty': item == null, 'dragStatus': index == temp &&dragStatus}" ref="idrag_box">
            <div class="idrag_title" @mousedown="downFn($event, index)" @touchstart="downFn($event, index)">
                <h3>{{item.name}} </h3>
                <span @click="downMove(index)">{{index == arr.length - 1 ? "&nbsp;" : "↓"}}</span>
                <span @click="upMove(index)">{{index == 0 ? "&nbsp;" : "↑"}}</span>
            </div>
            <div class="idrag_content"></div>
        </div>
    
        <div v-show="targetElement" ref="empty" class="idrag_box empty"></div>
    
    </div>
</template>

<script>

export default {
    data() {
        return {
            arr: [
                { name: "a111" },
                { name: "b222" },
                { name: "c333" },
                { name: "d444" },
                { name: "e555" },
                { name: "f666" }
            ],
            dragStatus: false,
            ax: 0,
            ay: 0,
            x: 0,
            y: 0,
            _x: 0,
            _y: 0,
            xMax: 0,
            yMax: 0,
            targetElement: false,
            index: "",
            temp: "",
            empty: "",
            dir: 0
        }
    },
    methods: {
        offset(obj) {
            let ele = obj,
                left = ele.offsetLeft,
                top = ele.offsetTop

            while (ele.offsetParent && ele.offsetParent.tagName.toLowerCase() != "body") {
                ele = ele.offsetParent
                left += ele.offsetLeft
                top += ele.offsetTop
            }

            return { left, top }
        },
        upMove(index) {
            if (index == 0) return
            this.upToggle(index)
        },
        downMove(index) {
            if (index == this.arr.length - 1) return
            this.downToggle(index)
        },
        upToggle(ind) {
            this.toggle(ind, ind - 1)
        },
        downToggle(ind) {
            this.toggle(ind, ind + 1)
        },
        toggle(ind, num) {
            let temp = this.arr[ind]
            this.arr.splice(ind, 1)
            this.arr.splice(num, 0, temp)
        },
        downFn(e, index) {
            try{
            let _e = e
            if (_e.targetTouches) {
                _e = _e.targetTouches[0]
            }
            if (e.currentTarget != e.target) return
            this.targetElement = e.currentTarget.parentNode
            if (this.targetElement.className != "idrag_box") return
            let _offset = this.offset(this.targetElement)

            this.targetElement.style.position = "fixed"
            this.dragStatus = true
            this.ax = _offset.left
            this.ay = _offset.top
            this._x = _e.pageX - _offset.left
            this._y = _e.pageY - _offset.top
            this.targetElement.style.left = _offset.left + "px"
            this.targetElement.style.top = _offset.top + "px"
            this.index = this.temp = index
            this.empty = this.$refs.empty
            this.empty.style.height = this.targetElement.offsetHeight - 2 + "px"
            this.$refs.idrag_parent.insertBefore(this.empty, this.$refs.idrag_box[index])
            this.calcWH()
            }catch(e) {
                console.log(e)
            }
        },
        calcWH() {
            let idrag_box = this.targetElement

            this.xMax = window.innerWidth - idrag_box.offsetWidth
            this.yMax = window.innerHeight - idrag_box.offsetHeight
        }
    },
    mounted() {
        let doc = document,
            mobile = window.navigator.userAgent.match(/(iPhone|iPod|Android|iOS)/i) ? true : false,
            _move = mobile ? "touchmove" : "mousemove",
            _end = mobile ? "touchend" : "mouseup"

        doc.addEventListener(_move, e => {
            let _e = e
            if (!this.dragStatus) return
            if (e.targetTouches) {
                e.preventDefault()
                _e = e.targetTouches[0]
            }
            let x = _e.pageX - this._x
            let y = _e.pageY - this._y

            x = Math.min(x, this.xMax)
            y = Math.min(y, this.yMax)

            if (x < 0) x = 0
            if (y < 0) y = 0

            this.dir = y - this.y

            this.x = x
            this.y = y


            this.$refs.idrag_box.forEach((t, i) => {
                let _offset = this.offset(t)

                if (this.targetElement != t) {
                    if (this.x >= _offset.left && this.x <= _offset.left + t.offsetWidth && this.y >= _offset.top && this.y <= _offset.top + t.offsetHeight) {
                        this.index = i
                        if (this.dir > 0) {
                            if (this.temp > i) {
                                this.index = i + 1
                            }
                            this.$refs.idrag_parent.insertBefore(this.empty, this.$refs.idrag_box[i + 1])
                        } else {
                            if (this.temp < i) {
                                this.index = i - 1
                            }
                            this.$refs.idrag_parent.insertBefore(this.empty, this.$refs.idrag_box[i])
                        }

                    }
                }
            })

            let _empty = this.offset(this.empty)

            if (this.ax >= _empty.left && this.ax <= _empty.left + this.empty.offsetWidth && this.ay >= _empty.top && this.ay <= _empty.top + this.empty.offsetHeight) {
                this.index = this.temp
            }
            this.targetElement.style.left = this.x + "px"
            this.targetElement.style.top = this.y + "px"

        }, false)

        let timer

        doc.addEventListener(_end, e => {
            this.dragStatus = false

            if (this.targetElement) {
                let _empty = this.offset(this.$refs.empty)

                this.targetElement.style.left = _empty.left + "px"
                this.targetElement.style.top = _empty.top - doc.body.scrollTop + "px"

                clearTimeout(timer)

                timer = setTimeout(() => {

                    this.targetElement.removeAttribute("style")
                    this.targetElement = false

                    //if (this.x == 0 || this.y == 0) return
                    //if (this.index != this.temp) {
                    this.toggle(this.temp, this.index)
                    //}

                }, 150)
            }
        }, false)

    }
}
</script>

