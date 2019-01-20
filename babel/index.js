'use strict';

const objection = require('../lib/objection');
const NativeModel = objection.Model;
const NativeQueryBuilder = objection.QueryBuilder;

function Model() {}

Model.prototype = Object.create(NativeModel.prototype);
Model.prototype.constructor = NativeModel;
Object.setPrototypeOf(Model, NativeModel);

function QueryBuilder(...args) {
  NativeQueryBuilder.init(this, ...args);
}

QueryBuilder.prototype = Object.create(NativeQueryBuilder.prototype);
QueryBuilder.prototype.constructor = NativeQueryBuilder;
Object.setPrototypeOf(QueryBuilder, NativeQueryBuilder);

Model.QueryBuilder = QueryBuilder;

module.exports = Object.assign(Object.create(objection), {
  Model,
  QueryBuilder
})
