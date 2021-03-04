# MY TODOS
Todos project with Laravel + vue/vuex

## Usage

1 - Clone your project

2 - Go to the folder application using cd command on your cmd or terminal

3 - Run `composer install` on your cmd or terminal

4 - Copy `.env.example` file to `.env` on the root folder. You can type `copy .env.example .env` if using command prompt Windows or `cp .env.example .env` if using terminal, Ubuntu

5 - Open your `.env` file and change the database name (`DB_DATABASE`) to whatever you have, username (`DB_USERNAME`) and password (`DB_PASSWORD`) field correspond to your configuration.
By default, the username is `root` and you can leave the password field empty. (This is for Xampp)
By default, the username is `root` and password is also `root`. (This is for Lamp)

6 - Run `php artisan key:generate`

7 - Run `php artisan migrate:fresh --seed` to migrate the tables to the database, `--seed` option to fill table

8 - Run `php artisan serve`

9 - [Go to](localhost:8000)

## Demo pictuers

![pic1](pic1.png)

![pic2](pic2.png)
