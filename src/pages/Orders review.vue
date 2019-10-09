<template>
    <q-page class="q-pa-sm">

        <q-banner
            class="bg-primary text-white"
            rounded
        >
            <div class="row">

                <q-item class="text-white text-h5">
                    PREGLED PORUDŽBINA
                </q-item>

            </div>
        </q-banner>

        <q-list bordered separator class="rounded-borders">
            <q-expansion-item
                class="bg-grey-3"
                v-for="partner in partnerData"
                :key="partner._id"
                icon="account_box"
                :label="partner.name"
                :caption="partner.localId"
                expand-separator
                group="group1"
            >
                <q-expansion-item
                    class="bg-white"
                    v-for="order in getOrderData"
                    :key="order._id"
                    :label="'Porudžbina na dan ' + order.date"
                    icon="table_chart"
                    :header-inset-level="0.5"
                    expand-separator
                    group="group2"
                >
                        <q-table
                            :data="order.data"
                            :columns="tblColumns"
                            row-key="name"
                            @click="editOrder(partner._id, order._id)"
                        >
                        </q-table>
                </q-expansion-item>

            </q-expansion-item>
        </q-list>
    </q-page>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex'

    export default {
        computed:{
            ...mapState('viewOrderStore', [ 'partnerData', 'orderData', 'tblColumns' ]),
            ...mapGetters('viewOrderStore', ['getOrderData']),
        },

        methods:{
            ...mapActions('viewOrderStore', [ 'getInitData' ]),

            editOrder(partnerId, orderId){
                console.log(partnerId);
                console.log(orderId);
                
            }
        },

        beforeMount(){
            this.$q.loading.show()
            this.getInitData();
        },
    }
</script>