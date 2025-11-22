// src/events/domainEvents.js
// Central domain events bus for StockMaster
// Reference: /mnt/data/StockMaster.pdf

const EventEmitter = require('events');
const logger = require('../server/logger');

class DomainEvents extends EventEmitter {
  constructor() {
    super();
    // Increase max listeners because the app may register many module listeners
    this.setMaxListeners(50);
  }

  /**
   * Emit an event and wait for all listeners (if they return promises)
   * Listeners may be sync or return a Promise. This helper ensures we
   * await Promise results so callers can know when processing completed.
   *
   * @param {string} event
   * @param {any} payload
   * @returns {Promise<Array>} results from listeners
   */
  async emitAsync(event, payload) {
    const listeners = this.listeners(event);
    if (!listeners || listeners.length === 0) {
      // still emit so EventEmitter's internal behaviour works
      super.emit(event, payload);
      return [];
    }

    const promises = listeners.map((fn) => {
      try {
        const res = fn(payload);
        if (res && typeof res.then === 'function') return res;
        return Promise.resolve(res);
      } catch (err) {
        return Promise.reject(err);
      }
    });

    // Wait for all listener promises to settle, but do not fail-fast.
    const results = await Promise.allSettled(promises);

    // Log any failures
    results.forEach((r, idx) => {
      if (r.status === 'rejected') {
        logger.error(`domainEvent listener for event=${event} failed: ${r.reason && r.reason.message ? r.reason.message : r.reason}`);
      }
    });

    // Return array of fulfilled values (or rejection reasons) for introspection
    return results;
  }

  /**
   * Convenience method: publish an event (alias for emitAsync)
   */
  publish(event, payload) {
    return this.emitAsync(event, payload);
  }
}

// Instantiate a singleton bus
const domainEvents = new DomainEvents();

/**
 * Common event names used across the system
 */
const EVENTS = Object.freeze({
  RECEIPT_CREATED: 'receipt.created',
  RECEIPT_VALIDATED: 'receipt.validated',
  DELIVERY_CREATED: 'delivery.created',
  DELIVERY_VALIDATED: 'delivery.validated',
  TRANSFER_CREATED: 'transfer.created',
  TRANSFER_EXECUTED: 'transfer.executed',
  ADJUSTMENT_CREATED: 'adjustment.created',
  ADJUSTMENT_APPLIED: 'adjustment.applied',
  LEDGER_ENTRY_CREATED: 'ledger.entry.created',
  LOW_STOCK_ALERT: 'lowstock.alert',
  USER_CREATED: 'user.created',
});

/**
 * Helper to register an event listener with error handling
 * @param {string} event
 * @param {Function} handler - async or sync function(payload)
 */
function on(event, handler) {
  domainEvents.on(event, async (payload) => {
    try {
      await handler(payload);
    } catch (err) {
      logger.error(`domainEvents.on handler error for event=${event}: ${err && err.message ? err.message : err}`);
      // swallow to avoid crashing emitter; individual handlers should handle errors
    }
  });
}

/**
 * Helper to register a one-time handler
 */
function once(event, handler) {
  domainEvents.once(event, async (payload) => {
    try {
      await handler(payload);
    } catch (err) {
      logger.error(`domainEvents.once handler error for event=${event}: ${err && err.message ? err.message : err}`);
    }
  });
}

/**
 * Remove handler
 */
function off(event, handler) {
  domainEvents.removeListener(event, handler);
}

/**
 * Simple bootstrap: auto-register common listeners from modules if they export `registerDomainEvents` function.
 * Example module file could export:
 * module.exports.registerDomainEvents = (bus) => { bus.on(EVENTS.TRANSFER_EXECUTED, handler) }
 *
 * @param {Object} modulesMap - an object where keys are module names and values are module exports
 */
function bootstrapModuleListeners(modulesMap = {}) {
  Object.keys(modulesMap).forEach((modName) => {
    const mod = modulesMap[modName];
    if (mod && typeof mod.registerDomainEvents === 'function') {
      try {
        mod.registerDomainEvents({ bus: domainEvents, EVENTS });
        logger.info(`domainEvents.bootstrap: registered listeners from module=${modName}`);
      } catch (err) {
        logger.error(`domainEvents.bootstrap: failed to register listeners from module=${modName}: ${err.message}`);
      }
    }
  });
}

module.exports = {
  domainEvents,
  EVENTS,
  on,
  once,
  off,
  bootstrapModuleListeners,
};
