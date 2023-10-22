(() => {
  "use strict";
  // 目的） 厳格なチェックを行うモードに変更
  // 記述なし）変数宣言が抜けていた場合に、グローバル変数として実行されてしまう
  // 記述あり）use strictでは変数宣言していないと、エラーを返すようになる
  // メリット）プログラムを高速で実行でき、エラーとなる一部を教えてくれるので
  // セキュアなjavascriptを書ける。

  window._ = {}; // => グローバル変数のwindowに_という名前のオブジェクトを格納

  /**
   * 受け取った引数をそのまま返す
   * @param {value} val - 数値や文字列などの最初の引数
   * @returns {value} - 受け取った引数
   */

  _.identity = (val) => {
    return val;
  };

  /**
   * xとyを合計した結果を返す
   * @param {value} x - 数値や文字列など
   * @param {value} y - 数値や文字列など
   * @returns {value} - xとyの合計値
   */

  _.add = (x, y) => {
    return x + y;
  };

  /**
  | ARRAYS
  |~~~~~~~~~~
  **/

  /**
   * 配列の最初の要素を返す
   * @param {array} array - 配列
   * @returns {value} - 配列の最初の要素
   */

  _.head = (array) => {
    return array[0];
  };

  /**
   * 渡された配列の最初の要素を取り除いた新しい配列を返す
   * @param {array} array - 配列
   * @returns {array} - 最初の要素を取り除いた新しい配列
   */

  _.tail = (array) => {
    return array.slice(1); // slice(start)はendが省略されると最後の要素までを指定
  };

  /**
   * 渡された配列を指定された数でスライスし、スライスした新しい配列を返す
   * @param {array} array - 配列
   * @param {number} n - 何個の要素をスライスするか
   * @returns {array} - スライスされた新しい配列
   */

  _.take = (array, n = 1) => {
    // nが無い時は1を指定
    if (n === 0) {
      return []; // nが0の時は空の配列を返す
    } else if (n < 0) {
      return array.slice(n || -1); // 配列の後ろからn番目でスライスした配列を返す
    } else {
      return array.slice(0, n || 1); // 配列の先頭からn番目でスライスした配列を返す
    }
  };

  /**
   * 渡された配列を指定した数でスライスし、スライス後の配列を返す
   * @param {array} array - 配列
   * @param {number} n - 何個
   * @returns {array} - スライス後の新しい配列
   */

  _.takeRight = (array, n = 1) => {
    // nが無い時は1を指定
    return _.take(array, -n); // _.takeを呼び出す、nの先頭にマイナスを付与
  };

  /**
   * 重複を含む配列を受け取り、一意の値のみが入った新しい配列を返す
   * @param {array} array - 重複を含む値が入った配列
   * @returns {array} - 一意の値が入った配列
   */

  _.uniq = (array) => {
    return [...new Set(array)]; // スプレッド構文で要素を展開
  };

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  **/

  /**
   * 渡された文字列の文字数や配列、オブジェクトの要素数を返す
   * @param {value} collection - 文字列や配列、オブジェクトのいずれか
   * @returns {number} - 文字列もしくは要素の数
   */

  _.size = (collection) => {
    return Object.values(collection).length; // Object.valuesで全て配列にして、要素数を返す
  };

  /**
   * 渡されたターゲットが配列のどの位置に有るかインデックス番号を返す
   * @param {array} array - チェックする配列
   * @param {value} target - チェック対象の要素
   * @returns {number} - 対象の要素のインデックス番号
   */

  _.indexOf = (array, target) => {
    let findIndex; // _.eachは戻り値はundefinedなので変数宣言が必要

    _.each(array, (val, i) => {
      if (target === val && findIndex === undefined) {
        findIndex = i; // ターゲットと要素が一致していて、findIndexに値が入ってない時
      }
    });
    return findIndex === undefined ? -1 : findIndex; // findIndexに値が無いときは-1、ある時はfindIndexを返す
  };

  /**
   * collectionの各要素に対してiterateeを呼び出す
   * @param {array,object} collection - iterateeに渡す配列やオブジェクト
   * @param {function} iteratee - collectionの各要素にコールバック関数を実行する
   */

  _.each = (collection, iteratee) => {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iteratee(collection[i], i, collection);
      }
    } else {
      for (const key in collection) {
        iteratee(collection[key], key, collection);
      }
    }
  };

  /**
   * 配列の全ての要素にiterateeを実行して、新しい配列に格納して返す
   * @param {array} collection - iterateeを実行する配列
   * @param {function} iteratee - 配列に実行するコールバック関数
   * @returns {array} array - iterateeを実行した後の新しい配列
   */

  _.map = (collection, iteratee) => {
    const array = [];
    _.each(collection, (val) => array.push(iteratee(val)));
    return array;
  };

  /**
   * 配列の全ての要素に対してtestを実行してtrueの要素のみを配列に格納して返す
   * @param {array} collection - テストを実行する配列
   * @param {function} test - 配列の要素に実行するコールバック関数
   * @returns {array} array - テストの結果でtrueになった要素のみが入った配列
   */

  _.filter = (collection, test) => {
    const array = [];
    _.each(collection, (val) => {
      if (test(val)) array.push(val);
    });
    return array;
  };

  /**
   * テストパスしない要素が入った配列を返す
   * @param {array} collection - テストを実行する配列
   * @param {function} test - 配列に実行するテスト
   * @returns {array} testでfalseになった要素が入った配列
   */

  _.reject = (collection, test) => {
    return _.filter(collection, (val) => !test(val)); // testに合格しないものだけ
  };

  /**
   * オブジェクトが格納された配列を受け取って、オブジェクトのkeyの値を配列に入れて返す
   * @param {array} collection - オブジェクトが格納された配列
   * @param {string} key - 格納するkey
   * @returns {array} - keyの値が入った配列
   */

  _.pluck = (collection, key) => {
    const array = [];
    for (const obj of collection) {
      array.push(obj[key]);
    }
    return array;
  };

  /**
   * 配列の要素にiteratorを実行して、結果をまとめて返す
   * @param {array} collection - 配列
   * @param {function} iterator - collectionの要素に対して実行する関数
   * @param {value} accumulator - 蓄積値
   */

  _.reduce = (collection, iterator, accumulator) => {
    if (accumulator !== undefined) {
      _.each(collection, (value) => {
        accumulator = iterator(accumulator, value);
      });
    } else {
      accumulator = collection[0]; // accuに配列の最初の要素を格納
      _.each(_.tail(collection), (value) => {
        // 1番目の要素はすでにaccuに入れたので、２番目以降の配列に対してループ処理
        accumulator = iterator(accumulator, value);
      });
    }
    return accumulator;
  };

  _.contains = (collection, target) => {
    return _.reduce(
      collection,
      (wasFound, item) => {
        if (wasFound) {
          return true;
        }
        return item === target;
      },
      false
    );
  };

  /**
   * collectionの全ての要素がテストに合格するかチェックしてboolを返す
   * @param {array} collection - テストを実行する配列
   * @param {function} test - 配列に実行するテスト関数
   * @returns {boolean} - true,false　テストの実行結果
   */

  _.every = function (collection, test = _.identity) {
    // testに何も渡されなければ、引数をそのまま返す_.identityを入れる
    return _.reduce(
      collection,
      (accu, value) => {
        if (!test(value)) {
          accu = false; // 一つでもテストに通らなければ、accuをfalseに書き換え
        }
        return accu; // 最後にaccuを返す
      },
      true // 初期値はtrueでテスト全て通ればtrueのままのはず
    );
  };

  /**
  | OBJECTS
  |~~~~~~~~~~
  **/

  /**
   * オブジェクトを別のオブジェクトで拡張して拡張したオブジェクトを返す
   * @param {...object} objs - 複数のオブジェクトを受け取る
   * @returns {object} - 拡張後の一つのオブジェクト
   */

  _.extend = function (...objs) {
    _.each(objs, (obj) => {
      Object.assign(objs[0], obj);
    });
    return objs[0]; // objs[0]に全て拡張したので最後返す
  };

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  **/

  /**
   * 一回しか使えない関数を返す。二回目以降は同じ値を返す
   * @param {function} func - 関数
   * @callback inner
   * @param {number} val
   * @returns {function} - 一度しか使えない関数
   */

  _.once = function (func) {
    // ぶっちゃけonceが一番むずい
    let check = false;
    let result;

    // incrementのテストでは、一度しか実行できないinner関数を返せばオッケー、実行結果はテスト側で保持（num）
    // getNumberのテストでは、上記かつinner関数の中でfuncの実行結果を_.onceの中のresultで保存して、その結果を返す

    function inner(val) {
      if (!check) {
        check = true;
        result = func(val);
        return result;
      } else {
        return result;
      }
    }
    return inner; // 関数を返す
  };

  /**
   * 関数を受け取り、関数の結果（引数、計算結果）を保存して、呼び出された時に
   * 同じ引数で呼ばれた事があるかチェックして、呼ばれた事が有れば保存した計算結果を渡す。
   * 呼ばれた事がなければ、計算を行い、結果を保存して計算結果を返す。
   * @param {function} func - 実行関数
   * @param {number} val - 数値型の引数
   * @returns {number} - 実行関数に数値型の引数を渡して実行した計算結果
   */

  _.memoize = function (func) {
    const memoryObj = {}; // 引数をkey、計算結果をvalueのペアで保存していく

    return (val) => {
      // memoryObjのキーを配列に変換して、文字列型にした引数が配列の中にあるかチェック
      const findKey = _.indexOf(Object.keys(memoryObj), String(val));
      if (findKey === -1) {
        return (memoryObj[val] = func(val)); // 計算を行い、計算結果をmemoryObjに保存する
      } else {
        return memoryObj[findKey]; // 保存済みの計算結果を返す
      }
    };
  };

  /**
   * 配列とメソッド？（文字列、関数）を受け取り、配列の要素にメソッドを実行して配列を返す
   * @param {array} collection - 配列
   * @param {string | function} functionOrKey - 文字列もしくは関数
   * @returns {array} - メソッド実行後の配列
   */

  _.invoke = function (collection, functionOrKey) {
    // functionOrKeyが関数：オブジェクト名.apply(要素)で引数を取らない関数に引数を渡す
    // functionOrKeyが文字列：オブジェクト名[メソッド名]でアクセス
    return _.map(collection, (val) =>
      typeof functionOrKey === "string"
        ? val[functionOrKey]()
        : functionOrKey.apply(val)
    );
  };

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  **/

  _.sortBy = function (/* Your Arguments Here */) {
    // YOUR CODE HERE
  };

  _.zip = function (/* Your Arguments Here */) {
    // YOUR CODE HERE
  };

  _.delay = function (/* Your Arguments Here */) {
    // YOUR CODE HERE
  };

  _.defaults = function (/* Your Arguments Here */) {
    // YOUR CODE HERE
  };

  _.throttle = function (/* Your Arguments Here */) {
    // YOUR CODE HERE
  };
})();
