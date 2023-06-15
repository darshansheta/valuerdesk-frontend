<template>
          <ul v-show="tablePagination && tablePagination.last_page > 1" :class="css.wrapperClass">
            <li @click="loadPage(1)"
              :class="['btn-nav', css.linkClass, isOnFirstPage ? css.disabledClass : '']">
                <i v-if="css.icons.first != ''" :class="[css.icons.first]"></i>
                <span v-else>&laquo;</span>
            </li>
            <li @click="loadPage('prev')"
              :class="['btn-nav', css.linkClass, isOnFirstPage ? css.disabledClass : '']">
                <i v-if="css.icons.next != ''" :class="[css.icons.prev]"></i>
                <span v-else>&nbsp;&lsaquo;</span>
            </li>
            <template v-if="notEnoughPages">
              <template v-for="n in totalPage">
                <li @click="loadPage(n)"
                  :class="[css.pageClass, isCurrentPage(n) ? css.activeClass : '']"
                  v-html="n">
                </li>
              </template>
            </template>
            <template v-else>
              <template v-for="n in windowSize">
                <li @click="loadPage(windowStart+n-1)"
                  :class="[css.pageClass, isCurrentPage(windowStart+n-1) ? css.activeClass : '']"
                  >
                  <a href="javascript:void(0)" v-html="windowStart+n-1"></a>
                </li>
              </template>
            </template>
            <li @click="loadPage('next')"
              :class="['btn-nav', css.linkClass, isOnLastPage ? css.disabledClass : '']">
              <i v-if="css.icons.next != ''" :class="[css.icons.next]"></i>
              <span v-else>&rsaquo;&nbsp;</span>
            </li>
            <li @click="loadPage(totalPage)"
              :class="['btn-nav', css.linkClass, isOnLastPage ? css.disabledClass : '']">
              <i v-if="css.icons.last != ''" :class="[css.icons.last]"></i>
              <span v-else>&raquo;</span>
            </li>
          </ul>
        </template>

<script>
import PaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin'

export default {
    mixins: [PaginationMixin],
}
</script>