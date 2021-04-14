import { extend } from 'vee-validate'
import { required, numeric, confirmed } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Это поле обязательно для заполнения',
})

extend('confirmed', {
  ...confirmed,
  message: 'Пароли должны совпадать',
})

extend('numeric', {
  ...numeric,
  message: 'Это поле может соджержать только цифры',
})
