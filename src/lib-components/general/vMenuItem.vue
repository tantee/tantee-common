<template>
  <div>
    <template v-for="(MenuItem,index) in MenuItems">
      <template v-if="MenuItem.menuItems">
        <v-list-group :key="index" :prepend-icon="MenuItem.action" v-permission="MenuItem.permission">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title :to="MenuItem.link">{{ MenuItem.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-menu-item :MenuItems="MenuItem.menuItems" :key="index"></v-menu-item>
        </v-list-group>
      </template>
      <template v-else>
        <v-list-item :key="index" :to="MenuItem.link" v-permission="MenuItem.permission">
          <v-list-item-title>{{ MenuItem.title }}</v-list-item-title>
          <v-list-item-action>
            <v-icon v-if="MenuItem.action">{{ MenuItem.action }}</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: [
    'MenuItems'
  ],
  name: 'vMenuItem'
}
</script>

<style lang="css">
</style>
