<template>
  <div>
    <el-container>
      <el-main>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="selectMenu">
          <el-menu-item index="1">美好一天</el-menu-item>
          <el-menu-item index="2">鸭子喝水</el-menu-item>
        </el-menu>
        <wonderful-day v-show="activeIndex === '1'" />
        <drink-water v-show="activeIndex === '2'" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import wonderfulDay from './components/wonderfulDay.vue';
import drinkWater from './components/drinkWater.vue';

export default {
  name: 'App',
  components: {
    wonderfulDay,
    drinkWater,
  },
  data() {
    return {
      activeIndex: '1',
    }
  },
  created() {
    chrome.storage.sync.get('list', (obj) => {
      this.list = obj['list']
    })
  },
  methods: {
    selectMenu(index) {
      this.activeIndex = index;
    }
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
body {
  margin: 0;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
}

.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 5px !important;
}
</style>
