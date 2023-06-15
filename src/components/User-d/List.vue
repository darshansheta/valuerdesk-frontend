<template>
    <div class="table-responsive">
        <table class="table table-condensed table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Zip</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" track-by="id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.address.city}}</td>
                    <td>{{user.address.zipcode}}</td>
                    <td>{{user.company.name}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'List',
    props: ['users']
}
</script>
<style>
    
</style>