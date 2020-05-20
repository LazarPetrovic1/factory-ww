# Employment project for factory-worldwide

> Tasks

+ You should create a Vue.js application with two pages.
+ First should be on url '/'
+ On load this page should show 10 fields marked as A, B, C, D .... with value 3.
+ After page load every 2 seconds all field values should be changed randomly. Change is randomly calculated as a number between 1 and 2, with a random sign (-, +).
+ When adding the change to the previous value you should show an arrow pointing up or down, depending on the change sign  (arrow down is for -, arrow up is for +).
+ Under each field there should be a toggle button to disable/enable the change on that field.
+ Second should be on url '/statistics'
+ This page should show change statistics for all 10 fields.
+ Chart should should show value changes in time.
+ When going from '/' to '/statistics' all the changing should be paused, and on returning back it should be resumed.
+ You can choose any libraries you want

> Deadline for the task is May 22th.A Vue.js employment project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
