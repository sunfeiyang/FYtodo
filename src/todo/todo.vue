<template>
    <section class="real-app">
        <!-- 
        autofocus 进入后自动选中 
        placeholder  水印类似字体
        @keyup @ + 事件名称  监听事件   等同于 vue的指令  v-on:keyup === @keyup
        .enter  点击回车后执行
        -->
        <input 
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来做什么"
            @keyup.enter="addTodo"
        >
         <!-- 
            @del  使用监听原生方法的事件，监听子组件是否触发事件  然后父组件写自己的方法 进行相应的操作
        -->
        <Item 
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />
        <Tabs 
            :filter="filter" 
            :todos="todos"
            @toggle="toggleFilter"
            @clearAll="clearAllCompleted"
        />
    </section>   
</template>
<script>
//引入axios 使用axios对象操作数据
import Vue from 'vue';
import axios from 'axios';
Vue.prototype.axios = axios;
import Item from './item.vue'
import Tabs from './tabs.vue'
//设置id 从零开始
let id = 0
let usercode = "sunfy"
export default {
    data() {
        return {
            todos:[],
            filter:"all"
        }
    },
    components: {
        Item,
        Tabs
    },
    //计算函数  计算所有的todos
    computed:{
        filteredTodos(){
            if (this.filter === 'all'){
                return this.todos
            }
            //判断filter是否等于 completed 相同则为true
            const completed = this.filter === 'completed'
            //返回通过 completed 过滤后的todos 列表
            return this.todos.filter(todo => completed ===todo.completed)
        },
    },
    //现在是固定值 --》todo
    //页面初始化时加载
    mounted:function(sunfy) {
        //console.log("usercode---"+usercode)
        return this.getEventList(usercode)
    },
    methods: {
        addTodo(e){

            // console.log("开始发动get请求---");
            // //发起一个user请求，参数为给定的ID
            // this.axios({
            //     url:"/api/eventList/sunfy",
            //     method:'get'
            // })
            // .then(function(res){
            //     console.log("get请求成功---");
            //     console.log(res);
            // })
            // .catch(function(err){
            //     console.log(err);
            // })
            // console.log("get请求结束---");

            //post请求
            // let param = new URLSearchParams();//使用URLSearchParams传参数  
            //   param.append("content", "测试数据11111");
            //   axios.post('/api/newEvent',param) 
            //   .then(function (response) { 
            //     console.log("post请求成功---"); 
            //     console.log(response);  
            //   })  
            //   .catch(function (error) {  
            //     console.log(error);  
            //   });  

            if(e.target.value==''){
                alert("你什么都没有添加哦")
            }
            else{
                //向todo数据中插入数据，unshift表示插入首行数据
                this.todos.unshift({
                    id:id++,
                    content: e.target.value.trim(),
                    //是否结束的状态，默认为false
                    completed:false,
                }),
                //在methods的一个方法中执行另一个方法---此处用来发送post请求，将数据写入数据库
                this.$options.methods.postNewEvent(e.target.value.trim()),
                //数据处理过后，将输入框置空
                e.target.value =''
                
            }
            
        },
        deleteTodo(id){
            //  console.log(todo => todo.id ===id);
            //进行判断，this.todos.findIndex(todo => todo.id ===id) 循环遍历所有id，当等于传入的id时，使用splice 删除一个节点
            //常用的函数嵌套式的写法
            this.todos.splice(this.todos.findIndex(todo => todo.id ===id),1)
        },
        toggleFilter(state){
            //将点击的state设置为选中状态
            this.filter =state
        },
        clearAllCompleted(){
            //给todos赋新值，completed 等于false 既还没有完成的事项
            this.todos = this.todos.filter(todo => !todo.completed)
            
        },
        //发送post请求，将数据写入数据库
        postNewEvent(value){
            let param = new URLSearchParams();//使用URLSearchParams传参数 
            param.append("content", value);
            axios.post('/api/newEvent',param) 
            .then(function (response) { 
                console.log("post请求成功"); 
                //console.log(response);  
                //console.log(response.data); 
                //console.log("--code--"+response.data.code+"--msg--"+response.data.msg);   
                //console.log(response.data.data.content); 
                if (response.data.code == 1) {
                    alert("事项：“ "+response.data.data.content+" ” 新增成功！");
                }
            })  
            .catch(function (error) {  
                console.log(error);  
            });
        },
        //发送get请求，将数据写入数据库
        getEventList(usercode){
            this.axios({
                url:"/api/eventList/"+usercode,
                method:'get'
            })
            .then(function(res){
                console.log("get请求成功");
                //console.log(res);
                //console.log(res.data.data);
                if(res.data.data.length>0){
                    for (let i = res.data.data.length-1; i >=res.data.data.length-2; i--) {
                        let element = res.data.data[i];
                        //let jsonObject=JSON.parse(element);
                        //console.log("json="+element);
                        //console.log(element.id);
                        this.todos.unshift({
                            id:element.id,
                            content: element.content,
                            //是否结束的状态，默认为false
                            completed:false,
                        })
                    }
                }
                
                return res.data.data
            })
            .catch(function(err){
                console.log(err);
            })
        }
    },
}
</script>
<style lang="stylus" scoped>
.real-app{
    width 600px
    margin :0px  auto
    box-shadow :0px 0px 5px #666
}
.add-input{
    positon:relative;
    margin 0px
    width 100%
    font-size 24px
    font-family  inherit 
    font-weight:inherit
    line-height 1.4rem
    border 0;
    outline none 
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing:antialiased;
    padding 16px 16px 16px 60px
    border none  
}
</style>