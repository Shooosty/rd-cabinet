export default {
  methods: {
    localizeOwners(owner) {
      switch (owner) {
        case 'photographer':
          return 'Фотограф'
        case 'manager':
          return 'Менеджер'
        case 'designer':
          return 'Дизайнер'
      }
    },

    localizeSections(type) {
      switch (type) {
        case 'pupils':
          return 'Ученики'
        case 'teachers':
          return 'Преподаватели и сотрудники'
        case 'cover':
          return 'Фото учебного заведения'
        case 'group':
          return 'Общегрупповая фотография'
        case 'reportage':
          return 'Репортаж'
      }
    },

    localizeDesigns(design) {
      switch (design) {
        case 'rainbow':
          return 'Радуга'
        case 'forbesGray':
          return 'Forbes серый'
        case 'forbesBlue':
          return 'Forbes голубой'
        case 'forbesBrown':
          return 'Forbes коричневый'
        case 'people':
          return 'People'
        case 'retro':
          return 'Ретро'
        case 'urban':
          return 'Урбан'
        case 'emerald':
          return 'Изумруд'
        case 'boysGirls':
          return 'Boys&Girls'
        case 'leafFall':
          return 'Листопад'
        case 'bell':
          return 'Колокольчик'
        case 'wantedRed':
          return 'Wanted красный'
        case 'oldMoscow':
          return 'Старая Москва'
        case 'filmBlue':
          return 'Пленка голубой'
        case 'filmBrown':
          return 'Пленка коричневый'
        case 'londonRed':
          return 'London красный'
        case 'londonPurple':
          return 'London фиолетовый'
        case 'londonBlue':
          return 'London синий'
        case 'dreamsPurple':
          return 'Dreams фиолетовый'
        case 'plan':
          return 'Чертеж'
        case 'chalkDarkGreen':
          return 'Мел темно-зеленый'
        case 'chalkBlack':
          return 'Мел черный'
        case 'pegasusBlue':
          return 'Пегас синий'
        case 'pegasusBrown':
          return 'Пегас коричневый'
        case 'owls':
          return 'Совы'
        case 'school':
          return 'Школа'
        case 'mgmsu':
          return 'МГМСУ'
        case 'mgimo':
          return 'МГИМО'
        case 'mvd':
          return 'МВД'
        case 'gitis':
          return 'ГИТИС'
        case 'rgsuGas':
          return 'РГСУ им. нефти и газа'
        case 'mgtu':
          return 'МГТУ'
        case 'mgu':
          return 'МГУ'
        case 'mchs':
          return 'МЧС'
        case 'vshe':
          return 'ВШЭ'
        case 'rta':
          return 'РТА'
        case 'guu':
          return 'ГУУ'
        case 'rapDarkBlue':
          return 'РАП темно-синий'
        case 'rapBeige':
          return 'РАП бежевый'
        case 'fable':
          return 'Сказка'
        case 'fantasy':
          return 'Фантазия'
        case 'summer':
          return 'Лето'
        case 'star':
          return 'Звездочка'
        case 'maple':
          return 'Клен'
        case 'numbers':
          return 'Числа'
        case 'zodiac':
          return 'Знаки Зодиака'
        case 'release':
          return 'Выпуск'
        case 'quarter':
          return 'Квартал'
        case 'oldPiter':
          return 'Старый Питер'
        case 'monochrome':
          return 'Монохром'
        case 'comics':
          return 'Комикс'
        case 'vmf':
          return 'ВМФ'
        case 'reportageDark':
          return 'Репортаж Темный'
        case 'reportageLight':
          return 'Репортаж Светлый'
        case 'mpva':
          return 'МПВА'
        case 'comboDeisgn':
          return 'Комбинированный дизайн'
        case 'customDesign':
          return 'Разработка дизайна'
        case 'phoenix548Blue':
          return 'Жар птица синяя (548 школа)'
        case 'phoenix548Brown':
          return 'Жар птица коричневая (548 школа)'
        case 'minimal':
          return 'Минимализм'
        case 'light':
          return 'Лайт'
        case 'scarletSails':
          return 'Алые Паруса'
        case 'paints':
          return 'Краски'
        case 'geometry':
          return 'Геометрия'
        case 'vkaMozh':
          return 'ВКА Можайского'
        case 'mvaArtillery':
          return 'МВА Артиллерии'
        case 'minimalUltra':
          return 'Минимализм Ультра'
        case 'rzd':
          return 'РЖД'
      }
    },

    localizeStatuses(status) {
      switch (status) {
        case 'photoDateApproved':
          return 'Cъемка назначена'
        case 'needAnotherPhotoDate':
          return 'Назначить доп съемку'
        case 'anotherPhotoDateApproved':
          return 'Доп съемка назначена'
        case 'photoDateChecked':
          return 'Съемка проведена'
        case 'onTheFormation':
          return 'На формировании'
        case 'onDesign':
          return 'В отделе дизайна'
        case 'onTheClientApprove':
          return 'На сверке у клиента'
        case 'onEdits':
          return 'Заказ на правках'
        case 'onProduction':
          return 'В производствe'
        case 'done':
          return 'Заказ готов'
        case 'closed':
          return 'Заказ закрыт'
      }
    },

    localizeRoles(role) {
      switch (role) {
        case 'superadmin':
          return 'Администратор'
        case 'admin':
          return 'Менеджер'
        case 'user':
          return 'Клиент'
        case 'photographer':
          return 'Фотограф'
        case 'designer':
          return 'Дизайнер'
      }
    },
  },
}
