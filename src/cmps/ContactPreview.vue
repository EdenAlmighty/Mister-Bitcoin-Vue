<template>
    <div class="contact-profile">
        <img :src="contact.imgUrl" alt="contact image" />
        <span>{{ contact.name }}</span>
    </div>

    <!-- <p>{{ contact.email }}</p>
        <p>{{ contact.phone }}</p> -->
    <!-- </article> -->
</template>

<script>
import { utilService } from '@/services/util.service';

export default {
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            randNum: utilService.getRandomInt(0, 10)
        }
    },
    created() {
        if (!this.contact.imgUrl) {
            this.contact.imgUrl = 'https://robohash.org/' + utilService.getRandomInt(0, 10) + '?size=30x30&set=set5'
        }
    }

}
</script>

<style lang="scss">
.contact-profile {
    display: flex;
    align-items: center;

    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        line-break: none;
        margin-right: 8px;
        font-weight: 500;
    }

    img {
        background-color: $bg-clr-dark-brighter;
        border-radius: 2em;
        height: em(40px);
        margin-right: em(12px);
    }
}
</style>