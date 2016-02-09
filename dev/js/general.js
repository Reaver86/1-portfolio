const height__nav = 50;

//Scroll to anchors more smoothly when clicking nav links
function scroll(element) {
  $("html,body").animate({scrollTop: ($(element).offset().top - height__nav)}, { duration: 1000, easing: "swing"});
}

$(document).ready(function() {
  $(".nav__logo").click(function() {
    const element = document.getElementById("top");
    scroll(element);
    return false;
  });
  $(".list__link--me").click(function() {
    const element = document.getElementById("section-me");
    scroll(element);
    return false;
  });
  $(".list__link--work").click(function() {
    const element = document.getElementById("section-work");
    scroll(element);
    return false;
  });
  $(".list__link--contact").click(function() {
    const element = document.getElementById("section-contact");
    scroll(element);
    return false;
  });
});

//Switch Navbar between transparent and white when scrolling to the end of the header
$(function() {
  const vh = document.documentElement.clientHeight;
  const headerclass = $(".nav--transparent");
  $(window).scroll(function() {
    const scroll = $(window).scrollTop();

    if (scroll >= (vh - height__nav)) {
      headerclass.removeClass("nav--transparent").addClass("nav--white");
    }
    else {
      headerclass.removeClass("nav--white").addClass("nav--transparent");
    }
  });
});
