<template>
  <div>
    <div v-if="isEditPage && $isAllowed('viewForAdmin')">
      <div>
        <vue-tabs>
          <v-tab title="О заказе">
            <b-list-group>
              <b-list-group-item>
                <label for="number">Номер договора</label>
                <b-form-input
                  id="number"
                  v-model="resource.number"
                  type="number"
                  placeholder="Введите номер"
                />
              </b-list-group-item>
              <b-list-group-item>
                <label>Статус</label>
                <multiselect
                  v-model="resource.status"
                  :searchable="false"
                  selected-label="выбран"
                  deselect-label="убрать"
                  select-label="выбрать"
                  :custom-label="localizeStatuses"
                  :options="statuses"
                  placeholder="статус заказа"
                />
              </b-list-group-item>
            </b-list-group>
          </v-tab>

          <v-tab title="Менеджер">
            <b-list-group>
              <b-list-group-item>
                <label>Выберите менеджера</label>
                <multiselect
                  v-model="resource.managerId"
                  :custom-label="customLabel"
                  :options="managers"
                  selected-label="выбран"
                  select-label="нажмите, чтобы выбрать"
                  placeholder="менеджер"
                />
              </b-list-group-item>
              <b-list-group-item>
                <label>Дизайн альбома</label>
                <multiselect
                  v-model="resource.design"
                  :custom-label="localizeDesigns"
                  :options="designs"
                  selected-label="выбран"
                  select-label="нажмите, чтобы выбрать"
                  placeholder="дизайн"
                />
              </b-list-group-item>
            </b-list-group>
          </v-tab>

          <v-tab title="Фотограф">
            <b-list-group>
              <b-list-group-item>
                <label for="address">Адрес фотосъемки</label>
                <b-form-input
                  id="address"
                  v-model="resource.address"
                  placeholder="Введите адрес"
                />
              </b-list-group-item>
              <b-list-group-item>
                <div
                  v-for="(date, index) in resource.dateTimes"
                  :key="index"
                  class="mb-3"
                >
                  <div class="d-flex justify-content-between">
                    <label for="datetime" class="d-flex justify-content-start">
                      Дата и время {{ index + 1 }} фотосъемки
                    </label>

                    <div class="d-flex justify-content-end">
                      <IconButton
                        class="plus-date-btn ml-2"
                        icon="plus"
                        @click.native="addDate"
                      />

                      <IconButton
                        v-if="index > 0"
                        class="remove-date-btn ml-3"
                        icon="trash"
                        @click.native="removeDate(index)"
                      />
                    </div>
                  </div>

                  <date-picker
                    id="datetime"
                    v-model="resource.dateTimes[index]"
                    type="datetime"
                    value-type="format"
                    :disabled-date="datePickerDisabledRule"
                    format="YYYY-MM-DDTHH:mm"
                    placeholder="Выберите дату и время"
                  />
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <label>Выберите фотографа</label>
                <multiselect
                  v-model="resource.photographerId"
                  :options="photographers"
                  :custom-label="customLabel"
                  selected-label="выбран"
                  select-label="нажмите, чтобы выбрать"
                  placeholder="фотограф"
                />
              </b-list-group-item>
            </b-list-group>
          </v-tab>

          <v-tab title="Дизайнер">
            <b-list-group>
              <b-list-group-item>
                <label>Выберите дизайнера</label>
                <multiselect
                  v-model="resource.designerId"
                  :options="designers"
                  :custom-label="customLabel"
                  selected-label="выбран"
                  select-label="нажмите, чтобы выбрать"
                  placeholder="дизайнер"
                />
              </b-list-group-item>
            </b-list-group>
          </v-tab>
        </vue-tabs>
      </div>
    </div>

    <div v-else class="mt-3 card-body bg-white">
      <div>
        <vue-tabs>
          <v-tab title="О заказе">
            <b-list-group>
              <b-list-group-item>
                <b>Номер договора:</b>
                <span v-text="resource.number" />
              </b-list-group-item>
              <b-list-group-item>
                <b>Дата выгрузки фотографий:</b>
                <span
                  v-if="resource.preFormDate"
                  v-text="dateTimeFormatted(resource.preFormDate)"
                />
                <span v-else>Не выгружены</span>
              </b-list-group-item>
              <b-list-group-item>
                <b>Дата формирования заказа:</b>
                <span
                  v-if="resource.formDate"
                  v-text="formDatesCheck(resource.formDate)"
                />
                <span v-else>На формировании</span>
              </b-list-group-item>
              <b-list-group-item>
                <b>Статус:</b>
                <span v-text="localizeStatuses(resource.status)" />
              </b-list-group-item>
            </b-list-group>
          </v-tab>

          <v-tab title="Менеджер">
            <b-list-group>
              <b-list-group-item>
                <b>Имя менеджера:</b>
                <span
                  v-if="chosenManager"
                  v-text="`${chosenManager.name} ${chosenManager.surname}`"
                />
              </b-list-group-item>
              <b-list-group-item>
                <b>Телефон менеджера:</b>
                <span v-if="chosenManager" v-text="chosenManager.phone" />
              </b-list-group-item>
              <b-list-group-item>
                <b>Дизайн альбома:</b>
                <span v-text="localizeDesigns(resource.design)" />
              </b-list-group-item>
            </b-list-group>
          </v-tab>

          <v-tab v-if="this.$auth.user.role !== 'user'" title="Клиент">
            <b-list-group>
              <b-list-group-item>
                <b>Имя клиента:</b>
                <span
                  v-if="chosenClient"
                  v-text="`${chosenClient.name} ${chosenClient.surname}`"
                />
              </b-list-group-item>
              <b-list-group-item>
                <b>Телефон клиента:</b>
                <span v-if="chosenClient" v-text="chosenClient.phone" />
              </b-list-group-item>
            </b-list-group>
          </v-tab>

          <v-tab title="Фотограф">
            <b-list-group>
              <b-list-group-item>
                <b>Адрес фотосъемки:</b>
                <span v-text="resource.address" />
              </b-list-group-item>
              <b-list-group-item v-if="resource.dateTimes.length === 1">
                <b>Дата и время фотосъемки:</b>
                <span v-text="dateTimeFormatted(resource.dateTimes[0])" />
              </b-list-group-item>
              <b-list-group-item v-if="chosenPhotographer">
                <b>Имя фотографа:</b>
                <span
                  v-text="
                    `${chosenPhotographer.name} ${chosenPhotographer.surname}`
                  "
                />
              </b-list-group-item>

              <template v-if="resource.dateTimes.length > 1">
                <b-list-group-item>
                  <b>Количество съемочных дней:</b>
                  <span v-text="resource.dateTimes.length" />
                </b-list-group-item>
                <b-list-group-item
                  v-for="(d, index) in resource.dateTimes"
                  :key="index"
                >
                  <b>Дата {{ index + 1 }} съемки:</b>
                  <span v-text="dateTimeFormatted(d)" />
                </b-list-group-item>
              </template>
            </b-list-group>
          </v-tab>

          <v-tab title="Дизайнер">
            <b-list-group>
              <b-list-group-item>
                <b>Имя дизайнера:</b>
                <span
                  v-if="chosenDesigner"
                  v-text="`${chosenDesigner.name} ${chosenDesigner.surname}`"
                />
                <span v-else> не назначен </span>
              </b-list-group-item>
              <b-list-group-item v-if="chosenDesigner">
                <b>Телефон дизайнера:</b>
                <span v-text="'+7 (968) 761-04-44'" />
              </b-list-group-item>
            </b-list-group>
          </v-tab>
        </vue-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import ViewPerimeter from '~/perimeters/viewPerimeter'
