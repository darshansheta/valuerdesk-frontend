<template>
    <div>
        <div class="row" v-for="(group,kk) in groups">
            <h5 class="text-bold" style="margin-left: 15px;">{{kk}}:</h5>
            <div v-for="placeholder in group" class="col-md-4" >
                <div class="border m-2 p-3 rounded bg-white"> {{placeholder.placeholder}}</div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import {mapActions, mapGetters} from 'vuex'
import _ from 'lodash'
export default {
    name: 'Placeholder',
    computed: {
        ...mapGetters({
            placeholders : 'common/placeholdersGetters'
        }),
        groups() {
            return _.groupBy(this.placeholders, ph => ph.entity)
        }
    }
}
</script>