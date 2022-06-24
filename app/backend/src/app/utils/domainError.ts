import StatusCode from './enums/statusCode';
import StatusMessage from './enums/statusMessage';

type TypeDomainError = {
  code: number
  message: string
};

class DomainError extends Error {
  code: StatusCode;

  constructor(code: StatusCode, message: StatusMessage) {
    super(message);
    this.code = code;
  }

  static isDomainError(err: TypeDomainError) {
    return err instanceof DomainError;
  }
}

export default DomainError;
