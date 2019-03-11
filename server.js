require('dotenv').config();
const express = require('express');
const MongoDB = require('./data/mongo.js');

const flaggedUsers = new MongoDB;

