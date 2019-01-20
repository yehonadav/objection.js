'use strict';

const { Model: NativeModel } = require('./model/Model');
const { QueryBuilder: NativeQueryBuilder } = require('./queryBuilder/QueryBuilder');
const { QueryBuilderBase } = require('./queryBuilder/QueryBuilderBase');
const { QueryBuilderOperation } = require('./queryBuilder/operations/QueryBuilderOperation');
const { RelationExpression } = require('./queryBuilder/RelationExpression');
const { ValidationError } = require('./model/ValidationError');
const { NotFoundError } = require('./model/NotFoundError');
const { AjvValidator } = require('./model/AjvValidator');
const { Validator } = require('./model/Validator');
const { Relation } = require('./relations/Relation');
const { HasOneRelation } = require('./relations/hasOne/HasOneRelation');
const { HasManyRelation } = require('./relations/hasMany/HasManyRelation');
const { BelongsToOneRelation } = require('./relations/belongsToOne/BelongsToOneRelation');
const { HasOneThroughRelation } = require('./relations/hasOneThrough/HasOneThroughRelation');
const { ManyToManyRelation } = require('./relations/manyToMany/ManyToManyRelation');
const { transaction } = require('./transaction');

const {
  snakeCaseMappers,
  knexSnakeCaseMappers,
  knexIdentifierMapping
} = require('./utils/identifierMapping');
const { compose, mixin } = require('./utils/mixin');
const { ref } = require('./queryBuilder/ReferenceBuilder');
const { lit } = require('./queryBuilder/LiteralBuilder');
const { raw } = require('./queryBuilder/RawBuilder');

// Some people still (year 2019) insist on transpiling all their
// node code to ES5. We need to wrap the classes people inherit
// from with ES5 classes or there will be errors.
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

module.exports = {
  Model,
  QueryBuilder,
  QueryBuilderBase,
  QueryBuilderOperation,
  RelationExpression,
  ValidationError,
  NotFoundError,
  AjvValidator,
  Validator,
  Relation,
  HasOneRelation,
  HasManyRelation,
  BelongsToOneRelation,
  HasOneThroughRelation,
  ManyToManyRelation,

  transaction,
  compose,
  mixin,
  ref,
  lit,
  raw,

  snakeCaseMappers,
  knexSnakeCaseMappers,
  knexIdentifierMapping
};

Object.defineProperties(module.exports, {
  Promise: {
    enumerable: true,

    get: () => {
      console.log(
        'objection.Promise is deprecated and will be removed in 2.0.0. Bluebird dependency will be removed in 2.0.0.'
      );
      return require('bluebird');
    }
  },

  lodash: {
    enumerable: true,

    get: () => {
      console.log(
        'objection.lodash is deprecated and will be removed in 2.0.0. lodash dependency will be removed in 2.0.0.'
      );
      return require('lodash');
    }
  }
});
