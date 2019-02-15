# Impulze

An impulsive reminder app based on recurring things that you need to be reminded about every so often.

## What is the point?

Ordinary reminder applications aren't really targeted at recurrent reminders happening every so often in a day, such as reminding yourself to drink water
or fixing your posture. Therefore, the minimum period for repeating a reminder is usually 1 day.

This is where Impulze comes to the rescue. You can create Impulzes which remind you about anything even once every minute.

You can see all your created Impulzes on the home screen of the app, from which you can also add new ones.

![Image of the application's home page](main_screen.png)

The reminders get sent as browser notifications to your operating system, so you will be prompted to enable notifications for this site in order to be reminded.

![Image of the application's home page](allow_notifications_prompt.png)

By using browser notifications we can achieve a reminder application, that you don't need to download, but keep in mind that some browsers (mostly older ones) do not support this feature.

## Setup instructions

For local development, you have to create and initialize a MongoDB database, add the mongoURI to the `config/keys.js` file and the `MONGODB_USERNAME` and `MONGODB_PASSWORD` of the user that has access to the database to the environment variables.

You also need to add a `JWT_SECRET` to your environment as well.

Then, go to the root of this project and run `yarn dev` or `npm run dev`.

## Team

Maintainer: Jaka Stavanja [@jstavanja](https://github.com/jstavanja)