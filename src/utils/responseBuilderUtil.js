/**
 * Build a standardized response payload for success and error scenarios.
 *
 * @class
 */
class ResponseBuilderUtil {
    /**
     * Build a success response payload.
     *
     * @static
     * @param {string} message - The success message.
     * @param {Object} data - Additional data to include in the response.
     * @returns {Object} - The success response payload.
     */
    static buildSuccess(message, data = {}) {
      return {
        status: 'success',
        message,
        ...data,
      };
    }
  
    /**
     * Build an error response payload.
     *
     * @static
     * @param {string} message - The error message.
     * @param {Object} error - The error object.
     * @returns {Object} - The error response payload.
     */
    static buildError(message, error) {
      return {
        status: 'error',
        message,
        ...error,
      };
    }
  }
  
  module.exports = ResponseBuilderUtil;
  