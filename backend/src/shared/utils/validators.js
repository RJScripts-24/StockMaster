// shared/utils/validators.js
// Validation helpers using Joi for request payload validation
// Reference spec: /mnt/data/StockMaster.pdf (local file: /mnt/data/StockMaster.pdf)

const Joi = require('joi');

/**
 * Generic middleware to validate req.body / req.query / req.params
 * usage: router.post('/', validate({ body: schema }), handler)
 */
function validate(schemas = {}) {
  return (req, res, next) => {
    try {
      const toValidate = {};
      if (schemas.params) toValidate.params = req.params;
      if (schemas.query) toValidate.query = req.query;
      if (schemas.body) toValidate.body = req.body;

      const combinedSchema = Joi.object({
        params: schemas.params || Joi.any(),
        query: schemas.query || Joi.any(),
        body: schemas.body || Joi.any(),
      }).options({ allowUnknown: false, abortEarly: false });

      const { error, value } = combinedSchema.validate(toValidate, { stripUnknown: true });
      if (error) {
        const details = error.details.map((d) => ({ message: d.message, path: d.path }));
        const err = new Error('Validation failed');
        err.statusCode = 400;
        err.errors = details;
        throw err;
      }

      // Overwrite sanitized values back to req
      if (value.params) req.params = value.params;
      if (value.query) req.query = value.query;
      if (value.body) req.body = value.body;

      next();
    } catch (err) {
      next(err);
    }
  };
}

// Common param validators
const idParam = Joi.object({
  id: Joi.number().integer().positive().required(),
});

// Pagination/query schema
const paginationSchema = Joi.object({
  page: Joi.number().integer().positive().default(1),
  limit: Joi.number().integer().positive().default(25),
  sortBy: Joi.string().optional(),
  sortDir: Joi.string().valid('asc', 'desc').optional(),
});

// Product create/update schema
const productSchema = Joi.object({
  name: Joi.string().trim().min(1).max(255).required(),
  sku: Joi.string().trim().max(64).required(),
  categoryId: Joi.number().integer().positive().allow(null),
  unit: Joi.string().trim().max(32).required(),
  initialStock: Joi.number().integer().min(0).optional(),
});

// Transfer schema
const transferSchema = Joi.object({
  fromWarehouseId: Joi.number().integer().positive().required(),
  toWarehouseId: Joi.number().integer().positive().required(),
  items: Joi.array().items(Joi.object({
    productId: Joi.number().integer().positive().required(),
    quantity: Joi.number().integer().positive().required(),
    fromLocationId: Joi.number().integer().positive().allow(null),
    toLocationId: Joi.number().integer().positive().allow(null),
  })).min(1).required(),
  notes: Joi.string().max(1000).allow(null, ''),
});

// Adjustment schema
const adjustmentSchema = Joi.object({
  warehouseId: Joi.number().integer().positive().allow(null),
  locationId: Joi.number().integer().positive().allow(null),
  reason: Joi.string().max(500).allow(null, ''),
  items: Joi.array().items(Joi.object({
    productId: Joi.number().integer().positive().required(),
    countedQuantity: Joi.number().integer().min(0).required(),
    note: Joi.string().max(255).allow(null, ''),
  })).min(1).required(),
});

// Receipt / Delivery simple schemas
const receiptSchema = Joi.object({
  supplierId: Joi.number().integer().positive().required(),
  warehouseId: Joi.number().integer().positive().required(),
  items: Joi.array().items(Joi.object({ productId: Joi.number().integer().positive().required(), quantity: Joi.number().integer().positive().required() })).min(1).required(),
});

const deliverySchema = Joi.object({
  customerId: Joi.number().integer().positive().required(),
  warehouseId: Joi.number().integer().positive().required(),
  items: Joi.array().items(Joi.object({ productId: Joi.number().integer().positive().required(), quantity: Joi.number().integer().positive().required() })).min(1).required(),
});

module.exports = {
  validate,
  idParam,
  paginationSchema,
  productSchema,
  transferSchema,
  adjustmentSchema,
  receiptSchema,
  deliverySchema,
};