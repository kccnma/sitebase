//https://github.com/bendc/anchor-scroll
//anchor-scroll by Benjamin De Cock (https://github.com/bendc)

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const root = (() => {
    if ("scrollingElement" in document) return document.scrollingElement;
    const html = document.documentElement;
    const start = html.scrollTop;
    html.scrollTop = start + 1;
    const end = html.scrollTop;
    html.scrollTop = start;
    return end > start ? html : document.body;
  })();

  const ease = (duration, elapsed, start, end) =>
    Math.round(end * (-Math.pow(2, -10 * elapsed/duration) + 1) + start);


  const getCoordinates = hash => {
    const start = root.scrollTop;
    //const offset = document.querySelector('. site-id').offsetHeight;
    //const offset = document.getElementById("home").offsetHeight - 2;
    function haveClass(elem, className) {
      return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }
    const siteheader = document.querySelector('.site-header');
    const siteheaderfixed = haveClass(siteheader, 'fixed');
    var offset;
    if (siteheaderfixed) {
      //offset = 55;
      //offset = (document.querySelector('.site-header').offsetHeight) - (document.querySelector('.site-navigation').offsetHeight);
      //var headerheight = window.getComputedStyle(siteheader).getPropertyValue("height");
      //offset = parseFloat(headerheight, 10);
      offset = (document.querySelector('.site-id').offsetHeight) + 15;
    } else {
      offset = 0;
    }
    console.log(siteheader);
    console.log(siteheaderfixed);
    console.log(offset);
    const delta = (() => {
      if (hash.length < 2) return -start;
      const target = document.querySelector(hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top;
      const max = root.scrollHeight - window.innerHeight;
      return (start + top < max ? top : max - start) - offset;
    })();
    if (delta) return new Map([["start", start], ["delta", delta]]);
  };

  const scroll = link => {
    const hash = link.getAttribute("href");
    const coordinates = getCoordinates(hash);
    if (!coordinates) return;

    const tick = timestamp => {
      progress.set("elapsed", timestamp - start);
      root.scrollTop = ease(...progress.values(), ...coordinates.values());
      progress.get("elapsed") < progress.get("duration")
      ? requestAnimationFrame(tick)
      : complete(hash, coordinates);
    };

    const progress = new Map([["duration", 800]]);
    const start = performance.now();
    requestAnimationFrame(tick);
  };

  const complete = (hash, coordinates) => {
    history.pushState(null, null, hash);
    root.scrollTop = coordinates.get("start") + coordinates.get("delta");
  };

  const last = list => list.length - 1;

  const attachHandler = (links, index = last(links)) => {
    const link = links.item(index);
    link.addEventListener("click", event => {
      event.preventDefault();
      scroll(link);
    });
    if (index) return attachHandler(links, index - 1);
  };

  attachHandler(document.querySelectorAll("a.scroll"));
});
