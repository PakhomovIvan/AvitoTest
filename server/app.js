const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
}

const app = express()

app.use(cors())
app.use(bodyParser.json())

// In-memory хранилище для объявлений
// let items = [
//   {
//     id: 100,
//     name: 'Toyota Camry',
//     description: 'Отличное состояние',
//     location: 'Новосибирск',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/dddddd/000000',
//     brand: 'Toyota',
//     model: 'Supra',
//     year: 2003,
//     mileage: 100617,
//   },
//   {
//     id: 200,
//     name: 'Квартира с отличным ремонтом',
//     description: 'Современная квартира с ремонтом',
//     location: 'Санкт-Петербург',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/dddddd/000000',
//     propertyType: 'Квартира',
//     area: 248,
//     rooms: 2,
//     price: 414306,
//   },
//   {
//     id: 300,
//     name: 'Услуги по ремонту',
//     description: 'Индивидуальный подход',
//     location: 'Ростов-на-Дону',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/cc0000/ffffff',
//     serviceType: 'Креатив',
//     experience: 14,
//     cost: 16087,
//     workSchedule: '9:30-18:30',
//   },
//   {
//     id: 400,
//     name: 'Chevrolet Silverado',
//     description: 'Компактный и удобный в городской среде',
//     location: 'Казань',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/ff4444/ffffff',
//     brand: 'Laser',
//     model: '90',
//     year: 1988,
//     mileage: 33949,
//   },
//   {
//     id: 500,
//     name: 'Квартира с камином и джакузи',
//     description: 'Студия с мебелью и бытовой техникой',
//     location: 'Санкт-Петербург',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     propertyType: 'Квартира',
//     area: 252,
//     rooms: 2,
//     price: 810043,
//   },
//   {
//     id: 600,
//     name: 'Курсы макияжа',
//     description: 'Консультации специалистов',
//     location: 'Новосибирск',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/cc0000/ffffff',
//     serviceType: 'Таргетинг',
//     experience: 12,
//     cost: 37826,
//     workSchedule: '7:00-15:00',
//   },
//   {
//     id: 700,
//     name: 'Chevrolet Silverado',
//     description: 'Легкий в управлении',
//     location: 'Челябинск',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/dddddd/000000',
//     brand: 'Uplander',
//     model: 'Golf',
//     year: 2006,
//     mileage: 101095,
//   },
//   {
//     id: 800,
//     name: 'Квартира с камином и джакузи',
//     description: 'Светлая квартира с балконом',
//     location: 'Нижний Новгород',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     propertyType: 'Квартира',
//     area: 247,
//     rooms: 6,
//     price: 353585,
//   },
//   {
//     id: 900,
//     name: 'Разработка логотипов',
//     description: 'Гибкая система скидок',
//     location: 'Москва',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/dddddd/000000',
//     serviceType: 'Пиар',
//     experience: 7,
//     cost: 55162,
//     workSchedule: 'Пн-Пт',
//   },
//   {
//     id: 1000,
//     name: 'Toyota Camry',
//     description: 'мощный двигатель',
//     location: 'Ростов-на-Дону',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     brand: 'Trans Sport',
//     model: 'SRX',
//     year: 1992,
//     mileage: 40785,
//   },
//   {
//     id: 1100,
//     name: 'Трехкомнатная квартира с ремонтом',
//     description: 'Просторная квартира в центре города',
//     location: 'Москва',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/ff4444/ffffff',
//     propertyType: 'Квартира',
//     area: 21,
//     rooms: 4,
//     price: 533021,
//   },
//   {
//     id: 1200,
//     name: 'Ремонт автомобилей',
//     description: 'Бесплатная консультация',
//     location: 'Нижний Новгород',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     serviceType: 'СММ',
//     experience: 10,
//     cost: 22591,
//     workSchedule: 'Пн-Ср',
//   },
//   {
//     id: 1300,
//     name: 'Ford F-150',
//     description: 'Экономичный автомобиль',
//     location: 'Ростов-на-Дону',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/ff4444/ffffff',
//     brand: 'Range Rover Sport',
//     model: 'Defender Ice Edition',
//     year: 2006,
//     mileage: 25551,
//   },
//   {
//     id: 1400,
//     name: 'Студия с отличным расположением',
//     description: 'Удобная квартира с отличным расположением',
//     location: 'Новосибирск',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/cc0000/ffffff',
//     propertyType: 'Квартира',
//     area: 239,
//     rooms: 5,
//     price: 335054,
//   },
//   {
//     id: 1500,
//     name: 'Фотосъемка мероприятий',
//     description: 'Эксклюзивные предложения',
//     location: 'Москва',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/dddddd/000000',
//     serviceType: 'СММ',
//     experience: 12,
//     cost: 37519,
//     workSchedule: '9:00-18:00',
//   },
//   {
//     id: 1600,
//     name: 'Honda Civic',
//     description: 'Надежный и проверенный временем',
//     location: 'Ростов-на-Дону',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/cc0000/ffffff',
//     brand: 'Corvette',
//     model: 'S60',
//     year: 1959,
//     mileage: 44697,
//   },
//   {
//     id: 1700,
//     name: 'Квартира в центре',
//     description: 'Уютная студия с видом на парк',
//     location: 'Нижний Новгород',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/cc0000/ffffff',
//     propertyType: 'Квартира',
//     area: 229,
//     rooms: 5,
//     price: 140606,
//   },
//   {
//     id: 1800,
//     name: 'Разработка логотипов',
//     description: 'Профессиональные консультации',
//     location: 'Челябинск',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     serviceType: 'Продвижение',
//     experience: 7,
//     cost: 69370,
//     workSchedule: '8:30-17:30',
//   },
//   {
//     id: 1900,
//     name: 'Toyota Camry',
//     description: 'Продается новый автомобиль',
//     location: 'Новосибирск',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     brand: 'Mustang',
//     model: 'Malibu',
//     year: 1997,
//     mileage: 138801,
//   },
//   {
//     id: 2000,
//     name: 'Квартира с собственной баней',
//     description: 'Элегантная квартира в сталинском доме',
//     location: 'Нижний Новгород',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/ff4444/ffffff',
//     propertyType: 'Квартира',
//     area: 56,
//     rooms: 4,
//     price: 278055,
//   },
//   {
//     id: 2100,
//     name: 'Консультации по дизайну',
//     description: 'Инновационные методы работы',
//     location: 'Москва',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     serviceType: 'Продвижение',
//     experience: 14,
//     cost: 89288,
//     workSchedule: 'Вт-Чт',
//   },
//   {
//     id: 2200,
//     name: 'Ford F-150',
//     description: 'Подходит для дальних поездок и путешествий',
//     location: 'Ростов-на-Дону',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     brand: 'Elise',
//     model: '100',
//     year: 2007,
//     mileage: 104776,
//   },
//   {
//     id: 2300,
//     name: 'Просторная квартира с высокими потолками',
//     description: 'Просторная квартира в центре города',
//     location: 'Нижний Новгород',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/dddddd/000000',
//     propertyType: 'Квартира',
//     area: 57,
//     rooms: 7,
//     price: 793008,
//   },
//   {
//     id: 2400,
//     name: 'Консультации по дизайну',
//     description: 'Профессиональные консультации',
//     location: 'Ростов-на-Дону',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/ff4444/ffffff',
//     serviceType: 'СММ',
//     experience: 9,
//     cost: 89255,
//     workSchedule: '9:30-18:30',
//   },
//   {
//     id: 2500,
//     name: 'Honda Civic',
//     description: 'идеально для города',
//     location: 'Челябинск',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     brand: 'Voyager',
//     model: 'Passat',
//     year: 1998,
//     mileage: 67994,
//   },
//   {
//     id: 2600,
//     name: 'Эксклюзивная квартира с панорамным видом',
//     description: 'Студия с мебелью и бытовой техникой',
//     location: 'Нижний Новгород',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/dddddd/000000',
//     propertyType: 'Квартира',
//     area: 90,
//     rooms: 1,
//     price: 816221,
//   },
//   {
//     id: 2700,
//     name: 'Доставка цветов',
//     description: 'Гарантия качества',
//     location: 'Москва',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/cc0000/ffffff',
//     serviceType: 'Продвижение',
//     experience: 5,
//     cost: 64655,
//     workSchedule: 'Вт-Чт',
//   },
//   {
//     id: 2800,
//     name: 'Toyota Camry',
//     description: 'мощный двигатель',
//     location: 'Омск',
//     type: 'Авто',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     brand: 'V8 Vantage',
//     model: 'Azure',
//     year: 2009,
//     mileage: 99072,
//   },
//   {
//     id: 2900,
//     name: 'Квартира с собственной баней',
//     description: 'Двухуровневая квартира в новом доме',
//     location: 'Санкт-Петербург',
//     type: 'Недвижимость',
//     image: 'http://dummyimage.com/160x107.png/ff4444/ffffff',
//     propertyType: 'Квартира',
//     area: 197,
//     rooms: 6,
//     price: 191668,
//   },
//   {
//     id: 3000,
//     name: 'Фотосессии на природе',
//     description: 'Индивидуальные решения для вас',
//     location: 'Пермь',
//     type: 'Услуги',
//     image: 'http://dummyimage.com/160x107.png/5fa2dd/ffffff',
//     serviceType: 'Пиар',
//     experience: 3,
//     cost: 50399,
//     workSchedule: 'Пн-Пт',
//   },
// ]

let items = []

const makeCounter = () => {
  let count = 0
  return () => count++
}

const itemsIdCounter = makeCounter()

// Создание нового объявления
app.post('/items', (req, res) => {
  const { name, description, location, type, ...rest } = req.body

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: 'Missing required common fields' })
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Real estate' })
      }
      break
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Auto' })
      }
      break
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Services' })
      }
      break
    default:
      return res.status(400).json({ error: 'Invalid type' })
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    ...rest,
  }

  items.push(item)
  res.status(201).json(item)
})

// Получение всех объявлений
app.get('/items', (req, res) => {
  res.json(items)
})

// Получение объявления по его id
app.get('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10))
  if (item) {
    res.json(item)
  } else {
    res.status(404).send('Item not found')
  }
})

// Обновление объявления по его id
app.put('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10))
  if (item) {
    Object.assign(item, req.body)
    res.json(item)
  } else {
    res.status(404).send('Item not found')
  }
})

// Удаление объявления по его id
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id, 10))
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1)
    res.status(204).send()
  } else {
    res.status(404).send('Item not found')
  }
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
