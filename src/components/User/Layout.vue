<template>
    <tabs>
        <tab title="Staff">
            <staff></staff>
        </tab>
        <tab title="Roles">
            <role></role>
        </tab>
    </tabs>
</template>
<script>
import Staff from './Staff'
import Role from './Role'
export default {
    components: {
        Staff,
        Role
    }

}
</script>