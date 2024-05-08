$(document).ready(function () {
  // Function to animate the scrolling of images to the right
  function animateRowNext(row) {
    var $lastImage = row.children("img").last();
    var $imageMargin = parseInt($lastImage.css("margin-right"));
    var $lastImageWidth = $lastImage.outerWidth(true);
    var $lastImageClone = $lastImage.clone();

    // Prepending a clone of the last image to the beginning of the row
    $lastImageClone
      .prependTo(row)
      .css({ marginLeft: $imageMargin, opacity: 1 });

    // Animating the disappearance of the original last image
    $lastImage.animate(
      { marginLeft: `-=${$lastImageWidth}px`, opacity: 0 },
      1000
    );

    // Removing the original last image from the row after animation
    setTimeout(function () {
      $lastImage.remove();
    }, 1000);
  }

  // Function to animate the previous row of images
  function animateRowPrev(row) {
    var $firstImage = row.children("img").first();
    var $imageMargin = parseInt($firstImage.css("margin-left"));
    var $firstImageWidth = $firstImage.outerWidth(true);
    var $firstImageClone = $firstImage.clone();

    // Appending a clone of the first image to the end of the row
    $firstImageClone
      .appendTo(row)
      .css({ marginLeft: -$firstImageWidth + $imageMargin, opacity: 0 });

    // Animating the appearance of the first image at the end of the row
    $firstImageClone.animate({ marginLeft: $imageMargin, opacity: 1 }, 1000);

    // Removing the original first image from the row after animation
    setTimeout(function () {
      $firstImage.remove();
    }, 1000);
  }

  // Handling click events for next and previous buttons
  $(".next, .prev").click(function () {
    // Disabling buttons while animation is ongoing to prevent multiple clicks
    $(".next, .prev").prop("disabled", true);

    var $button = $(this);
    var $upperRow = $(".upper-row");
    var $lowerRow = $(".lower-row");

    // Determining which direction to animate based on the clicked button
    if ($button.hasClass("next")) {
      animateRowNext($upperRow);
      animateRowNext($lowerRow);
    } else {
      animateRowPrev($upperRow);
      animateRowPrev($lowerRow);
    }

    // Enabling buttons after animation is complete
    setTimeout(function () {
      $(".next, .prev").prop("disabled", false);
    }, 1000);
  });
});
