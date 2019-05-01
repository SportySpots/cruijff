const sanitizeChatkitServerError = exc => (
  (exc.info && exc.info.error_description) || 'Unexpected error'
);

export default sanitizeChatkitServerError;
