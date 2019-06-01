<template>
  <div class="learning-tasks">
    <PageWithTab>这里是学习任务</PageWithTab>
  </div>
</template>
<script>
// @ is an alias to /src
import PageWithTab from "@/components/PageWithTab.vue";

export default {
  name: "learning-tasks",
  components: {
    PageWithTab
  }
};
</script>
