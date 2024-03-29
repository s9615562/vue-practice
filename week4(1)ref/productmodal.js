//1.先把元件環境建立好
//2.把版型加入
//3.截除版型內錯誤
//4.refs bootstrap


export default{
    data(){
        return{
            myModel : null,
        }        
    },
    props:['tempproduct','updateProduct','isNew'],
    mounted(){
        let addmodelBtn = document.querySelector('#productModal')
        this.myModel = new bootstrap.Modal(addmodelBtn) //實體化
        
    },
    methods:{
        openmodal(){
            this.myModel.show()
        },
        closemodal(){
            this.myModel.hide()
        },
        createImages(){
            this.tempproduct.imagesUrl =[];
        }
    },
    template:`<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModelLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imgUrl" class="form-label">主要圖片</label>
                  <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempproduct.imageUrl">
                  <img class="img-fluid" :src="tempproduct.imageUrl">
                </div> 
              </div>

              <div>
                <h4>多圖設置</h4>                    
                <div v-if="Array.isArray(tempproduct.imagesUrl)">
                  <div v-for="(img,key) in tempproduct.imagesUrl" :key="key">
                    <img :src="img" alt="" class="img-fluid">
                    <input type="text" class="form-control" v-model="tempproduct.imagesUrl[key]">
                  </div>
                  <button class="btn" 
                    v-if="
                    tempproduct.imagesUrl.length === 0 ||
                    tempproduct.imagesUrl[tempproduct.imagesUrl.length - 1]
                    "
                    @click="tempproduct.imagesUrl.push('')">新增</button>
                  <button class="btn" 
                  @click="tempproduct.imagesUrl.pop()">刪除</button>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">
                    新增圖片
                  </button>
                </div>
              </div>                
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempproduct.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control"
                         placeholder="請輸入分類" v-model="tempproduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempproduct.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tempproduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control"
                         placeholder="請輸入售價" v-model.number="tempproduct.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入產品描述">
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control"
                          placeholder="請輸入說明內容">
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox"
                         :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled" v-modal="tempproduct.is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" v-on:click="updateProduct()">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>`
}