<template>
    <MainComponent :logged-in-user="this.$root.store.username || ''"></MainComponent>
</template>

<script>
    import MainComponent from "../components/MainComponent";
    export default {
        components: {
            MainComponent
        }
    };
</script>
