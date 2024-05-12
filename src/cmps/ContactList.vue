<template>
    <section class="contact-list">
        <!-- <ul class="contact-card" v-if="contacts"> -->
        <TransitionGroup v-if="contacts" class="contact-card" name="list" tag="ul">
            <li class="contact-preview" v-for="contact in contacts" :key="contact._id">
                <RouterLink :to="`/contact/${contact._id}`">
                    <ContactPreview :contact="contact" />
                </RouterLink>

                <div class="actions">
                    <RouterLink class="edit-icon" :to="`/contact/edit/${contact._id}`"><font-awesome-icon
                            icon="fa-solid fa-pen-to-square" /></RouterLink>
                    <font-awesome-icon class="delete-icon" @click="onRemove(contact._id)" icon="fa-solid fa-trash" />
                </div>

            </li>
        </TransitionGroup>
        <!-- </ul> -->
        <p v-else>Loading contacts...</p>
    </section>
</template>

<script>



    import ContactFilter from './ContactFilter.vue'
    import ContactPreview from './ContactPreview.vue'

    export default {
        components: { ContactPreview, ContactFilter },
        props: {
            contacts: {
                type: Array,
                required: true,
            }
        },
        methods: {
            onRemove(contactId) {
                this.$emit('remove', contactId)
            }
        },
    }
</script>

<style lang="scss">
    .contact-list {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1em;
        font-weight: 600;
        background: grey;

        .contact-card {
            width: 100%;
            cursor: pointer;
            flex-direction: column;
            justify-content: space-between;

            .contact-preview {
                display: flex;
                align-items: center;
                width: 100%;
                padding: em(10px);
                outline: 1px solid rgba(211, 211, 211, 0.053);
                transition: 0.2s ease-in-out;
                background-color: $bg-clr-dark;

                &:hover {
                    outline: 1px solid rgba(211, 211, 211, 0.374);
                    background-color: $bg-clr-dark-brighter;
                }

                .actions {
                    display: flex;
                    align-items: center;
                    gap: 1em;

                    .delete-icon:hover {
                        color: red;
                    }

                    .edit-icon:hover {
                        color: green;
                    }
                }
            }

            a {
                text-decoration: none;
                display: inline-block;
                text-decoration: none;
                color: white;
                width: 100%;
            }
        }
    }

    .list-move,
    /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    /* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
    .list-leave-active {
        position: absolute;
    }
</style>