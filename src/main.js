if (isDevelopment) {const selffile = require('./index.html')}
const css = require('./styles/app.style.scss')
const logoimg = require('./images/logo.jpg')
const angular = require('angular')

const isDevelopment = process.env.NODE_ENV !== 'production'

let imgTag = document.querySelector('img')
imgTag.src = logoimg

console.log("Hey webpack! and App.js something!")
angular.module("myapp", [])
.controller("HelloController", function($scope) {
  $scope.helloTo = {}
  $scope.helloTo.title = "AngularJS"
})