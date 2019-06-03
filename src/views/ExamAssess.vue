<template>
  <div class="exama-ssess">
    <PageWithTab>
      <van-list />
    </PageWithTab>
  </div>
</template>
<script>
// @ is an alias to /src
import { createNamespacedHelpers } from "vuex";
import PageWithTab from "@/components/PageWithTab.vue";
import { List } from "vant";

const { mapActions, mapState } = createNamespacedHelpers("examAssess");

export default {
  name: "exama-ssess",
  components: {
    PageWithTab,
    "van-list": List
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState(["list", "loading", "finished"])
  },
  methods: {
    ...mapActions(["getList"])
  }
};
</script>
