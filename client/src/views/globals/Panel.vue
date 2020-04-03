<template>
  <v-card
    class="mx-auto"
    max-width="800"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{title}}</v-list-item-title>
        <v-list-item-subtitle>{{subtitle}}</v-list-item-subtitle>
        <v-btn
          v-if="title=='Songs'"
          absolute
          fab
          bottom
          right
          dark
          color="red"
          to="/songs/create"
        ><v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
          v-else-if="title=='Edit song'"
          absolute
          fab
          bottom
          right
          dark
          color="red"
          to="/songs"
        ><v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
        <v-btn
          v-else-if="title=='Create song'"
          absolute
          fab
          dark
          bottom
          right
          color="red"
          to="/songs"
        ><v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
      </v-list-item-content>
    </v-list-item>

    <slot name="panel">
    </slot>

    <!-- <v-card-actions>
      <v-btn text>{{button_left}}</v-btn>
      <v-btn text>{{button_right}}</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
export default {
  props: [
    'title',
    'subtitle',
    'button_left',
    'button_right'
  ]

}
</script>

<style scoped>

</style>