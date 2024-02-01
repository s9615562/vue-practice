import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.1/vue.esm-browser.min.js'
import pagination from './pagination.js'
import productmodal from './productmodal.js';
import delproductmodal from './delproductmodal.js'

export default function createVueApp() {
    return createApp({
        data(){
            return{                            
                products:[],
                pagination : {},
                tempproduct:{
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
                alert(err.response.data.message)
                window.location = 'signin3.html'
                })
            },
            getproducts(page=1){ //參數預設值
                axios.get(`${this.url}api/${this.path}/admin/products?page=${page}`)
                .then((res) =>{
                console.log(res)
                this.products = res.data.products
                this.pagination = res.data.pagination
                // console.log(this.products)
                // console.log(this.pagination)
                })
                .catch((err) => {
                console.dir(err)
                })
            },           
            openmodal(status,item){
                 
                if(status == 'new'){
                    // this.myModel.show();
                    this.$refs.pmodal.openmodal()
                    this.tempproduct = {imgsUrl : []};
                    this.isNew = true;
                }else if(status == 'edit'){
                    // this.myModel.show();
                    this.$refs.pmodal.openmodal()
                    this.tempproduct = {...item}
                    this.isNew = false;
                }else if(status == 'delete'){
                    // this.delmyModel.show();
                    this.$refs.dpmodal.openmodal()
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
                // console.log(apiUrl)
                // console.log(method)
                axios[method](apiUrl, { data: this.tempproduct })
                // console.log(apiUrl)
                // console.log({ data: this.tempproduct })
                .then((res) =>{
                    // console.log(res)
                    if(this.isNew || !this.isNew){
                        // this.myModel.hide()
                        this.$refs.pmodal.closemodal()
                    } 
                    if(this.isNew == 'delete'){
                        this.$refs.dpmodal.closemodal()
                    }
                    this.getproducts()
                })
                .catch((err) => {
                console.log(err)
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
        
    }).mount('#app');}
