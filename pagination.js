//1.先把元件環境建立好
//2.把版型加入
//3.截除版型內錯誤


export default{
    props:['pagination','getproducts'],
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{
        disabled: !pagination.has_pre
      }">
        <a class="page-link" href="#" aria-label="Previous"
        @click="getproducts(pagination.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      
      <li class="page-item" 
        :class="{
          active: page == pagination.current_page
        }"
        v-for="page in pagination.total_pages" :key="page">
        <a class="page-link" href="#"
        @click="getproducts(page)"
        >{{page}}</a>
      </li>
      
      <li class="page-item" :class="{
        disabled: !pagination.has_next
      }">
        <a class="page-link" href="#" aria-label="Next"
        @click="getproducts(pagination.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
}