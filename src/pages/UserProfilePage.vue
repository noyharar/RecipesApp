<template>
    <div class="container">

        <h2 style="text-align:center">{{ user.username }}</h2>

        <div class="card">
            <img :src="user.profilePicture"  style="width:100%">
            <h1>{{ fullName }}</h1>
            <p>{{user.email}}</p>
            <p>{{user.country }}</p>
        </div>

    </div>



<!--        <div class="details">-->
<!--            <div>-->
<!--                <h1>{{ user.firstName }}</h1>-->
<!--                <img :src="user.profilePicture" class="profile-photo" />-->
<!--            </div>-->
<!--            <div >-->
<!--                <div class="wrapper" >-->
<!--                    <div class="wrapped">-->
<!--                        <div>-->
<!--                        First name: {{user.firstName}}-->
<!--                        </div>-->
<!--                        <div>-->
<!--                        Last name: {{user.lastName}}-->
<!--                            </div>-->
<!--                        <div>-->

<!--                            Email: {{  user.email}}-->
<!--                            </div>-->
<!--<div>-->
<!--                            Country: {{user.country }}-->
<!--</div>-->

<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>


<script>
    export default {
        name: "user",
        data() {
            return {
                user: null
            };
        },
        mounted() {
            this.updateUserProfile();
            // this.updateWatchedRecipes();
        },  computed: {
            fullName: function () {
                return this.user.firstName + ' ' + this.user.lastName
            }
        },
        methods: {
            async updateUserProfile() {
                try {
                    const response = await this.axios.get(
                        "https://ass3-noa-noy.herokuapp.com/profile"
                    );

                    // console.log(response);
                    const currUser = response.data;
                    this.user = currUser;
                    // console.log(this.recipes);
                } catch (error) {
                    console.log(error);
                }
            },
        }
    };
</script>

<style lang="scss" scoped>
    .card {

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 500px;
    hight: 500px;
    margin: auto;
    text-align: center;
    font-family: arial;
    }

    a {
        text-decoration: none;
        font-size: 22px;
        color: black;
    }

    button:hover, a:hover {
        opacity: 0.7;
    }
    .wrapper {
        display: flex;
    }
    .wrapped {
        width: 50%;
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
    .details{
        background-image: url("https://image.freepik.com/free-photo/grunge-vintage-old-paper-background_1373-431.jpg");
        height: 50%;
        width: 50%;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        margin: auto;
    }

    .profile-photo{
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        width: 300px;
    }
</style>
