# Fit Friends

FitFriends — это онлайн площадка для поиска тренировок и их заведения. Веб-приложение (сайт) функционирует как смесь
соцсети и биржи объявлений. Тренеры создают тренировки, а пользователи могут покупать их и заниматься, а в личном
кабинете отслеживать свой прогресс.

---

* Студент: [Константин Суриков](https://up.htmlacademy.ru/nodejs-api/2/user/598165).

---

## Памятка

``` bash
    npm install
```

 ``` bash
    docker-compose -f ./apps/api/docker-compose.yaml \
	-f ./apps/alert/docker-compose.yaml \
	-f ./apps/alert/docker-compose.yaml \
	-f ./apps/files/docker-compose.yaml \
	-f ./apps/gyms/docker-compose.yaml \
	-f ./apps/notification/docker-compose.yaml \
	-f ./apps/nutrition/docker-compose.yaml \
	-f ./apps/orders/docker-compose.yaml \
	-f ./apps/users/docker-compose.yaml \
	-f ./apps/workouts/docker-compose.yaml up -d
```

```bash
nx run gyms:db-migrate
nx run nutrition:db-migrate
nx run orders:db-migrate
nx run workouts:db-migrate
```

```bash
nx run gyms:db-generate   
nx run nutrition:db-generate
nx run orders:db-generate
nx run workouts:db-generate
```

```bash
nx run gyms:db-fill   
nx run nutrition:db-fill
nx run orders:db-fill
nx run workouts:db-fill
```

```bash
nx run-many --target=serve --projects=users,files,workouts,nutrition,notification,orders,gyms,alert,api --maxParallel=12
```

```bash
nx serve webpp
```

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном
онлайн‑курсе «[Node.js. Профессиональная разработка REST API](https://htmlacademy.ru/profession/fullstack)»
от[HTML Academy](https://htmlacademy.ru).
