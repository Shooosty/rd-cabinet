<template>
  <div>
    <PageHeader :card-title="cardTitle" :actions="actions" />

    <div
      v-if="
        isOrderPage &&
        this.$auth.user.role === 'user' &&
        resource.status !== 'closed'
      "
      v-b-toggle.comments
      class="d-flex justify-content-between comments-toggle card-body bg-white mt-3 align-items-center"
      @click="toggleComment"
    >
      <div class="d-flex justify-content-start">
        <span v-if="!isCommentsOpen"><b>Показать прогресс заказа</b></span>
        <span v-if="isCommentsOpen"><b>Скрыть прогресс заказа</b></span>
      </div>

      <div class="d-flex justify-content-end">
        <fa v-if="!isCommentsOpen" :icon="['fas', 'chevron-down']" />
        <fa v-if="isCommentsOpen" :icon="['fas', 'chevron-up']" />
      </div>
    </div>

    <div
      v-if="isOrderPage && this.$auth.user.role === 'user' && !isEditPage"
      class="d-flex card-body bg-white justify-content-center mt-3 align-items-center"
    >
      <div>
        <fa :icon="['fas', 'info']" class="info-icon mr-2" />
        <span v-if="resource.status === 'photoDateApproved'">
          Заполните разделы с моделями во вкладке "Фотографии"
        </span>

        <span v-if="resource.status === 'needAnotherPhotoDate'">
          Дождитесь звонка нашего менеджера для согласования съемки
        </span>

        <span v-if="resource.status === 'anotherPhotoDateApproved'">
          Заполните разделы с моделями во вкладке "Фотографии"
        </span>

        <span v-if="resource.status === 'photoDateChecked'">
          Фотограф выгружает фотографии со съемки. Скоро они появятся в разделе
          "Фотографии" и вам необходимо будет сформировать заказ
        </span>

        <span v-if="resource.status === 'onDesign'">
          Дизайнер формирует макет
        </span>

        <span v-if="resource.status === 'onTheFormation'">
          Отредактируйте заказ, добавив все недостующие материалы и нажмите
        </span>

        <span v-if="resource.status === 'onTheClientApprove'">
          Проверьте макет от дизайнера во вкладке "Макет". Если все отлично -
          отправьте в печать, если есть замечания - отправьте обратно в отдел
          дизайна с коментариями.
        </span>

        <span v-if="resource.status === 'onEdits'">
          Дизайнер правит макет
        </span>

        <span v-if="resource.status === 'onProduction'"> В производстве </span>

        <span v-if="resource.status === 'done'">
          Ваш заказ находится в офисе. Ожидайте звонка от специалиста. Будем
          благодарны, если Вы оставите отзыв
          <a
            target="_blank"
            href="https://www.yell.ru/moscow/com/rhinodesign-studio-development-and-printing-of-albums-and-photobooks_11769171"
            >здесь</a
          ></span
        >

        <span v-if="resource.status === 'closed'"> Заказ закрыт </span>
      </div>

      <div v-if="resource.status === 'onTheFormation'">
        <LinkButton
          label="Сформировать"
          icon="magic"
          btn-class="black"
          govern="viewForUser"
          :fn="toDesign"
        />
      </div>

      <div v-if="resource.status === 'onTheFormation'" class="ml-2">
        <vue-countdown-timer
          :start-time="resource.preFormDate"
          :end-time="sevenDaysCountDown"
          :interval="6000"
          :start-label="'Время на формирование'"
          :end-label="'Время на формирование'"
          label-position="begin"
          :end-text="'Время на формирование истекло!'"
          :day-txt="' дней'"
          :hour-txt="' часов'"
          :minutes-txt="' минут'"
          @start_callback="startCallBack('event started')"
          @end_callback="endCallBack('event ended')"
        >
          <template slot="countdown" slot-scope="scope">
            <span>{{ scope.props.days }}</span
            ><i>{{ scope.props.dayTxt }}</i> <span>{{ scope.props.hours }}</span
            ><i>{{ scope.props.hourTxt }}</i>
            <span>{{ scope.props.minutes }}</span
            ><i>{{ scope.props.minutesTxt }}</i>
          </template>
        </vue-countdown-timer>
      </div>

      <div
        v-if="resource.status === 'onTheClientApprove'"
        class="d-inline-flex"
      >
        <LinkButton
          label="Вернуть дизайнеру"
          icon="magic"
          btn-class="black"
          govern="viewForUser"
          :fn="toDesign"
        />
        <LinkButton
          label="В печать"
          icon="print"
          btn-class="black"
          govern="viewForUser"
          :fn="toPrint"
        />
      </div>
    </div>

    <div
      v-if="
        isOrderPage && this.$auth.user.role === 'photographer' && !isEditPage
      "
      class="d-flex card-body bg-white justify-content-center mt-3 align-items-center"
    >
      <div>
        <fa :icon="['fas', 'info']" class="info-icon mr-2" />
        <span
          v-if="
            resource.status === 'photoDateApproved' ||
            resource.status === 'needAnotherPhotoDate'
          "
        >
          Выберите действие "К выгрузке" если проведена последняя съемка или
          "Еще съемка" если нет.
        </span>
        <span v-if="resource.status === 'anotherPhotoDateApproved'">
          Назначена еще одна съемка
        </span>

        <span v-if="resource.status === 'photoDateChecked'">
          Выгрузите фотографии и передайте на формирование клиенту
        </span>
      </div>

      <div
        v-if="
          resource.status === 'photoDateApproved' ||
          resource.status === 'needAnotherPhotoDate'
        "
        class="d-inline-flex"
      >
        <LinkButton
          label="К выгрузке"
          icon="photo-video"
          btn-class="black"
          govern="viewForPhotographer"
          :fn="toUploadPhotos"
        />
        <LinkButton
          label="Еще съемка"
          icon="camera"
          btn-class="black"
          govern="viewForPhotographer"
          :fn="toAnotherPhotoDate"
        />
      </div>
    </div>

    <b-collapse id="comments" class="bg-none">
      <b-card class="comment-card">
        <vue-horizontal-timeline
          :title-substr="31"
          :items="commentsShowed(comments)"
          line-color="#33333c"
        />
      </b-card>
    </b-collapse>

    <div class="mt-3 card-body bg-white">
      <vue-tabs v-if="isOrderPage">
        <v-tab title="Основная информация">
          <GeneralOrder
            :resource.sync="resource"
            :designers.sync="designers"
            :photographers.sync="photographers"
            :managers.sync="managers"
            :is-edit-page="isEditPage"
          />
        </v-tab>
        <v-tab title="Фотографии">
          <PhotoOrder
            class="mt-3"
            :resource.sync="resource"
            :persons="persons"
            :is-edit-page="isEditPage"
          />
        </v-tab>
        <v-tab title="Документы">
          <DocumentsOrder
            :resource.sync="resource"
            :is-edit-page="isEditPage"
          />
        </v-tab>
        <v-tab title="Макет">
          <LayoutOrder :resource.sync="resource" :is-edit-page="isEditPage" />
        </v-tab>
        <v-tab title="Дополнительно">
          <SecondaryOrder
            :resource.sync="resource"
            :is-edit-page="isEditPage"
          />
        </v-tab>
      </vue-tabs>

      <vue-tabs v-if="isProjectPage">
        <v-tab title="Основная информация">
          <GeneralProject />
        </v-tab>
        <v-tab title="Файлы">
          <ProjectFiles />
        </v-tab>
      </vue-tabs>

      <vue-tabs v-if="isUserPage">
        <v-tab title="Основная информация">
          <UserGeneral :resource.sync="resource" :is-edit-page="isEditPage" />
        </v-tab>
        <v-tab v-if="!isEditPage" title="Заказы">
          <UserOrders :resource.sync="resource" />
        </v-tab>
      </vue-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import LinkButton from '~/components/Button/LinkButton'
