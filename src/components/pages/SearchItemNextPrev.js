import React, { Component } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
class SearchItemNextPrev extends Component
{

  componentDidMount() 
  {
        const navScroller = function ({
                  wrapperSelector: wrapperSelector = ".nav-scroller-wrapper",
                  selector: selector = ".nav-scroller",
                  contentSelector: contentSelector = ".nav-scroller-content",
                  buttonLeftSelector: buttonLeftSelector = ".nav-scroller-btn--left",
                  buttonRightSelector: buttonRightSelector = ".nav-scroller-btn--right",
                  scrollStep: scrollStep = 75
    } = {}) {
  let scrolling = false;
  let scrollingDirection = "";
  let scrollOverflow = "";
  let timeout;

  let navScrollerWrapper;

  if (wrapperSelector.nodeType === 1) {
    navScrollerWrapper = wrapperSelector;
  } else {
    navScrollerWrapper = document.querySelector(wrapperSelector);
  }
  if (navScrollerWrapper === undefined || navScrollerWrapper === null) return;

  let navScroller = navScrollerWrapper.querySelector(selector);
  let navScrollerContent = navScrollerWrapper.querySelector(contentSelector);
  let navScrollerLeft = navScrollerWrapper.querySelector(buttonLeftSelector);
  let navScrollerRight = navScrollerWrapper.querySelector(buttonRightSelector);

  // Sets overflow
  const setOverflow = function () {
    scrollOverflow = getOverflow(navScrollerContent, navScroller);
    toggleButtons(scrollOverflow);
  };

  // Debounce setting the overflow with requestAnimationFrame
  const requestSetOverflow = function () {
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    timeout = window.requestAnimationFrame(() => {
      setOverflow();
    });
  };

  // Get overflow value on scroller
  const getOverflow = function (content, container) {
    let containerMetrics = container.getBoundingClientRect();
    let containerWidth = containerMetrics.width;
    let containerMetricsLeft = Math.floor(containerMetrics.left);

    let contentMetrics = content.getBoundingClientRect();
    let contentMetricsRight = Math.floor(contentMetrics.right);
    let contentMetricsLeft = Math.floor(contentMetrics.left);

    // Offset the values by the left value of the container
    let offset = containerMetricsLeft;
    containerMetricsLeft -= offset;
    contentMetricsRight -= offset + 1; // Due to an off by one bug in iOS
    contentMetricsLeft -= offset;

    // console.log (containerMetricsLeft, contentMetricsLeft, containerWidth, contentMetricsRight);

    if (
      containerMetricsLeft > contentMetricsLeft &&
      containerWidth < contentMetricsRight
    ) {
      return "both";
    } else if (contentMetricsLeft < containerMetricsLeft) {
      return "left";
    } else if (contentMetricsRight > containerWidth) {
      return "right";
    } else {
      return "none";
    }
  };

  // Move the scroller with a transform
  const moveScroller = function (direction) {
    if (scrolling === true) return;

    setOverflow();

    let scrollDistance = scrollStep;
    let scrollAvailable;

    if (scrollOverflow === direction || scrollOverflow === "both") {
      if (direction === "left") {
        scrollAvailable = navScroller.scrollLeft;
      }

      if (direction === "right") {
        let navScrollerRightEdge = navScroller.getBoundingClientRect().right;
        let navScrollerContentRightEdge = navScrollerContent.getBoundingClientRect()
          .right;

        scrollAvailable = Math.floor(
          navScrollerContentRightEdge - navScrollerRightEdge
        );
      }

      // If there is less that 1.5 steps available then scroll the full way
      if (scrollAvailable < scrollStep * 1.5) {
        scrollDistance = scrollAvailable;
      }

      if (direction === "right") {
        scrollDistance *= -1;
      }

      navScrollerContent.classList.remove("no-transition");
      navScrollerContent.style.transform =
        "translateX(" + scrollDistance + "px)";

      scrollingDirection = direction;
      scrolling = true;
    }
  };

  // Set the scroller position and removes transform, called after moveScroller()
  const setScrollerPosition = function () {
    var style = window.getComputedStyle(navScrollerContent, null);
    var transform = style.getPropertyValue("transform");
    var transformValue = Math.abs(parseInt(transform.split(",")[4]) || 0);

    if (scrollingDirection === "left") {
      transformValue *= -1;
    }

    navScrollerContent.classList.add("no-transition");
    navScrollerContent.style.transform = "";
    navScroller.scrollLeft = navScroller.scrollLeft + transformValue;
    navScrollerContent.classList.remove("no-transition");

    scrolling = false;
  };

  // Toggle buttons depending on overflow
  const toggleButtons = function (overflow) {
    navScrollerLeft.classList.remove("active");
    navScrollerRight.classList.remove("active");

    if (overflow === "both" || overflow === "left") {
      navScrollerLeft.classList.add("active");
    }

    if (overflow === "both" || overflow === "right") {
      navScrollerRight.classList.add("active");
    }
  };

  const init = function () {
    // Determine scroll overflow
    setOverflow();

    // Scroll listener
    navScroller.addEventListener("scroll", () => {
      requestSetOverflow();
    });

    // Resize listener
    window.addEventListener("resize", () => {
      requestSetOverflow();
    });

    // Button listeners
    navScrollerLeft.addEventListener("click", () => {
      moveScroller("left");
    });

    navScrollerRight.addEventListener("click", () => {
      moveScroller("right");
    });

    // Set scroller position
    navScrollerContent.addEventListener("transitionend", () => {
      setScrollerPosition();
    });
  };

  // Init is called by default
  init();

  // Reveal API
  return {
    init
  };
};

const navScrollerTest = navScroller();

  }
  render(){
  return (
    <>
      
   

      <div className="nav-scroller-wrapper nav-box">
        <nav className="nav-scroller">

            <div className="nav-scroller-content">
              <a href="#" className="nav-scroller-item butn">Chairs</a>
              <a href="#" className="nav-scroller-item butn">Tables</a>
              <a href="#" className="nav-scroller-item butn">Cookware</a>
              <a href="#" className="nav-scroller-item butn">Beds</a>
              <a href="#" className="nav-scroller-item butn">Desks</a>
              <a href="#" className="nav-scroller-item butn">Flooring</a>
              <a href="#" className="nav-scroller-item butn">Lighting</a>
              <a href="#" className="nav-scroller-item butn">Mattresses</a>
              <a href="#" className="nav-scroller-item butn">Solar Panels</a>
              <a href="#" className="nav-scroller-item butn">Bookcases</a>
              <a href="#" className="nav-scroller-item butn">Mirrors</a>
              <a href="#" className="nav-scroller-item butn">Rugs</a>
              <a href="#" className="nav-scroller-item butn">Curtains &amp; Blinds</a>
              <a href="#" className="nav-scroller-item butn">Frames &amp; Pictures</a>
              <a href="#" className="nav-scroller-item butn">Wardrobes</a>
              <a href="#" className="nav-scroller-item butn">Storage</a>
              <a href="#" className="nav-scroller-item butn">Decoration</a>
              <a href="#" className="nav-scroller-item butn">Appliances</a>
              <a href="#" className="nav-scroller-item butn">Racks</a>
              <a href="#" className="nav-scroller-item butn">Worktops</a>
            </div>

        </nav>


          <button className="previous nav-scroller-btn nav-scroller-btn--left"><NavigateBeforeIcon style={{fontSize: '50px'}}/></button>
        
          <button className="next nav-scroller-btn nav-scroller-btn--right"><NavigateNextIcon style={{fontSize: '50px'}}/></button>

</div>


    </>
  );
}

}

export default  SearchItemNextPrev 