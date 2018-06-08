<template>
    <div class="helper">
        <span class="left">{{unFinishedTodoLength}} items left</span>
        <span class="tabs">
            <!-- v-for 循环 设置key可以一定程度节约资源，此处直接使用其内容作为key
                :class="[state,filter === state ? 'actived' :'']" 根据标识 filter 是否等于 state 判断是否增加actived属性
                 @click="toggleFilter(state)"   增加单机事件，toggleFilter事件申明，并传入参数
            -->
            <span 
                v-for="state in states"
                :key="state"
                :class="[state,filter === state ? 'actived' :'']"
                @click="toggleFilter(state)"
            >
                {{state}}
            </span>
        </span>
        <span class="clear" @click="clearAllCompleted()">
            Clear completed
        </span>
    </div>
</template>
<script>
export default {
    props:{
        //filter 是从todo.vue中传入的参数，所以需要在本页面进行申明
        filter:{
            type:String,
            //判断是否必传
            required:true,
        },
      todos: {
           type:Array,
           required: true,
      }
    },
    //计算属性，每次有新的数据时，都会进行计算
    computed:{
        //返回没有结束的数据条数，页面中可以直接进行使用 {{unFinishedTodoLength}}
        unFinishedTodoLength(){   //计算left的items的长度
            //判断还没有被结束的事项条数
            return(this.todos.filter(todo => !todo.completed).length) 
        }
    },
  data(){
      return {
          states:['all','active','completed']
      }
  },
  methods:{
      toggleFilter(state){ 
          this.$emit('toggle',state)
        },
      clearAllCompleted(){
         this.$emit('clearAll')
      }
  }
}
</script>
<style lang="stylus" scoped>
.helper{
    font-weight 100
    display flex
    justify-content space-between
    padding 5px 0
    line-height 30px
    background-color #ffffff
    font-size 14px
    font-smoothing:antialiased;
}
.left,.clear,.tabs{
    padding 0px 10px
    box-sizing border-box
}
.left,.clear{
    width 150px
}
.left{
    text-align left 
}
.clear {
    text-align:right
    cursor pointer
}
.tabs{
    width 200px
    display flex
    justify-content space-around
    *{
        display inline-block
        padding 0px 10px
        cursor pointer
        border 1px solid rgba(175,47,47,0)
        &.actived{
            border-color rgba(175,47,47,0.4) 
            border-radius 5px
        }
    }
}
</style>