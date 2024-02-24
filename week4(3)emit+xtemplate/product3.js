import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js'

    const app = createApp({
        data(){
            return{                            
                products:[],
                tempProduct:{
                    imagesUrl : [],
                },
                sum : 0,   
                url:'https://ec-course-api.hexschool.io/v2/',
                path : 's9615562',
                isNew : false,
                myModel : null,
                delmyModel : null,
            }
        },
        methods:{
            check(){
                //取出token
                const token = document.cookie.replace(/(?:(?:^|.*;\s*)practiceToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
                axios.defaults.headers.common['Authorization'] = token;

                axios.post(`${this.url}api/user/check`)
                .then((res) =>{
                // console.log(res)                 
                this.getProducts()              
                })
                .catch((err) => {
                console.log(err)
                alert(err.data.message)
                window.location = 'signin3.html'
                })
            },
            getProducts(){
                axios.get(`${this.url}api/${this.path}/admin/products`)
                .then((res) =>{
                console.log(res)
                this.products = res.data.products
                
                })
                .catch((err) => {
                console.dir(err)
                })
            },           
            openmodal(status,item){
                 
                if(status == 'new'){
                    this.myModel.show();
                    this.tempProduct = {imgsUrl : []};
                    this.isNew = true;
                }else if(status == 'edit'){
                    this.myModel.show();
                    this.tempProduct = {...item}
                    this.isNew = false;
                }else if(status == 'delete'){
                    this.delmyModel.show();
                    this.tempProduct = {...item}
                    this.isNew = 'delete';
                }
            },
            
                
        },
                               
        mounted() {
            this.check()
            let addmodelBtn = document.querySelector('#productModal')
            this.myModel = new bootstrap.Modal(addmodelBtn) //實體化
            let deletemodelBtn = document.querySelector('#delProductModal')
            this.delmyModel = new bootstrap.Modal(deletemodelBtn)//實體化
        },
        
    })


    app.component('productModal',{
        template:'#productModal',
        data() {
            return {
              apiUrl: 'https://vue3-course-api.hexschool.io/v2',
              apiPath: 's9615562',
            };
          },
        methods:{
            updateProduct(){
                let apiUrl = `${this.url}api/${this.path}/admin/product`
                let method = 'post'
                
                if(!this.isNew){
                    apiUrl = `${this.url}api/${this.path}/admin/product/${this.tempProduct.id}`
                    method = 'put'              
                }else if(this.isNew == 'delete'){
                    apiUrl = `${this.url}api/${this.path}/admin/product/${this.tempProduct.id}`
                    method = 'delete'               
                }
                axios[method](apiUrl, { data: this.tempProduct })
                .then((res) =>{
                    // console.log(res)
                    if(this.myModel){
                        this.myModel.hide()
                    } 
                    if(this.delmyModel){
                        this.delmyModel.hide()
                    }
                    this.getProducts()
                })
                .catch((err) => {
                    console.log(err.data.message)
                    alert(err.data.message)                
                })
            },
            createImages(){
                this.tempProduct.imagesUrl =[];
            }
        }
    })

    app.mount('#app');

