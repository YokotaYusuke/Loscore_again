(() => {
  "use strict";

  const isEven = (num) => {
    return num % 2 === 0;
  };

  const isOdd = (num) => {
    return !isEven(num);
  };
  // describeは関連するテストをグループ化するための関数
  describe("Basics", () => {
    describe("identity", () => {
      testForNativeMethods(() => {
        _.identity(100);
      });
      // itは文字列と関数（テストの内容：spec）を受け取る
      it("should return the value passed to it", () => {
        const obj = {};
        const arr = [];
        expect(_.identity(1)).toEqual(1); // expectはtrue,falseを判定する
        expect(_.identity("string")).toEqual("string");
        expect(_.identity(true)).toBeTruthy();
        expect(_.identity(obj)).toEqual(obj);
        expect(_.identity(arr)).toEqual(arr);
      });
    });
  });

  describe("Arrays", () => {
    describe("head", () => {
      testForNativeMethods(() => {
        _.head([4, 5, 56, 7]);
      });

      it("should return the head of an array", () => {
        expect(_.head([1, 2, 3])).toEqual(1);
        expect(_.head([])).toBe(undefined);
      });

      it("should not alter arguments", () => {
        expect(() => _.head(Object.freeze([1, 2, 3]))).not.toThrowError();
      });
    });

    describe("tail", () => {
      testForNativeMethods(() => {
        _.tail([4, 5, 56, 7], 2);
      });

      it("should return everything but the first element", () => {
        expect(_.tail([1, 2, 3])).toEqual([2, 3]);
        expect(_.tail([1])).toEqual([]);
        expect(_.tail([5, 6, 7])).toEqual([6, 7]);
      });

      it("should not alter arguments", () => {
        expect(() => _.tail(Object.freeze([1, 2, 3]))).not.toThrowError();
      });
    });

    describe("take", () => {
      testForNativeMethods(() => {
        _.take([4, 5, 56, 7], 2);
      });
      it("should retrieve the correct elements from beginning", () => {
        expect(_.take([1, 2, 3])).toEqual([1]);
        expect(_.take([1, 2, 3], 2)).toEqual([1, 2]);
        expect(_.take([1, 2, 3], 5)).toEqual([1, 2, 3]);
        expect(_.take([1, 2, 3], 0)).toEqual([]);
      });
      it("should not alter arguments", () => {
        expect(() => _.take(Object.freeze([1, 2, 3]))).not.toThrowError();
      });
    });

    describe("takeRight", () => {
      testForNativeMethods(() => {
        _.takeRight([4, 5, 56, 7], 2);
      });

      it("should retrieve the correct elements from end", () => {
        expect(_.takeRight([1, 2, 3])).toEqual([3]);
        expect(_.takeRight([1, 2, 3], 2)).toEqual([2, 3]);
        expect(_.takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
        expect(_.takeRight([1, 2, 3], 0)).toEqual([]);
      });
      it("should not alter arguments", () => {
        expect(() => _.takeRight(Object.freeze([1, 2, 3]))).not.toThrowError();
      });
    });

    describe("uniq", () => {
      testForNativeMethods(() => {
        _.uniq([1, 2, 3, 4]);
      });

      it("should not mutate the input array", () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.uniq(input);

        /*
          We should avoid mutation of inputs/arguments in general unless
          you have a VERY good reason. Mutating inputs makes it a lot harder
          to debug your code and find bugs and it can also just be downright confusing
          to read!
        */

        expect(input).toEqual([1, 2, 3, 4, 5]);
      });

      it("should not alter arguments", () => {
        expect(() =>
          _.uniq(Object.freeze([1, 2, 3, 3, 3, 3, 2, 2, 4]))
        ).not.toThrowError();
      });

      it("should return all unique values contained in an unsorted array", () => {
        const numbers = [5, 3, 2, 1, 5, 6, 1, 3];
        expect(_.uniq(numbers)).toEqual([5, 3, 2, 1, 6]);
        expect(_.uniq([1, 1, 2, 3])).toEqual([1, 2, 3]);
        expect(_.uniq([5, 5, 3, 3, 5, 6, 9])).toEqual([5, 3, 6, 9]);
      });
    });
  });

  describe("Collections", () => {
    describe("size", () => {
      testForNativeMethods(() => {
        _.size([1, 2, 3, 4]);
      });
      it("should return the length of an array", () => {
        expect(_.size([1, 2, 3])).toEqual(3);
      });
      it("should return the size of an object", () => {
        expect(
          _.size({
            a: 1,
            b: 2,
          })
        ).toEqual(2);
      });
      it("should return length of a string", () => {
        expect(_.size("hello world")).toEqual(11);
      });
    });

    describe("each", () => {
      testForNativeMethods(() => {
        _.each([1, 2, 3, 4], () => {});
      });

      it("should not return anything", () => {
        const returnValue = _.each([], () => {});
        expect(returnValue).not.toBeDefined();
      });

      it("should not mutate the input array", () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.each(input, (item) => {});

        /*
          We should avoid mutation of inputs/arguments in general unless
          you have a VERY good reason. Mutating inputs makes it a lot harder
          to debug your code and find bugs and it can also just be downright confusing
          to read!
        */

        expect(input).toEqual([1, 2, 3, 4, 5]);
      });

      it("should iterate over arrays and provide access to each value", () => {
        const array = ["a", "b", "c"];
        const iterations = [];

        _.each(array, (l) => {
          iterations.push(l);
        });

        expect(iterations).toEqual(["a", "b", "c"]);
      });

      it("should iterate over arrays and provide access to each index", () => {
        const array = ["a", "b", "c"];
        const iterations = [];

        _.each(array, (l, i) => {
          iterations.push(i);
        });

        expect(iterations).toEqual([0, 1, 2]);
      });

      it("should iterate over arrays and provide access to the original collection", () => {
        const array = ["a", "b", "c"];
        const iterations = [];

        _.each(array, (l, i, collection) => {
          iterations.push(collection);
        });

        expect(iterations).toEqual([array, array, array]);
      });

      it("should only iterate over numeric keys of an array, not all properties", () => {
        const array = ["a", "b", "c"];
        const iterations = {};
        array.testFoo = "OH NO!";

        _.each(array, (l, i, collection) => {
          iterations[l] = i;
        });

        expect(iterations["OH NO!"]).not.toBeDefined();
      });

      it("should iterate over objects and provide access to each value", () => {
        const obj = {
          z: "a",
          x: "b",
          y: "c",
        };
        const iterations = [];

        _.each(obj, (value) => {
          iterations.push(value);
        });

        expect(iterations).toEqual(["a", "b", "c"]);
      });

      it("should iterate over objects and provide access to each key", () => {
        const obj = {
          z: "a",
          x: "b",
          y: "c",
        };
        const iterations = [];

        _.each(obj, (value, key) => {
          iterations.push(key);
        });

        expect(iterations).toEqual(["z", "x", "y"]);
      });

      it("should iterate over objects and provide access to the original object", () => {
        const obj = {
          z: "a",
          x: "b",
          y: "c",
        };
        const iterations = [];

        _.each(obj, (value, key, object) => {
          iterations.push(object);
        });

        expect(iterations).toEqual([obj, obj, obj]);
      });

      it("should not confuse an object with a length property for an array", () => {
        const person = {
          height: 170,
          weight: 57,
          length: 80,
        };
        const iterations = [];

        _.each(person, (value, key, object) => {
          iterations.push([value, key, object]);
        });

        expect(iterations).toEqual([
          [170, "height", person],
          [57, "weight", person],
          [80, "length", person],
        ]);
      });
    });

    describe("indexOf", () => {
      testForNativeMethods(() => {
        _.indexOf([1, 2, 3, 4], 4);
      });

      it("should use _.each", () => {
        spyOn(_, "each");
        const numbers = [1, 2, 3];
        _.indexOf(numbers, 3);
        expect(_.each).toHaveBeenCalled();
      });

      it("should find 1 in the list", () => {
        const numbers = [1, 2, 3];
        expect(_.indexOf(numbers, 1)).toEqual(0);
      });

      it("should find 2 in the list", () => {
        const numbers = [1, 2, 3];
        expect(_.indexOf(numbers, 2)).toEqual(1);
      });

      it("should find 3 in the list", () => {
        const numbers = [1, 2, 3];
        expect(_.indexOf(numbers, 3)).toEqual(2);
      });

      it("should find the first matching instance in the list", () => {
        const numbers = [4, 4, 5, 5, 6, 5, 4];
        expect(_.indexOf(numbers, 5)).toEqual(2);
      });

      it("returns -1 when the target cannot be found", () => {
        const numbers = [1, 2, 3];
        expect(_.indexOf(numbers, 4)).toEqual(-1);
      });
    });

    describe("map", () => {
      testForNativeMethods(() => {
        _.map([1, 2, 3, 4], (num) => {
          return num * 2;
        });
      });

      it("should not mutate the input array", () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.map(input, _.identity);
        expect(input).toEqual([1, 2, 3, 4, 5]);
      });

      it("should run a function through every given element in array", () => {
        const result = _.map([1, 2, 3], (num) => {
          return num + 2;
        });

        expect(result).toEqual([3, 4, 5]);
      });

      it("should use each in its code", () => {
        spyOn(_, "each");
        _.map([1, 2, 3], _.identity);
        expect(_.each).toHaveBeenCalled();
      });

      it("should produce a brand new array", () => {
        const numbers = [1, 2, 3];
        const result = _.map(numbers, _.identity);
        expect(result === numbers).toBeFalsy();
      });
    });

    describe("filter", () => {
      testForNativeMethods(() => {
        _.filter([1, 2, 3, 4], isEven);
      });

      it("should return all even numbers in an array", () => {
        const evens = _.filter([1, 2, 3, 4, 5, 6], isEven);
        expect(evens).toEqual([2, 4, 6]);
      });

      it("should return all odd numbers in an array", () => {
        const odds = _.filter([1, 2, 3, 4, 5, 6], isOdd);
        expect(odds).toEqual([1, 3, 5]);
      });

      it("should use each in its solution", () => {
        spyOn(_, "each");
        _.filter([1, 2, 3], isEven);
        expect(_.each).toHaveBeenCalled();
      });

      it("should produce a brand new array", () => {
        const numbers = [1, 2, 3, 4, 5, 6];
        const evens = _.filter(numbers, isOdd);
        expect(evens).not.toEqual(numbers);
      });
    });

    describe("reject", () => {
      testForNativeMethods(() => {
        _.reject([1, 2, 3, 4], isEven);
      });

      it("should reject all even numbers", () => {
        const odds = _.reject([1, 2, 3, 4, 5, 6], isEven);
        expect(odds).toEqual([1, 3, 5]);
      });

      it("should reject all odd numbers", () => {
        const evens = _.reject([1, 2, 3, 4, 5, 6], isOdd);
        expect(evens).toEqual([2, 4, 6]);
      });

      it("should use filter in its solution", () => {
        spyOn(_, "filter");
        _.reject([1, 2, 3], isEven);
        expect(_.filter).toHaveBeenCalled();
      });

      it("should produce a brand new array", () => {
        const numbers = [1, 2, 3, 4, 5, 6];
        const odds = _.reject(numbers, isOdd);
        expect(odds).not.toEqual(numbers);
      });
    });

    describe("pluck", () => {
      testForNativeMethods(() => {
        _.pluck(
          [
            {
              a: 1,
              b: 2,
            },
            {
              a: 3,
              b: 4,
            },
          ],
          "b"
        );
      });

      let pets;
      beforeEach(() => {
        pets = [
          {
            type: "cat",
            name: "Fluffy",
          },
          {
            type: "fish",
            name: "Nemo",
          },
          {
            type: "dog",
            name: "Spot",
          },
        ];
      });

      it("should return the correct values", () => {
        expect(_.pluck(pets, "name")).toEqual(["Fluffy", "Nemo", "Spot"]);
      });

      it("should not change the original array", () => {
        _.pluck(pets, "name");
        expect(pets).toEqual([
          {
            type: "cat",
            name: "Fluffy",
          },
          {
            type: "fish",
            name: "Nemo",
          },
          {
            type: "dog",
            name: "Spot",
          },
        ]);
      });
      it("should NOT use _.each", () => {
        spyOn(_, "each");
        _.pluck(pets, "name");
        expect(_.each).not.toHaveBeenCalled();
      });
    });

    describe("reduce", () => {
      testForNativeMethods(() => {
        _.reduce([1, 2, 3, 4], (memo, item) => {
          return item;
        });
      });

      it("should return one value", () => {
        const result = _.reduce([1, 2, 3], (memo, item) => {
          return item;
        });

        expect(result).toBeDefined();
      });

      it("should not mutate the original array", () => {
        const input = [1, 2, 3, 4, 5];
        const result = _.reduce(input, (memo, item) => {
          return item;
        });

        expect(input).toEqual([1, 2, 3, 4, 5]);
      });

      it("should call the iterator function with arguments memo and item in that order", () => {
        let givenMemo, givenItem;
        _.reduce(
          ["item"],
          (memo, item) => {
            givenMemo = memo;
            givenItem = item;
          },
          "memo"
        );

        expect(givenMemo).toEqual("memo");
        expect(givenItem).toEqual("item");
      });

      it("should pass in items from left to right through iterator", () => {
        const orderedResult = [];

        _.reduce(
          [1, 2, 3, 4],
          (memo, item) => {
            orderedResult.push(item);
            return memo;
          },
          10
        );

        expect(orderedResult).toEqual([1, 2, 3, 4]);
      });

      it("should call iterator even if iterator returns undefined", () => {
        let callCount = 0;
        const returnFalsy = (total, item) => {
          callCount++;
          if (callCount === 1) {
            return undefined;
          } else {
            return item + 1;
          }
        };

        const total = _.reduce([1, 1, 2], returnFalsy);
        expect(total).toEqual(3);
      });

      it("should pass every item of the array through the iterator if a memo is passed in", () => {
        const result = _.reduce(
          [1, 2, 3],
          (memo, item) => {
            return memo - item;
          },
          10
        );

        expect(result).toEqual(4);
      });

      it("should accept falsy values as a valid memo", () => {
        const result = _.reduce(
          [1, 2, 3],
          (memo, item) => {
            return memo * item;
          },
          0
        );

        expect(result).toEqual(0);
      });

      it("should set memo to be first item of the array if no memo is given", () => {
        const result = _.reduce([1, 2, 3], _.identity);

        expect(result).toEqual(1);
      });

      it("should pass the second item of the array into the iterator first if no memo is given", () => {
        const result = _.reduce([3, 2, 1], (memo, item) => {
          return memo - item;
        });

        expect(result).toEqual(0);
      });

      it("should use _.each in the solution", () => {
        spyOn(_, "each");
        _.reduce([3, 2, 1], _.identity);
        expect(_.each).toHaveBeenCalled();
      });
    });

    describe("contains", () => {
      testForNativeMethods(() => {
        const input = [1, 2, 3, 4];
        _.contains(input, 2);
      });
      it("should not mutate the original array", () => {
        const input = [1, 2, 3];
        const result = _.contains(input, 2);
        expect(input).toEqual([1, 2, 3]);
      });

      it("should return true given an array and a value from that array", () => {
        const input = [1, 2, 3];
        const value = 2;
        expect(_.contains(input, value)).toBeTruthy();
      });

      it("should return false given an array and a value not in that array", () => {
        const iput = [1, 2, 3];
        const value = 4;
        expect(_.contains(iput, value)).toBeFalsy();
      });

      it("should return true given a object and a value from that object", () => {
        const object = {
          a: 1,
          b: 2,
          c: 3,
        };
        const value = 1;
        expect(_.contains(object, value)).toBeTruthy();
      });

      it("should return false given an object and a value not in that object", () => {
        const object = {
          a: 1,
          b: 2,
          c: 3,
        };
        const value = 4;
        expect(_.contains(object, value)).toBeFalsy();
      });
      it("should use _.reduce in the solution", () => {
        spyOn(_, "reduce");
        const object = {
          a: 1,
          b: 2,
          c: 3,
        };
        const value = 4;
        _.contains(object, value);
        expect(_.reduce).toHaveBeenCalled();
      });
    });

    describe("every", () => {
      testForNativeMethods(() => {
        _.every([1, 2, 3, 4], () => {});
      });
      it("should use _.reduce", () => {
        spyOn(_, "reduce");
        _.every([1, 2, 3], _.identity);
        expect(_.reduce).toHaveBeenCalled();
      });
      it("should return true if every value passes test", () => {
        const array = [1, 2, 3, 4, 5];
        const test = (number) => number < 6;
        expect(_.every(array, test)).toBeTruthy();
      });
      it("should return false if something does not pass", () => {
        const array = [1, 2, 3, 4, 5];
        const test = (number) => !(number === 3);
        expect(_.every(array, test)).toBeFalsy();
      });
      it("should pass by default for an empty collection", () => {
        expect(_.every([], _.identity)).toBeTruthy();
      });
      it("passes for a collection of all-truthy results", () => {
        expect(_.every([true, {}, 1], _.identity)).toBeTruthy();
      });
      it("fails for a collection of all-falsy results", () => {
        expect(_.every([null, 0, undefined], _.identity)).toBeFalsy();
      });
      it("treats each item as as a callback result when no callback is provided", () => {
        expect(_.every([true, true, true])).toBeTruthy();
      });
      it("works when provided a collection containing undefined values", () => {
        expect(
          _.every([undefined, undefined, undefined], _.identity)
        ).toBeFalsy();
      });
    });

    describe("extend", () => {
      testForNativeMethods(() => {
        _.extend({}, {});
      });
      it("should use each", () => {
        spyOn(_, "each");
        _.extend({}, {});
        expect(_.each).toHaveBeenCalled();
      });
      it("should shallowly copy one object to another", () => {
        const objA = {
          name: "moe",
        };
        const objB = {
          age: 50,
          favoriteThings: [
            "raindrops on roses",
            "whiskers on kittens",
            "bright copper kettles",
            "warm woolen mittens",
            "brown paper packages tied up with strings",
          ],
        };

        // Extend objA to have all of objB's properties.
        const extendedObjA = _.extend(objA, objB);
        expect(extendedObjA).toEqual({
          name: "moe",
          age: 50,
          favoriteThings: [
            "raindrops on roses",
            "whiskers on kittens",
            "bright copper kettles",
            "warm woolen mittens",
            "brown paper packages tied up with strings",
          ],
        });

        // Manipulate favoriteThings in objB's reference and expect the result to appear in extendedObjA's reference.
        objB.favoriteThings.pop();
        expect(extendedObjA.favoriteThings).toEqual(objB.favoriteThings);

        expect(_.extend({}, objA).age).toBe(50);
      });
      it("should return the first argument", () => {
        const objA = {};
        const objB = {};
        expect(_.extend(objA, objB)).toEqual(objA);
      });
      it("should override properties found in the source", () => {
        const objA = {
          name: "moe",
        };
        const objB = {
          name: "joe",
        };
        expect(_.extend(objA, objB).name).toEqual("joe");
      });
      it("should use the last source property in case of conflict", () => {
        const objA = {
          name: "moe",
        };
        const objB = {
          name: "joe",
        };
        const objC = {
          name: "yan",
        };
        expect(_.extend(objA, objB, objC).name).toEqual("yan");
      });
    });

    describe("once", () => {
      testForNativeMethods(() => {
        _.once(() => {});
      });
      it("should execute the given function only once", () => {
        let num = 0;
        const increment = _.once(() => {
          num += 1;
        });

        // console.log(increment); // incrementにはinner関数が入る
        // console.log(num); // 実行してないのでnumはまだ0のまま
        // console.log(increment()); // ここでinner関数実行
        // inner関数の処理
        // 1.初回はcheckがfalseなので、trueの処理に入る。
        // 2.trueの処理：checkをtrueに書き換え。func()を実行。つまり、num += 1が実行されてnumが1になる
        // console.log(num); //　numが1に変わっている事を確認。

        increment(); // checkがtrueなので、falseの処理にしかいかない。falseの処理は何も行わないので、何度呼ばれてもnumは1のまま。
        increment();
        increment();
        expect(num).toBe(1);
      });
      it("should return the previously returned value if a function has been called before", () => {
        const getNumber = _.once((n) => ++n); // onceに渡す関数が数値の引数をとる
        const initialNumber = getNumber(0); // checkがtrueになる。(0) => ++0が実行されて 1がresultに保存される
        const secondNumber = getNumber(99); // 次に99を渡しても、checkがtrueになっているので最初に実行した値の1がずっと返る
        expect(initialNumber).toBe(1); // 1が保存されているか
        expect(secondNumber).toBe(initialNumber); // 99を渡して実行したものも戻り値は1か
      });
    });

    describe("memoize", () => {
      testForNativeMethods(() => {
        _.memoize(() => {});
      });
      let fib, memoizedFib;
      beforeEach(() => {
        fib = (n) => {
          if (n < 2) {
            return n;
          }
          return fib(n - 1) + fib(n - 2);
        };
        memoizedFib = _.memoize(fib);
      });
      it("should create memoized functions that produce the same result when called with the same arguments", () => {
        expect(memoizedFib(8)).toBe(fib(8));
      });
      it("should give different results for different arguments", () => {
        expect(memoizedFib(11)).toBe(89);
        expect(memoizedFib(8)).toBe(21);
      });
      it("should not run the same function twice for a given argument", () => {
        const count = {};
        const foo = (n) => {
          count[n] = count[n] + 1 || 1;
          return n;
        };
        const memoizedFoo = _.memoize(foo);
        memoizedFoo(2);
        memoizedFoo(2);
        expect(count[2]).toBe(1);
      });
    });

    describe("invoke", () => {
      testForNativeMethods(() => {
        _.invoke([1, 2, 3], () => {});
      });
      let array, collection, arrayOfStrings;
      beforeEach(() => {
        array = [
          [5, 1, 7],
          [3, 2, 1],
        ];
        arrayOfStrings = ["yan", "kani"];
      });
      it("should be able to invoke methods on values and return in an array", () => {
        const sorted = _.invoke(array, "sort");
        expect(sorted).toEqual([
          [1, 5, 7],
          [1, 2, 3],
        ]);
        expect(_.invoke(arrayOfStrings, "toUpperCase")).toEqual([
          "YAN",
          "KANI",
        ]);
      });
      it("should be able to take a function", () => {
        const reverse = function () {
          return this.split("").reverse().join("");
        };
        const reversedStrings = _.invoke(["yan", "fan"], reverse);
        expect(reversedStrings).toEqual(["nay", "naf"]);
      });
    });
  });
})();
