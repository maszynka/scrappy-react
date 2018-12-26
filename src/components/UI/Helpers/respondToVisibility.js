// From: https://stackoverflow.com/a/44670818

// Start observing visbility of element. On change, the
//   the callback is called with Boolean visibility as
//   argument:

const respondToVisibility = (element, callback) => {
  var options = {
    root: null // document.documentElement
  }

  var observer = new window.IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      (entry.intersectionRatio > 0) && callback(entry.intersectionRatio)
    })
  }, options)

  observer.observe(element)
}

export default respondToVisibility
