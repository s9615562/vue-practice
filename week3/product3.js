import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js'

export default function createVueApp() {
    return createApp({
        data(){
            return{                            
                products:[],
                tempproduct:{
                    imgsUrl : [],
                },
                sum : 0,   
                url:'https://ec-course-api.hexschool.io/v2/',
                path : 's9615562',
                isNew : false,
                myModel : null,
                delmyModel : null
            }
        },
        methods:{
            check(){
                //取出token
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)practiceToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
                axios.defaults.headers.common['Authorization'] = token;
                // console.log('token',token)

                axios.post(`${this.url}api/user/check`)
                .then((res) =>{
                // console.log(res)                 
                this.getproducts()              
                })
                .catch((err) => {
                console.log(err)
                alert(err.response.data.message)
                window.location = 'signin3.html'
                })
            },
            getproducts(){
                axios.get(`${this.url}api/${this.path}/admin/products`)
                .then((res) =>{
                // console.log(res)
                this.products = res.data.products
                
                })
                .catch((err) => {
                console.dir(err)
                })
            },           
            openmodal(status,item){
                 
                if(status == 'new'){
                    this.myModel.show();
                    this.tempproduct = {imgsUrl : []};
                    this.isNew = true;
                }else if(status == 'edit'){
                    this.myModel.show();
                    this.tempproduct = {...item}
                    this.isNew = false;
                }else if(status == 'delete'){
                    this.delmyModel.show();
                    this.tempproduct = {...item}
                    this.isNew = 'delete';
                }
            },
            updateProduct(){
                let apiUrl = `${this.url}api/${this.path}/admin/product`
                let method = 'post'
                
                if(!this.isNew){
                    apiUrl = `${this.url}api/${this.path}/admin/product/${this.tempproduct.id}`
                    method = 'put'              
                }else if(this.isNew == 'delete'){
                    apiUrl = `${this.url}api/${this.path}/admin/product/${this.tempproduct.id}`
                    method = 'delete'               
                }else if(this.isNew){
                    // console.log(this.tempproduct)
                    apiUrl = `${this.url}api/${this.path}/admin/product`
                    method = 'post'               
                } 
                
                axios[method](apiUrl,this.tempproduct)
                .then((res) =>{
                    // console.log(res)
                    if(this.myModel){
                        this.myModel.hide()
                    } 
                    if(this.delmyModel){
                        this.delmyModel.hide()
                    }
                    this.getproducts()
                })
                .catch((err) => {
                console.log(err)
                })
                },
                createImages(){
                    this.tempproduct.imagesUrl =[];
                }
        },
                               
        mounted() {
            this.check()
            let addmodelBtn = document.querySelector('#productModal')
            this.myModel = new bootstrap.Modal(addmodelBtn) //實體化
            let deletemodelBtn = document.querySelector('#delProductModal')
            this.delmyModel = new bootstrap.Modal(deletemodelBtn)//實體化
        },
        
    }).mount('#app');}
