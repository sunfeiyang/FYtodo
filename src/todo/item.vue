<template>
  <!-- class的动态写法，其中 todo-item为固定的，todo.completed ? 'completed' :'' 后面的是根据todo.completed的状态来判断是否有completed-->
  <div :class="['todo-item',todo.completed ? 'completed' :'' ]">
      <input 
      type="checkbox"
      class="toggle"
      v-model="todo.completed"
      >
      <label> {{todo.content}}</label>
      <button class="destroy" @click="deletetodo"> </button>
  </div>
</template>
<script>
export default {
  props: {
      todo: {
          type: Object,
          required: true
      }
  },
  methods : {
      deletetodo(){
        //使用this.$emit触发一个事件，触发事件名以及传入的参数   父组件就可以监听子组件触发的事件  在父组件中对子组件进行监听
          this.$emit("del",this.todo.id);
      }
  }
}
</script>
<style lang="stylus" scoped>
.todo-item  
  position relative
  background #ffffff
  font-size 24px
  border-bottom 1px solid rgba(0,0,0,.06)
  &:hover
    .destroy:after {
         content: 'x'
    }
     
  label  
    white-space pre-line
    word-break break-all
    padding 15px 60px 15px 15px
    margin-left 45px
    display block 
    line-height 1.2
    transition color 0.4s
&.completed{
    label 
    color #d9d9d9
    text-decoration line-through
}
.toggle{
  text-align center 
  width 400px
  height 40px
  position absolute
  top 0
  bottom 0
  margin auto 0
  border none 
  outline none 
  appearance none
}
  .toggle:before{
    content:url('../assets/images/todo.png') 
    position absolute
    left 22px
    top 10px
    cursor pointer
  }
  .toggle:checked:before{
    content : url('../assets/images/done.png') 
    position absolute
    left 22px
    top 10px
    cursor pointer
  }
.destroy
  position absolute
  top 50%
  right 10px
  bottom 0;
  width 40px
  height 40px
  margin auto 0;
  font-size 30px
  color #cc9a9a;
  margin-bottom 11px
  transition: color 0.2s east-out
  background-color transparent
  appearance none
  border-width 0
  cursor pointer
  outline none
</style>