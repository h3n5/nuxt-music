import Vue from 'vue'
import {
  Button,
  Table,
  Tag,
  Icon,
  Page,
  Input,
  Tabs,
  AutoComplete,
  Option
} from 'iview'
import 'iview/dist/styles/iview.css'
Vue.prototype.$IVIEW = {}
Vue.component('Button', Button)
Vue.component('Table', Table)
Vue.component('Tag', Tag)
Vue.component('Icon', Icon)
Vue.component('Page', Page)
Vue.component('Input', Input)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', Tabs.Pane)
Vue.component('AutoComplete', AutoComplete)
Vue.component('Option', Option)
