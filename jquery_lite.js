(function (){
  window.$l = function (arg) {
    if (arg instanceof HTMLElement) {
      return new DOMNodeCollection([arg]);
    } else if (typeof(arg) === "function") {
      if (document.readyState === "complete") {
        // if document is ready, call function
        arg();
      } else {
        // otherwise add it to function queue
        document.addEventListener('DOMContentLoaded', arg, false);
      }
      return;
    }

    elementNodeList = document.querySelectorAll(arg);
    elementList = Array.prototype.slice.call(elementNodeList);
    return new DOMNodeCollection(elementList);
  };

  function DOMNodeCollection (elements) {
    this.elements = elements;
  }

  // prototypes
  DOMNodeCollection.prototype.html = function (arg) {
    // arg? y:
    if (arg) {
      // this will be the innerHTML for each node.
      this.elements.forEach (function (elem) {
        elem.innerHTML = arg;
      });
    } else {
      // return the innerHTML of the first node in the array
      return this.elements[0].innerHTML;
    };
  };

  DOMNodeCollection.prototype.empty = function () {
    this.elements.forEach (function (elem) {
      elem.innerHTML = "";
    });
  };

  DOMNodeCollection.prototype.attr = function (attributeName, value) {
    elem = this.elements[0];
    if (value) {
      // set
      elem.setAttribute(attributeName, value)
    } else {
      // get
      return elem.getAttribute(attributeName)
    }
  };

  DOMNodeCollection.prototype.addClass = function (newClass) {
    this.elements.forEach(function (elem) {
      elem.classList.add(newClass);
    });
  };

  DOMNodeCollection.prototype.removeClass = function (oldClass) {
    this.elements.forEach(function (elem) {
      elem.classList.remove(oldClass);
    });
  };

  // traversal
  DOMNodeCollection.prototype.children = function () {
    var results = [];

    this.elements.forEach( function (elem) {
      var elemChildren = Array.prototype.slice.call(elem.children);
      results = results.concat(elemChildren);
    });

    return new DOMNodeCollection(results);
  };

  DOMNodeCollection.prototype.parent = function () {
    var results = [];

    // var elementCount = this.elements.length;
    // var parent = this.elements[0].parentElement;

    this.elements.forEach( function (elem) {
      var parent = elem.parentElement;

      if (results.indexOf(parent) === -1) {
        results.push(parent);
      }
    });

    return new DOMNodeCollection(results);
  };

  DOMNodeCollection.prototype.find = function (selectors) {
    var results = [];
    this.elements.forEach( function (elem) {
      var nodes = elem.querySelectorAll(selectors);
      if (nodes.length > 0) {
        results.push(nodes);
      }
    })

    return new DOMNodeCollection(results);
  };

  DOMNodeCollection.prototype.remove = function () {
    this.elements.forEach( function (elem) {
      elem.remove();
    });
  };

  DOMNodeCollection.prototype.on = function (eventType, fn) {
    this.elements.forEach( function (elem) {
      elem.addEventListener(eventType, fn);
    });
  };

  DOMNodeCollection.prototype.off = function (eventType, fn) {
    this.elements.forEach( function (elem) {
      elem.removeEventListener(eventType, fn);
    });
  };

  $l.extend = function () {
    argArray = Array.prototype.slice.call(arguments)
    var results = argArray[0];

    for (var i = 1; i < argArray.length; i++) {
      var current = argArray[i];
      Object.keys(current).forEach( function (key) {
        results[key] = current[key];
      });
    };
    return results;
  };

  $l.ajax = function (options) {
    var defaults = {
      "async": true,
      "contentType": 'application/x-www-form-urlencoded; charset=UTF-8',
    };
    $l.extend(options, defaults);
    var promise = new MyPromise( function(resolve, reject){
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {

          if (xmlhttp.status == 200) {
            // success callback...
            resolve(xmlhttp.response);
          } else {
            // error callback.
            reject(xmlhttp.response);
          }
        }
      }

      xmlhttp.open("GET", options["url"]);
      xmlhttp.send();
    })

    promise.then(options["success"], options["error"]);
    return promise;

  }

  function MyPromise (executor) {
    var resolve, reject;
    var resolver = [];
    var deferredResolve = [];
    var deferredReject = [];
    var status = "pending";
    var noop = function(){};

    this.then = function (resolveCallback, rejectCallback) {
      deferredResolve.push(resolveCallback || noop);
      deferredReject.push(rejectCallback || noop);

      return new MyPromise(function (resolve, reject) {
        resolver.push(resolve);
      });
    };

    resolve = function(val) {

      if (status === "pending") {


        if (val !== null && typeof val === 'object' && 'then' in val) {
          val.then( function (resolvedValue) {
            resolve(resolvedValue);
          });

        } else {

            for (var i = 0; i < deferredResolve.length; i++) {
              resolver[i](deferredResolve[i](val)); //*
            }
            status = "resolved";
        }
      };
    };

    reject = function (reason) {
      if (status === "pending") {
        for (var i = 0; i < deferredReject.length; i++) {
          resolver[i](deferredReject[i](reason)); //*
        }
        status = "rejected";
      }
    };

    executor(resolve, reject);
  };
})();
