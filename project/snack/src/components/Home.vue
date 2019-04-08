 <template>
  <div class="home">
    <div class="card-list carousel">
      <div class="container">
        <el-carousel :interval="1000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <img src="http://dummyimage.com/400x200" alt>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="card-list new-product">
      <div class="container">
        <div><h3>新品</h3></div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(it, index) in 4" :key="index">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <img src="http://dummyimage.com/100x100" class="image">
              <div style="padding: 14px;">
                <span>{{it}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card-list cat-product">
      <div class="container">
        <div><h3>辣条</h3></div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(it, index) in 4" :key="index">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <img src="http://dummyimage.com/100x100" class="image">
              <div style="padding: 14px;">
                <span>{{it}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card-list cat-product">
      <div class="container">
        <div><h3>甜食</h3></div>
        <el-row :gutter="20">
          <el-col class="card" :span="6" v-for="(it, index) in 7" :key="index">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <img src="http://dummyimage.com/100x100" class="image">
              <div style="padding: 14px;">
                <span>{{it}}</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
export default {};
</script>

<style>
.card-list {
  margin-bottom: 2rem;
}

.card {
  margin-bottom: 1rem;
}
</style>


