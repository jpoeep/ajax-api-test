function JSONP(param) {
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

function APIRequest(base) {
  var _this = this
  var xhr = new XMLHttpRequest()

  this.connect = function(branch, obj) {
    if(!branch) {
      branch = ""
    }

    else {
      obj = {json: ""}
    }

    xhr.open(_this.method, base + branch + JSONP(obj.json), true)

    if(obj.headers) {
      Object.entries(obj.headers).forEach(function(ent) {
        xhr.setRequestHeader(ent[0], ent[1])
      })
    }

    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        _this.callback(xhr.response)
      }
    }

    xhr.send()
  }
}
