interface Value<T> {
  type: "value";
  value: T;
}

interface ErrorR<E extends Error> {
  type: "errorr";
  error: E;
}

type Result<T, E extends Error> = Value<T> | ErrorR<E>;

class ResultClass<T, E extends Error> {
  constructor(public result: Result<T, E>) {}

  static value<T>(value: T): ResultClass<T, any> {
    return new ResultClass({
      type: "value",
      value
    });
  }

  static error<E extends Error>(error: E): ResultClass<any, E> {
    return new ResultClass({
      type: "errorr",
      error
    });
  }

  public unwrap(): T {
    switch (this.result.type) {
      case "value":
        return this.result.value;
      case "errorr":
        throw this.result.error;
    }
  }

  public map<S>(f: (T) => S): ResultClass<S, E> {
    switch (this.result.type) {
      case "value":
        return new ResultClass<S, E>({
          type: "value",
          value: f(this.result.value)
        });
      case "errorr":
        return new ResultClass<S, E>(this.result);
    }
  }

  public valueOrDefault(d: T): T {
    switch (this.result.type) {
      case "value":
        return this.result.value;
      case "errorr":
        return d;
    }
  }
}

/**
 *
 * TEST FUNCTION
 * https://roll20.net/compendium/dnd5e/Dwarf#content
 * @param {Number} height
 * @returns {ResultClass<Number, Error>}
 */
function areYouADwarf(height: Number): ResultClass<Number, Error> {
  if (height > 150) {
    return ResultClass.value(height);
  }
  return ResultClass.error(new Error("Yes, you are a dwarf"));
}

const result = areYouADwarf(180).unwrap();
console.log("result", result);