import LayoutOrder from '~/components/Pages/Order/LayoutOrder'
import PageHeader from '~/components/Pages/Card/PageHeader'
import GeneralOrder from '~/components/Pages/Order/GeneralOrder'
import UserGeneral from '~/components/Pages/User/UserGeneral'
import UserOrders from '~/components/Pages/User/UserOrders'
import SecondaryOrder from '~/components/Pages/Order/SecondaryOrder'
import PhotoOrder from '~/components/Pages/Order/PhotoOrder'
import ProjectFiles from '~/components/Pages/Project/ProjectFiles'
import GeneralProject from '~/components/Pages/Project/GeneralProject'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import DocumentsOrder from '~/components/Pages/Order/DocumentsOrder'

export default {
  components: {
    LinkButton,
    LayoutOrder,
    DocumentsOrder,
    PageHeader,
    GeneralOrder,
    SecondaryOrder,
    ProjectFiles,
    GeneralProject,
    PhotoOrder,
    UserGeneral,
    UserOrders,
  },

  perimeters: [ViewPerimeter],

  props: {
    cardTitle: {
      type: String,
      required: true,
    },
    isOrderPage: {
      type: Boolean,
      default: false,
    },
    isProjectPage: {
      type: Boolean,
      default: false,
    },
    isUserPage: {
      type: Boolean,
      default: false,
    },
    isEditPage: {
      type: Boolean,
      default: false,
    },
    resource: {
      type: Object,
      required: true,
    },
    persons: {
      type: [Array],
      default: () => [],
    },
    managers: {
      type: [Array],
      default: () => [],
    },
    photographers: {
      type: [Array],
      default: () => [],
    },
    designers: {
      type: [Array],
      default: () => [],
    },
    actions: {
      type: Array[Object],
      default: () => [],
    },
    comments: {
      type: Array[Object],
      default: () => [],
    },
  },

  data() {
    return {
      isCommentsOpen: false,
    }
  },

  computed: {
    sevenDaysCountDown() {
      return this.$dayjs(this.resource.preFormDate).add(7, 'day').$d
    },
  },

  methods: {
    ...mapActions({
      update: 'order/UPDATE',
    }),

    startCallBack(x) {
      console.log(x)
    },

    endCallBack(x) {
      console.log(x)
    },

    commentsShowed(c) {
      switch (this.resource.status) {
        case 'photoDateApproved':
          return c.slice(0, 1)
        case 'needAnotherPhotoDate':
          return c.slice(0, 2)
        case 'anotherPhotoDateApproved':
          return c.slice(0, 3)
        case 'photoDateChecked':
          return c.slice(0, 4)
        case 'onTheFormation':
          return c.slice(0, 5)
        case 'onDesign':
          return c.slice(0, 6)
        case 'onTheClientApprove':
          return c.slice(0, 7)
        case 'onEdits':
          return c.slice(0, 8)
        case 'onProduction':
          return c.slice(0, 9)
        case 'done':
          return c.slice(0, 10)
      }
    },

    toggleComment() {
      this.isCommentsOpen = !this.isCommentsOpen
    },

    toDesign() {
      if (confirm('Отправить в отдел дизайна?')) {
        if (
          this.persons.map((p) => {
            return p.photosCount !== 0
          })
        ) {
          try {
            this.error = null
            const updatedOrder = this.resource
            updatedOrder.status = 'onDesign'

            this.update(Object.assign({}, updatedOrder))
          } catch (e) {
            this.error = e.response
          } finally {
            if (this.error == null) {
              setTimeout(() => this.$router.push({ path: '/my_orders' }), 2000)
              this.$notification.success('Заказ передан дизайнеру', {
                timer: 3,
                position: 'topRight',
              })
            } else {
              this.$notification.error('Не удалось передать заказ', {
                timer: 3,
                position: 'topRight',
              })
            }
          }
        } else {
          this.$notification.error(
            'Нельзя передать заказ с моделями без фото',
            {
              timer: 3,
              position: 'topRight',
            }
          )
        }
      }
    },

    toUploadPhotos() {
      if (confirm('Съемка проведена?')) {
        try {
          this.error = null
          const updatedOrder = this.resource
          updatedOrder.status = 'photoDateChecked'

          this.update(Object.assign({}, updatedOrder))
        } catch (e) {
          this.error = e.response
        } finally {
          if (this.error == null) {
            setTimeout(() => this.$router.push({ path: '/my_orders' }), 2000)
            this.$notification.success('Заказ готов к выгрузке', {
              timer: 3,
              position: 'topRight',
            })
          } else {
            this.$notification.error('Не удалось изменить статус заказа', {
              timer: 3,
              position: 'topRight',
            })
          }
        }
      }
    },

    toAnotherPhotoDate() {
      if (confirm('Отправить менеджеру на назначение?')) {
        try {
          this.error = null
          const updatedOrder = this.resource
          updatedOrder.status = 'needAnotherPhotoDate'

          this.update(Object.assign({}, updatedOrder))
        } catch (e) {
          this.error = e.response
        } finally {
          if (this.error == null) {
            setTimeout(() => this.$router.push({ path: '/my_orders' }), 2000)
            this.$notification.success(
              'Заказ передан на назначение менеджеру',
              {
                timer: 3,
                position: 'topRight',
              }
            )
          } else {
            this.$notification.error('Не удалось изменить статус заказа', {
              timer: 3,
              position: 'topRight',
            })
          }
        }
      }
    },

    toPrint() {
      if (confirm('Отправить этот заказ в производство?')) {
        try {
          this.error = null
          const updatedOrder = this.resource
          updatedOrder.status = 'onProduction'

          this.update(Object.assign({}, updatedOrder))
        } catch (e) {
          this.error = e.response
        } finally {
          if (this.error == null) {
            setTimeout(() => this.$router.push({ path: '/my_orders' }), 2000)
            this.$notification.success('Заказ передан в печать', {
              timer: 3,
              position: 'topRight',
            })
          } else {
            this.$notification.error('Не удалось передать заказ в печать', {
              timer: 3,
              position: 'topRight',
            })
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.card-body {
  border-radius: 5px;
}

.comments-toggle {
  cursor: pointer;
}

.info-icon {
  color: $success-color;
}

.comment-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background: none;
  border: none;
}
</style>
