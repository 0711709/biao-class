 <template>
  <div class="home">
    <SearchNav/>
    <div class="card-list carousel" v-loading="loading">
      <div class="container">
        <el-carousel :interval="3000" height="375px">
          <el-carousel-item v-for="(item, index) in mainImg" :key="index">
            <img :src="item.url" alt>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="card-list cat-product" v-loading="loadingNew" :class="loadingNew? 'height': ''">
      <div class="container">
        <div class="head">
          <span class="title">每日新品</span>
          <span class="desc">每日更新, 惊喜不断</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(it, index) in listNew" :key="index">
            <router-link :to="'/product/' + it.id">
              <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="it.main_img[0].url" class="image">
                <div style="padding: 14px;" class="text-center content">
                  <div class="title" :title="it.title">{{it.title | cutTitle}}</div>
                  <div class="desc" :title="it.desc">{{it.desc | cut}}</div>
                  <div class="price">
                    <span class="rmb">{{it.price}}</span>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card-list cat-product" v-loading="loadingHot" :class="loadingHot? 'height': ''">
      <div class="container">
        <div class="head">
          <span class="title">热门</span>
          <span class="desc">感动人心 价格厚道</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(it, index) in listHot" :key="index">
            <router-link :to="'/product/' + it.id">
              <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="it.main_img[0].url" class="image">
                <div style="padding: 14px;" class="text-center content">
                  <div class="title" :title="it.title">{{it.title | cutTitle}}</div>
                  <div class="desc" :title="it.desc">{{it.desc | cut}}</div>
                  <div class="price">
                    <span class="rmb">{{it.price}}</span>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card-list cat-product" v-loading="loadingMeat" :class="loadingMeat? 'height': ''">
      <div class="container">
        <div class="head">
          <span class="title">肉类小吃</span>
          <span class="desc">便携美味, 解馋小食</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(it, index) in listMeat" :key="index">
            <router-link :to="'/product/' + it.id">
              <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="it.main_img[0].url" class="image">
                <div style="padding: 14px;" class="text-center content">
                  <div class="title" :title="it.title">{{it.title | cutTitle}}</div>
                  <div class="desc" :title="it.desc">{{it.desc | cut}}</div>
                  <div class="price">
                    <span class="rmb">{{it.price}}</span>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card-list cat-product" v-loading="loadingNut" :class="loadingNut? 'height': ''">
      <div class="container">
        <div class="head">
          <span class="title">坚果小吃</span>
          <span class="desc">小果仁, 大能量</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(it, index) in listNut" :key="index">
            <router-link :to="'/product/' + it.id">
              <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="it.main_img[0].url" class="image">
                <div style="padding: 14px;" class="text-center content">
                  <div class="title" :title="it.title">{{it.title | cutTitle}}</div>
                  <div class="desc" :title="it.desc">{{it.desc | cut}}</div>
                  <div class="price">
                    <span class="rmb">{{it.price}}</span>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card-list cat-product" v-loading="loadingDrink" :class="loadingDrink? 'height': ''">
      <div class="container">
        <div class="head">
          <span class="title">冲饮乳品</span>
          <span class="desc">每天一杯, 健康一生</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(it, index) in listDrink" :key="index">
            <router-link :to="'/product/' + it.id">
              <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
                <img :src="it.main_img[0].url" class="image">
                <div style="padding: 14px;" class="text-center content">
                  <div class="title" :title="it.title">{{it.title | cutTitle}}</div>
                  <div class="desc" :title="it.desc">{{it.desc | cut}}</div>
                  <div class="price">
                    <span class="rmb">{{it.price}}</span>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>


<script>
import SearchNav from "./Self/SearchNav";
import api from "../lib/api";

export default {
  components: { SearchNav },
  data() {
    return {
      listNew: [],
      listHot: [],
      listMeat: [],
      listNut: [],
      listDrink: [],
      mainImg: [],
      loading: true,
      loadingNew: true,
      loadingHot: true,
      loadingMeat: true,
      loadingNut: true,
      loadingDrink: true
    };
  },

  mounted() {
    this.readAll();
    this.readMainImg();
  },

  methods: {
    read(list, params, load) {
      api("product/read", params).then(r => {
        if (r.success) {
          this[list] = r.data;
          this[load] = false;
        }
      });
    },

    readAll() {
      this.read("listNew", { where: { and: { is_new: true } } }, "loadingNew");
      this.read("listHot", { where: { and: { is_hot: true } } }, "loadingHot");
      this.read("listMeat", { where: { and: { cat_id: 7 } } }, "loadingMeat");
      this.read("listNut", { where: { and: { cat_id: 3 } } }, "loadingNut");
      this.read("listDrink", { where: { and: { cat_id: 8 } } }, "loadingDrink");
    },

    readMainImg() {
      api("product/find", { id: 17 }).then(r => {
        if (r.success) {
          this.mainImg = r.data.detail;
          this.loading = false;
        }
      });
    }
  },

  filters: {
    cutTitle(value) {
      return value.length < 10 ? value : value.substring(0, 10);
    },

    cut(value) {
      return value.length < 15 ? value : value.substring(0, 14) + "...";
    }
  }
};
</script>

<style>
.height {
  height: 332px;
}

.card-list {
  margin-bottom: 2rem;
}

.card-list .image {
  width: 206px;
  height: 206px;
}

.card-list.cat-product .head {
  margin: 1rem 0;
}

.card-list.cat-product .head .title {
  display: inline-block;
  margin-right: 0.7rem;
  font-weight: 500;
  font-size: 150%;
}

.card-list.cat-product .head .desc {
  font-size: 90%;
  color: rgba(0, 0, 0, 0.6);
}

.card-list.cat-product .card .content > * {
  margin-bottom: 1rem;
}

.card-list.cat-product .card .title {
  font-size: 105%;
  color: #333;
}

.card-list.cat-product .card .desc {
  font-size: 70%;
  color: rgba(0, 0, 0, 0.6);
}

.card-list.cat-product .card .price {
  color: #e10;
}
</style>


