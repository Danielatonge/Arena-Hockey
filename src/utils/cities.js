const cities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", "Нижний Новгород", "Челябинск", "Самара", "Омск", "Ростов-на-Дону", "Уфа", "Красноярск", "Воронеж", "Пермь", "Волгоград", "Краснодар", "Саратов", "Тюмень", "Тольятти", "Ижевск", "Барнаул", "Ульяновск", "Иркутск", "Хабаровск", "Махачкала", "Ярославль", "Владивосток", "Оренбург", "Томск", "Кемерово", "Новокузнецк", "Рязань", "Набережные Челны", "Астрахань", "Киров", "Пенза", "Балашиха", "Липецк", "Чебоксары", "Калининград", "Тула", "Севастополь", "Ставрополь", "Курск", "Улан-Удэ", "Сочи", "Тверь", "Магнитогорск", "Иваново", "Брянск", "Белгород", "Сургут", "Владимир", "Чита", "Архангельск", "Нижний Тагил", "Симферопoль", "Калуга", "Якутск", "Грозный", "Волжский", "Смоленск", "Саранск", "Череповец", "Курган", "Подольск", "Вологда", "Орёл", "Владикавказ", "Тамбов", "Мурманск", "Петрозаводск", "Нижневартовск", "Кострома", "Йошкар-Ола", "Новороссийск", "Стерлитамак", "Химки", "Таганрог", "Мытищи", "Сыктывкар", "Комсомольск-на-Амуре", "Нижнекамск", "Нальчик", "Шахты", "Дзержинск", "Энгельс", "Благовещенск", "Королёв", "Братск", "Великий Новгород", "Орск", "Старый Оскол", "Ангарск", "Псков", "Люберцы", "Южно-Сахалинск", "Бийск", "Прокопьевск", "Абакан", "Армавир", "Балаково", "Норильск", "Рыбинск", "Северодвинск", "Петропавловск-Камчатский", "Красногорск", "Уссурийск", "Волгодонск", "Новочеркасск", "Сызрань", "Каменск-Уральский", "Златоуст", "Альметьевск", "Электросталь", "Керчь", "Миасс", "Салават", "Хасавюрт", "Пятигорск", "Копейск", "Находка", "Рубцовск", "Майкоп", "Коломна", "Березники", "Одинцово", "Домодедово", "Ковров", "Нефтекамск", "Каспийск", "Нефтеюганск", "Кисловодск", "Новочебоксарск", "Батайск", "Щёлково", "Дербент", "Серпухов", "Назрань", "Раменское", "Черкесск", "Новомосковск", "Кызыл", "Первоуральск", "Новый Уренгой", "Орехово-Зуево", "Долгопрудный", "Обнинск", "Невинномысск", "Ессентуки", "Октябрьский", "Димитровград", "Пушкино", "Камышин", "Ноябрьск", "Евпатория", "Реутов", "Жуковский", "Северск", "Муром", "Новошахтинск", "Артём", "Ачинск", "Бердск", "Элиста", "Арзамас", "Ханты-Мансийск", "Ногинск", "Елец", "Железногорск", "Зеленодольск", "Новокуйбышевск", "Сергиев Посад", "Тобольск", "Воткинск", "Саров", "Междуреченск", "Михайловск", "Серов", "Сарапул", "Анапа", "Ленинск-Кузнецкий", "Ухта", "Воскресенск", "Соликамск", "Глазов", "Магадан", "Великие Луки", "Мичуринск", "Лобня", "Гатчина", "Канск", "Каменск-Шахтинский", "Губкин", "Бузулук", "Киселёвск", "Ейск", "Ивантеевка", "Новотроицк", "Чайковский", "Бугульма", "Юрга", "Кинешма", "Азов", "Кузнецк", "Усть-Илимск", "Новоуральск", "Клин", "Видное", "Мурино", "Ялта", "Озёрск", "Кропоткин", "Бор", "Всеволожск", "Геленджик", "Черногорск", "Усолье-Сибирское", "Балашов", "Новоалтайск", "Дубна", "Шадринск", "Верхняя Пышма", "Выборг", "Елабуга", "Минеральные Воды", "Егорьевск", "Троицк", "Чехов", "Чапаевск", "Белово", "Биробиджан", "Когалым", "Кирово-Чепецк", "Дмитров", "Туймазы", "Славянск-на-Кубани", "Феодосия", "Минусинск", "Сосновый Бор", "Наро-Фоминск", "Анжеро-Судженск", "Кстово", "Сунжа", "Буйнакск", "Ступино", "Георгиевск", "Заречный", "Горно-Алтайск", "Белогорск", "Белорецк", "Кунгур", "Ишим", "Урус-Мартан", "Ишимбай", "Павловский Посад", "Клинцы", "Гуково", "Россошь", "Асбест", "Котлас", "Зеленогорск", "Донской", "Лениногорск", "Избербаш", "Туапсе", "Вольск", "Ревда", "Будённовск", "Берёзовский", "Сибай", "Полевской", "Лыткарино", "Лысьва", "Кумертау", "Белебей", "Нерюнгри", "Лесосибирск", "Фрязино", "Сертолово", "Чистополь", "Прохладный", "Борисоглебск", "Нягань", "Лабинск", "Крымск", "Тихвин", "Гудермес", "Алексин", "Александров", "Михайловка", "Ржев", "Щёкино", "Тихорецк", "Сальск", "Шали", "Павлово", "Шуя", "Мелеуз", "Краснотурьинск", "Искитим", "Североморск", "Апатиты", "Свободный", "Выкса", "Лиски", "Дзержинский", "Волжск", "Вязьма", "Воркута", "Гусь-Хрустальный", "Снежинск", "Краснокамск", "Арсеньев", "Краснокаменск", "Белореченск", "Салехард", "Жигулёвск", "Котельники", "Тимашёвск", "Кириши"];
export default cities;