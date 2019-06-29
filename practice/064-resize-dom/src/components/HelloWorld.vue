<template>
  <div class="container" id="main">
    <div class="resize-element">改变大小试试</div>
    <div class="resize-record">触发了{{firedNum}}次resize事件。</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      observer: null,
      firedNum: 0,
      recordOldValue: {
        // 记录下旧的宽高数据，避免重复触发回调函数
        width: "0",
        height: "0"
      }
    };
  },
  mounted() {
    let MutationObserver =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    let element = document.querySelector(".resize-element");
    this.observer = new MutationObserver(mutationList => {
      for (let mutation of mutationList) {
        console.log(mutation);
      }
      let width = getComputedStyle(element).getPropertyValue("width");
      let height = getComputedStyle(element).getPropertyValue("height");
      if (
        width === this.recordOldValue.width &&
        height === this.recordOldValue.height
      )
        return;
      this.recordOldValue = {
        width,
        height
      };
      this.firedNum += 1;
    });
    this.observer.observe(element, {
      attributes: true,
      attributeFilter: ["style"],
      attributeOldValue: true
    });
  },
  beforeDestroyed() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer.takeRecords();
      this.observer = null;
    }
  }
};
</script>


<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.resize-element {
  position: absolute;
  top: 4rem;
  left: 50%;
  height: 10rem;
  width: 70%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  resize: both;
  /*用户可以调节元素的宽度和高度*/
  display: block;
  box-shadow: 0 0 1px 1px #3361d8;
  border-radius: 2px;
}
</style>
