// From: https://stackoverflow.com/a/44670818

// Start observing visbility of element. On change, the
//   the callback is called with Boolean visibility as
//   argument:

const respondToVisibility = (element, callback) => {
  const options = {
    root: null, // document.documentElement
    rootMargin: '0px',
    threshold: 0.7
  }

  var observer = new window.IntersectionObserver((entries, observer) => {
    entries.forEach(entry => callback(entry))
  }, options)

  observer.observe(element)
}

export default respondToVisibility
