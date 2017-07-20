function REST(param) {
    if(typeof param == "object") {
        var entries = []
        var entryList = Object.entries(param)

        entryList.forEach(function(ent) {
        var suffix = ent[1]

        if(entryList.indexOf(ent) < entryList.length - 1) {
            suffix += "&"
        }

        entries.push(ent[0] + "=" + suffix)
        })

        return "?" + entries.join("")
    }

    else {
        return ""
    }
}

function Requester(base, cfg) {
    var _this = this
    //var xhr = new XMLHttpRequest()
    this.readyRequests = []
    
    this.connect = function(branch) {
        var target

        if(!branch || branch == "") {
            cfg.path = base
            target = cfg
        }

        else if(branch) {
            target = branch
        }

        if(!target.xhr) {
            target.xhr = new XMLHttpRequest()
        }

        target.xhr.open(target.method, base + target.path)
        target.xhr.responseType = target.type

        target.xhr.onreadystatechange = function() {
            if(target.xhr.readyState == 4) {
                if(target.callback) {
                    target.callback(target.xhr.response)
                }

                _this.readyRequests.push(target)

                var requests = []

                if(_this.xhr) {
                    requests.push(_this)
                }

                for(let i in _this) {
                    if(_this[i].xhr) {
                        requests.push(_this[i])
                    }
                }

                if(_this.readyRequests.length == requests.length) {
                    _this.onready()
                }
            }
        }

        target.xhr.send()
    }
}

/* example code
var html5 = new Requester("https://www.html5rocks.com")

html5.en = {
  path: "/en/",
  method: "GET",
  type: "document"
}

html5.tutorial = {
  path: "/en/tutorials/",
  method: "GET",
  type: "document"
}

html5.hobbit = {
  path: "/en/tutorials/casestudies/hobbit2014/",
  method: "GET",
  type: "document"
}

html5.connect(html5.en)
html5.connect(html5.tutorial)
html5.connect(html5.hobbit)

html5.onready = function() {
  console.log(html5.en.xhr.response, html5.tutorial.xhr.response, html5.thirdPage.xhr.response)
}
*/
