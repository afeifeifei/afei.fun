<template>
  <div id="Kitty" ref="Kitty">
  </div>
</template>

<script>
export default {
  name: "kitty",
  data() {
    return {
      time: 0
    }
  },
  mounted() {
    let kittyFn = e => {
      if (new Date - this.time < 200) return
      this.time = new Date;
      let x = e.clientX - 8,
        y = e.clientY - 8;
      let kitty = document.createElement("div");
      kitty.className = "kitty";
      kitty.style.cssText = `top:${y}px;left:${x}px`;
      this.$refs.Kitty.appendChild(kitty);
      kitty.addEventListener("animationend", function () {
        this.parentNode && this.parentNode.removeChild(this);
        kitty = null;
      })
    }
    document.addEventListener("mousemove", kittyFn);
    document.addEventListener("click", kittyFn);
  }
}
</script>

<style lang="less" scoped>
/deep/ .kitty {
  position: fixed;
  z-index: 999999;
  width: 17px;
  height: 16px;
  background: url("/img/kitty.png");
  animation: move 1s linear 1;
  animation-fill-mode: forwards;
  pointer-events: none;
}

@keyframes move {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50%{
    transform: translateY(-100%);
    opacity: 1;
  }
  100% {
    transform: translateY(-200%);
    opacity: .5;
  }
}
</style>