import localizeMixin from '~/mixins/localize-mixin'
import Model from '~/models/order'
import IconButton from '~/components/Button/IconButton'

export default {
  components: { IconButton, Multiselect },

  mixins: [localizeMixin],

  perimeters: [ViewPerimeter],

  props: {
    resource: {
      type: Object,
      required: true,
    },
    photographers: {
      type: [Array],
      default: () => [],
    },
    designers: {
      type: [Array],
      default: () => [],
    },
    clients: {
      type: [Array],
      default: () => [],
    },
    managers: {
      type: [Array],
      default: () => [],
    },
    isEditPage: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      open: false,

      ...Model,
    }
  },

  computed: {
    chosenPhotographer() {
      return this.photographers.filter(
        (value) => value.ID === this.resource.photographerId
      )[0]
    },

    chosenDesigner() {
      return this.designers.filter(
        (value) => value.ID === this.resource.designerId
      )[0]
    },

    chosenClient() {
      return this.clients.filter(
        (value) => value.ID === this.resource.userId
      )[0]
    },

    chosenManager() {
      return this.managers.filter(
        (value) => value.ID === this.resource.managerId
      )[0]
    },
  },

  methods: {
    addDate() {
      this.resource?.dateTimes.push('')
    },

    formDatesCheck(date) {
      if (
        this.$dayjs(date) >
        this.$dayjs(this.resource.preFormDate).add(7, 'day').$d
      ) {
        return `${this.dateTimeFormatted(date)} (просрочен)`
      } else {
        return this.dateTimeFormatted(date)
      }
    },

    removeDate(index) {
      this.resource?.dateTimes.splice(index, 1)
    },

    customLabel(value) {
      if (value.ID) {
        return `${value.name} ${value.surname} (${value.email})`
      } else if (this.chosenManager && this.chosenManager.ID === value) {
        return `${this.chosenManager.name} ${this.chosenManager.surname} ${this.chosenManager.email}`
      } else if (this.chosenDesigner && this.chosenDesigner.ID === value) {
        return `${this.chosenDesigner.name} ${this.chosenDesigner.surname} ${this.chosenDesigner.email}`
      } else if (
        this.chosenPhotographer &&
        this.chosenPhotographer.ID === value
      ) {
        return `${this.chosenPhotographer.name} ${this.chosenPhotographer.surname} ${this.chosenPhotographer.email}`
      }
    },

    dateTimeFormatted(dateTime) {
      if (dateTime) {
        return this.$dayjs(dateTime).format('DD.MM.YYYY HH:mm')
      } else {
        return 'Формируется'
      }
    },

    datePickerDisabledRule(date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      return date < today
    },
  },
}
</script>

<style scoped lang="scss">
@import '~/assets/stylesheets/default';

.mx-datepicker {
  width: 100%;
  .mx-input {
    height: 38px;
  }
}

.plus-date-btn {
  font-size: $font-size-xs;
  color: $success-color;
}

.remove-date-btn {
  font-size: $font-size-xs;
  color: $danger-color;
}
</style>
