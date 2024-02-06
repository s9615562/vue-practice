import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js'
import pagination from './pagination.js'
import productmodal from './productmodal.js';
import delproductmodal from './delproductmodal.js'

    createApp({
        data(){
            return{                            
                products:[],
                pagination : {},
                tempProduct:{
                    imagesUrl : [],
                },  
                url:'https://ec-course-api.hexschool.io/v2/',
                path : 's9615562',
                isNew : false,
                // myModel : null,
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
                alert(err.data.message)
                window.location = 'signin3.html'
                })
            },
            getproducts(page=1){ //參數預設值
                axios.get(`${this.url}api/${this.path}/admin/products?page=${page}`)
                .then((res) =>{
                console.log(res)
                this.products = res.data.products
                this.pagination = res.data.pagination
                })
                .catch((err) => {
                console.dir(err)
                })
            },           
            openmodal(status,item){
                 
                if(status == 'new'){
                    // this.myModel.show();
                    this.$refs.pmodal.openmodal()
                    this.tempProduct = {imgsUrl : []};
                    this.isNew = true;
                }else if(status == 'edit'){
                    // this.myModel.show();
                    this.$refs.pmodal.openmodal()
                    this.tempProduct = {...item}
                    this.isNew = false;
                }else if(status == 'delete'){
                    // this.delmyModel.show();
                    this.$refs.dpmodal.openmodal()
                    this.tempProduct = {...item}
                    this.isNew = 'delete';
                }
            },
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
                    if(this.isNew || !this.isNew){
                        this.$refs.pmodal.closemodal()
                    } 
                    if(this.isNew == 'delete'){
                        this.$refs.dpmodal.closemodal()
                    }
                    this.getproducts()
                })
                .catch((err) => {
                console.log(err)
                alert(err.data.message)
                })
                },
                
        },
                               
        mounted() {
            this.check()
            
            
        },
        components:{
            pagination,
            productmodal,
            delproductmodal
        },
        
    }).mount('#app');
